---
title: From a local VMDK file
description: Learn how to easily migrate your VMware instances to Civo by uploading a VMDK file. Follow our step-by-step guide to simplify your migration process!
---

<head>
  <title>Import Your VMware Instances from a local VMDK file | Civo Documentation</title>
</head>

## Import Your VMware Instances from a local VMDK file

### Overview

This guide provides detailed instructions for migrating VMware instances to Civo's cloud platform by uploading a local VMDK file. 

### Prerequisites
An exported VMDK from an importer VMware VM on your local machine
Civo account credentials
SSH client

:::warning
Always ensure to back up your VMs before initiating any part of this migration process.
:::

### Procedure

1. Verify VMware Instance
- Access VMware Console by Log into the VMware instance's console using the credentials provided.
- Check your services are accessible for local hosts and your adapter IP address.

2. Prepare for Migration
- Navigate to VMware Importer Tool
- [Login to Civo](https://dashboard.civo.com/login): Use the 'continue with Civo' option and enter your credentials.

4. Configure for Import Using VMDK
- Select Import Type: Choose the 'Upload Image' option to upload a local VMDK file.
- Upload VMDK File: Click on 'Upload File' and select the VMDK file from your local system. Ensure the file meets any size or format restrictions set by Civo.
- Region Selection: Select your desired region.

6. Fetch VM Information
- Initiate Data Fetch: Click 'Fetch Data' to retrieve your VM information.
- Select VM for Migration: From the list, tick the box next to the VM you wish to migrate. Adjust default settings for region, network, or firewall.

7. Initiate Migration<br>
Click 'import to Civo' to begin importing your instance to Civo's platform.

8. Find the Civo Instance on Dashboard or CLI<br>
The instance after import and its running status will be displayed the same way as a normal Civo instance.

9. Connect to Civo Instance<br>
SSH into Civo Instance: Use SSH to connect to the provided IP address for the Civo instance using your existing VM login credentials.

10. Verify your application on Civo<br>
Using your IP address verify your application works as expected. If all is in order, a progress bar will display the estimated migration time, updating in real-time.

:::Tip
If the application is not live, verify the application is listening to the correct IP address and adapter, and you are using the Civo public IP address to make your request. 
:::

### Conclusion
Following these steps will successfully migrate your VMware instance to Civo via a local VMDK file. For additional information or support, contact the support team.
