---
title: Forking a Civo PostgreSQL Database
description: Learn how to fork a Civo PostgreSQL database into a new, independent database from its latest backup or from a point in time, using the Civo CLI.
---

<head>
  <title>Forking a Civo PostgreSQL Database | Civo Documentation</title>
</head>

# Forking a PostgreSQL database

A fork is a new, independent database built from the backups of an existing one. The source database is not touched, which makes a fork the safe way to test a migration against real data, investigate an incident, or recover data deleted by mistake.

:::note
Forking needs Civo CLI v1.6.0 or later. Run `civo update` to upgrade.
:::

## Fork from the latest backup

By default a fork reflects the source database at its latest backup:

```console
civo database fork postgres-demo --name postgres-demo-copy --wait
```

```console
Database postgres-demo-copy has been forked from postgres-demo (its latest backup) in 4m12s
To get the credentials, run : civo db credential postgres-demo-copy
```

`--wait` keeps the CLI running until the new database is ready. Without it, follow progress with `civo database show postgres-demo-copy`.

## Fork from a point in time

`--target-time` forks the source as it was at that moment, in RFC 3339 format. The moment must be inside the source's restore window, whose start `civo database show` prints as `Restore Window From`:

```console
civo database fork postgres-demo --name postgres-demo-yesterday --target-time 2026-10-21T10:00:00Z
```

## Choosing the fork's settings

The fork keeps the source's size, node count, network and extensions unless you override them:

| Flag | Sets |
|---|---|
| `--size` | Size of the new database |
| `--nodes` | Number of nodes |
| `--network` | Network |
| `--firewall` | Firewall |
| `--storage` | Storage of every node, in GB |
| `--extensions` | Comma-separated extensions, replacing the source's |

```console
civo database fork postgres-demo --name postgres-demo-ha --size g3.db.medium --nodes 3
```

An empty `--extensions` still keeps the source's extensions. To drop some, fork first and then run `civo database update <NEW-NAME> --extensions ...` on the new database. See [Storage, extensions and parameters](./storage-extensions-parameters.md).

The fork is a separate database with its own credentials, endpoint and billing. Run `civo database credential <NEW-NAME>` to connect to it.
