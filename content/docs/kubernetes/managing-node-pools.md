---
title: Managing a Kubernetes cluster's node pools
description: Learn how to create and manage node pools in your Kubernetes cluster on Civo. Add new node pools or delete existing ones via Civo Dashboard, CLI or Terraform.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <title>Managing a Civo Kubernetes Cluster's Node Pools | Civo Documentation</title>
</head> 

## Overview

You can group a cluster's worker nodes into *node pools*. The nodes in each pool are all of the same size, so if you want a cluster to have nodes of different instance sizes, you must create a new pool for each size.

### Adding a new node pool

<Tabs groupId="add-nodepools">

<TabItem value="dashboard-add-nodepool" label="Dashboard">

You can add a new node pool to a running cluster by clicking on "**Create new pool**" on your cluster's information page.

![Cluster node pool information](images/node-pools-section.png)

You will be taken to the pool creation page:

![Adding a new node pool options](images/create-new-node-pool.png)

In this section, you can select the number of nodes to create in this new pool, and the specifications/size of the nodes to create. You can choose from the same sizes as when [creating a cluster](create-a-cluster.md).

The cost per node of each type is displayed.

When you click "**Create new pool**" you will be taken back to the cluster information page and the new pool will be displayed as creating:

![New node pool is being created](images/new-node-pool-created.png)

You can then specify specific tasks within your cluster to run on a specific pool's nodes, optimizing your cluster.

</TabItem>

<TabItem value="cli-add-nodepool" label="Civo CLI">

The command to add a node pool to a running cluster is `civo kubernetes node-pool create CLUSTER_NAME -n NUMBER -s SIZE`. For example, to add a new node pool of 2 `g4s.kube.medium` nodes to a cluster called "civo-cluster" you would use:

```bash
civo kubernetes node-pool create civo-cluster -n 2 -s g4s.kube.medium
```

The `--size` or `-s` parameter is followed by the code of the type of Kubernetes node you want to create, which you can get by running `civo sizes ls`.

</TabItem>

<TabItem value="terraform-add-nodepool" label="Terraform">

### 1. Prepare the node pool configuration file

Once you have configured the [Civo Terraform provider](../overview/terraform.md) and successfully created a [Kubernetes cluster resource](./create-a-cluster.md) in Terraform, you can define a new node pool as follows.

In the `main.tf` file, enter the following:

```terraform
# Query xsmall instance size
data "civo_size" "xsmall" {
    filter {
        key = "type"
        values = ["kubernetes"]
    }

    sort {
        key = "ram"
        direction = "asc"
    }
}

# Query medium instance size
data "civo_size" "medium" {
    filter {
        key = "name"
        values = ["medium"]
        match_by = "re"
    }

    filter {
        key = "type"
        values = ["kubernetes"]
    }

    sort {
        key = "ram"
        direction = "asc"
    }
}

# Create a firewall
resource "civo_firewall" "my-firewall" {
    name = "my-firewall"
}

# Create a firewall rule
resource "civo_firewall_rule" "kubernetes" {
    firewall_id = civo_firewall.my-firewall.id
    protocol = "tcp"
    start_port = "6443"
    end_port = "6443"
    cidr = ["0.0.0.0/0"]
    direction = "ingress"
    label = "kubernetes-api-server"
    depends_on = [civo_firewall.my-firewall]
    action = "allow"
}

# Create a cluster
resource "civo_kubernetes_cluster" "my-cluster" {
    name = "my-cluster"
    pools {
        size = element(data.civo_size.xsmall.sizes, 0).name
        node_count = 3
    }
    firewall_id = civo_firewall.my-firewall.id
}

# Create a nodepool
resource "civo_kubernetes_node_pool" "back-end-nodepool" {
    region = civo_kubernetes_cluster.my-cluster.region
    cluster_id = civo_kubernetes_cluster.my-cluster.id
    size = element(data.civo_size.medium.sizes, 0).name
    node_count = 3
}
```

The sections of the above file are as follows:

- *Query xsmall instance size*
  - Using the `civo_size` data source to find a list of compute instance sizes that match the filter:
    - `type` is `kubernetes`
  - Sorting the result (instance sizes) by `RAM` in ascending order (smallest first)
  - This data source can then be referred to as `data.civo_size.xsmall`
  - To access the sizes later, we can use `data.civo_size.xsmall.sizes` syntax where `sizes` is the data source key that contains all the sizes (list)

