---
title: Manage your DNS Records
description: Manage your domains and DNS records on Civo easily. Learn how to add, list, and delete domains and DNS records, and configure internal load balancers within your private network.
sidebar_position: 2
---

<head>
  <title>Manage your DNS Records | Civo Documentation</title>
</head>

### Introduction

We host reverse DNS for all instances automatically. If you'd like to manage forward (normal) DNS for your domains, you can do that for free within your account.

This section is effectively split in to two parts: 1) Managing domain names themselves, and 2) Managing records within those domain names.

We don't offer registration of domains names, this is purely for hosting the DNS. If you're looking to buy a domain name, we recommend  [LCN.com](https://www.lcn.com/)  for their excellent friendly support and very competitive prices.

### Set Up a New Domain

Any user can add a domain name (that has been registered elsewhere) to be managed by Civo.com. You should adjust the nameservers of your domain (through your registrar) to point to  `ns0.civo.com`  and  `ns1.civo.com`.

The command to set up a new domain is `civo domain create domainname`:

```sh
$ civo domain create civoclidemo.xyz
Created a domain called civoclidemo.xyz with ID 418181b2-fcd2-46a2-ba7f-c843c331e79b
```

You can then proceed to add DNS records to this domain.

### List Domain Names
To see your created domains, call `civo domain list`:

```sh
$ civo domain list
+--------------------------------------+-----------------+
| ID                                   | Name            |
+--------------------------------------+-----------------+
| 418181b2-fcd2-46a2-ba7f-c843c331e79b | civoclidemo.xyz |
+--------------------------------------+-----------------+
```

### Deleting a Domain

If you choose to delete a domain, you can call `civo domain remove domain_id` and have the system immediately remove the domain and any associated DNS records. This removal is immediate, so use with caution.

### Creating a DNS Record

A DNS record creation command takes a number of options in the format `civo domain record create domain_id [options]` and the options are this.

```text
Options:
-n, --name string    the name of the record
-p, --priority int   the priority of record only for MX record
-t, --ttl int        The TTL of the record (default 600)
-e, --type string    type of the record (A, CNAME, TXT, SRV, MX)
-v, --value string   the value of the record
```

Usage is as follows:

```sh
$ civo domain record create civoclidemo.xyz -n www -t 600 -e A -v 192.168.1.1

Created a record www1 for civoclidemo.xyz with a TTL of 600 seconds and with a priority of 0 with ID 4e181dde-bde8-4744-8984-067f957a7d59
```

### Listing DNS Records
You can get an overview of all records you have created for a particular domain by requesting `civo domain record list domain.name`:

```sh
$ civo domain record list civoclidemo.xyz
+--------------------------------------+------+---------------------+-------------+------+----------+
| ID                                   | Type | Name                | Value       | TTL  | Priority |
+--------------------------------------+------+---------------------+-------------+------+----------+
| 4e181dde-bde8-4744-8984-067f957a7d59 | A    | www.civoclidemo.xyz | 192.168.1.1 | 1000 | 0        |
+--------------------------------------+------+---------------------+-------------+------+----------+
```
### Deleting a DNS Record
You can remove a particular DNS record from a domain you own by requesting `civo domain record remove record_id`. This immediately removes the associated record, so use with caution:

```sh
$ civo domain record remove 4e181dde-bde8-4744-8984-067f957a7d59
The domain record called www with ID 4e181dde-bde8-4744-8984-067f957a7d59 was deleted
```
