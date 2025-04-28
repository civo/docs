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

In the event of a failure of an instance's operating system, an alternative method of accessing the data on the instance is required. To do this, you can take advantage of recovery mode. Recovery mode provides access to an instance using a special OS for emergencies, which allows users to inspect the boot volume of the instance, and make any modifications to bring it back into normal operations. When an instance is in recovery mode it can only be accessed [through the console](https://www.civo.com/api/console-access).

Instances in recovery mode will use systemrescue. More details about it can be found [here](https://www.system-rescue.org/)

### Putting an instance into recovery mode through the CLI

Enable recovery mode on an instance by running the Civo CLI command:

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

You can then access the instance by running:

```sh
civo instance vnc INSTANCE_ID/HOSTNAME --duration 2h
```

After finishing what you need to do in the recovery mode console, you can disable recovery mode by running the following commands, which turn off recovery mode and reboot the instance to make it accessible as normal:

```sh
civo instance recovery disable INSTANCE_ID/HOSTNAME
civo instance reboot INSTANCE_ID/HOSTNAME
```
