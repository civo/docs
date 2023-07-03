---
sidebar_position: 4
title: Creating a new Kubeflow notebook
description: Creating a new notebook in Civo's machine learning Kubeflow service
---

<head>
  <title>Creating a new Kubeflow notebook | Civo Documentation</title>
</head>

To create a new Kubeflow notebook, you will need to provide a name, select a development environment, and make a few architectural decisions. All of these are explained below.

## Notebook options

### Name

Choose a name for the notebook that makes sense for your organisation and workflow. Notebook names must be unique within a Kubeflow cluster.

### Development environment

For the notebook development environment, choose from the following options:

- **Jupyter Lab**, the renowned IPython Notebook environment. For most users, we recommend starting here.

- **VisualStudio Code**, an IDE environment with support for Jupyter notebooks. Recommended for more advanced users looking at working wider than Jupyter notebooks, or people who use VScode regularly and are familiar with it.

- **RStudio**, the first party development IDE and ecosystem for the R language. If you’re someone who prefers R over Python, this is the choice for you!

:::tipCustom environments
If you can’t find what you’re looking for or are the type of person who brings their own IDE, you’re also welcome to pull a custom container. Please ensure they meet the Kubeflow container image requirements [listed here](https://www.kubeflow.org/docs/components/notebooks/container-images/#image-requirements).
:::

### CPU / RAM

When creating a new notebook, you must specify the resources you want it to use in your cluster. The fields are:

- Minimum CPU: The scale-down utilisation of your notebook in CPU cores
- Maximum CPU: The scale up utilisation of your notebook in CPU cores, up to the core limit of your chosen Kubeflow cluster size
- Minimum Memory Gi: The minimum memory (in Gibibytes) your notebook can utilise
- Maximum Memory Gi: the maximum memory (in Gibibytes) your notebook can utilise, up to the RAM limit of your chosen Kubeflow cluster size

### GPUs

:::warningGPU support coming soon
Please leave all GPU-related fields on the notebook setup page blank to prevent issues with your notebooks starting.
:::

The Civo machine learning Kubeflow service runs a standard Kubeflow installation on your cluster, displaying all Kubeflow notebook option fields.

GPUs are not yet available on Civo, meaning that though GPU options are displayed, any values entered into these fields will prevent the notebook from starting.

GPU support is under development and this documentation will be updated to reflect the available options.

### Workspace volume

### Data volume

