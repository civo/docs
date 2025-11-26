---
title: Create a MySQL server on a Civo Compute Instance
description: Step-by-step instructions to create a MySQL server on a Civo compute instance, secure it and prepare it for production or development use.
---

<head>
  <title>Create a MySQL server on a Civo Compute Instance | Civo Documentation</title>
</head>

# Create a MySQL server on a Civo Compute Instance

This guide shows how to create and configure a MySQL server on a Civo Compute Instance (virtual machine). It covers creating the instance, installing MySQL, basic hardening, opening firewall ports safely, and creating a database user.

> Note: Managed MySQL on Civo may be deprecated; this guide shows how to self-host MySQL on a Civo instance if you need to continue running MySQL 8.0.

## Prerequisites

- A Civo account with permission to create compute instances.
- An SSH key added to your Civo account (for SSH access to the instance).
- Basic familiarity with the Linux command line.

## Overview

Steps you'll perform:
1. Create a compute instance in the Civo dashboard.
2. SSH into the instance.
3. Install MySQL server.
4. Run the MySQL secure installation and create a database/user.
5. Configure network access and firewall rules.
6. Backup and maintenance tips.

## 1 — Create a compute instance

Use the Civo dashboard to create a new compute instance (VM):

1. Sign in to the Civo dashboard.
2. Go to **Create Instance** (or **Compute > Create an instance**).
3. Choose an image (Ubuntu 22.04 LTS or similar is recommended).
4. Select a size appropriate for your workload (CPU / RAM / disks).
5. Add your SSH key so you can log in.
6. Optionally set a hostname (e.g., `mysql-db`) and a persistent disk if needed.
7. Create the instance and wait until it is running.

Tip: If you prefer automation, you can create an instance using the Civo CLI. See the Civo compute docs for CLI usage.

## 2 — SSH into the instance

Copy the public IP from the dashboard and SSH in:

```bash
ssh ubuntu@<INSTANCE_IP>
```

Replace `ubuntu` with the correct default user for the image you chose (for some images it may be `civo` or `root`).

## 3 — Install MySQL Server

On Ubuntu/Debian based images:

```bash
sudo apt update
sudo apt install -y mysql-server
```

On CentOS/RHEL based images:

```bash
sudo dnf install -y @mysql
sudo systemctl enable --now mysqld
```

Verify MySQL is running:

```bash
sudo systemctl status mysql
# or on some distros
sudo systemctl status mysqld
```

## 4 — Secure MySQL and create a user

Run the interactive secure installation helper:

```bash
sudo mysql_secure_installation
```

Follow prompts to:
- Set or confirm the root password (if applicable)
- Remove anonymous users
- Disallow remote root login
- Remove the test database
- Reload privilege tables

Connect to MySQL to create a dedicated database and user:

```bash
sudo mysql -u root -p
```

Then inside the MySQL prompt:

```sql
CREATE DATABASE your_app_db;
CREATE USER 'appuser'@'%' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON your_app_db.* TO 'appuser'@'%';
FLUSH PRIVILEGES;
EXIT;
```

Notes:
- Using `'%'` allows connections from any host. For better security, replace `%` with a specific client IP or subnet.
- Use a strong password and consider using TLS for client-server encryption.

## 5 — Allow remote access (optional & secure)

By default MySQL binds to localhost. To allow remote connections (only if you need to):

1. Edit MySQL config (Ubuntu example):

```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
# find the bind-address line and change it to:
# bind-address = 0.0.0.0
```

2. Restart MySQL:

```bash
sudo systemctl restart mysql
```

3. Configure from the Dashboard a firewall to allow only the IPs that need access to the MySQL port (3306):

- Using Civo firewalls: create or update a firewall rule to allow TCP port 3306 from trusted IPs and attach it to the instance (see the Civo firewall docs).

**Important:** Never open port 3306 to the entire internet (0.0.0.0/0) unless you have a strict security requirement and additional protections (TLS, VPN, etc.).

## 6 — Backups and maintenance

Create a dump with `mysqldump` for old database or migration:

```bash
mysqldump -u civo -h <YOUR-DB-HOST> --single-transaction --all-databases -p > alldb.sql
```

Store backups off-instance (object storage or another safe location). Automate backups with cron and test restores regularly.


## Additional hardening and production tips

- Use TLS for MySQL connections (configure server and client certificates).
- Restrict access with firewall rules and use private networking where possible.
- Create a non-root MySQL admin account for day-to-day tasks.
- Monitor disk, CPU, memory, and MySQL metrics; configure alerts.
- Keep the OS and MySQL packages up to date.

## Troubleshooting Connection Issues

### Can't connect via SSH
If SSH connections timeout:
1. Check that the instance is running in the Civo dashboard
2. Verify the firewall attached to the instance allows SSH (port 22) from your IP
3. Try connecting from a different network to rule out local firewall issues

### Can't connect to MySQL
If MySQL connections hang or timeout:

1. **Test port connectivity:**
   ```bash
   telnet <INSTANCE_IP> 3306
   # or
   nc -zv <INSTANCE_IP> 3306
   ```

2. **Check if MySQL is listening on the instance:**
   ```bash
   ssh ubuntu@<INSTANCE_IP>
   sudo ss -tlnp | grep :3306
   ```

3. **Common issues and fixes:**

   | Problem | Cause | Solution |
   |---------|--------|----------|
   | Connection timeout | Firewall blocking port 3306 | Add firewall rule for port 3306 from your IP |
   | Connection refused | MySQL not configured for remote access | Edit `bind-address` in MySQL config |
   | Access denied | User doesn't exist or wrong permissions | Create user with proper host permissions |
   | SSL/TLS errors | SSL required but not configured | Add `--ssl-mode=DISABLED` to mysql command (dev only) |

4. **Quick firewall fix via Civo dashboard:**
   - Go to Networking > Firewalls
   - Edit the firewall attached to your instance
   - Add rule: TCP port 3306 from your public IP address
   - Apply the firewall to your instance

5. **Test connection step by step:**
   ```bash
   # First test SSH
   ssh ubuntu@<INSTANCE_IP>
   
   # Then test local MySQL connection
   sudo mysql -u root -p
   
   # Check MySQL config
   sudo grep bind-address /etc/mysql/mysql.conf.d/mysqld.cnf
   
   # Check if user exists
   SELECT user, host FROM mysql.user WHERE user='civo';
   ```

## Next steps and references

- Civo compute instance docs: ../../compute/create-an-instance.md
- Civo firewalls: ../../networking/firewalls.md
- MySQL documentation: https://dev.mysql.com/doc/

## Need help?

Open a ticket with [Civo Support](https://support.civo.com/tickets-view).

*Happy self-hosting!*