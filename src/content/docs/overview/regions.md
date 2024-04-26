---
title: Regions
description: Discover how to select regions to deploy Civo resources like Kubernetes clusters and VMs. Use the Civo Dashboard or CLI to manage regions effortlessly.
lastUpdated: 2024-04-25
---

<head>
  <title>A Guide to Civo Regions | Civo Documentation</title>
</head>

Civo resources can be deployed in a number of regions around the world.

Resources such as Kubernetes clusters and virtual machine instances are region-specific. This means that running clusters are displayed only on the listings in the region where they are deployed.

## Selecting a region on the web dashboard

You can select a region from the region drop-down menu at the bottom of the left-hand sidebar in your account on any page of the Civo dashboard:

![Drop-down menu for selecting Civo regions](../../../assets/compute/region-select.png)

## Selecting a region on the command line

With [Civo CLI](/overview/tools-overview), you can see the list of available regions by running:

```bash
civo region list
```

You can then select a region from the list by running:

```bash
civo region use <REGION_CODE>
```

This will execute any further commands in the region of your choice.

:::tip
You can also pass a `--region <CODE>` parameter to any CLI command to execute it in the region specified by the code, without changing your current region.
:::

## What products are available per region?

| Products         | LON1 | FRA1 | NYC1 | PHX1 |
|:-----------------|:----:|:----:|:----:|:----:|
| CPU Kubernetes   |  ✓   |  ✓   |  ✓   |  ✓   |
| CPU Compute      |  ✓   |  ✓   |  ✓   |  ✓   |
| Object Stores    |  ✓   |  ✓   |  ✓   |  ✓   |
| Volumes          |  ✓   |  ✓   |  ✓   |  ✓   |
| Machine Learning |  ✓   |  ✓   |  ✓   |  ✓   |
| Databases        |  ✓   |  ✓   |  ✓   |  ✓   |
| GPU Kubernetes   |  ✓   |  ✗   |  ✗   |  ✗   |
| GPU Compute      |  ✓   |  ✗   |  ✗   |  ✗   |

## External Regions

### Deep Green - Exmouth Region

All users are now given the option to select the Deep Green region (DG-EXM) from our range of regions; from here, you’ll be able to run your cloud workloads on Deep Green’s Exmouth (UK) data center.

As Deep Green continues to expand, you’ll be able to run your workloads at a range of Deep Green data center sites, with waste heat from your compute workloads used to generate hot water communities across the UK.

Overall, this partnership means that users choosing the Deep Green region will be running their instances using 100% renewable energy.

| Products available on DG-EXM|     |
|:----------------------------|:---:|
| GPU Compute                 |  ✓  |
| Volumes                     |  ✓  |

For more information on our Partnership with Deep Green, please visit our [Deep Green article](https://www.civo.com/blog/greener-cloud-computing-deep-green). 