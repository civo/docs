---
title: Civo CLI
description: Learn how to use the Civo Command Line Interface (CLI) to manage your Civo resources. Find out how to access features and tools from the command line. 
---

<head>
  <title>Using the Civo Command Line Interface (CLI) | Civo Documentation</title>
</head>

## Overview

The Civo CLI is a command-line interface that allows you to create, manage and delete resources such as Kubernetes clusters and instances through the Civo API programmatically through your terminal. The Civo [web dashboard](https://dashboard.civo.com) has a user-friendly interface for managing your account, but in case you want to automate or run scripts on your account, or have multiple complex services, the command-line interface outlined here will be useful.

Civo CLI is [open-source](https://github.com/civo/cli).

## Installation

The quickest way to get the latest release of Civo CLI is to run the installation script:

```bash
curl -sL https://civo.com/get | sh
```

### MacOS Homebrew

On a Mac, Civo CLI can be installed using the `brew` package manager:

```bash
brew tap civo/tools
brew install civo
```

You should then be able to run `civo` and receive the initial help message and continue to the *Setting up* section below.

### Windows

Civo CLI is available to download on Windows via Chocolatey and Scoop.

For installing via the [Chocolatey](https://chocolatey.org/install) package manager, run the following command:

```powershell
choco install civo-cli
```

For installing via Scoop, you will need to first add the extras bucket and then install the CLI itself:

```powershell
scoop bucket add extras
scoop install civo
```

You should then be able to run `civo` and receive the initial help message and continue to the *Setting up* section below.

### Linux

On Linux, Civo CLI can be installed by various methods.

If you use the `brew` package manager, you can use it as shown in the MacOS section above.

You can also install by downloading the specific release version (detailed on the [GitHub releases page](https://github.com/civo/cli/releases)) using `wget`:

**Note that the version in the example below may not be the latest. Specify the version based on the [latest available](https://github.com/civo/cli/releases) if you are using this method.**

```bash
wget https://github.com/civo/cli/releases/download/v1.0.40/civo-1.0.40-linux-amd64.tar.gz
tar -xvf civo-1.0.40-linux-amd64.tar.gz
chmod +x civo
mv ./civo /usr/local/bin/
```

Or you can build the CLI from the original source if you have [go installed](https://go.dev/doc/install):

```bash
git clone https://github.com/civo/cli.git
cd cli
make
cd ..
cp -r cli ./$HOME
export PATH="$HOME/cli:$PATH"
```

## Setting up

### Add an API key to Civo CLI

You will need to associate an [API key](../account/api-keys.md) from your account to Civo CLI in order to authenticate you to the Civo API. You can do this by running the command `civo apikey save`. The command will prompt you for a memorable name (in this case `docs-demo`) and to paste in the API key of your choice. This will not be displayed for security reasons.

```bash
$ civo apikey save
Enter a nice name for this account/API Key: docs-demo
Enter the API key:
Saved the API Key docs-demo
```

### Set your current region

Civo operates multiple regions. To avoid having to specify the region you want each time, you can set the current region to match the one you most commonly work in.

You can choose your region from the listing of the available regions:

```bash
civo region ls
```

You can then set the current region to that of your choice by specifying the *code* of the region in the command:

```bash
$ civo region use LON1
The default region was set to (London 1) LON1
```

You can now use the CLI to create and manage Civo resources. See resource-specific documentation for specific guidance.

To find the full list of available commands, run `civo help` or a specific subcommand without an operation, such as `civo kubernetes`. This will output command-specific options.

## Updating

Civo CLI is under active development. You can update the version of Civo CLI you are running with the `civo update` command:

```bash
$ civo update
[================================================] 100%
Updated to v1.0.40
```

