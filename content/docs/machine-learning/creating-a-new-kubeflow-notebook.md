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

:::tip Namespaces
Always check on the top left corner of the KubeFlow Dashboard that you are creating resources in the correct namespace.
:::

### Name

Choose a name for the notebook that makes sense for your organisation and workflow. Notebook names must be unique within a Kubeflow cluster.

### Development environment

For the notebook development environment, choose from the following options:

- **[Jupyter Lab](https://jupyter.org/)**, the renowned IPython Notebook environment. For most users, we recommend starting here.

- **[VisualStudio Code](https://code.visualstudio.com/)**, an IDE environment with support for Jupyter notebooks. Recommended for more advanced users looking at working wider than Jupyter notebooks, or people who use VScode regularly and are familiar with it.

- **[RStudio](https://posit.co/products/open-source/rstudio/)**, the first party development IDE and ecosystem for the R language. If you’re someone who prefers R over Python, this is the choice for you!

:::tip Custom environments
If you can’t find what you’re looking for or are the type of person who brings their own IDE, you’re also welcome to pull a custom container. Please ensure they meet the Kubeflow container image requirements [listed here](https://www.kubeflow.org/docs/components/notebooks/container-images/#image-requirements).
:::

### CPU / RAM

When creating a new notebook, you must specify the resources you want it to use in your cluster. The fields are:

- Minimum CPU: The scale-down utilisation of your notebook in CPU cores
- Maximum CPU: The scale up utilisation of your notebook in CPU cores, up to the core limit of your chosen Kubeflow cluster size (by default this is 120% of minimum CPU)
- Minimum Memory Gi: The minimum memory (in Gibibytes) your notebook can utilise
- Maximum Memory Gi: the maximum memory (in Gibibytes) your notebook can utilise, up to the RAM limit of your chosen Kubeflow cluster size (by default this is 120% of minimum memory)

### GPUs

:::warning
GPU support coming soon
Please leave all GPU-related fields on the notebook setup page blank to prevent issues with your notebook server being created. Kubeflow will also warn you if you try to add a GPU.
:::

The Civo machine learning Kubeflow service runs a standard Kubeflow installation on your cluster, displaying all Kubeflow notebook option fields.

GPUs are not yet available on Civo, meaning that though GPU options are displayed, any values entered into these fields will prevent the notebook from starting.

GPU support is under development and this documentation will be updated to reflect the available options.

### Workspace volume

You can specify a workspace volume (new or existing) to be mounted as a PVC Volume on your home directory.

:::tip Persistent data volumes
A StatefulSet assigns unique identifiers to each pod and allows you to easily store and track data in a persistent data volume. However, an important thing to remember is that this is a completely separate Kubernetes entity and has an independent lifecycle from the cluster's pods.

The persistent data volume is connected to a particular pod by a Persistent Volume Claim (PVC). These allow a user to consume abstract storage resources. In the case that you delete the notebook server, the data still persists in the persistent data volume assigned to that pod and if a new notebook server is created, it would be able to access the same data from the same persistent data volume.
:::

### Data volume

You can specify one or more data volumes (new or existing) to be mounted as PVC Volumes.

### Configurations

Configurations is a way to inject common data (environment variables, volumes) into notebooks. These can describe additional runtime requirements to be injected into the Pod at creation time.

### Affinity / Tolerations

You can also specify affinity and tolerations for the notebook server as described in the [Kubernetes documentation](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/).

### Shared Memory

Notebooks also allow you to enable shared memory. Common machine learning frameworks usually have methods that allow you to use shared memory, for example the [`torch.multiprocessing`](https://pytorch.org/docs/stable/multiprocessing.html#module-torch.multiprocessing) or [`torch.Tensor.share_memory_()`](https://pytorch.org/docs/stable/generated/torch.Tensor.share_memory_.html) APIs which heavily rely on the usage of shared memory.

## Creating your Notebook

When you are satisfied with your initial notebook configuration, you can click "Create" and be directed to its dashboard page. It will take some moments to become active, and you will be shown when it builds:

![Notebook is Created](images/nb-created.png)

While the notebook is being created:

- Kubeflow first creates a StatefulSet in which the pods for the Notebook Server will be created
- A pod is created for our Notebook Server, which is where the code runs
- A dedicated Persistent Volume Claim is attached to this pod which is where the home directory when using the notebook server resides
- The Notebook Server uses the image specified, and starts a container in the pod

## Accessing your Notebook Server

Once your notebook server instance is running, you will be able to connect to it using the Connect button.

## The Notebook ServiceAccount

When you create a new notebook Kubeflow by default assigns that Notebook pod the `default-editor` Kubernetes ServiceAccount. This is a highly privileged account and this also allows you to run `kubectl` inside the notebook server without providing additional authentication.
