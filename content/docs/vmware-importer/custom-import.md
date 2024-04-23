---
title: Custom Import
description: Streamline your VMware to Civo migration by importing a VMDK file via a direct HTTP URL. Follow our easy guide to get started quickly and efficiently!
---

<head>
  <title>Import Your VMware Instances from a HTTPs URL | Civo Documentation</title>
</head>

## Import Your VMware Instances from a HTTPs URL

### Overview

This guide outlines the process of migrating VMware instances to Civo's cloud platform by importing a VMDK file directly from a HTTPS URL. The procedure is demonstrated using a virtual machine running NGINX.

### Prerequisites
  
- S3 bucket url or Web Server hosting the VMDK file to import, which is accessible to Civo
- Civo account credentials
- SSH client
- HTTPS URL of the VMDK file

:::warning
Always ensure to back up your VMs before initiating any part of this migration process.
:::

### Procedure

1. Verify VMware Instance
- Access VMware Console. Log into your VMware instance’s console using the provided credentials.
- Check your services are accessible for local hosts and your adapter IP address. 

2. Prepare for Migration
- Navigate to VMware Importer Tool
- Login to Civo: Use the 'continue with Civo' option and enter your credentials.
  
3. Configure for Import Using HTTPS URL
- Select Import Type: Choose the 'Custom Import' option.
- Provide HTTPS URL: Enter the HTTPS URL where the VMDK file is hosted. Ensure the URL is accessible and the file permissions allow for downloading.
  
4. Fetch VM Information
- Initiate Data Fetch: Click 'Fetch Data' to retrieve your VM information.
- Select VM for Migration: From the list, tick the box next to the VM you wish to migrate. Adjust default settings for region, network, or firewall.
  
5. Initiate Migration<br>
Click 'import to Civo' to begin importing your instance to Civo's platform.
  
6. Find the Civo Instance on Dashboard or CLI<br>
The instance after import and its running status will be displayed the same way as a normal Civo instance.

7. Connect to Civo Instance<br>
SSH into Civo Instance: Use SSH to connect to the provided IP address for the Civo instance using your existing VM login credentials.
  
8. Verify your application on Civo<br>
Using your IP address verify your application works as expected. If all is in order, a progress bar will display the estimated migration time, updating in real-time.

:::Tip
If the application is not live, verify the application is listening to the correct IP address and adapter, and you are using the Civo public IP address to make your request. 
:::
  
### Conclusion
This method of using an HTTPS URL for VMDK import simplifies the migration process by eliminating the need for local file handling, making it efficient and scalable. For additional information or support contact the support team.
