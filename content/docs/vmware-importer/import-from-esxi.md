---
title: Import from ESXi
description: Learn to migrate VMware instances to Civo's cloud platform using a virtual machine from ESXi. Step-by-step guide covers prerequisites to post-migration steps.
---

<head>
  <title>Import Your VMware Instances from ESXi | Civo Documentation</title>
</head>

## Import Your VMware Instance from ESXi

### Overview

This guide walks you through the steps to use our VMware Importer and migrate your VMware instances directly from ESXi to Civo's cloud platform, using a virtual machine. 

[Video Embed]

### Prerequisites

- **ESXi Version Compatibility**: You must be using ESXi Version 6 or above. 
- **Active VMware Instance**: Confirm that your VMware instance is operational.
- **Civo Account Credentials**: Have your Civo account credentials available for authentication purposes.
- **SSH Client Configuration**: Ensure your SSH client is set up to accept connections, facilitating secure access to remote servers.
- **ESXi Endpoint Configuration**: The ESXi endpoint must be exposed through the firewall to allow Civo connectivity and VM export.
- **Networking Requirements**: Dynamic Host Configuration Protocol (DHCP) must be enabled on all network adapters in the machine to ensure proper functionality.

:::warning
Warning! Always ensure to back up your VMs before initiating any part of this migration process.
:::

### Procedure

1. Verify VMware Instance
Access VMware Console: Log into the VMware instance's console using the credentials provided.
Check your services are accessible for local hosts and your adapter IP address. 
2. Prepare for Migration
Navigate to VMware Importer Tool
[Login to Civo](https://dashboard.civo.com/login) and use the 'continue with Civo' option and enter your credentials.
3. Configuration for Import
Select Import Type: Choose 'ESXI Import' and provide the ESXI Host and user details. Ensure secure password entry.
Region Selection: For demonstration, select your desired region.
4. Fetch VM Information
Initiate Data Fetch: Click 'Fetch Data' to retrieve your VM information.
Select VM for Migration: From the list, tick the box next to the VM you wish to migrate. Adjust default settings for region, network, or firewall.
5. Initiate Migration
Start Import: Click 'import to Civo' to begin importing your instance to Civo's platform.
6. Find the Civo Instance on Dashboard or CLI
The instance after import and its running status will be displayed the same way as a normal Civo instance.
7. Connect to Civo Instance
SSH into Civo Instance: Use SSH to connect to the provided IP address for the Civo instance using your existing VM login credentials.
8. Verify your application on Civo
Using your IP address verify your application works as expected. If all is in order, a progress bar will display the estimated migration time, updating in real-time.

:::Tip
If the application is not live, verify the application is listening to the correct IP address and adapter, and you are using the Civo public IP address to make your request. 
:::

### Conclusion
Following these steps will successfully migrate your VMware instance to Civo using our VMware importer. For additional information or support contact the support team.
