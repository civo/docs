---
title: Internal Load Balancers
description: Learn how to create internal load balancers on Civo that are only accessible within your private network, not from the public internet.
sidebar_position: 4
---

<head>
  <title>Creating Internal Load Balancers | Civo Documentation</title>
</head>

## Overview

By default, Civo load balancers are assigned a public IP address and are accessible from the internet. However, you may need a load balancer that is only accessible within your private network for internal services, backend APIs, or microservices communication.

An internal load balancer routes traffic only within your Civo private network. External traffic from the internet cannot reach the load balancer, providing an additional layer of security for internal services.

## Why Use an Internal Load Balancer?

Internal load balancers are useful when you need to:

- **Expose internal services**: Route traffic to backend services that should not be publicly accessible (databases, internal APIs, message queues).
- **Implement microservices architecture**: Allow services within your cluster to communicate with each other through a stable endpoint.
- **Improve security**: Reduce the attack surface by keeping internal services off the public internet.
- **Separate traffic tiers**: Use public load balancers for user-facing applications and internal load balancers for backend communication.

## Creating an Internal Load Balancer

To create an internal load balancer, you need to configure a firewall that blocks all inbound traffic from external sources, then attach that firewall to your load balancer.

### Step 1: Create a Firewall with No Inbound Rules

First, create a firewall that has no inbound rules, effectively blocking all external traffic.

#### Using the Dashboard

1. Navigate to **Networking** > **Firewalls** in your Civo dashboard.
2. Click **Create Firewall**.
3. Enter a name for your firewall (e.g., `internal-only`).
4. Do not add any inbound rules.
5. Click **Create Firewall**.

#### Using the Civo CLI

```bash
civo firewall create internal-only
```

This creates a firewall with no rules, which blocks all inbound traffic by default.

### Step 2: Create the Load Balancer with the Firewall

#### Using the Dashboard

1. Navigate to **Networking** > **Load Balancers**.
2. Click **Create Load Balancer**.
3. Configure your load balancer settings (algorithm, instance pool, ports).
4. In the **Firewall** dropdown, select your `internal-only` firewall.
5. Click **Create Load Balancer**.

#### Using Kubernetes

When deploying a Kubernetes Service of type `LoadBalancer`, you can specify the firewall using an annotation:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: internal-api
  annotations:
    kubernetes.civo.com/firewall-id: "internal-only"
spec:
  type: LoadBalancer
  selector:
    app: internal-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

:::note
The `kubernetes.civo.com/firewall-id` annotation accepts either a firewall name or ID.
:::

## Verifying Your Internal Load Balancer

After creating your internal load balancer, verify that it is correctly configured.

### Check the Load Balancer Status

Ensure the load balancer is active and has been assigned an IP address:

```bash
civo loadbalancer show <loadbalancer-name>
```

For Kubernetes-managed load balancers:

```bash
kubectl get service internal-api
```

The `EXTERNAL-IP` field shows the assigned IP address, even though it is not publicly accessible.

### Test Internal Access

From an instance or pod within the same private network, verify that you can reach the load balancer:

```bash
curl http://<loadbalancer-ip>
```

This should return a response from your backend service.

### Verify Public Access is Blocked

From outside your Civo network (your local machine or an external server), attempt to connect:

```bash
curl --connect-timeout 5 http://<loadbalancer-ip>
```

This connection should time out, confirming that external access is blocked.

## Related Documentation

- [Firewalls](firewalls.md) - Learn more about configuring firewall rules
- [Private Networks](private-networks.md) - Set up private networks for your instances
- [Load Balancers](load-balancers.md) - General load balancer configuration
