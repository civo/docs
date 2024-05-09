---
title: Installing Nvidia drivers on GPU instances running Ubuntu
lastUpdated: true
description: Learn how to customize the Nvidia drivers on Civo GPU instances running Ubuntu to meet your specific needs.
---

<head>
  <title>Nvidia driver installation on Civo GPU Ubuntu Instances | Civo Documentation</title>
</head>

To take advantage of the Nvidia GPU in Civo GPU instances, you may wish to install a specific version of Nvidia GPU drivers on an instance running Ubuntu. 

## Introduction

This document will detail the following:

Preparation:

- Upgrading the Ubuntu package list
- Removal of all existing Nvidia drivers preinstalled on Ubuntu

Driver installation:

- Installation of the Ubuntu common drivers
- Listing the devices
- Installing the drivers for the above devices
- Installing the Nvidia 535 driver

Testing the installation is successful:

- Rebooting the instance
- Running `nvidia-smi`

Installing CUDA:

- Updating the package list
- Installing the Nvidia CUDA Toolkit

## Preparation

To upgrade the Ubuntu package list, run the following command in an SSH connection to the instance to update the listing and install any upgrades:

```bash
sudo apt update && sudo apt upgrade -y
```

The output will list any upgraded packages.

Then, to remove any existing pre-installed Nvidia packages, run the following command:

```bash
sudo apt autoremove nvidia* --purge
```

The output will list all known Nvidia packages, and the operation taken on each.

## Driver installation

To ensure the Ubuntu common drivers are installed, run the following command in an SSH connection to the instance:

```bash
sudo apt install ubuntu-drivers-common -y
```

The output will list any newly installed packages and drivers, along with instructions on whether the instance needs to be rebooted.

To list devices and their drivers, run the command `ubuntu-drivers devices`:

```bash
civo@driver-demo-a16a-8cf238:~$ ubuntu-drivers devices
ERROR:root:aplay command not found
== /sys/devices/pci0000:00/0000:00:01.5/0000:06:00.0 ==
modalias : pci:v000010DEd000020F1sv000010DEsd0000145Fbc03sc02i00
vendor   : NVIDIA Corporation
model    : GA100 [A100 PCIe 40GB]
driver   : nvidia-driver-525-server - distro non-free
driver   : nvidia-driver-535-server-open - distro non-free
driver   : nvidia-driver-470 - distro non-free
driver   : nvidia-driver-525 - distro non-free
driver   : nvidia-driver-450-server - distro non-free
driver   : nvidia-driver-535 - distro non-free recommended
driver   : nvidia-driver-525-open - distro non-free
driver   : nvidia-driver-535-server - distro non-free
driver   : nvidia-driver-535-open - distro non-free
driver   : nvidia-driver-470-server - distro non-free
driver   : xserver-xorg-video-nouveau - distro free builtin
```

The `ERROR:root:aplay` line can be ignored, as virtual machines do not support sound output provided by `aplay`. Your output may list different versions and model architecture, depending on the GPU and OS version you have chosen for your instance.

Next, install the drivers, by running:

```bash
sudo ubuntu-drivers autoinstall
```

The output will be a long list of installation confirmations and system messages confirming that the kernel and drivers are installed and up to date.

To install the Nvidia 535 driver, run:

```bash
sudo apt install nvidia-driver-535
```

If there is a different version of the driver you wish to install, substitute its name in the above command.

## Testing the installation

First, reboot the machine:

```bash
$ sudo reboot now
Connection to [IP address] closed by remote host.
Connection to [IP address] closed.
```

Then, after the reboot completes (in about 30 seconds), connect back to the instance using SSH.

Once connected, run the `nvidia-smi` command.

```bash
$ nvidia-smi
Mon Dec 18 21:14:04 2023
+---------------------------------------------------------------------------------------+
| NVIDIA-SMI 535.129.03             Driver Version: 535.129.03   CUDA Version: 12.2     |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|                                         |                      |               MIG M. |
|=========================================+======================+======================|
|   0  NVIDIA A100-PCIE-40GB          Off | 00000000:06:00.0 Off |                    0 |
| N/A   39C    P0              38W / 250W |      4MiB / 40960MiB |      0%      Default |
|                                         |                      |             Disabled |
+-----------------------------------------+----------------------+----------------------+

+---------------------------------------------------------------------------------------+
| Processes:                                                                            |
|  GPU   GI   CI        PID   Type   Process name                            GPU Memory |
|        ID   ID                                                             Usage      |
|=======================================================================================|
|  No running processes found                                                           |
+---------------------------------------------------------------------------------------+
```

The version numbers should show the number corresponding to the version you installed in the earlier steps.

## Installing CUDA

:::note
If you just finished with the previous sections, you can skip the package update step and proceed straight to installing the CUDA toolkit.
:::

Update the Ubuntu package listings and installation:

```bash
sudo apt update && sudo apt upgrade -y
```

Install the CUDA toolkit:

```bash
sudo apt install nvidia-cuda-toolkit -y
```

Once the packages are downloaded and installed, you can test that the toolkit is the version you expect:

```bash
$ nvcc --version
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2021 NVIDIA Corporation
Built on Thu_Nov_18_09:45:30_PST_2021
Cuda compilation tools, release 11.5, V11.5.119
Build cuda_11.5.r11.5/compiler.30672275_0
```
