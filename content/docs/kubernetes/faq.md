---
title: FAQs for Civo Kubernetes 
description: Frequently asked questions about Civo Kubernetes clusters.
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <title>FAQs for Civo Kubernetes | Civo Documentation</title>
</head>


### Why can I only launch 8 pods per node?
We've set this pod limit on nodes with extremely limited resources(less than 2GB RAM) to prevent the node from being overloaded as it can cause down time for your application. Currently, we've this limit set on g4s.kube.small and g4s.kube.xsmall instances.


### Why hasn't OTEL collector been deployed on my nodes?
We've set scheduling constraints on the OTEL daemonset to ensure it's not scheduled on nodes with extremely limited resources(less than 2GB RAM) to prevent the node from being overloaded as it can cause down time for your application. Currently, we've this limit set on g4s.kube.small and g4s.kube.xsmall instances.