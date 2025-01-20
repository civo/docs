---
title: Kubernetes Volumes
description: Learn how to manage and attach volumes to your Civo Kubernetes clusters, find out how to use them and improve the performance of your applications.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <title>Managing Kubernetes Volumes for Your Civo Clusters | Civo Documentation</title>
</head>

## Overview

Civo Kubernetes clusters provide a native storage class (`civo-volume`) that you can use for your persistent workloads directly.

A [cluster running on Civo](./create-a-cluster.md) will have `civo-volume` as the default storage class. This can be confirmed by viewing the `storageclass` resources on your cluster:

```console
$ k get sc
NAME                    PROVISIONER    RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
civo-volume (default)   csi.civo.com   Delete          WaitForFirstConsumer   true                   10m
```

## Creating a PersistentVolumeClaim (PVC)

To create a Persistent Volume Claim that will automatically trigger a PersistentVolume (PV) creation based on its specification, apply a `PersistentVolumeClaim` to your cluster.

As an example, the following `pvc.yaml`:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: civo-volume-test
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 3Gi
```

When applied to your cluster with `kubectl create -f pvc.yaml`, you should see the following:

```console
$ kubectl create -f pvc.yaml 
persistentvolumeclaim/civo-volume-test created
```

Due to the StorageClass volume binding mode, the PersistentVolumeClaim will remain in a pending state, until a Pod using the PersistentVolumeClaim is created.

```console
$ kubectl get pvc
NAME               STATUS    VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
civo-volume-test   Pending                                                                        civo-volume    25s
```

## Creating a pod to use a PersistentVolume

To create a pod to use the volume created above, you need to specify the volume claim in the spec, as in the below `pod.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: civo-vol-test-pod
spec:
  volumes:
    - name: civo-vol
      persistentVolumeClaim:
        claimName: civo-volume-test
  containers:
    - name: civo-vol-container
      image: nginx
      ports:
        - containerPort: 80
          name: "http-server"
      volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: civo-vol
```

Applied to the cluster, this should create the pod:

```console
$ kubectl create -f pod.yaml 
pod/civo-vol-test-pod created

$ kubectl get pods
NAME                READY   STATUS    RESTARTS   AGE
civo-vol-test-pod   1/1     Running   0          54s
```
## Expanding the PersistentVolume after creation

Civo supports the capability of offline expansion for volumes, which entails specific requirements for resizing operations. 

Offline expansion means that the volume must first be unmounted before any resizing can take place. This unmounting process involves ensuring that the volume is no longer in use, typically requiring the deletion or termination of any associated Pods utilizing the volume. 

The necessity for unmounting the volume is critical, as it helps to avoid potential conflicts or inconsistencies that could arise if the volume were modified while still actively mounted. By ensuring the volume is completely detached from any workloads during the resizing operation, the process can be executed reliably and without risk to the integrity of the data or the application.

To do this, delete the pod created in the previous step:

```console
$ kubectl delete pod civo-vol-test-pod
pod "civo-vol-test-pod" deleted
```

Now, resize the PersistentVolumeClaim by changing the request in your `pvc.yaml` file above:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: civo-volume-test
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 300Gi
```

When reapplied to your cluster, you will see the size change:

```console
kubectl apply -f pvc.yaml
persistentvolumeclaim/civo-volume-test configured
```

You will see in the Kubernetes events, the PersistentVolumeClaim has expanded and is now waiting for the pod to be recreated:

