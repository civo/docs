---
title: Creating a MySQL Database Dump
description: Learn how to create complete backups of your Civo managed MySQL database using mysqldump for backup, migration, or development purposes.
---

<head>
  <title>Creating MySQL Database Dumps | Civo Documentation</title>
</head>

# Creating a MySQL Database Dump

**Need to create a backup of your MySQL database?**  

This guide shows how to create a complete dump of your Civo managed MySQL database for backup, migration, or analysis purposes.

## Why create a MySQL dump?

- **Data backup** – Create a complete backup of your database structure and data.  
- **Migration preparation** – Export data for moving to another database system.  
- **Development copies** – Create snapshots for development or testing environments.  
- **Data analysis** – Export data for analysis or reporting purposes.  

## Important: MySQL 8.0 Deprecation Notice

**MySQL 8.0 managed databases are being deprecated on Civo.** While you can still create MySQL dumps from existing MySQL 8.0 instances, consider these alternatives for future deployments:

### Alternative Options:
- **Self-managed MySQL on Civo Instances** – Install and manage MySQL 8.0 yourself on a Civo compute instance

:::tip
If you need to continue using MySQL 8.0 after the managed service deprecation, you can deploy it on Civo infrastructure using:
- [Create a MySQL server on a Civo Compute Instance](create-mysql-instance.md) - Step-by-step guide for self-hosting MySQL
- [Civo Compute Instances](../../compute/create-an-instance.md) with manual MySQL installation
:::

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Civo Dashboard access | You need to view MySQL connection info. |
| MySQL client tools | `mysqldump` and `mysql` installed locally. |
| Disk space | Enough room for the dump file (usually a few GB). |

## Creating the Dump

### Step 1: Retrieve connection info for the MySQL DB  

1. Log in to the **Civo Dashboard**.  
2. Open your MySQL instance.  
3. Note the **host (IP)**, **port**, **database name**, **username** (default `root`), and **password**.

### Step 2: Create a complete MySQL dump  

Create a dump of all your MySQL databases:

```bash
mysqldump -u root -h <MYSQL_IP> --single-transaction --all-databases -p > db.sql
```

*What each flag does*  

| Flag | Purpose |
|------|---------|
| `-u root` | MySQL user (use your actual username) |
| `-h <MYSQL_IP>` | Target MySQL server |
| `--single-transaction` | Ensure consistent backup |
| `--all-databases` | Include all databases in the dump |
| `-p` | Prompt for password |
| `> db.sql` | Write output to a file |

Enter the MySQL password when prompted.

### Step 3: Verify the dump  

```bash
ls -lh db.sql
```

- File should exist in the current directory.  
- Size should be non‑zero.  
- Optional: `head db.sql` to glance at the content.

## Alternative Dump Options

Depending on your needs, you might want different dump configurations:

### Single Database Dump
If you only need one specific database:
```bash
mysqldump -u root -h <MYSQL_IP> --single-transaction -p <DATABASE_NAME> > single_db.sql
```

### Structure Only (No Data)
To dump only the database structure without data:
```bash
mysqldump -u root -h <MYSQL_IP> --no-data --all-databases -p > structure_only.sql
```

### Data Only (No Structure)
To dump only the data without structure:
```bash
mysqldump -u root -h <MYSQL_IP> --no-create-info --all-databases -p > data_only.sql
```

### Compressed Dump
For large databases, you can compress the output:
```bash
mysqldump -u root -h <MYSQL_IP> --single-transaction --all-databases -p | gzip > db.sql.gz
```

## Troubleshooting

| Symptom | Possible cause | Fix |
|---------|----------------|-----|
| `Connection refused` | Wrong IP/port or firewall | Verify settings in the dashboard. |
| `Password authentication failed` | Incorrect password | Re‑copy the password from the dashboard. |
| `Access denied` for user | User lacks necessary privileges | Ensure user has SELECT privileges on all databases. |
| Dump file is empty or very small | Connection issues or no data | Check connection and verify database contains data. |
| `Got error: 2013` during dump | Connection timeout | Add `--single-transaction` and `--quick` flags. |
| Large dump takes too long | Database size or network | Use compression or dump specific databases separately. |

## Using Your Dump File

Once you have your MySQL dump file, you can:

- **Restore to another MySQL server:**
  ```bash
  mysql -u root -h <TARGET_IP> -p < db.sql
  ```

- **Import specific database:**
  ```bash
  mysql -u root -h <TARGET_IP> -p <DATABASE_NAME> < single_db.sql
  ```

- **Analyze the dump content:**
  ```bash
  grep "CREATE TABLE" db.sql
  grep "INSERT INTO" db.sql | wc -l
  ```

## Next Steps After Creating Your Dump

With MySQL 8.0 managed databases being deprecated, consider these options for your data:

### Option 1: Self-managed MySQL on Civo Instance
1. Follow our [Create a MySQL server on a Civo Compute Instance](create-mysql-instance.md) guide
2. Restore your dump to the new MySQL instance
3. Configure security and backups as needed

## Need Help?

- Open a ticket with [Civo Support](https://support.civo.com/tickets-view).  
- Consult the official [MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) for more mysqldump options.

*Happy dumping!*
