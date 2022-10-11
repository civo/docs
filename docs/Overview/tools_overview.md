---
sidebar_position: 2
---

# Civo tools

## Overview

Your account on Civo, and resources running within your account, can be managed with a variety of tools besides the web interface centered around your [Civo Dashboard](https://dashboard.civo.com). This section covers information on setting up the Civo command-line interface (CLI) and Terraform, an infrastructure-as-code tool.

## Civo CLI

The Civo CLI is a command-line interface that allows you to create, manage and delete resources such as Kubernetes clusters and instances through the Civo API programmatically through your terminal. Civo CLI is open-source.

See [this further documentation on the installation and set-up of the Civo CLI](civo_cli.md), or you can find the [Civo/CLI](https://www.github.com/civo/cli) repository on GitHub.

To quickly install the latest version of the CLI you can run:

```bash
curl -sL https://civo.com/get | sh
```

## Terraform

Civo has a Terraform provider, which can be found in the GitHub [Civo/terraform-provider-civo](https://github.com/civo/terraform-provider-civo) repository.

Refer to the Civo [Terraform documentation](./terraform.md) on getting set up.