---
sidebar_position: 1
title: Object stores
description: Upload unstructured data easily with Civo Object Store, an S3-compatible managed service. Use an S3 client to interact with region-specific object stores.
---

<head>
  <title>Data Management with Civo Object Stores | Civo Documentation</title>
</head>

## Introduction

The Civo object store is a managed service that allows you to upload unstructured data in an S3-compatible system.

Interacting with Civo object stores is through an S3-compatible API. You can use [s3cmd](https://github.com/s3tools/s3cmd) for this purpose, or another S3 client of your choice. This documentation assumes use of s3cmd.

Civo object stores are region-specific. This means that the endpoint URL for an object store will depend on the region where you create a store, and credentials to manage and access object stores are tied to the region where they were created. Object store availability per region can be found in [the Region features overview](../overview/regions.md#what-products-are-available-per-region).
