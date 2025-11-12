---
title: Migrating Your Database from PostgreSQL 14 to PostgreSQL 17
description: Learn how to safely migrate your Civo managed PostgreSQL 14 database to PostgreSQL 17 with step‑by‑step instructions, prerequisites, and troubleshooting tips.
---

<head>
  <title>Migrating Your Database from PostgreSQL 14 to PostgreSQL 17</title>
</head>

# Migrating Your Database from PostgreSQL 14 to PostgreSQL 17

**PostgreSQL 14 reaches end‑of‑life on 12 Nov 2026.**  

Plan your move to PostgreSQL 17 now. This guide shows how to migrate a Civo managed database safely and efficiently.

## Why upgrade to PostgreSQL 17?

- **Stronger security** – new authentication and encryption options.  
- **Better performance** – faster query planning and execution.  
- **New features** – logical replication improvements, JSON handling, etc.  
- **Longer support window** – ensures stability for the coming years.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Civo Dashboard access | You need to view connection info and create a new database. |
| PostgreSQL client tools | `pg_dump` and `psql` installed locally. |
| Disk space | Enough room for the dump file (usually a few GB). |

## Migration Steps

### Step 1: Retrieve connection info for the PostgreSQL 14 DB  

1. Log in to the **Civo Dashboard**.  
2. Open your PostgreSQL 14 instance.  
3. Note the **host (IP)**, **port**, **database name**, **username** (default `civo`), and **password**.


### Step 2: Create a dump file  

To execute the dump execute the following command over your database

```bash
pg_dump -h <IP_ADDRESS> -p 5432 -U civo --no-owner --schema public postgres > backup_civo_database.sql
```

*What each flag does*  

| Flag | Purpose |
|------|---------|
| `-h <IP_ADDRESS>` | Target server |
| `-p 5432` | Port |
| `-U civo` | User |
| `--no-owner` | Omit ownership data (helps when moving between servers) |
| `--schema public` | Dump only the `public` schema |
| `> backup_civo_database.sql` | Write output to a file |

Enter the password when prompted.

### Step 3: Verify the dump  

```bash
ls -lh backup_civo_database.sql
```

- File should exist in the current directory.  
- Size should be non‑zero.  
- Optional: `head backup_civo_database.sql` to glance at the content.

### Step 4: Provision a PostgreSQL 17 instance  

1. In the dashboard, go to **Create Database**.  
2. Choose **PostgreSQL 17**.  
3. Set name, size, region, etc.  
4. Click **Create** and wait for provisioning to finish.

### Step 5:  Restore the dump into PostgreSQL 17  

1. Grab the new instance’s connection string (e.g., `postgresql://civo@<NEW_IP>:5432/postgres?sslmode=require`).  

2. Test connectivity:
   ```bash
   psql "postgresql://civo@<NEW_IP>:5432/postgres?sslmode=require"
   ```
   Enter the password when asked. If the connection is up you can close the connection (type exit in the postgres connection cli).

3. Run the restore:

   ```bash
   psql postgresql://civo@<IP_ADDRESS>:5432/postgres?sslmode=require < backup_civo_only.sql
   ```

   Enter the password when asked. 

4. Confirm tables are present:

   ```bash
   psql "postgresql://civo@<NEW_IP>:5432/postgres?sslmode=require" -c "\dt"
   ```

### Step 6:  Update your application  

- Change the DB connection string to point to the new PostgreSQL 17 host.  
- Run tests in a staging environment.  
- Deploy the updated config to production.  
- Keep an eye on logs for any anomalies.

## Troubleshooting

| Symptom | Possible cause | Fix |
|---------|----------------|-----|
| `Connection refused` | Wrong IP/port or firewall | Verify settings in the dashboard. |
| `Password authentication failed` | Incorrect password | Re‑copy the password from the dashboard. |
| Restore errors (e.g., permission denied) | Dump includes objects you can’t create | Review the error, adjust dump flags, or grant needed rights. |
| Missing data after restore | Incomplete dump | Re‑run `pg_dump` and check file size. |

## Need Help?

- Open a ticket with [Civo Support](https://support.civo.com/tickets-view).  
- Consult the official [PostgreSQL documentation](https://www.postgresql.org/docs/) for deeper details on migration and compatibility.

*Happy migrating!*
