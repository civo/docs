---
title: MySQL Database migration to Civo
description: Migrate your MySQL database to Civo with this step-by-step guide. Ensure data accuracy and minimize downtime with our backup and restore method.
---

<head>
  <title>MySQL Database Migration to Civo | Civo Documentation</title>
</head>

Migrating a MySQL database to Civo is a process that needs meticulous planning to ensure data integrity and minimal downtime. This guide outlines the backup and restore method for migrating your MySQL database to a Civo MySQL database.

## Pre-Migration Considerations

- Halt or limit database operations, especially write actions, to prevent data discrepancies during the migration.
- Schedule the migration at a time that will least affect business operations, taking into account the migration duration and data volume.

## Prerequisites
- A Civo MySQL database instance should already be in place with connection details on hand. To create a new database you can follow our getting started guide. 
- Confirm the availability of the `mysqldump` utility on your system for database copying.

### Details Needed for Migration
- Source MySQL host IP address or DNS FQDN.
- Source MySQL username and password.
- Target Civo database IP address or DNS FQDN.
- Target Civo database username and password.
- Names of the databases to migrate, if not moving all.

### If External Connections Are Prohibited
An additional step to transfer the backup to a host that can connect to Civo is required if your MySQL server restricts external connections.

## MySQL Database Migration Steps

### 1. Backup the Data

- Use `mysqldump` to create a backup of the existing database:

```bash
mysqldump -u [username] -p[password] [database] > backup.sql
```

- For external connections, include host and port details:

```bash
mysqldump -h [host] -P [port] -u [username] -p[password] [database] > backup.sql
```

- To back up all databases, use `--all-databases`:

```bash
mysqldump -u [username] -p[password] --all-databases > backup.sql
```

- For specific databases, use `--databases` with the database names:

```bash
mysqldump -u [username] -p[password] --databases [database1] [database2] > backup.sql
```

- Options for schema-only or data-only backups:
  - Schema only (no data): `--no-data`
  - Data only (no schema information): `--no-create-info`

### 2. Transfer the Backup (Optional)

Securely move the backup file using `scp`:

```bash
scp sshuser@mysql-host.com:/path/to/backup.sql /tmp/
```

### 3. Restore the Dump

- On a system that can connect to Civo, use the `mysql` command to restore the backup:

```bash
mysql -h [civo_host] -u [civo_username] -p[password] [civo_database] < backup.sql
```

- Example for restoring to a Civo instance:

```bash
mysql -h 74.220.31.116 -u root -p < backup.sql
```

## Key Points to Remember

- The -u flag is used to specify the MySQL username, and you should replace the bracketed placeholders with actual values.
- The correct port for MySQL is typically 3306, unless the MySQL instance is configured to use a different one. Civo MySQL databases use 3306.
- Replace [civo_host], [civo_username] and [civo_database] with the corresponding details for the Civo MySQL database.

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

By following these detailed steps, your MySQL database migration to Civo should be executed smoothly with data integrity preserved.
