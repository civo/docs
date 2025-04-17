---
sidebar_position: 5
title: Use Custom Disk Images
description: Learn how to upload and manage your own custom disk images for Civo instances using the Civo CLI.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <title>Use Custom Disk Images | Civo Documentation</title>
</head>

# Use Custom Disk Images

Custom disk images allow you to use your own operating system images when creating Civo instances. This feature is useful when you need to:

- Use specialized operating systems not available in the default Civo marketplace
- Create instances with pre-configured applications and settings

:::note
This feature is currently only available for selected private regions. Please contact Civo support if you need this feature in a different region.
:::

## Creating a custom disk image

<Tabs groupId="create-diskimage">
<TabItem value="cli" label="Civo CLI">

You can create a new custom disk image by using the `civo diskimage create` command:

```console
$ civo diskimage create --name my-ubuntu-image \
                       --distribution ubuntu \
                       --version 22.04 \
                       --path ./disk.raw \
                       --os linux
Created a disk image called cust-my-ubuntu-image with ID 8a76ec9c-ef94-4d21-90a5-b48fc6d4fee2
The upload URL is valid for 15 minutes. Uploading disk image...
Upload complete. The disk image is now being processed.
```

:::note
The name is prefixed with `cust-` to distinguish custom images from system images provided by Civo .
:::
By default, the image is created in your currently-selected region.

You can see all available options for disk image creation on the CLI by running `civo diskimage create --help`.

</TabItem>
</Tabs>

### Available parameters for creation

| Parameter                 | Description                                                   |
| ------------------------- | ------------------------------------------------------------- |
| `--name`                  | Name of the disk image (required)                             |
| `--distribution`          | OS distribution (e.g., "ubuntu", "centos") (required)         |
| `--version`               | Version of the operating system (required)                    |
| `--path`                  | Path to the disk image file (.raw or .qcow2) (required)       |
| `--os` (optional)         | Operating system type (defaults to "linux", can be "windows") |
| `--logo_path` (optional ) | Path to your logo file (SVG format)                           |

## Checking disk image status

<Tabs groupId="check-diskimage">
<TabItem value="cli" label="Civo CLI">

After uploading an image, it goes through several processing stages. You can check the status of your disk image with:

```console
$ civo diskimage show cust-my-ubuntu-image
                ID : 8a76ec9c-ef94-4d21-90a5-b48fc6d4fee2
              Name : cust-my-ubuntu-image
      Distribution : ubuntu
           Version : 22.04
                OS : linux
             State : available
         Image URL : https://objectstore.staging.civo.com/disk-images/my-ubuntu-image/disk.raw?X-Amz-Algorithm=AWS4-HMAC-SHA256&SignedHeaders=host&x-id=PutObject&X-Amz-Signature=8a7d32f...
          Logo URL : https://objectstore.staging.civo.com/disk-images/my-ubuntu-image/logo.svg
       Image Size : 2.5 GB
```

</TabItem>
</Tabs>

### Understanding disk image states

The disk image states include:

- `upload_pending`: Initial state after creation, awaiting upload
- `upload_completed`: Upload finished, MD5 checksum verified
- `pending`: Image is being processed for distribution
- `available`: Image is ready to use for creating instances
- `upload_expired`: Upload not completed within 15 minutes
- `error`: Issue with upload or processing

:::note
Only images in the **available** state can be used to create instances.
:::

## Listing custom disk images

<Tabs groupId="list-diskimage">
<TabItem value="cli" label="Civo CLI">

To see all your custom disk images:

```console
$ civo diskimage list --local
+--------------------------------------+----------------------+--------------+---------+-----------+
| ID                                   | Name                 | Distribution | Version | Status    |
+--------------------------------------+----------------------+--------------+---------+-----------+
| 8a76ec9c-ef94-4d21-90a5-b48fc6d4fee2 | cust-my-ubuntu-image | ubuntu       | 22.04   | available |
+--------------------------------------+----------------------+--------------+---------+-----------+
```

The `--local` flag filters the list to show only your custom uploaded disk images, excluding system images.

</TabItem>
</Tabs>

## Deleting custom disk images

<Tabs groupId="delete-diskimage">
<TabItem value="cli" label="Civo CLI">

To delete a custom disk image:

```console
$ civo diskimage delete cust-my-ubuntu-image
The disk image (cust-my-ubuntu-image) has been deleted
```

:::note
You cannot delete a custom disk image that is currently in use by any instances.
:::

</TabItem>
</Tabs>

## Creating instances using custom disk images

<Tabs groupId="use-diskimage">
<TabItem value="cli" label="Civo CLI">

Once your custom disk image is in the **available** state, you can use it to create new instances:

```console
$ civo instance create --hostname custom-instance \
                     --size g3.small \
                     --diskimage cust-my-ubuntu-image
Created instance custom-instance with ID 58a9b7f2-5d12-46ab-9e97-b3d24c32cc2a
```

</TabItem>
</Tabs>

## Troubleshooting

### Upload expired or error state

If your upload expired or error state:

```console
$ civo diskimage show cust-my-ubuntu-image
                ID : 8a76ec9c-ef94-4d21-90a5-b48fc6d4fee2
              Name : cust-my-ubuntu-image
      Distribution : ubuntu
           Version : 22.04
                OS : linux
             State : upload_expired
         Image URL : https://objectstore.staging.civo.com/disk-images/my-ubuntu-image/disk.raw?X-Amz-Algorithm=AWS4-HMAC-SHA256&SignedHeaders=host&x-id=PutObject&X-Amz-Signature=8a7d32f...
          Logo URL : https://objectstore.staging.civo.com/disk-images/my-ubuntu-image/logo.svg
       Image Size : 2.5 GB
        Created At : 2023-04-07T15:22:18Z
```

This typically happens when:

- Your internet connection was unstable during upload
- The file is too large to upload within the 15-minute window

Please try uploading again after deleting the previous attempt. You may also want to use a smaller image or switch to a more stable internet connection
