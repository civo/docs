---
title: Storage, extensions and parameters for Civo PostgreSQL
description: Learn how to grow the storage of a Civo PostgreSQL database, enable PostgreSQL extensions such as pgvector and pgaudit, and set server parameters with the Civo CLI.
---

<head>
  <title>Storage, extensions and parameters for Civo PostgreSQL | Civo Documentation</title>
</head>

# Storage, extensions and parameters

You can grow the storage of a PostgreSQL database beyond its plan, enable PostgreSQL extensions, and set server parameters. All three are changed with `civo database update` and shown by `civo database show`.

:::note
These options need Civo CLI v1.6.0 or later. Run `civo update` to upgrade.
:::

## Storage

Each database size includes an amount of storage per node. Grow every node's storage with `--storage`, in GB:

```console
civo database update postgres-demo --storage 120
```

Storage can only be increased, never shrunk. The GB beyond the plan are billed as a storage add-on, and `civo database show` reports the split:

```console
Storage : 120 GB (40 GB plan + 80 GB add-on)
```

## Extensions

List the extensions available in the current region:

```console
civo database extension list
```

```console
+--------------------+---------------------------------------------------------------------+------------+------------------+
| Name               | Description                                                         | Versions   | Requires Restart |
+--------------------+---------------------------------------------------------------------+------------+------------------+
| pg_repack          | Reorganize tables online with minimal locks. ...                    | 16, 17, 18 | No               |
| pg_stat_monitor    | Query performance monitoring for PostgreSQL. ...                    | 16, 17, 18 | Yes              |
| pg_stat_statements | Track planning and execution statistics of all SQL statements. ...  | 16, 17, 18 | Yes              |
| pgaudit            | Detailed session and object audit logging.                          | 16, 17, 18 | Yes              |
| pgvector           | Open-source vector similarity search for PostgreSQL.                | 16, 17, 18 | No               |
+--------------------+---------------------------------------------------------------------+------------+------------------+
```

Enable extensions with a comma-separated list:

```console
civo database update postgres-demo --extensions pgvector,pg_stat_statements
```

`--extensions` replaces the current set, so include every extension you want to keep. Pass `--extensions ""` to disable them all.

Extensions marked **Requires Restart** trigger a brief rolling restart of the database when they are enabled or disabled. `pg_stat_monitor` and `pg_stat_statements` cannot be enabled together.

## Parameters

Set PostgreSQL server parameters as `key=value`. Repeat `--parameter` for each one:

```console
civo database update postgres-demo --parameter max_connections=200 --parameter shared_buffers=1GB
```

The parameters given replace the current custom parameters, so include every parameter you want to keep.

## Viewing the configuration

`civo database show` prints the storage, the enabled extensions and the custom parameters:

```console
civo database show postgres-demo
...
Storage    : 120 GB (40 GB plan + 80 GB add-on)
Extensions : pg_stat_statements, pgvector
Parameters : max_connections=200, shared_buffers=1GB
```

A database with three nodes also gets a read-only endpoint, shown as `Read-only Host` and `Read-only Port`, which spreads read queries across the replicas.
