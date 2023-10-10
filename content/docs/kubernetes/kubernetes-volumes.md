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
 kubectl get sc
NAME                    PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
local-path              rancher.io/local-path   Delete          WaitForFirstConsumer   false                  10m
civo-volume (default)   csi.civo.com            Delete          Immediate              false                  10m
```

## Creating a Persistent Volume Claim (PVC)

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

This will have created the PersistentVolume and claim:

```console
$ kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                      STORAGECLASS   REASON   AGE
pvc-11509930-bf05-49ec-8814-62744e4606c4   3Gi        RWO            Delete           Bound    default/civo-volume-test   civo-volume             2s

$ kubectl get pvc
NAME               STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
civo-volume-test   Bound    pvc-11509930-bf05-49ec-8814-62744e4606c4   3Gi        RWO            civo-volume    13m
```

## Creating a pod to use a persistent volume

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