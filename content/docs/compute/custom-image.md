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

- Use specialized operating systems not provided by Civo
- Create instances with pre-configured applications and settings

:::note
This feature is currently only available for selected private regions. Please contact Civo support if you need this feature in a different region.
:::

## Creating a custom disk image

<Tabs groupId="create-diskimage">
<TabItem value="cli" label="Civo CLI">

You can create a new custom disk image by using the `civo diskimage create` command:

```console
$ civo diskimage create --name ubuntuimage \
                       --distribution ubuntu \
                       --version 22.04 \
                       --path ./disk.raw \
                       --os linux \
                       -- logo_path ./logo.svg
Uploading disk image... 100% |█████████████████████████████████| (19/19 B, 14 B/s)
+--------------------------------------+------------------------------+--------+
| id                                   | name                         | status |
+--------------------------------------+------------------------------+--------+
| a3721853-f976-49fd-83e4-1b7f48ecdb58 | cust-ubuntuimage-148ee-wrodm |        |
+--------------------------------------+------------------------------+--------+
```

:::note
The name is modified and prefixed with `cust-` once created to distinguish custom images from system images provided by Civo .
:::
By default, the image is created in your currently-selected region.

You can see all available options for disk image creation on the CLI by running `civo diskimage create --help`.

</TabItem>
</Tabs>

### Available parameters for creation

| Parameter                 | Description                                                          |
| ------------------------- | -------------------------------------------------------------------- |
| `--name`                  | Name of the disk image (required)                                    |
| `--distribution`          | OS distribution (e.g., "ubuntu", "centos") (required)                |
| `--version`               | Version of the operating system (required)                           |
| `--path`                  | Path to the disk image file (.raw or .qcow2 , max 600 GB) (required) |
| `--os` (optional)         | Operating system type (defaults to "linux", can be "windows")        |
| `--logo_path` (optional ) | Path to your logo file (SVG format, max 5 MB)                        |

## Checking disk image status

<Tabs groupId="check-diskimage">
<TabItem value="cli" label="Civo CLI">

After uploading an image, it goes through several processing stages. You can check the status of your disk image with:

```console
$ civo diskimage show cust-ubuntuimage-148ee-wrodm
                ID : a3721853-f976-49fd-83e4-1b7f48ecdb58
              Name : cust-ubuntuimage-148ee-wrodm
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
+--------------------------------------+--------------------------------+----------+-----------+--------------+
| ID                                   | Name                           | Version  | State     | Distribution |
+--------------------------------------+--------------------------------+----------+-----------+--------------+
| a3721853-f976-49fd-83e4-1b7f48ecdb58 | cust-ubuntuimage-148ee-wrodm   |    22.04 | available | ubuntu       |
+--------------------------------------+--------------------------------+----------+-----------+--------------+
```

The `--local` flag filters the list to show only your custom uploaded disk images, excluding system images.

</TabItem>
</Tabs>

## Deleting custom disk images

<Tabs groupId="delete-diskimage">
<TabItem value="cli" label="Civo CLI">

To delete a custom disk image:

```console
$  civo diskimage delete cust-ubuntuimage-148ee-wrodm
+------------------------------+---------+
| Disk image                   | Result  |
+------------------------------+---------+
| cust-ubuntuimage-148ee-wrodm | deleted |
+------------------------------+---------+
```

</TabItem>
</Tabs>

## Creating instances using custom disk images

<Tabs groupId="use-diskimage">
<TabItem value="cli" label="Civo CLI">

Once your custom disk image is in the **available** state, you can use it to create new instances:

```console
$ civo instance create --hostname custom-instance \
                     --size g3.small \
                     --diskimage cust-ubuntuimage-148ee-wrodm
Created instance custom-instance with ID 58a9b7f2-5d12-46ab-9e97-b3d24c32cc2a
```

</TabItem>
</Tabs>

## Troubleshooting

### Upload expired or error state

If your upload window expired, or the image is in an error state:

```console
$ civo diskimage show cust-ubuntuimage-148ee-wrodm
                ID : 8a76ec9c-ef94-4d21-90a5-b48fc6d4fee2
              Name : cust-ubuntuimage-148ee-wrodm
      Distribution : ubuntu
           Version : 22.04
                OS : linux
             State : upload_expired
         Image URL : https://objectstore.staging.civo.com/disk-images/my-ubuntu-image/disk.raw?X-Amz-Algorithm=AWS4-HMAC-SHA256&SignedHeaders=host&x-id=PutObject&X-Amz-Signature=8a7d32f...
          Logo URL : https://objectstore.staging.civo.com/disk-images/my-ubuntu-image/logo.svg
       Image Size : 2.5 GB
        Created At : 2023-04-07T15:22:18Z
        Created By : 90a5-b48fc6d4fee2-8a76ec9
```

This typically happens when:

- Your internet connection was unstable during upload
- The file is too large to upload within the 15-minute window

Please try uploading again after deleting the previous attempt. You may also want to use a smaller image or switch to a more stable internet connection