- *Create a firewall* and *Create a firewall rule*
  - Creates a new firewall and firewall rule for the Kubernetes cluster. Specifically, we are opening port 6443 so we can communicate with our cluster from outside e.g. through the `kubectl` CLI. See the [firewall creation](../networking/firewalls.md) documentation for more information.

- *Create a cluster*
  - Creates a new Kubernetes cluster using the [civo_kubernetes_cluster](https://registry.terraform.io/providers/civo/civo/latest/docs/resources/kubernetes_cluster) resource in the `LON1` region, with:
    - a name of `my-cluster`,
    - target node size of 3 nodes,
    - for the `target_nodes_size` field, uses the first element (index 0) from the `data.civo_size.xsmall.sizes` list defined above,
    - assigns the `firewall_id` of the firewall created earlier to the cluster,
    - a reference name of `civo_kubernetes_cluster.my-cluster` you can use to point to the cluster in other resources, if needed.

- *Query medium instance size*
  - Uses the [civo_instance_size](https://registry.terraform.io/providers/civo/civo/latest/docs/data-sources/instance_size) data source to find a list of compute instance sizes that match with these filters:
    - `name` contains `medium`,
    - `type` is `kubernetes`
  - Sorting the result (instance sizes) by `RAM` in ascending order (smallest first)
  - This data source can then be referred to as `data.civo_size.medium`
  - To access the sizes later, we can use `data.civo_size.medium.sizes` syntax where `sizes` is the data source key that contains all the sizes (list)

- *Create a nodepool*
  - Creates a new node pool using the [civo_kubernetes_node_pool](https://registry.terraform.io/providers/civo/civo/latest/docs/resources/kubernetes_node_pool) resource, and:
    - Calls it `back-end-nodepool`
    - Sets the region to be in the same region where the `my-cluster` Kubernetes cluster is located
    - Links it to the `my-cluster` cluster using the `cluster_id` attribute
    - Sets the number of nodes in the pool to `3`
    - For the `size` field, takes the first element (index 0) from the `data.civo_instances_size.medium.sizes` list fetched earlier
    - This node pool can then be referred to as `civo_kubernetes_node_pool.back-end-nodepool` in other resources, if needed

### 2. Plan

With the above configuration saved, you can run `terraform plan` to see the resources to be created:

```console
$ terraform plan
Terraform used the selected providers to generate the following execution plan. Resource actions
are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # civo_firewall.my-firewall will be created
  + resource "civo_firewall" "my-firewall" {
      + create_default_rules = true
      + id                   = (known after apply)
      + name                 = "my-firewall"
      + network_id           = (known after apply)
    }

  # civo_firewall_rule.kubernetes will be created
  + resource "civo_firewall_rule" "kubernetes" {
      + action      = "allow"
      + cidr        = [
          + "0.0.0.0/0",
        ]
      + direction   = "ingress"
      + end_port    = "6443"
      + firewall_id = (known after apply)
      + id          = (known after apply)
      + label       = "kubernetes-api-server"
      + protocol    = "tcp"
      + region      = (known after apply)
      + start_port  = "6443"
    }

  # civo_kubernetes_cluster.my-cluster will be created
  + resource "civo_kubernetes_cluster" "my-cluster" {
      + api_endpoint           = (known after apply)
      + applications           = "Redis,Linkerd:Linkerd & Jaeger"
      + cni                    = (known after apply)
      + created_at             = (known after apply)
      + dns_entry              = (known after apply)
      + firewall_id            = (known after apply)
      + id                     = (known after apply)
      + installed_applications = (known after apply)
      + kubeconfig             = (sensitive value)
      + kubernetes_version     = (known after apply)
      + master_ip              = (known after apply)
      + name                   = "my-cluster"
      + network_id             = (known after apply)
      + num_target_nodes       = (known after apply)
      + ready                  = (known after apply)
      + region                 = (known after apply)
      + status                 = (known after apply)
      + target_nodes_size      = (known after apply)

      + pools {
          + id             = (known after apply)
          + instance_names = (known after apply)
          + node_count     = 3
          + size           = "g4s.kube.xsmall"
        }
    }

  # civo_kubernetes_node_pool.back-end-nodepool will be created
  + resource "civo_kubernetes_node_pool" "back-end-nodepool" {
      + cluster_id     = (known after apply)
      + id             = (known after apply)
      + instance_names = (known after apply)
      + node_count     = 3
      + region         = (known after apply)
      + size           = "g4s.kube.medium"
    }

Plan: 4 to add, 0 to change, 0 to destroy.

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions if
you run "terraform apply" now.
```

As you can see from the plan output above, Terraform will create a cluster (my-cluster) and a second node pool of 3 Medium size nodes for us. It will also create a firewall and firewall rule for our cluster.

### 3. Apply

To apply the configuration and allow Terraform to create the resources, run `terraform apply` and type `yes` when asked for confirmation:

```console
$ terraform apply
Terraform used the selected providers to generate the following execution plan. Resource actions
are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # civo_firewall.my-firewall will be created
  + resource "civo_firewall" "my-firewall" {
      + create_default_rules = true
      + id                   = (known after apply)
      + name                 = "my-firewall"
      + network_id           = (known after apply)
    }

  # civo_firewall_rule.kubernetes will be created
  + resource "civo_firewall_rule" "kubernetes" {
      + action      = "allow"
      + cidr        = [
          + "0.0.0.0/0",
        ]
      + direction   = "ingress"
      + end_port    = "6443"
      + firewall_id = (known after apply)
      + id          = (known after apply)
      + label       = "kubernetes-api-server"
      + protocol    = "tcp"
      + region      = (known after apply)
      + start_port  = "6443"
    }

  # civo_kubernetes_cluster.my-cluster will be created
  + resource "civo_kubernetes_cluster" "my-cluster" {
      + api_endpoint           = (known after apply)
      + applications           = "Redis,Linkerd:Linkerd & Jaeger"
      + cni                    = (known after apply)
      + created_at             = (known after apply)
      + dns_entry              = (known after apply)
      + firewall_id            = (known after apply)
      + id                     = (known after apply)
      + installed_applications = (known after apply)
      + kubeconfig             = (sensitive value)
      + kubernetes_version     = (known after apply)
      + master_ip              = (known after apply)
      + name                   = "my-cluster"
      + network_id             = (known after apply)
      + num_target_nodes       = (known after apply)
      + ready                  = (known after apply)
      + region                 = (known after apply)
      + status                 = (known after apply)
      + target_nodes_size      = (known after apply)

      + pools {
          + id             = (known after apply)
          + instance_names = (known after apply)
          + node_count     = 3
          + size           = "g4s.kube.xsmall"
        }
    }

  # civo_kubernetes_node_pool.back-end-nodepool will be created
  + resource "civo_kubernetes_node_pool" "back-end-nodepool" {
      + cluster_id     = (known after apply)
      + id             = (known after apply)
      + instance_names = (known after apply)
      + node_count     = 2
      + region         = (known after apply)
      + size           = "g4s.kube.medium"
    }

Plan: 4 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

civo_firewall.my-firewall: Creating...
civo_firewall.my-firewall: Creation complete after 4s [id=852e26c6-2ccc-4a75-b5dd-1c52838c9880]
civo_firewall_rule.kubernetes: Creating...
civo_kubernetes_cluster.my-cluster: Creating...
civo_firewall_rule.kubernetes: Creation complete after 2s [id=a3393880-720f-44d1-ac39-902663d6c60e]
civo_kubernetes_cluster.my-cluster: Still creating... [10s elapsed]
civo_kubernetes_cluster.my-cluster: Still creating... [20s elapsed]
civo_kubernetes_cluster.my-cluster: Still creating... [30s elapsed]
civo_kubernetes_cluster.my-cluster: Still creating... [40s elapsed]
civo_kubernetes_cluster.my-cluster: Still creating... [50s elapsed]
civo_kubernetes_cluster.my-cluster: Still creating... [1m0s elapsed]
civo_kubernetes_cluster.my-cluster: Still creating... [1m10s elapsed]
civo_kubernetes_cluster.my-cluster: Still creating... [1m20s elapsed]
civo_kubernetes_cluster.my-cluster: Still creating... [1m30s elapsed]
civo_kubernetes_cluster.my-cluster: Creation complete after 1m30s [id=e2efe4ff-9479-4429-927f-8a62161684c2]
civo_kubernetes_node_pool.back-end-nodepool: Creating...
civo_kubernetes_node_pool.back-end-nodepool: Still creating... [10s elapsed]
civo_kubernetes_node_pool.back-end-nodepool: Still creating... [20s elapsed]
civo_kubernetes_node_pool.back-end-nodepool: Still creating... [30s elapsed]
civo_kubernetes_node_pool.back-end-nodepool: Still creating... [40s elapsed]
civo_kubernetes_node_pool.back-end-nodepool: Still creating... [50s elapsed]
civo_kubernetes_node_pool.back-end-nodepool: Still creating... [1m0s elapsed]
civo_kubernetes_node_pool.back-end-nodepool: Creation complete after 1m4s [id=6380b6aa-c766-44d2-936a-07f150449332]

```

When the creation completes, refresh your Civo web dashboard. You should see the new cluster on the [Kubernetes page](https://dashboard.civo.com/kubernetes). Click it to see more details. It should show both node pools running:

![Cluster created with an added node pool](./images/terraform-nodepool-created.png)

### Updating a node pool configuration on Terraform

If you notice, there will be a new file named terraform.tfstate in your local project directory after applying the configuration. Its contents will be along the lines of the following:

```console
$ cat terraform.tfstate
{
  "version": 4,
  "terraform_version": "1.1.7",
  "serial": 27,
  "lineage": "11e2d21c-43f7-f4fc-51d6-cfa40e143814",
  "outputs": {},
  "resources": [
    {
      "mode": "data",
      "type": "civo_size",
      "name": "medium",
      "provider": "provider[\"registry.terraform.io/civo/civo\"]",
      "instances": [
        {
          "schema_version": 0,
          "attributes": {
            "filter": [
              {
                "all": false,
                "key": "name",
                "match_by": "re",
                "values": [
                  "medium"
                ]
              },
              {
                "all": false,
                "key": "type",
                "match_by": "exact",
                "values": [
                  "kubernetes"
                ]
              }
            ],
            "id": "terraform-20220411090211198400000001",
            "sizes": [
              {
                "cpu": 2,
                "description": "Medium - Standard",
                "disk": 50,
                "name": "g4s.kube.medium",
                "ram": 4096,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 4,
                "description": "Medium - RAM optimized",
                "disk": 80,
                "name": "g4m.kube.medium",
                "ram": 32768,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 16,
                "description": "Medium - CPU optimized",
                "disk": 80,
                "name": "g4c.kube.medium",
                "ram": 32768,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 8,
                "description": "Medium - Performance",
                "disk": 80,
                "name": "g4p.kube.medium",
                "ram": 32768,
                "selectable": true,
                "type": "kubernetes"
              }
            ],
            "sort": [
              {
                "direction": "asc",
                "key": "ram"
              }
            ]
          },
          "sensitive_attributes": []
        }
      ]
    },
    {
      "mode": "data",
      "type": "civo_size",
      "name": "xsmall",
      "provider": "provider[\"registry.terraform.io/civo/civo\"]",
      "instances": [
        {
          "schema_version": 0,
          "attributes": {
            "filter": [
              {
                "all": false,
                "key": "type",
                "match_by": "exact",
                "values": [
                  "kubernetes"
                ]
              }
            ],
            "id": "terraform-20220411090211242900000002",
            "sizes": [
              {
                "cpu": 1,
                "description": "Extra Small - Standard",
                "disk": 30,
                "name": "g4s.kube.xsmall",
                "ram": 1024,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 1,
                "description": "Small - Standard",
                "disk": 40,
                "name": "g4s.kube.small",
                "ram": 2048,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 2,
                "description": "Medium - Standard",
                "disk": 50,
                "name": "g4s.kube.medium",
                "ram": 4096,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 4,
                "description": "Large - Standard",
                "disk": 60,
                "name": "g4s.kube.large",
                "ram": 8192,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 4,
                "description": "Small - Performance",
                "disk": 60,
                "name": "g4p.kube.small",
                "ram": 16384,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 8,
                "description": "Small - CPU optimized",
                "disk": 60,
                "name": "g4c.kube.small",
                "ram": 16384,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 2,
                "description": "Small - RAM optimized",
                "disk": 60,
                "name": "g4m.kube.small",
                "ram": 16384,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 16,
                "description": "Medium - CPU optimized",
                "disk": 80,
                "name": "g4c.kube.medium",
                "ram": 32768,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 8,
                "description": "Medium - Performance",
                "disk": 80,
                "name": "g4p.kube.medium",
                "ram": 32768,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 4,
                "description": "Medium - RAM optimized",
                "disk": 80,
                "name": "g4m.kube.medium",
                "ram": 32768,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 8,
                "description": "Large - RAM optimized",
                "disk": 120,
                "name": "g4m.kube.large",
                "ram": 65536,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 16,
                "description": "Large - Performance",
                "disk": 120,
                "name": "g4p.kube.large",
                "ram": 65536,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 32,
                "description": "Large - CPU optimized",
                "disk": 120,
                "name": "g4c.kube.large",
                "ram": 65536,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 16,
                "description": "Extra Large - RAM optimized",
                "disk": 180,
                "name": "g4m.kube.xlarge",
                "ram": 131072,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 32,
                "description": "Extra Large - Performance",
                "disk": 180,
                "name": "g4p.kube.xlarge",
                "ram": 131072,
                "selectable": true,
                "type": "kubernetes"
              },
              {
                "cpu": 64,
                "description": "Extra Large - CPU optimized",
                "disk": 180,
                "name": "g4c.kube.xlarge",
                "ram": 131072,
                "selectable": true,
                "type": "kubernetes"
              }
            ],
            "sort": [
              {
                "direction": "asc",
                "key": "ram"
              }
            ]
          },
          "sensitive_attributes": []
        }
      ]
    },
    {
      "mode": "managed",
      "type": "civo_firewall",
      "name": "my-firewall",
      "provider": "provider[\"registry.terraform.io/civo/civo\"]",
      "instances": [
        {
          "schema_version": 0,
          "attributes": {
            "create_default_rules": true,
            "id": "852e26c6-2ccc-4a75-b5dd-1c52838c9880",
            "name": "my-firewall",
            "network_id": "28244c7d-b1b9-48cf-9727-aebb3493aaac",
            "region": null
          },
          "sensitive_attributes": [],
          "private": "bnVsbA=="
        }
      ]
    },
    {
      "mode": "managed",
      "type": "civo_firewall_rule",
      "name": "kubernetes",
      "provider": "provider[\"registry.terraform.io/civo/civo\"]",
      "instances": [
        {
          "schema_version": 0,
          "attributes": {
            "action": "allow",
            "cidr": [
              "0.0.0.0/0"
            ],
            "direction": "ingress",
            "end_port": "6443",
            "firewall_id": "852e26c6-2ccc-4a75-b5dd-1c52838c9880",
            "id": "a3393880-720f-44d1-ac39-902663d6c60e",
            "label": "kubernetes-api-server",
            "protocol": "tcp",
            "region": null,
            "start_port": "6443"
          },
          "sensitive_attributes": [],
          "private": "bnVsbA==",
          "dependencies": [
            "civo_firewall.my-firewall"
          ]
        }
      ]
    },
    {
      "mode": "managed",
      "type": "civo_kubernetes_cluster",
      "name": "my-cluster",
      "provider": "provider[\"registry.terraform.io/civo/civo\"]",
      "instances": [
        {
          "schema_version": 0,
          "attributes": {
            "api_endpoint": "https://74.220.17.180:6443",
            "applications": "Redis,Linkerd:Linkerd \u0026 Jaeger",
            "cni": "flannel",
            "created_at": "2022-04-11 09:02:19 +0000 UTC",
            "dns_entry": "e2efe4ff-9479-4429-927f-8a62161684c2.k8s.civo.com",
            "firewall_id": "852e26c6-2ccc-4a75-b5dd-1c52838c9880",
            "id": "e2efe4ff-9479-4429-927f-8a62161684c2",
            "installed_applications": [
              {
                "application": "Redis",
                "category": "database",
                "installed": false,
                "version": "3.2"
              },
              {
                "application": "Linkerd",
                "category": "architecture",
                "installed": false,
                "version": "Latest"
              }
            ],
            "kubeconfig": "apiVersion: v1\nclusters:\n- cluster:\n    certificate-authority-data: LS0tLSd=\n",
            "kubernetes_version": "1.22.2-k3s1",
            "master_ip": "74.220.17.180",
            "name": "my-cluster",
            "network_id": "28244c7d-b1b9-48cf-9727-aebb3493aaac",
            "num_target_nodes": 3,
            "pools": [
              {
                "id": "28cc101c-a7ae-4f7e-af51-52af96c14f9f",
                "instance_names": [
                  "k3s-my-cluster-2899-bbffc3-node-pool-7d55",
                  "k3s-my-cluster-2899-bbffc3-node-pool-8694",
                  "k3s-my-cluster-2899-bbffc3-node-pool-fb6d"
                ],
                "node_count": 3,
                "size": "g4s.kube.xsmall"
              }
            ],
            "ready": true,
            "region": "LON1",
            "status": "ACTIVE",
            "tags": "",
            "target_nodes_size": "g4s.kube.xsmall"
          },
          "sensitive_attributes": [],
          "private": "bnVsbA==",
          "dependencies": [
            "civo_firewall.my-firewall",
            "data.civo_size.xsmall"
          ]
        }
      ]
    },
    {
      "mode": "managed",
      "type": "civo_kubernetes_node_pool",
      "name": "back-end-nodepool",
      "provider": "provider[\"registry.terraform.io/civo/civo\"]",
      "instances": [
        {
          "schema_version": 0,
          "attributes": {
            "cluster_id": "e2efe4ff-9479-4429-927f-8a62161684c2",
            "id": "6380b6aa-c766-44d2-936a-07f150449332",
            "instance_names": [
              "k3s-my-cluster-2899-bbffc3-node-pool-1744",
              "k3s-my-cluster-2899-bbffc3-node-pool-6de4",
              "k3s-my-cluster-2899-bbffc3-node-pool-f26d"
            ],
            "node_count": 3,
            "num_target_nodes": null,
            "region": "LON1",
            "size": "g4s.kube.medium",
            "target_nodes_size": null,
            "timeouts": null
          },
          "sensitive_attributes": [],
          "private": "eyJlMm",
          "dependencies": [
            "civo_firewall.my-firewall",
            "civo_kubernetes_cluster.my-cluster",
            "data.civo_size.medium",
            "data.civo_size.xsmall"
          ]
        }
      ]
    }
  ]
}
```

This is the [Terraform State File](https://developer.hashicorp.com/terraform/language/state) which is created when the configuration is applied.

If you update your `main.tf` file and run `terraform apply` again, Terraform will refresh the state file, try to understand what you want to update and update your defined resources, in this case a cluster and its associated node pools, accordingly.

If there's no change in your `main.tf` file and you rerun `terraform apply`, it will output a `No changes. Your infrastructure matches the configuration` message back to you.

</TabItem>
</Tabs>

### Deleting a node pool

<Tabs groupId="delete-nodepools">
<TabItem value="dashboard-delete-nodepool" label="Dashboard">

You can delete a node pool entirely by clicking on the "**Delete**" button next to the node pool information.

![Node pools information](images/node-pools-section.png)

A popup will appear asking you to confirm that you want to delete the node pool by entering its name:

![Delete node pool popup](images/delete-node-pool.png)

The pool will be deleted as soon as you click "**Delete**" and is irreversible. All workloads in that pool will be destroyed and re-allocated in your cluster.

</TabItem>

<TabItem value="cli-delete-nodepool" label="Civo CLI">

Deletion of a node pool through the CLI uses the syntax `civo kubernetes node-pool delete CLUSTER_NAME POOL_ID`.

You can retrieve the pool ID by running `civo kubernetes show CLUSTER_NAME`. It will be shown as part of the node pools section in parentheses:

```console
[...]
Pool (5b2179):
+---------------------------------------------------+----+--------+----------------+-----------+----------+---------------+
| Name                                              | IP | Status | Size           | Cpu Cores | RAM (MB) | SSD disk (GB) |
+---------------------------------------------------+----+--------+----------------+-----------+----------+---------------+
| k3s-demo-cluster-66f4-d69a62-node-pool-9b65-g2akh |    | ACTIVE | g4c.kube.small |         8 |    16384 |            60 |
| k3s-demo-cluster-66f4-d69a62-node-pool-9b65-rhvxa |    | ACTIVE | g4c.kube.small |         8 |    16384 |            60 |
+---------------------------------------------------+----+--------+----------------+-----------+----------+---------------+

Labels:
kubernetes.civo.com/node-pool=5b21796e-13df-4127-abc2-e18afde09ea4
kubernetes.civo.com/node-size=g4c.kube.small
[... continues]
```

In this case the id is `52b2179`, and the cluster name is `demo-cluster`. You can delete the node pool, therefore, by running

```bash
civo kubernetes node-pool delete demo-cluster 5b2179
```

The CLI would confirm the deletion:

```console
Warning: Are you sure you want to delete the 5b2179 node pool (y/N) ? y
The node pool (5b21796e-13df-4127-abc2-e18afde09ea4) has been deleted from the cluster (demo-cluster)
```

</TabItem>

</Tabs>