```console
$ kubectl get events --field-selector involvedObject.kind=PersistentVolumeClaim,involvedObject.name=civo-volume-test -n default
LAST SEEN   TYPE      REASON                     OBJECT                                   MESSAGE
31m         Normal    WaitForFirstConsumer       persistentvolumeclaim/civo-volume-test   waiting for first consumer to be created before binding
28m         Warning   ProvisioningFailed         persistentvolumeclaim/civo-volume-test   failed to provision volume with StorageClass "civo-volume": rpc error: code = DeadlineExceeded desc = context deadline exceeded
28m         Normal    Provisioning               persistentvolumeclaim/civo-volume-test   External provisioner is provisioning volume for claim "default/civo-volume-test"
28m         Normal    ProvisioningSucceeded      persistentvolumeclaim/civo-volume-test   Successfully provisioned volume pvc-a77aee95-f722-49e9-9ec2-ffcc884aa7c0
6m43s       Warning   ExternalExpanding          persistentvolumeclaim/civo-volume-test   waiting for an external controller to expand this PVC
6m43s       Normal    Resizing                   persistentvolumeclaim/civo-volume-test   External resizer is resizing volume pvc-a77aee95-f722-49e9-9ec2-ffcc884aa7c0
5m37s       Normal    FileSystemResizeRequired   persistentvolumeclaim/civo-volume-test   Require file system resize of volume on node
```

Finally, recreate the pod and notice the PersistentVolume and PersistentVolumeClaim reflect the new size:

```console
$ kubectl create -f pod.yaml 
pod/civo-vol-test-pod created

$ kubectl get pods
NAME                READY   STATUS    RESTARTS   AGE
civo-vol-test-pod   1/1     Running   0          7s

$ kubectl get pvc
NAME               STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
civo-volume-test   Bound    pvc-a77aee95-f722-49e9-9ec2-ffcc884aa7c0   300Gi      RWO            civo-volume    43m

$ kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                      STORAGECLASS   REASON   AGE
pvc-a77aee95-f722-49e9-9ec2-ffcc884aa7c0   300Gi      RWO            Delete           Bound    default/civo-volume-test   civo-volume             41m
```

## Cordoning and deleting a node to show persistence

If you cordon the node and delete the pod from above, you should be able to re-create it and have it spin up on a different node but attached to the pre-defined persistent volume.

You will need to find the node the pod is running on to cordon the correct node. The easiest way to do this is by running `kubectl get pods -o wide` to identify the node. Take that named node and cordon it off from further scheduling:

```console
$ kubectl cordon k3s-civo-vol-75499ca3-node-pool-a544
node/k3s-civo-vol-75499ca3-node-pool-a544 cordoned
```

Then delete the pod:

```console
$ kubectl delete pod civo-vol-test-pod --force
warning: Immediate deletion does not wait for confirmation that the running resource has been terminated. The resource may continue to run on the cluster indefinitely.

pod "civo-vol-test-pod" force deleted
```

When this deletion is complete, you can re-create the pod. As the original node was cordoned off, it will be created on another node in the cluster. However, as it is set to use the persistent volume we defined earlier, it should make no difference.

```console
$ kubectl create -f pod.yaml 
pod/civo-vol-test-pod created
```

Verify the pod is running, along with the node:

```console
$ kubectl get pod -o=custom-columns=NAME:.metadata.name,STATUS:.status.phase,NODE:.spec.nodeName
NAME                STATUS    NODE
civo-vol-test-pod   Running   k3s-civo-vol-75499ca3-node-pool-a4e8
```

Also, if you check the events (`kubectl get events`) for the pod you will see that it is attached to the same PVC we defined earlier:

```console
Events:
  Type    Reason                  Age    From                                           Message
  ----    ------                  ----   ----                                           -------
  Normal  Scheduled               3m20s                                                 Successfully assigned default/civo-vol-test-pod to k3s-civo-vol-75499ca3-node-pool-a4e8
  Normal  SuccessfulAttachVolume  3m7s   attachdetach-controller                        AttachVolume.Attach succeeded for volume "pvc-11509930-bf05-49ec-8814-62744e4606c4"
```

:::warning
If you have any external volumes attached to a [cluster you delete](./delete-a-cluster.md), these will remain in your account for use. They are not automatically removed. As such, any external volumes will [be charged](../account/billing.md) until they are explicitly deleted.
:::