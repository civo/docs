---
sidebar_position: 11
title: Migrating data to a new instance
description: Learn how to effortlessly transfer your instance&#39;s contents to a new one on Civo. Launch a new instance, migrate your data using rsync, and secure the new instance for enhanced protection.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <title>How to migrate data from an existing instance | Civo Documentation</title>
</head>

Transfer the entire contents of an instance to a new one running either in the same region, or a new Civo region.

### Creating a new instance

To do this you will first need to login to your account on [Civo.com](https://dashboard.civo.com/instances) and navigate to the **Instances menu** to launch an instance.

For consistency, we recommend launching a new instance with the same operating system as the current instance to be migrated. If you are using Ubuntu, create the instance with `root` as the initial user, and have the system assign a password. If your old instance is running CentOS, use `centos` as your initial user, with an assigned password.

**Please note:** do **NOT** assign an SSH key to this new instance at creation. Your old server will not have your SSH Private Key to authenticate with your new instance during the sync process. Instead, have the platform assign a password to your new instance.

### Migrating your data

Once your new instance has launched, log in to your current (old) instance and `rsync` the data over to your new instance.

The command you will need to run is:

```bash
rsync --sparse -aAXv / --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/etc/network/*","/mnt/*","/media/*","lost+found","/boot/*","/usr/src/*","/lib/modules/*"} root@10.97.93.15:/
````

Things to note about this command:

* It will ask for a password. You can copy this on your instance page for the new instance, under **view SSH information**. Copy it from the site and paste it in when required.
* `/` is the location of the file system we want to copy, in this case the root filesystem.
* We are excluding all the files defined in `--exclude=` because they are system files that we do not want to copy.
* `10.97.93.15:/` is the IP of our newly created instance, followed by a colon, and then `/` being the destination location on the newly created instance where we want the files to be copied to.
* After the files are copied, you may see an error:
  `"rsync error: some files/attrs were not transferred (see previous errors) (code 23) at main.c(1183) [sender=3.1.1]"`.
  This is expected, as some files are not able to be copied — these will already exist on the new instance as they are system files.

### Securing the new instance

It is important to secure the new instance to prevent any attacks, as it was set up with a password. Follow [this guide](https://www.civo.com/docs/account/ssh-keys) for basic steps you can take to harden your server.
