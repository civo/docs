---
sidebar_position: 4
title: Recovery mode
description: Learn how to use recovery mode for debugging your instances become inaccessible
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <title>How to use recovery mode | Civo Documentation</title>
</head> 

In some cases, you may damage your instance OS or do anything that makes it unreachable. You can put the instance in recovery mode, which enables you to access the instance using a special OS for emergencies. From which you can inspect the instance disk and modify it how you desire then bring it back into normal operations. When an instance is in recovery mode it can be accessed through a visual console only.
More info can be found on console access in this [link](https://www.civo.com/api/console-access)

Instances in recovery mode will use systemrescue. More details about it can be found [here](https://www.system-rescue.org/)

### Putting an instance into recovery mode through the CLI

By running the following command:

```sh
civo instance recovery enable INSTANCE_ID/HOSTNAME
```

:::note
After putting an instance into recovery mode it MUST be rebooted for changed to take effect.
Instances can be rebooted by running `civo instance reboot INSTANCE_ID/HOSTNAME`
:::

You can then query the status of recovery mode on the instance through this command:

```sh
civo instance recovery-status INSTANCE_ID/HOSTNAME
```

You can then access the instance by running

```sh
civo instance vnc INSTANCE_ID/HOSTNAME --duration 2h
```

After finishing what you need to do, you can put the instance out of recovery mode by running then reboot the instance again:

```sh
civo instance recovery disable INSTANCE_ID/HOSTNAME
civo instance reboot INSTANCE_ID/HOSTNAME
```
