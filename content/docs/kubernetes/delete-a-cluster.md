---
title: Deleting a Kubernetes cluster
description: Learn how to delete Kubernetes clusters on Civo using the Civo Dashboard or Civo CLI to avoid dangerous billing errors and irreversible data loss.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <title>Deleting a Civo Kubernetes Cluster | Civo Documentation</title>
</head>

## Overview

Kubernetes clusters on Civo will remain in your account until you delete them. Clusters in your account are [billed hourly](../account/billing.md) for each node and count towards your [account quota](../account/quota.md). If you no longer need Kubernetes cluster, you can delete it in the following ways.

:::danger

Cluster deletion is immediate and irreversible. Make sure you have retrieved any data you may need from an instance before deleting it.

:::

<Tabs groupId="delete-cluster">

<TabItem value="dashboard" label="Dashboard">

## Deleting a cluster from the Dashboard

You can delete an instance from the instance's dashboard page by clicking the "Delete" button on the top right of the page, also shown below:

![Delete an instance from the dashboard](images/dashboard-delete-cluster.png)

As a precaution, the system will ask you to confirm the name of the cluster you are looking to delete.

When you confirm the cluster name, the system will proceed to delete the cluster immediately.
</TabItem>

<TabItem value="cli" label="Civo CLI">

## Deleting an cluster using Civo CLI

Ensuring your current region is set to the one where the cluster is running, you can delete it using:

```bash
civo kubernetes delete cluster_name
```

By default, Civo CLI will confirm whether you want to proceed:

```bash
$ civo instance delete demo-cluster
Warning: Are you sure you want to delete the api-demo.test Kubernetes cluster (y/N) ? y
The Kubernetes cluster (demo-cluster) has been deleted
```

:::tip
For scripting use, you can add a `-y` flag to Civo CLI commands which usually require confirmation. This will assume you will answer "yes" to any prompt.
:::

</TabItem>
</Tabs>
