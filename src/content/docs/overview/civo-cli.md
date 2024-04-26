---
sidebar:
  order: 3
title: Civo CLI
description: Learn how to use the Civo Command Line Interface (CLI) to manage your Civo resources. Find out how to access features and tools from the command line. 
lastUpdated: 2024-04-25
---

<head>
  <title>Using the Civo Command Line Interface (CLI) | Civo Documentation</title>
</head>

## Overview

The Civo CLI is a command-line interface that allows you to create, manage and delete resources such as Kubernetes clusters and instances through the Civo API programmatically through your terminal. The Civo [web dashboard](https://dashboard.civo.com) has a user-friendly interface for managing your account, and if you want to automate or run scripts on your account, or have multiple complex services, the command-line interface outlined here will be useful.

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

## Commands and help

The categories of commands available on Civo CLI are listed by running `civo`:

```bash
$ civo
civo is a CLI library for managing cloud resources such
as instances and Kubernetes clusters at Civo.com.

Usage:
  civo [flags]
  civo [command]

Available Commands:
  apikey       Manage API keys used to access your Civo account
  completion   Generates bash completion scripts
  database     Manage Civo Database
  diskimage    Details of Civo disk images
  domain       Details of Civo domains
  firewall     Details of Civo firewalls
  help         Help about any command
  instance     Details of Civo instances
  ip           Details of Civo reserved IPs
  kfcluster    Manage Civo Kubeflow Clusters
  kubernetes   Details of Civo Kubernetes clusters
  loadbalancer Details of Civo Load Balancer
  network      Details of Civo networks
  objectstore  Civo Object Store/Bucket management commands
  permissions  List available permissions
  quota        Show quota
  region       Details of Civo regions
  size         Details of Civo instance sizes
  sshkey       Details of Civo SSH keys
  teams        Manage teams in Civo
  update       Update the cli to the last version
  version      Version will output the current build information
  volume       Details of Civo volumes

Flags:
      --config string   config file (default is $HOME/.civo.json)
  -f, --fields string   output fields for custom format output (use -h to determine fields)
  -h, --help            help for civo
  -o, --output string   output format (json/human/custom) (default "human")
      --pretty          Print pretty the json output
      --region string   Choose the region to connect to, if you use this option it will use it over the default region
  -v, --version         Print the version of the CLI
  -y, --yes             Automatic yes to prompts; assume "yes" as answer to all prompts and run non-interactively

Use "civo [command] --help" for more information about a command.
```

You can also get help for a command by running `civo [command] --help`. This works for all command categories and subcommands, e.g.:

```bash
$ civo kubernetes create --help
Create a new Kubernetes cluster

Usage:
  civo kubernetes create [flags]

Aliases:
  create, new, add

Examples:
civo kubernetes create CLUSTER_NAME [flags]

Notes:
* The '--create-firewall' will open the ports 80,443 and 6443 in the firewall if '--firewall-rules' is not used.
* The '--create-firewall' and '--existing-firewall' flags are mutually exclusive. You can't use them together.
* The '--firewall-rules' flag need to be used with '--create-firewall'.
* The '--firewall-rules' flag can accept:
    * You can pass 'all' to open all ports.
    * An optional end port using 'start_port-end_port' format (e.g. 8000-8100)
    * An optional CIDR notation (e.g. 0.0.0.0/0)
    * When no CIDR notation is provided, the port will get 0.0.0.0/0 (open to public) as default CIDR notation
    * When a CIDR notation is provided without slash and number segment, it will default to /32
    * Within a rule, you can use comma separator for multiple ports to have same CIDR notation
    * To separate between rules, you can use semicolon symbol and wrap everything in double quotes (see below)
    So the following would all be valid:
    * "80,443,6443:0.0.0.0/0;8080:1.2.3.4" (open 80,443,6443 to public and 8080 just for 1.2.3.4/32)
    * "80,443,6443;6000-6500:4.4.4.4/24" (open 80,443,6443 to public and 6000 to 6500 just for 4.4.4.4/24)


Flags:
  -a, --applications string                 optional, use names shown by running 'civo kubernetes applications ls'
      --cluster-type string                 optional, possible options: k3s,talos. (default "k3s")
  -p, --cni-plugin string                   optional, possible options: flannel,cilium. (default "flannel")
  -c, --create-firewall                     optional, create a firewall for the cluster with all open ports
  -e, --existing-firewall string            optional, ID of existing firewall to use
  -u, --firewall-rules string               optional, can be used if the --create-firewall flag is set, semicolon-separated list of ports to open (default "default")
  -h, --help                                help for create
  -m, --merge                               merge the config with existing kubeconfig if it already exists.
  -t, --network string                      the name of the network to use in the creation (default "default")
  -n, --nodes int                           the number of nodes to create (the master also acts as a node). (default 3)
  -r, --remove-applications string          optional, remove default application names shown by running  'civo kubernetes applications ls'
      --save                                save the config
  -s, --size civo size list -s kubernetes   the size of nodes to create. You can list available kubernetes sizes by civo size list -s kubernetes (default "g4s.kube.medium")
      --switch                              switch context to newly-created cluster
  -v, --version string                      the k3s version to use on the cluster. Defaults to the latest. Example - 'civo k3s create --version 1.21.2+k3s1' (default "latest")
  -w, --wait                                a simple flag (e.g. --wait) that will cause the CLI to spin and wait for the cluster to be ACTIVE

Global Flags:
      --config string   config file (default is $HOME/.civo.json)
  -f, --fields string   output fields for custom format output (use -h to determine fields)
  -o, --output string   output format (json/human/custom) (default "human")
      --pretty          Print pretty the json output
      --region string   Choose the region to connect to, if you use this option it will use it over the default region
  -y, --yes             Automatic yes to prompts; assume "yes" as answer to all prompts and run non-interactively
```