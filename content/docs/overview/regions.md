---
title: Regions
description: Discover how to select regions to deploy Civo resources like Kubernetes clusters and VMs. Use the Civo Dashboard or CLI to manage regions effortlessly.
---

<head>
  <title>A Guide to Civo Regions | Civo Documentation</title>
</head>

Civo resources can be deployed in a number of regions around the world.

Resources such as Kubernetes clusters and virtual machine instances are region-specific. This means that running clusters are displayed only on the listings in the region where they are deployed.

## Selecting a region on the web dashboard

You can select a region from the region drop-down menu at the bottom of the left-hand sidebar in your account on any page of the Civo dashboard:

![Drop-down menu for selecting Civo regions](/images/regions2.png)

## Selecting a region on the command line

With [Civo CLI](../overview/tools-overview), you can see the list of available regions by running:

```bash
civo region list
```

You can then select a region from the list by running:

```bash
civo region use <REGION_CODE>
```

This will execute any further commands in the region of your choice.

:::tip
You can also pass a `--region <CODE>` parameter to any CLI command to execute it in the region specified by the code, without changing or setting your current region.
:::

## What products are available per region?
<table role="table" style="border-collapse: collapse; width: 100%; font-size: 14px;">  
  <thead>
    <tr style="background-color: #f3f3f3;">
      <th scope="col" style="padding: 6px 8px; border: 1px solid #ccc; text-align: left;">Products</th>
      <th scope="col" style="padding: 6px 8px; border: 1px solid #ccc; text-align: left;">LON1</th>
      <th scope="col" style="padding: 6px 8px; border: 1px solid #ccc; text-align: left;">FRA1</th>
      <th scope="col" style="padding: 6px 8px; border: 1px solid #ccc; text-align: left;">NYC1</th>
      <th scope="col" style="padding: 6px 8px; border: 1px solid #ccc; text-align: left;">PHX1</th>
      <th scope="col" style="padding: 6px 8px; border: 1px solid #ccc; text-align: left;">MUM1</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #ffffff;">
      <td scope="row" style="padding: 6px 8px; border: 1px solid #ccc;">CPU Kubernetes</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
    </tr>
    <tr style="background-color: #f7f7f7;">
      <td scope="row" style="padding: 6px 8px; border: 1px solid #ccc;">CPU Compute</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
    </tr>
    <tr style="background-color: #ffffff;">
      <td scope="row" style="padding: 6px 8px; border: 1px solid #ccc;">Object Stores</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🔴 Unavailable</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
    </tr>
    <tr style="background-color: #f7f7f7;">
      <td scope="row" style="padding: 6px 8px; border: 1px solid #ccc;">Volumes</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
    </tr>
    <tr style="background-color: #ffffff;">
      <td scope="row" style="padding: 6px 8px; border: 1px solid #ccc;">Machine Learning</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
    </tr>
    <tr style="background-color: #f7f7f7;">
      <td scope="row" style="padding: 6px 8px; border: 1px solid #ccc;">Databases</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
    </tr>
    <tr style="background-color: #ffffff;">
      <td scope="row" style="padding: 6px 8px; border: 1px solid #ccc;">GPU Kubernetes</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🔴 Unavailable</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🔴 Unavailable</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🔴 Unavailable</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🔴 Unavailable</td>
    </tr>
    <tr style="background-color: #f7f7f7;">
      <td scope="row" style="padding: 6px 8px; border: 1px solid #ccc;">CPU Kubernetes</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🟢 Available</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🔴 Unavailable</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🔴 Unavailable</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🔴 Unavailable</td>
      <td style="padding: 6px 8px; border: 1px solid #ccc;">🔴 Unavailable</td>
    </tr>
  </tbody>
</table>
