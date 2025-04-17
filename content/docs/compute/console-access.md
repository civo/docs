---
sidebar_position: 7
title: Console access
description: Learn how to access the console of a Civo Compute instance using the Civo CLI to recover from issues.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <title>How to Enable Console Access on Civo Compute Instances | Civo Documentation</title>
</head>

In case you need to access an instance directly for any reason, such as SSH access not working, you can activate an instance's console access to enable you to get back to normal operation.

:::danger note
Your instance must be configured to permit access through username and password to successfully be able to access it using the console. Console access to instances is intended as an emergency tool only, and does not allow for copy/paste or other conveniences.
:::

Console access can currently be enabled using the [Civo API](https://www.civo.com/api/console-access) or CLI only.

<Tabs groupId="activate-console">

<TabItem value="cli" label="Civo CLI">

## Activating console access on the command line

If your Civo CLI is configured to act in the region where your instance is running, you can initiate a console access session by running `civo instance vnc INSTANCE_NAME` without having to provide a `--region` flag:

```console
$ civo instance vnc vnc-demo
Info: VNC has been successfully enabled for instance: vnc-demo
Info: VNC URL: https://vnc.lon1.civo.com/c603a1f0-cfb5-47ed-80c8-d77fe4dba385/vnc.html?path=c603a1f0-cfb5-47ed-80c8-d77fe4dba385/websockify
Info: We're preparing the VNC Console Access. This may take a while...
Info: New attempt to reach the VNC Console URI...
Info: Opening VNC in your default browser...
Info: VNC session is now active. You can access your instance's graphical interface.
```

This will open up your default web browser to the console access URL and allow you to log in using a username and password.

:::note
Only one session can be active for a particular instance at a time: subsequent requests to initiate a console while a session has already been initialized will respond idempotently, returning a link to the currently active session.
:::

You can see all available options for managing console access on the CLI by running `civo instance vnc --help`.

</TabItem>
</Tabs>
