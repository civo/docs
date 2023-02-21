---
description: How to create a Civo compute instance using various tools and options
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating an instance

## Overview

Creating an instance on Civo requires a few specified parameters, whether you are starting the instance through the web dashboard or using one of our API tools. The documentation below covers the main options available on initial instance launch.

<Tabs groupId="create-instance">

<TabItem value="dashboard" label="Dashboard">

## Creating an instance from the Dashboard

Begin by selecting the Civo Region you are operating in. You can do so in the lower left of your [Dashboard page](https://dashboard.civo.com):

![Region selection menu](images/region-select.png)

Then, navigate to the [instance creation page](https://dashboard.civo.com/instances/new):

![Instance creation page overview](images/create-instance.png)

The numbered sections give you options for the specifications of your compute instances.

### 1. Hostname

The hostname is the name of the instance. If you specify multiple instances to create in section **2** the same hostname will be used for each, with a running sequential number added to make them unique.

Hostnames can only contain letters, numbers, dashes and full stops. Hostnames must end on an alphanumeric character, not a dash or full stop.

### 2. How many instances?

You can create one or more instances in one operation, subject to the limitations of your [quota](../account/quota.md). Each instance created will have the same parameters, only the hostname and IP addresses will be different.

### 3. Select size

You can select the size and instance hardware specifications based on the task you want to accomplish. You can view the available sizing options [here](https://www.civo.com/compute-pricing).

Sizing options may be restricted depending on your account quota and how many resources are already running in your account. See the [quota documentation](../account/quota.md) for more information.

The hourly/monthly slider for the pricing is purely to show the pricing equivalent at different time scales. All Civo resources are billed hourly. [Read more about billing](../account/billing.md).

### 4. Select image

The base operating system image to use for the instance. Note that you can select from a number of versions of each operating system.

Custom instance types are not supported on Civo at the moment.

### 5. Initial user

The initial user to create for the created instance(s). This is the username to use when logging in to the instance for the first time over SSH.

### 6. Network

The [private network](../networking/private-networks.md) for the instance to be situated in. You can choose from the default network for your account, or if you have created networks prior to creating this instance, you can choose from one of them.

### 7. Public IP address

Select *create* if you would want the instance to have a public IP address and therefore be routable from the wider internet. If you do not choose to create the instance with a public IP address, it will only be accessible from within your chosen [network](../networking/private-networks.md).

### 8. Firewall

You can create a new firewall along with creating this instance, or choose from an existing one if present in the network. Read more about firewalls on Civo.

### 9. SSH Key

You can choose a random password for logging in to the instance, or use a [previously-uploaded key](../account/ssh-keys.md).

### 10. Initialisation script

If you want your instance to be preinstalled with some tools, or want to run a script on startup, this is the section to paste the script. [Read more about instance initialisation script usage](https://www.civo.com/learn/compute-instance-cloud-init-install-script-usage).

### 11. Tags

You can tag instances for administrative and organisation reasons by adding tags here. Tags are entirely optional.

### Creating your instance

When you are satisfied with your initial instance configuration, you can click "**Create**" and be directed to the instance's dashboard page. It will take a moment to become active, and you will be shown the status throughout as it builds:

![A Civo instance in the process of being built](images/instance-building.png)

### Accessing your instance with SSH

Once your instance is running, you will be able to connect to it using SSH. If you chose to use an [uploaded SSH key](../account/ssh-keys.md), you will be able to connect without a password. If you chose to use a random password, you can copy it to your clipboard by clicking on the "*View SSH information* dropdown at the top of the instance's page.

Assuming you had a public IP address assigned to the instance, you will be able to access it with the command format `ssh username@instanceIP`. The IP address information is also displayed at the top of the instance details page.

</TabItem>

<TabItem value="cli" label="Civo CLI">

## Creating an instance using the Civo CLI

You can create a Civo instance on the command-line by running the `civo instance create` command, with optional parameters.

:::tip

You can view the instance creation options available on the Civo CLI by running:

```bash
civo instance create --help
```

:::

### Creating an instance on the command line with no options

If you run `civo instance create` on its own, it will create an instance with a random name, default options for the size, operating system, initial user and so on, in the currently-selected region, and return.

### Creating an instance on the command line with options

The CLI allows you to specify a number of options for your instance, from the size and specification of the virtual machine, to the firewall rules to set up, the version and flavour of operating system to use, and more. A full list of options for instance creation can be found by running `civo instance create --help`.

As an example, the following command will create an instance in the current region, using the `g3.small` instance type, using the Ubuntu Jammy disk image for the operating system, with an initial user called demo-user.

`civo instance create --hostname=api-demo.test --size=g3.medium  --diskimage=ubuntu-jammy --initialuser=demo-user`

</TabItem>

<TabItem value="terraform" label="Terraform">

## Creating an instance using Terraform

To create an instance using Terraform, you will first need to have an initialized Terraform project. Refer to the [Civo Terraform setup documentation](../overview/terraform.md) before proceeding.

### Preparing a configuration file

First, create a file called `main.tf`, and add the following Terraform code to it:

```terraform
# Query small instance size
data "civo_size" "small" {
    filter {
        key = "name"
        values = ["g3.small"]
        match_by = "re"
    }

    filter {
        key = "type"
        values = ["instance"]
    }

}

# Query instance disk image
data "civo_disk_image" "debian" {
   region = "LON1"
   filter {
        key = "name"
        values = ["debian-10"]
   }
}

# Create a new instance
resource "civo_instance" "foo" {
    region = "LON1"
    hostname = "foo.com"
    size = element(data.civo_size.small.sizes, 0).name
    disk_image = element(data.civo_disk_image.debian.diskimages, 0).id
}
```

To explain the contents of the file and what happens when the configuration above is applied:

- In the *Query small instance size* block:
  - We are using the `civo_instances_size` data source to find a list of instance sizes that match with these filters:
    - name contains `g3.small`
    - `type` is `instance`
  - We can then refer to this data source as `data.civo_instances_size.small`. To access the sizes later, we can use `data.civo_instances_size.small.sizes` syntax where `sizes` is the data source key that contains all the sizes (list)

- In the *Query instance disk image* block:
  - We are using the `civo_disk_image` data source to find a list of compute instance diski mages from the `LON1` region that match this filter:
    - name is `debian-10`
  - We can then refer to this data source as `data.civo_disk_image.debian`. To access the sizes later, we can use `data.civo_disk_image.debian.diskimages` syntax where `diskimages` is the data source key that contains all the diskimages (list)

- In the Create a new instance block:
  - We are creating a new Civo compute instance using the `civo_instance` resource, and
    - Use `LON1` region (note: this region field is optional — if no region is provided in the configuration or provider.tf file, the system will choose one for you)
    - Set the hostname to `foo.com`
    - For the `size` field, we take the first element (index 0) from the `data.civo_instances_size.small.sizes` list defined above
    - For the `disk_image` field, we take the first element (index 0) from the `data.civo_disk_image.debian.diskimages` list
  - We can then refer to this instance as `civo_instance.foo` in other resources if we need to.

The civo_instance resource does support other fields too. Check out the [Terraform provider documentation](https://registry.terraform.io/providers/civo/civo/latest/docs/resources/instance) for more details.

### Running Terraform plan

Once you have created the `main.tf` file with your chosen options, you can run `terraform plan` to see what's going to be created:

```console
$ terraform plan
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # civo_instance.foo will be created
  + resource "civo_instance" "foo" {
      + cpu_cores          = (known after apply)
      + created_at         = (known after apply)
      + disk_gb            = (known after apply)
      + disk_image         = "a4204155-a876-43fa-b4d6-ea2af8774560"
      + firewall_id        = (known after apply)
      + hostname           = "foo.com"
      + id                 = (known after apply)
      + initial_password   = (sensitive value)
      + initial_user       = "civo"
      + network_id         = (known after apply)
      + private_ip         = (known after apply)
      + pseudo_ip          = (known after apply)
      + public_ip          = (known after apply)
      + public_ip_required = "create"
      + ram_mb             = (known after apply)
      + region             = "LON1"
      + size               = "g3.small"
      + source_id          = (known after apply)
      + source_type        = (known after apply)
      + status             = (known after apply)
      + template           = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions if you run "terraform apply" now.
```

As you can see, Terraform will create an instance with size set to `g3.small` and disk image set to `a42...560`. That means the data source queries are working.

### Applying the configuration

You can now execute the command to create the actual compute instance. Run `terraform apply` and when prompted, type `yes`:

```console
$ terraform apply
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # civo_instance.foo will be created
  + resource "civo_instance" "foo" {
      + cpu_cores          = (known after apply)
      + created_at         = (known after apply)
      + disk_gb            = (known after apply)
      + disk_image         = "a4204155-a876-43fa-b4d6-ea2af8774560"
      + firewall_id        = (known after apply)
      + hostname           = "foo.com"
      + id                 = (known after apply)
      + initial_password   = (sensitive value)
      + initial_user       = "civo"
      + network_id         = (known after apply)
      + private_ip         = (known after apply)
      + pseudo_ip          = (known after apply)
      + public_ip          = (known after apply)
      + public_ip_required = "create"
      + ram_mb             = (known after apply)
      + region             = "LON1"
      + size               = "g3.small"
      + source_id          = (known after apply)
      + source_type        = (known after apply)
      + status             = (known after apply)
      + template           = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

civo_instance.foo: Creating...
civo_instance.foo: Still creating... [10s elapsed]
civo_instance.foo: Still creating... [20s elapsed]
civo_instance.foo: Still creating... [30s elapsed]
civo_instance.foo: Still creating... [40s elapsed]
civo_instance.foo: Still creating... [50s elapsed]
civo_instance.foo: Still creating... [1m0s elapsed]
civo_instance.foo: Creation complete after 1m7s [id=689e385b-9b0a-4128-92b9-dae3b2ff95d3]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

When the creation completes, refresh your [Civo dashboard](https://dashboard.civo.com/instances) and you will see there's a new compute instance that has been created. Click it to see more details. It will look something like this:

![Instance created from Terraform appears on the dashboard](images/terraform-instance-created.png)

### Updating an instance configuration

There will be a new file named `terraform.tfstate` in your local project directory. If you print its contents, it will look something like:

```console
$ cat terraform.tfstate

{
  "version": 4,
  "terraform_version": "1.1.7",
  "serial": 1,
  "lineage": "c59a555f-fbe1-857c-7a43-eee99902c716",
  "outputs": {},
  "resources": [
    {
      "mode": "data",
      "type": "civo_disk_image",
      "name": "debian",
      "provider": "provider[\"registry.terraform.io/civo/civo\"]",
      "instances": [
        {
          "schema_version": 0,
          "attributes": {
            "diskimages": [
              {
                "id": "a4204155-a876-43fa-b4d6-ea2af8774560",
                "label": "buster",
                "name": "debian-10",
                "version": "10"
              }
            ],
            "filter": [
              {
                "all": false,
                "key": "name",
                "match_by": "exact",
                "values": [
                  "debian-10"
                ]
              }
            ],
            "id": "terraform-20220405065821786700000002",
            "region": "LON1",
            "sort": null
          },
          "sensitive_attributes": []
        }
      ]
    },
    {
      "mode": "data",
      "type": "civo_size",
      "name": "small",
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
                  "g3.small"
                ]
              },
              {
                "all": false,
                "key": "type",
                "match_by": "exact",
                "values": [
                  "instance"
                ]
              }
            ],
            "id": "terraform-20220405065821738300000001",
            "sizes": [
              {
                "cpu": 1,
                "description": "Small",
                "disk": 25,
                "name": "g3.small",
                "ram": 2048,
                "selectable": true,
                "type": "instance"
              }
            ],
            "sort": null
          },
          "sensitive_attributes": []
        }
      ]
    },
    {
      "mode": "managed",
      "type": "civo_instance",
      "name": "foo",
      "provider": "provider[\"registry.terraform.io/civo/civo\"]",
      "instances": [
        {
          "schema_version": 0,
          "attributes": {
            "cpu_cores": 1,
            "created_at": "2022-04-05 06:58:26 +0000 UTC",
            "disk_gb": 25,
            "disk_image": "a4204155-a876-43fa-b4d6-ea2af8774560",
            "firewall_id": "c9e14ae8-b8eb-4bae-a687-9da4637233da",
            "hostname": "foo.com",
            "id": "3ee28533-4914-491f-89ba-66b0c8fdbf8c",
            "initial_password": "2nXfV8M5FV",
            "initial_user": "civo",
            "network_id": "28244c7d-b1b9-48cf-9727-aebb3493aaac",
            "notes": "",
            "private_ip": "192.168.1.6",
            "public_ip": "74.220.16.89",
            "public_ip_required": "create",
            "ram_mb": 2048,
            "region": "LON1",
            "reverse_dns": "",
            "script": "",
            "size": "g3.small",
            "source_id": "debian-10",
            "source_type": "diskimage",
            "sshkey_id": "",
            "status": "ACTIVE",
            "tags": null,
            "template": null,
            "timeouts": null
          },
          "sensitive_attributes": [],
          "private": "eyJlMmJmYjczMC1lY2FhLTExZTYtOGY4OC0zNDM2M2JjN2M0YzAiOnsiY3JlYXRlIjoxODAwMDAwMDAwMDAwfX0=",
          "dependencies": [
            "data.civo_disk_image.debian",
            "data.civo_size.small"
          ]
        }
      ]
    }
  ]
}
```

This is the [Terraform State File](https://developer.hashicorp.com/terraform/language/state) which is created when the configuration is applied.

If you update your `main.tf` file and run `terraform apply` again, Terraform will refresh the state file, try to understand what you want to update and update your compute instance accordingly. You may want to update components such as the firewall id to choose another [firewall](../networking/firewalls.md) or add a tag, for example.

If there's no change in your `main.tf` file and you rerun `terraform apply`, it will output a `No changes. Your infrastructure matches the configuration` message back to you.
</TabItem>
</Tabs>
