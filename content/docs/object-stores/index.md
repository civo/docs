---
sidebar_position: 1
description: Documentation for Civo Object stores, an S3-compatible service for storing and accessing data
---
# Object stores

## Introduction

The Civo object store is a managed service that allows you to upload unstructured data in an S3-compatible system.

Interacting with Civo Object stores is through an S3-compatible API. You can use [s3cmd](https://github.com/s3tools/s3cmd) for this purpose, or another S3 client of your choice. This documentation assumes use of s3cmd.

Civo object stores are region-specific. This means that the endpoint URL for an object store will depend on the region where you create a store, and credentials to manage and access object stores are tied to the region where they were created.