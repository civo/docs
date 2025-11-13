---
sidebar_position: 4
title: Instance volumes
description: Learn how to manage and attach volumes to your Civo Compute instances using Civo Dashboard, Civo CLI, or Terraform to expand your storage capacity.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <title>How to Manage Volumes for Your Civo Instances | Civo Documentation</title>
</head> 

Volumes are flexible-size additional storage for instances. By creating a volume and associating it with an instance, an additional virtual disk will be made available for backups or database files that can then moved to another instance, or used as extra storage space.

Volumes take disk space on your account's quota, and can only be created up to this quota limit. For more information, see [Quota](../account/quota).

:::note
Volumes are region and network-specific. If you create a volume in one [private network](../networking/private-networks.md), it can only be mounted and used by instances in that network.
:::

<Tabs groupId="create-volumes">
<TabItem value="dashboard" label="Dashboard">

## Creating a volume on the dashboard

Navigate to the [Volumes section](https://dashboard.civo.com/volumes) of your account dashboard.

![Dashboard page showing volume creation options](images/volume-page.png)

Then, click on "Create a volume":

![Volume creation options](images/volume-creation-options.png)

You will be able to give your volume a name, select a [network](../networking/) if you have created any in the region, and see the pricing for your chosen size.

Click "Create". The volume will be created in your account.

You can then proceed to attach the volume to a running instance.

</TabItem>

<TabItem value="cli" label="Civo CLI">

## Creating a volume on the command line

You can create a new volume by calling `civo volume create NAME --size NUMBER_GIGABYTES`:

By default, the volume is created in the `default` network in your currently-selected region. You can use the switch `--network NETWORK_ID` to specify a [private network](../networking/private-networks.md) in which to create the volume.

You can see all available options for volume creation on the CLI by running `civo volume create --help`.

## Attaching a volume to an instance on the command line

Mounting (Attaching) a volume onto an instance will allow that instance to use the volume as a drive. The command syntax is `civo volume attach VOLUME_NAME INSTANCE_NAME`:

If this is a newly-created volume, you would need to partition, format and mount the volume. For more information, see "Preparing and using your volumes in instances" below.

:::note
You can only attach a volume to one instance at a time.
:::

</TabItem>

<TabItem value="terraform" label="Terraform">

## Creating a volume using Terraform

### Step 1 - Add region to provider

Since the `region` field is optional in most of Civo Terraform provider's resources and data sources (if no region is provided in the configuration or `provider.tf` file, the system will choose one for you), it's a good idea to just declare it once at the provider level.

The benefits of declaring `region` at provider level are:

* We don't have to repeat it all over the place in our configuration file(s)
* Terraform will ensure all API calls for data sources and resources communicate with a consistent region

To do so, simply update your `provider.tf` to include the `region` field.

### Step 2 - Prepare configuration file

Create a file named `main.tf` and add your Terraform configuration. The configuration should include:

* The _Query small instance size_, _Query instance disk image_ and _Create a new instance_ blocks were taken from [Launch a Civo compute instance using Terraform](../compute/create-an-instance#creating-an-instance-using-terraform) guide. Be sure to checkout that guide for the explanation.
* In the _Query default network_ block:
    * We are querying for Default network in our Civo account using [`civo_network`](https://registry.terraform.io/providers/civo/civo/latest/docs/data-sources/network) data source, by looking at
        * `label` attribute for `default` network name
    * We then can refer to this data source as `data.civo_network.default`. For example, to refer to this data source network ID, we can use `data.civo_network.default.id` syntax.
* In the  _Create volume_ block:
    * We are creating a new volume using [`civo_volume`](https://registry.terraform.io/providers/civo/civo/latest/docs/resources/volume) resource, and
        * Set its name to `backup-data`
        * Set its size to `5` GB
        * Set its network to default network we queried earlier by using `data.civo_network.default.id` syntax
    * We then can refer to this volume as `civo_volume.db-backup`. For example, to refer to this volume ID, we can use `civo_volume.db-backup.id` syntax.
* In the _Create volume attachment_ block:
    * We are creating a new volume attachment using [`civo_volume_attachment`](https://registry.terraform.io/providers/civo/civo/latest/docs/resources/volume_attachment) resource, and
        * Set its `instance_id` attribute to the `foo.com` compute instance by using `civo_instance.foo.id` syntax
        * Set its `volume_id` attribute to the `backup-data` volume by using `civo_volume.db-backup.id` syntax
    * We then can refer to this volume attachment as `civo_volume_attachment.db-backup-attachment` (if we need to). For example, to refer to this volume ID, we can use `civo_volume_attachment.db-backup-attachment.id` syntax.

Checkout [`civo_volume`](https://registry.terraform.io/providers/civo/civo/latest/docs/resources/volume) docs and [`civo_volume_attachment`](https://registry.terraform.io/providers/civo/civo/latest/docs/resources/volume_attachment) docs for more information about the resources usage.

### Step 3 - Plan

Now, you can run `terraform plan` command to see what's going to be created.

As you can see from plan output above, Terraform will create the following resources in `LON1` region for us:

* A compute instance (`foo.com`) with `g3.small` size
* A volume (`backup-data`) with 5GB size in default network
* A volume attachment linking our `foo.com` compute instance and `backup-data` volume

### Step 4 - Apply

It's now time to create the actual compute instance, volume and volume attachment. Let's run `terraform apply` command. When it asks for confirmation, type `yes` and hit Enter key.

Now, if you refresh Civo web UI, you will see there's new compute instance created for you:

![](images/instance-index.png)

And, a new volume, attached to your compute instance:

![](images/volumes-index.png)
![](images/volumes-linked.png)
You can see the volume got created and got attached to the the instance as well.

If you notice, there will be a new file named `terraform.tfstate` get created for you in your local project directory. And, if you print its content, it will look like:

That's the [Terraform state file](https://developer.hashicorp.com/terraform/language/state) that was created after you create the compute instance, volume and volume attachment just now.

When you update your `main.tf` file and run `terraform apply` again, Terraform will refresh the state file, try to understand what you want to update and update your compute instance/volume/volume attachment.

If there's no change in your `main.tf` file and you rerun `terraform apply`, it will output `No changes. Your infrastructure matches the configuration.` message back to you.
</TabItem>
</Tabs>

## Preparing and using volumes in your instances

In order to format and mount a newly-created volume, or an existing one you have detached from another instance, see [this guide](https://www.civo.com/learn/configuring-block-storage-on-civo).

## Volumes larger than 1TB

In order to create, manage, and work with volumes larger than 1TB, see [this guide to logical volume management](https://www.civo.com/learn/breaking-the-1tb-barrier-creating-a-large-volume-in-civo).