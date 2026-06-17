---
sidebar_position: 9
title: Migrate from Talos to K3S
description: Learn how to migrate your services from a Talos Kubernetes cluster to a K3s cluster on Civo, with systematic steps and best practices.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <title>Migrate from Talos to K3S | Civo Documentation</title>
</head> 

## Overview

To migrate your services from a Talos Kubernetes cluster to a K3s cluster, here's a systematic approach:

### Prepare the K3s Cluster

First, ensure your K3s cluster is ready:

- Install K3s on your target nodes
- Configure networking (CNI) and storage classes to match your requirements
- Set up any necessary ingress controllers

### Inventory Your Current Services

Extract all your current resources from the Talos cluster:

```bash
# Get all namespaces (excluding system ones)
kubectl get namespaces -o json | jq -r '.items[].metadata.name' | grep -v kube- | grep -v default

# For each namespace, export resources
kubectl get all,configmap,secret,pvc,ingress -n <namespace> -o yaml > namespace-resources.yaml
```

### Handle Persistent Data

This is often the trickiest part:

For StatefulSets: You'll need to backup and restore the persistent volumes

**Options:**
- Use tools like Velero for backup/restore
- Manually snapshot and copy data
- Use your storage provider's snapshot capabilities

### Export Resources Systematically

Create a migration script to export resources:

```bash
# Export deployments, services, configmaps, secrets
kubectl get deployments,services,configmaps,secrets,ingresses,statefulsets \
  --all-namespaces -o yaml > all-resources.yaml
```

### Clean Up Exported Manifests

Remove cluster-specific metadata:

- Remove `resourceVersion`, `uid`, `selfLink`
- Remove `status` sections
- Update any cluster-specific annotations
- Adjust storage class names if different

### Handle Secrets and ConfigMaps First

Apply these to your K3s cluster before the apps:

```bash
kubectl apply -f secrets.yaml
kubectl apply -f configmaps.yaml
```

### Update Service Definitions

- Modify LoadBalancer services if using different providers
- Update ingress annotations for your K3s ingress controller
- Adjust any cluster-specific configurations

### Deploy to K3s

Apply resources in order:

1. Namespaces
2. ConfigMaps and Secrets
3. PVCs
4. Deployments/StatefulSets
5. Services
6. Ingresses

## Migration Strategies

### Blue-Green Migration (recommended)

- Keep both clusters running
- Migrate services one by one
- Update DNS/load balancers to point to K3s
- Decommission Talos cluster after verification

### Big Bang Migration

- Take a maintenance window
- Stop services on Talos
- Migrate all data
- Start everything on K3s

## Key Considerations

- **Networking**: Ensure your K3s cluster can reach the same external resources
- **DNS**: Update any hardcoded cluster DNS names
- **Certificates**: Migrate or regenerate TLS certificates
- **Monitoring**: Update your monitoring to point to the new cluster
- **GitOps**: If using Flux/ArgoCD, update the target cluster
