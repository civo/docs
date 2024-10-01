---
sidebar_position: 1
title: Civo FAQs
description: Explore the comprehensive FAQ for Civo documentation, designed to provide you with clear and concise answers to common questions about Civo's cloud platform, services, and features. 
---

<head>
  <title>Civo Frequently Asked Questions | Civo Documentation</title>
</head>

## Billing and Account

### What payment methods are accepted by Civo?

We accept all major cards supported by Stripe, including American Express, MasterCard, and Visa. We do not support using a "virtual" or pre-paid card as a payment type.

### $250 credit - how do I get it, and how does it work?

Users who sign up to Civo and add a credit card to their account can get an introductory credit of $250 in their account. This is valid for a month from the date it was applied.

In order to claim your $250 free credit, you must add a valid credit/debit card to your account within 21 days of signing up to Civo.

This credit can be used for any Civo services, from Kubernetes clusters to individual virtual machine instances. Anything billable use will first be debited from available credit before charges are made on your credit card.

If the credit expires before a bill is due, this means the payment for the previous month's usage will be taken from your card.

### Can I limit my account so that I will not go over my credit?

You can set up a [billing alert threshold](https://dashboard.civo.com/billing/alert_threshold) to notify you if you are approaching a particular value. We can also adjust your account [quota](../account/quota.md) (of deployable instances, volumes, etc.) on request to prevent the likelihood of you exceeding your budget.

### Credit expiry and validity periods

The introductory credit is valid until the end of the month following its application to your account. For example, credit awarded on 15 May will be valid until 30 June, while credit awarded on the 27th of September will be valid until the end of October.

Credit will be applied to usage during the month in which it is valid. For example, credit marked as expiring on 31 May will be used before billing your card for May's usage when invoices are raised on 1 June.

### Can I download my invoices and billing history?

On the first day of each month, we raise an invoice for services used throughout the previous month. Your [previous invoices](https://dashboard.civo.com/invoices) are available to view and download within your dashboard.

### Do you bill for the control plane?

We manage the control plane for any clusters you create. This means that it is covered in the charge displayed for your cluster.

### How to delete my account?

To initiate the deletion of your Civo account, please follow these steps:

1. Contact our support team through the Intercom messaging platform.
2. Request the deletion of your account, specifying that you would like to proceed with the account deletion process.
3. Depending on the billing status of your account, any outstanding dues will need to be settled before the deletion can be completed.

Once you have completed these steps, our team will assist you further in ensuring the proper deletion of your account.

:::note
Please note that account deletions are irreversible, so please ensure that you have backed up any important data or information before proceeding.
:::

## Technical

### Why is Civo powered by Kubernetes?

Kubernetes is a container orchestration platform that is highly efficient and dependable. Because of its robust design, components, and resources, Kubernetes offers excellent application administration and scaling. Civo intends to provide users with an easy-to-use and powerful cloud platform for deploying and managing containerized applications by using the capabilities of Kubernetes.

Dive into Civo's [comprehensive Kubernetes guide](https://www.civo.com/blog/kubernetes-comprehensive-guide), which covers a wide range of subjects, including Kubernetes architecture, components, and resources, to help you efficiently manage and grow your applications. 

### What is K3s?

In 2019, SUSE (formally Rancher Labs) launched ‘K3s’ to create a seamless distribution of Kubernetes which aimed to have lighter system requirements and quicker start-up times when launching a cluster. Civo Kubernetes clusters are deployed as K3s clusters by default.

Read more about K3s [here](https://www.civo.com/blog/understanding-k3s).

### Should I use K3s or K8s?

K3s is a fully-compatible and full-featured Kubernetes. Its lighter resource overhead makes it ideal for smaller deployments, resource-limited settings, edge computing, or IoT, but given its simplified and opinionated setup, as well as lower resource consumption, it is a cost-effective choice for any number scenarios.

Upstream Kubernetes (K8s) is requires a cluster administrator to configure and manage a larger set of components in comparison to K3s. Traditionally, K8s is seen as suited for large-scale, intricate workloads needing high scalability, performance, and availability, which can all be configured by the administrator.

It's crucial to assess your specific needs, resources, and objectives, as both K3s and K8s have particular advantages, to make an informed choice.

Read more about the core differences between K3s and K8s [here](https://www.civo.com/blog/k8s-vs-k3s).

### What can I use k3s for?

Take a look at [this blog post](https://www.civo.com/blog/understanding-k3s) that explores use cases and the advantages K3s gives you. 

### What is Talos Linux?

Sidero Labs developed Talos Linux as a way to run Kubernetes consistently across all platforms, such as Edge, Cloud, Virtual, and Bare Metal. Talos Linux is a secured Linux distribution designed specifically for managing Kubernetes.

Read more about Talos Linux [here](https://www.civo.com/blog/introduction-talos-linux).

### Why does Civo use Talos Linux?

We have introduced the option of Talos Linux for our managed Kubernetes clusters. Talos Linux provides a more robust and customizable platform with advanced security features that allow for specialized use cases and strong security measures out of the box, and is designed to be a minimal platform purely for running Kubernetes.

### Should I choose K3s or Talos Linux?

While K3s is a lightweight and easy-to-use Kubernetes distribution with good performance and strong community support, we found that Talos Linux is better suited for larger and more complex deployments with a security-focused architecture.

Want to know which to choose for your project? Read our Talos vs. K3s blog [here](https://www.civo.com/blog/k3s-vs-talos-linux).

## Civo Kubernetes

### Can I administer my Kubernetes clusters from the command line?

We have written a comprehensive CLI tool to manage virtual machine instances, Kubernetes clusters, and anything else to do with your Civo account. You can find out how to [set it up here](https://www.civo.com/docs/overview/civo-cli).

You can also watch [this video](https://www.youtube.com/watch?v=5Hm6jzd77J4) for a run-through of launching a cluster both from the Civo CLI and from the dashboard.

### Can I run the CLI in Docker?

If you do not want to have the tool set up locally, you can run it as a Docker Alias and map your API key to the alias with [these instructions](https://github.com/civo/cli#docker-usage).

### Are there any ports blocked on Civo services, and what is the recommendation for sending emails?

By default, outbound mail traffic (SMTP on Port 25, 465 & 587) from Civo instances is blocked. We recommend using any of the well-regarded mail services available as an email alternative. However, depending on your use case, our team can open the SMTP port if you request to open the SMTP port. 

Apart from Port 25, 465 & 587/SMTP, no other particular ports are blocked on Civo services. If you experience any issues while trying to use a specific port, please contact us, and we will investigate the problem.

### Can I connect to my cluster nodes with SSH?

To provide consistency and predictability of service for Civo managed Kubernetes, SSH connections to the cluster nodes are not supported. While there are documented ways for you to execute into nodes given the credentials you already have, any changes you make this way risk breaking your cluster or preventing access to it, and are not supported. If you want to fully customize your cluster, you can create one using our [infrastructure-as-a-service instances](https://dashboard.civo.com/instances) as nodes.

Another reason there is no SSH access is that we want to keep our options open about the underlying architecture of the managed Kubernetes service, and thus want to make sure users will experience a consistent service.

### Why can't I see my cluster nodes on the instances page?

Related to the question above, because the nodes themselves are not accessible via SSH or managed outside the cluster, they will not appear as separate instances. If you need to restart a particular node, you can click on the "recycle" button on the cluster interface page.

### Can I start a cluster without any pre-installed applications?

Civo Kubernetes runs the K3s distribution of Kubernetes. By default, K3s starts with Traefik as an Ingress Controller on all new clusters. This is to allow connections to your cluster without extra configuration on your part. You can prevent Traefik from being installed when you start a cluster by deselecting it in the [web UI](../kubernetes/create-a-cluster.md) (under 'Architecture') or by adding `--remove-applications=Traefik` to your [Civo CLI](../overview/civo-cli.md) cluster creation command.

:::info
Remember that starting up a cluster with no Ingress Controller means you will manually have to configure one to allow access to applications.
:::

### Do all nodes on Kubernetes clusters have public IP addresses?

Your cluster has one public IP address. It receives traffic to your cluster and routes it to your worker nodes. This is part of the control plane functionality managed by Civo. You can also configure additional [Kubernetes load balancers](https://www.civo.com/docs/kubernetes/load-balancers) that will get their own public IP addresses.

### Can I change the underlying operating system running Kubernetes?

Depending on whether you choose a K3s or Talos cluster, the operating system will either be Alpine Linux or Talos Linux. We aim for the underlying operating system to be as lightweight as possible to allow for maximum resources to be allocated to Kubernetes and your applications. To this end, we may change the underlying OS, but as this is a managed service, this will be the same for all users.

### Can I pool different-sized nodes into the same cluster?

You can create [node pools](../kubernetes/managing-node-pools.md) in your cluster. This means you can have nodes of different sizes (e.g., 2x medium, 2x large) in the same cluster, and they get labeled for your convenience. On your cluster, you will see node pools illustrated like this:

![Node pools](../kubernetes/images/node-pools-section.png)

### How do I delete a volume that was attached to a cluster I deleted?

If a Kubernetes volume you created was not deleted prior to your cluster being deleted, you can use the [Civo CLI](../overview/civo-cli.md) command-line client to delete them by running `civo volumes delete <VOLUME-NAME> --region <REGION-NAME>`.

### Why does a Civo Kubernetes cluster come with an ingress controller bundled in?

The lightweight Kubernetes distribution we use, K3s, bundles a few components into a cluster. This is to allow developers and users the quickest way to get up and running. K3s is an opinionated but flexible distribution of Kubernetes.

## Networking

### How do I set up a firewall for my instances or clusters?

A firewall lets you control the incoming and outgoing network traffic from your cluster or instance. The Default firewall in each region has all ports open, but we strongly recommend you customize your firewalls for security reasons. Find out all the information about [setting up your firewall](https://www.civo.com/docs/networking/firewalls) in our documentation.

### Can I create a private network between my Civo instances?

Networks provide isolation for your instances and Kubernetes clusters, separating groups of instances used for different purposes. When you create a resource such as a Kubernetes cluster, you can assign it to a specific network. Find out all the information about [setting up a private network](https://www.civo.com/docs/networking/private-networks) in our documentation.

## API and Integration

### How can I access and use the Civo API?

To access and use the Civo API, you need to send HTTP requests to the API endpoints along with your [API key](../account/api-keys.md) for authentication. You can find more information about the available endpoints and resources in the [Civo API documentation](https://www.civo.com/api).

## Community and Support

### How can I learn more about Kubernetes? 

Learn Kubernetes for free with [Civo Academy](https://www.civo.com/academy). We've created over 50 video guides and tutorials that will help you navigate Kubernetes.

Additionally, we have many [Kubernetes tutorials](https://www.civo.com/learn/categories/kubernetes) hosted in our [tutorial section](https://www.civo.com/learn).  

### How can I get technical support?

If you have a technical issue with the Civo platform or a particular cluster or virtual machine, please raise a ticket by contacting us [here](https://www.civo.com/contact).

### General community support

If you have any queries about how to use Civo services, [join our Slack community](https://civo-community.slack.com/) to discuss it with Civo staff and community members. 

### Where can I find the Civo community?

We have a [Civo community Slack](https://civo-community.slack.com/) which all our users are invited to join. 

Staff and Ambassadors will have a logo next to their names to make them easily identifiable.

Ambassadors are trusted and knowledgeable community members who will be glad to help out if you have questions about the service.

## Marketplace

### How can I contribute an app to the marketplace?

The Civo Marketplace is open source. If you do not see an application on the [Civo Marketplace](https://www.civo.com/marketplace) and believe it should be available, you can raise a Pull Request on the Marketplace GitHub repository. See the ["Contributing" document](https://github.com/civo/kubernetes-marketplace/blob/master/CONTRIBUTING.md) for more information.

### Can I remove an installed marketplace application?

At the moment, the only way to remove a marketplace application is by running `kubectl delete -f` on the resource and manifest files which can be found in the [Marketplace git repository](https://github.com/civo/kubernetes-marketplace). Please note that while the marketplace application will get removed from your cluster, this will not be reflected on the web UI for the moment.

We are working on a new version of the Civo Marketplace which would allow for installation and uninstallation at will.

