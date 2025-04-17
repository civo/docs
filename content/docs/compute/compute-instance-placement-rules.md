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