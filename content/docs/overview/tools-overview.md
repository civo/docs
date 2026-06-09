---
sidebar_position: 2
title: Civo tools
description: Manage your Civo account and resources using multiple tools including Civo CLI and infrastructure-as-code tools like Terraform.
---

<head>
  <title>Civo Tools Overview | Civo Documentation</title>
</head>

## Overview

Your account on Civo, and resources running within your account, can be managed with a variety of tools besides the web interface centered around your [Civo Dashboard](https://dashboard.civo.com). This section covers information on setting up the Civo command-line interface (CLI) and Terraform, an infrastructure-as-code tool.

## Civo CLI

The Civo CLI is a command-line interface that allows you to create, manage and delete resources such as Kubernetes clusters and instances through the Civo API programmatically through your terminal. Civo CLI is open-source.

See [this further documentation on the installation and set-up of the Civo CLI](civo-cli.md), or you can find the [Civo/CLI](https://github.com/civo/cli) repository on GitHub.

To quickly install the latest version of the CLI you can run:

```bash
curl -sL https://civo.com/get | sh
```

## Terraform

Civo has a Terraform provider, which can be found in the GitHub [Civo/terraform-provider-civo](https://github.com/civo/terraform-provider-civo) repository.

Refer to the Civo [Terraform documentation](./terraform.md) on getting set up.

## Community tools

Beyond the official Civo CLI and Terraform provider, the community has built additional tools for managing Civo resources.

### CivoCloudManager (macOS)

[CivoCloudManager](https://civo-cloud-manager.app) is a native macOS application that runs the Civo Cloud control plane from the Mac menu bar and a full dashboard window. It talks to the [Civo REST API v2](https://www.civo.com/api) directly, connects to the Kubernetes API per cluster using PKCS#12 client certificates (no kubectl required), and ships a native S3-compatible browser for Civo Object Storage.

- Website: [civo-cloud-manager.app](https://civo-cloud-manager.app)
- Source: [github.com/marcelrgberger/civo-cloud-manager](https://github.com/marcelrgberger/civo-cloud-manager)
- Mac App Store: [apps.apple.com/app/civocloudmanager/id6760776010](https://apps.apple.com/us/app/civocloudmanager/id6760776010?mt=12)
- Free tier covers menu-bar firewall management; the full dashboard is a one-time $14.99 purchase.

Built and maintained independently of Civo Ltd.
