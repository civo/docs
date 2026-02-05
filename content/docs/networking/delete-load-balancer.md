---
title: Deleting a Load Balancer
description: Learn how to delete load balancers on Civo using the Civo Dashboard or Civo CLI to manage billing and free up resources.
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <title>Deleting a Civo Load Balancer | Civo Documentation</title>
</head>

## Overview

Load balancers on Civo remain in your account until you delete them. Load balancers in your account are [billed hourly](../account/billing.md) based on the configured maximum concurrent requests and count towards your [account quota](../account/quota.md). If you no longer need a load balancer, you can delete it using the methods below.

:::danger

Load balancer deletion is immediate and irreversible. Ensure your applications no longer depend on the load balancer before deleting it.

:::

<Tabs groupId="delete-loadbalancer">
<TabItem value="dashboard" label="Dashboard">

## Deleting a Load Balancer from the Dashboard

1. Navigate to the [load balancers listing page](https://dashboard.civo.com/loadbalancers) in your Civo dashboard.
2. Find the load balancer you want to delete.
3. Click the **Actions** menu (three dots) next to the load balancer.
4. Select **Delete** from the dropdown menu.
5. Confirm the deletion when prompted.

The load balancer is deleted immediately upon confirmation.

</TabItem>

<TabItem value="cli" label="Civo CLI">

## Deleting a Load Balancer using the Civo CLI

Ensure your current region is set to the one where the load balancer is running. You can delete a load balancer using:

```bash
civo loadbalancer delete <loadbalancer_name_or_id>
```

Civo CLI confirms whether you want to proceed:

```bash
$ civo loadbalancer delete my-loadbalancer
Warning: Are you sure you want to delete the my-loadbalancer load balancer (y/N) ? y
The load balancer (my-loadbalancer) has been deleted
```

:::tip
For scripting use, you can add a `-y` flag to Civo CLI commands which usually require confirmation. This assumes you answer "yes" to any prompt.
:::

</TabItem>
</Tabs>

## What Happens When You Delete a Load Balancer

When you delete a load balancer:

- **Traffic routing stops immediately**: Any traffic directed to the load balancer's public IP address will no longer be routed to your backend instances.
- **Public IP is released**: The public IP address assigned to the load balancer is released and may be reassigned to other customers.
- **Billing stops**: Charges for the load balancer stop immediately upon deletion.
- **Backend instances are unaffected**: Your instances in the instance pool continue running; only the load balancer resource is removed.

## Kubernetes-Managed Load Balancers

If your load balancer was created automatically by a Kubernetes Service of type `LoadBalancer`, deleting it through the dashboard or CLI may cause Kubernetes to recreate it. To properly remove these load balancers:

1. Delete or modify the Kubernetes Service that created the load balancer.
2. The load balancer will be automatically removed by Kubernetes.

```bash
kubectl delete service <service-name>
```

:::warning
Manually deleting a Kubernetes-managed load balancer without removing the associated Service will result in the load balancer being recreated, potentially with a different IP address.
:::
