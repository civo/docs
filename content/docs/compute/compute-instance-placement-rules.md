---
sidebar_position: 8
title: Compute instance placement rules
description: Learn how to manage compute instance placement rules on CivoStack Enterprise regions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <title>Managing compute instance placement rules on CivoStack Enterprise regions | Civo Documentation</title>
</head>

:::note
These features are only available on CivoStack Enterprise regions, and are made available by request
:::

## Overview

The Placement Rules API allows customers using CivoStack Enterprise to have greater control over the scheduling of their instances within a dedicated region under their management. This API provides endpoints for listing available workload placement labels and creating instances with specific placement rules.

This functionality must be specifically enabled on each private Civo Region. Contact Civo support if you manage a private Civo Region where you aim to leverage instance placement rules.

The functionality regards the Workload Placement rules in general, which can be managed with some sub-functionalities:

* region node labelling for underlying node selection
* affinity and anti-affinity rules (strong and weak) of virtual machine instances.

Let’s see them in detail in the following sections.

## Node Selection

A Civo Region is composed of multiple interconnected nodes on which cloud workloads can be scheduled.

The mechanism of driving the scheduling towards a preferred node is called "node selection".

Once a region is marked to support the placement rules, you can ask the Civo support team to let any number of named nodes that make up your region be labelled with tags composed of `tag-name` as a key and a corresponding `tag-value`. Each `tag-name` and `tag-value` are arbitrary strings, and are defined by you, such as:

`workloadplacement.civo.io/<tag-name>: "<tag-value>"`

This tag allows the node to be selectable for particular workloads when specifying the particular tag in the compute instance creation request.

The following information will be based on an example region containing 5 nodes named and labelled as follows:

```yaml
nodes:
  - node01
    labels:
      - workloadplacement.civo.io/os: "windows-preferred"
  - node02
    labels:
      - workloadplacement.civo.io/os: "linux-preferred"
  - node03
    labels:
      - workloadplacement.civo.io/os: "linux-preferred"
      - workloadplacement.civo.io/compute: "gpu"
  - node04
  - node05
```

## List node selectors available in a Civo region 

To list what node selectors have been made available in a Civo Region, you can use the following API call:

```console
curl -H "Authorization: Bearer {civo-API-key}" https://api.civo.com/v2/workload/placements?region={region}
```

The response will be a JSON block, such as:

```json
{
  "workloadplacement.civo.io/compute": [
    "gpu"
  ],
  "workloadplacement.civo.io/os": [
    "windows-preferred",
    "linux-preferred"
  ]
}
```

## Specify node selectors during instance creation

When creating a new Civo instance in a region configured with instance placement rules, you can apply a desired node selector as follows, entering the `workloadplacement.civo.io/` tag under a `placement_rule` parameter:

```console
curl -H 'Authorization: Bearer {civo-API-key}' -X POST https://api.civo.com/v2/instances?region={region} \
-H 'Content-Type: application/json' \
-d '{"hostname": "windows-vm",
    "size": "g3.small",
    "template_id": "ad26da32-c56b-406a-a2df-471fe384c5e9",
    "placement_rule": {
        "node_selector": {
              "workloadplacement.civo.io/os": "windows-preferred"
        }
    }
  }'
```

This would result in an attempt to first create the instance on `node01` of the region described above, as that node is configured with the `windows-preferred` tag.

## Specify affinity and anti-affinity during instance creation

To drive the Civo scheduler to spin up a new instance in the same or in a different node than another running instance, you can leverage instance placement tags to specify *soft* or *hard* affinity and anti-affinity rules.

The difference between the soft and hard rules is that the soft rules express a preference, but it’s not mandatory, so the rule will only be applied if possible. Conversely, when specifying a hard rule, if the condition imposed by the rule cannot be satisfied, the instance will not be scheduled and will remain in a pending state until the conditions for the rule to be applied are met.

Affinity and anti-affinity rules are set using an `affinity_rules` option under the `placement_rule` parameter, in the following format:

```json
"placement_rule": {
  "affinity_rules": [
    {
      "type": "affinity" / "anti-affinity",
      "exclusive": true / false,
      "tags": [
        // selected workloadplacement.civo.io/ tag(s) to match this rule to
      ] 
    }
  ]
}
```

Here is an example request to create a new instance with some of these rules applied:

```console
curl -H 'Authorization: Bearer {civo-API-key}' -X POST https://api.civo.com/v2/instances?region={region} \
-H 'Content-Type: application/json' \
-d '{
    "hostname": "bi-controller-vm",
    "size": "g4g.xlarge",
    "template_id": "ad26da32-c56b-406a-a2df-471fe384c5e9",
    "placement_rule": {
      "affinity_rules": [
        {
          "type": "affinity",
          "exclusive": true,
          "tags": [
            "gpu" // tag of the instances to which set the affinity
          ]
        },
        {
          "type": "affinity",
          "exclusive": false,
          "tags": [
            "batch" // tag of the instances to which set the affinity
          ]
        },
        {
        "type": "anti-affinity",
          "exclusive": true,
          "tags": [
            "windows" // tag of the instances to which set the anti-affinity
          ]
        },
        {
          "type": "anti-affinity",
          "exclusive": false,
          "tags": [
            "api-server" // tag of the instances to which set the anti-affinity
          ]
        }
      ]
    }
  }'
```