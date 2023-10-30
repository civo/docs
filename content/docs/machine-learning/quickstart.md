---
sidebar_position: 2
title: Get Started with Kubeflow
description: Learn how to get started with Civo's Kubeflow via an example.
---

<head>
  <title>Kubeflow quickstart | Civo Documentation</title>
</head>

In this quickstart mainly focused towards Pipelines and Notebooks, we take a look at a simple example to train and run a model using Kubeflow Pipelines and Notebooks.

## Before you start

Make sure you can log into your Kubeflow cluster by following the instructions at [Logging into your cluster](kubeflow-dashboard.md#logging-into-your-cluster).

Make sure you can create a notebook and log into the notebook by following the instructions at [Creating a Kubeflow Notebook](creating-a-new-kubeflow-notebook.md).

## Run a pipeline

We will first compile a pipeline DSL that will train a model using the MNIST dataset. Notice that this pipeline has two steps: `train` and `test` running sequentially. The `train` step trains a model and saves it to a file. The `test` step loads the model and evaluates it using the test dataset.

```python

```bash
git clone 
cd 
python mnist-example.py
```

This produces for us a `mnist-example.yaml` file that we will use to run our pipeline.

We now create a `mnist-model` volume that we will use to store our model. We will use this volume in our pipeline to store the model. To do so follow the instructions for using [Kubeflow Volumes](kubeflow-dashboard.md/#volumes). We now use [Pipelines](kubeflow-dashboard.md/) and use the pipeline configuration we generated in the previous step to define the pipeline. Once you do so, you should create a new [experiment]((kubeflow-dashboard.md/)) and then trigger a run for the pipline by going to the Run tab, clicking on the "create a run" button and choosing the pipeline you just created.

<!-- needs an image -->

This would trigger a Kubeflow pipeline run and we would see the pipeline run in the Pipelines dashboard. Once the pipeline run is complete, we can see the model saved in the `mnist-model` volume we created earlier.

<!-- needs and image -->