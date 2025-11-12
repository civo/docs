---
title: Migrating Your Database from PostgreSQL 14 to PostgreSQL 17
description: Learn how to safely migrate your Civo managed PostgreSQL 14 database to PostgreSQL 17 with step‑by‑step instructions, prerequisites, and troubleshooting tips.
---

<head>
  <title>Migrating Your Database from PostgreSQL 14 to PostgreSQL 17</title>
</head>

Migrating a PostgreSQL database to Civo involves careful planning to ensure a seamless transition with minimal downtime. This guide outlines the steps to migrate your PostgreSQL database using the backup and restore method.

## Pre-Migration Considerations

- It is crucial to stop all write operations to the database during migration to maintain data integrity.
- Choose a migration time that minimizes downtime and has the least impact on business operations, considering the data volume and migration duration.

## Prerequisites

- A Civo Postgres database instance should already be in place with connection details on hand. To create a new database you can follow our getting started guide.
- Confirm the availability of the `pg_dump` utility on your system for database copying. (https://www.postgresql.org/docs/current/app-pgdump.html)

### Details Needed for Migration

- Source PostgreSQL host IP address or DNS FQDN.
- Source PostgreSQL username and password.
- Civo database IP address or DNS FQDN.
- Civo database username and password.
- Database name(s) to migrate.

### If External Connections Are Prohibited

If the source PostgreSQL server does not allow external connections, you'll need to transfer the database backup to a host that can connect to the Civo database.

### PostgreSQL Version Compatibility Considerations

When transferring a database using <code>pg_dump</code> and <code>pg_restore</code> in PostgreSQL, version compatibility is a crucial consideration. Both utilities should ideally be the same or very close in version to ensure a smooth transition.

While PostgreSQL is generally backward compatible, meaning you can restore a dump from an older version to a newer version, it's recommended to minimize the version gap. This helps avoid potential issues related to changes in data types, syntax, and features between versions, ensuring a more reliable and hassle-free database transfer process.

You can check the PostgreSQL version of your Civo database on your [Civo Dashboard](https://dashboard.civo.com/databases).

## PostgreSQL Database Migration Steps

### 1. Backup the Data

- Perform a backup of the existing database using the `pg_dump` command:

```bash
pg_dump -C -U [user] [database_name] -f [dump_file].sql
```

- To backup all databases, use `pg_dumpall`:

```bash
pg_dumpall -C -U [user] -f [dump_file].sql
```

:::tip
For databases that don't allow external connections, SSH into the server to execute these commands.
:::

- For external connections, specify the host and port using `-h` and `-p`:

```bash
pg_dump -C -h [host] -p 5432 -U [user] [database_name] -f [dump_file].sql
```

### 2. Transfer the Backup (Optional)

If necessary, use `scp` to move the backup to a machine that can connect to Civo:

```bash
scp [sshuser]@[PostgreSQL-host]:/path/to/backup.sql /tmp/
```

This copies `backup.sql` to the `/tmp` directory on the local machine.

### 3. Restore the Dump

- On a machine connected to Civo, use the `psql` command to restore the data:

```bash
psql -h [civo_host] -U [civo_username] [civo_database] < [dump_file].sql
```

- For example, to restore a single database named `productiondb`:

```bash
psql -h 74.220.31.116 -U root productiondb < backup.sql
```

## Key Points to Remember

- The `-U` flag is used to specify the PostgreSQL username, and ensure to replace the bracketed placeholders with actual values.
- The correct port, typically 5432, should be used unless the PostgreSQL instance is configured to use a different one.
- Replace `[civo_host]`, `[civo_username]`, `[civo_database]`, and `[dump_file].sql` with the corresponding details for the Civo database.

## Post-Migration Validation

### Data Integrity and Consistency

After the database restoration process, it's essential to verify that all the data has been migrated correctly. This can involve:

- Checking the counts and consistency of records in tables.
- Running integrity checks or using built-in database validation tools.
- Comparing data samples between the old and new databases.

### Update Application Configurations

Applications that were connected to the old database instance will need to be updated to connect to the new database on Civo. This typically involves:

- Updating the database connection strings in application configuration files or environment variables.
- Ensuring that any user accounts and permissions required by the applications are correctly set up on the new Civo database.
- Testing the application to ensure it can connect to and interact with the new database without issues.

By following these detailed steps, your Postgres database migration to Civo should be executed smoothly with data integrity preserved.
