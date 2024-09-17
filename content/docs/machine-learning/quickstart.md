---
sidebar_position: 2
title: Get Started with Kubeflow
description: Learn how to get started with Civo's Kubeflow via an example.
---

<head>
  <title>Kubeflow quickstart | Civo Documentation</title>
</head>

In this quickstart, focused mainly on Pipelines and Notebooks, we take a look at an example to train and run a machine learning model using Kubeflow.

## Before you start

Make sure you can log into your Kubeflow cluster by following the instructions at [Logging into your cluster](kubeflow-dashboard.md#logging-into-your-cluster).

Make sure you can create a notebook and log into the notebook by following the instructions at [Creating a Kubeflow Notebook](creating-a-new-kubeflow-notebook.md).

## Run a pipeline

We will first compile a pipeline DSL that will train a model using the [MNIST dataset](https://ieeexplore.ieee.org/document/726791). Notice that this pipeline mainly has the following coponents which are run: hyperparameter tuning with Katib, creating a new volume for training, run a training job and finally serve the model using KServe.

Now [create a new notebook instance](creating-a-new-kubeflow-notebook.md) and run the following commands:

```bash
git clone 
cd 
pip install -r requirements.txt
python mnist-example.py
```

This produces for us a `mnist-example.yaml` file that we will use to run our pipeline.

We now use [Pipelines](kubeflow-dashboard.md/) and use the pipeline configuration we generated in the previous step to define the pipeline. Once you do so, you should create a new [experiment](kubeflow-dashboard.md/) and then trigger a run for the pipeline by going to the Run tab, clicking on the "create a run" button and choosing the pipeline you just created.

<img src={require('./images/mnist-pipeline.png').default} style={{"background-color":"white"}} />

This would trigger a Kubeflow pipeline run and we would see the pipeline run in the Pipelines dashboard. Once the pipeline run is complete, we can see the model saved in the `end-to-end-pipeline-{ID}-model` volume we created earlier.

## Predict using the model

We can now use the model we trained to make predictions. We will use the [KFServing](kubeflow-dashboard.md/) component of Kubeflow to serve our model. You could now modify this code and run it in the Notebook instance you created to predict using the Serving endpoint.

```python
import numpy as np
from PIL import Image
import requests

name = "kfaas-docs"
namesapce = "my-profile"
image_url = "https://raw.githubusercontent.com/kubeflow/katib/master/examples/v1beta1/kubeflow-pipelines/images/9.bmp"
image = Image.open(requests.get(image_url, stream=True).raw)
data = (
    np.array(image.convert("L").resize((28, 28)))
    .astype(np.float)
    .reshape(-1, 28, 28, 1)
)
data_formatted = np.array2string(
    data, separator=",", formatter={"float": lambda x: "%.1f" % x}
)
json_request = '{{ "instances" : {} }}'.format(data_formatted)

url = "http://{}-predictor-default.{}.svc.cluster.local/v1/models/{}:predict".format(
    name, namespace, name
)
response = requests.post(url, data=json_request)

print("Prediction for the image")
display(image)
print(response.json())
```

You should see the image and the JSON response our prediction endpoint returns for the image.