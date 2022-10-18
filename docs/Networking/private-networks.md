import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Private networks

Networks provide isolation for your instances and Kubernetes clusters, separating groups of instances used for different purposes. When you create a resource such as a Kubernetes cluster, you can assign it to a specific network.

Networks are region-specific: if you create a network in one Civo region it will not be visible in another. Networks also count toward your [quota](../Account/quota.md).

:::note
Network assignment is permanent. If you create a resource in one network, you cannot move it to another network. You would need to re-create the resource in the network of your choice.
:::

## Listing networks

<Tabs groupId="list-networks">
<TabItem value="dashboard" label="Dashboard">

You can find the [networks management section](https://dashboard.civo.com/networks) under Networking in your Civo dashboard.

Each region will have a `Default` network created automatically. When creating resources, unless you specify a network, they will be assigned to this Default network. If you have created other networks, they will be displayed with a set of options to manage them. You can also rename a network in this view.

![Listing networks on the Civo dashboard](images/dashboard-list-networks.png)
</TabItem>

<TabItem value="cli" label="Civo CLI">

You can list your currently-configured networks by calling `civo network list`. This will show the network ID, name label, region and status:

```console
$ civo network list
+--------------------------------------+--------------+--------+---------+--------+
| ID                                   | Label        | Region | Default | Status |
+--------------------------------------+--------------+--------+---------+--------+
| 95a515ea-37a1-4fca-ad03-7c7c32f59f5a | Default      | FRA1   | true    | Active |
| ac9db91c-9689-4023-a44b-a5b562c3aa6a | demo-network | FRA1   | false   | Active |
+--------------------------------------+--------------+--------+---------+--------+
```

</TabItem>
</Tabs>

## Creating a private network

<Tabs groupId="create-network">

<TabItem value="dashboard" label="Dashboard">

To create a network, click on the "Create a network" button on top of the [networks page](https://dashboard.civo.com/networks).

Once you do, you will be able to give your new network a name:

![Network naming on creation](images/create-network.png)

After the network is created you can create resources that share the network, and can route to each other internally. You will be able to choose the network in the [instance creation](../Compute/create-an-instance.md) or [cluster creation](../Kubernetes/create-a-cluster.md) step like in the image below:

![Selecting a network called "Demo" on instance creation](images/choose-network.png)

</TabItem>

<TabItem value="cli" label="Civo CLI">

You can create a new private network using the command `civo network create network_label`:

```console
civo network create cli-demo
Created a network called cli-demo with ID 1c93d0ca-d733-4ffe-8a31-2c0bcd565885
```

After the network is created you can create resources that share the network, and can route to each other internally. You will be able to choose the network in the [instance creation](../Compute/create-an-instance.md) or [cluster creation](../Kubernetes/create-a-cluster.md) process.

</TabItem>

</Tabs>

## Deleting a private network

Networks can be deleted if no resources such as instances or clusters exist in them. In other words, you can only delete an empty private network.

Once you have removed any resources running in a network, you will be able to delete it.

<Tabs groupId="delete-network">

<TabItem value="dashboard" label="Dashboard">

From the Networks listing page, click on the Actions menu item for the network you wish to delete, and click "Delete":

![Delete network menu option shown for a private network](images/delete-network-menu.png)

You will need to input the name of the network to delete as a confirmation. Once you do, the network can be deleted:

![Confirming the name of the network to be deleted](images/delete-network-confirmation.png)

</TabItem>

<TabItem value="cli" label="Civo CLI">

Network deletion is done by calling `civo network remove network_label` or `civo network remove network_id`:

```console
$ civo network rm cli-demo
Warning: Are you sure you want to delete the cli-demo network (y/N) ? y
The network (cli-demo) has been deleted
```

:::tip
For scripting use, you can add a `-y` flag to Civo CLI commands which usually require confirmation. This will assume you will answer "yes" to any prompt.
:::

</TabItem>
</Tabs>