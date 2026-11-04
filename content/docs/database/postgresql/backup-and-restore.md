---
title: Backing up and restoring a Civo PostgreSQL Database
description: Learn how to create scheduled and manual backups of a Civo PostgreSQL database, send backups to another region or an S3-compatible bucket, and restore from a backup or to a point in time with the Civo CLI.
---

<head>
  <title>Backing up and restoring a Civo PostgreSQL Database | Civo Documentation</title>
</head>

# Backing up and restoring a PostgreSQL database

Civo PostgreSQL databases support scheduled and manual backups, restores from a backup, and point-in-time restores. This guide covers each of them with the [Civo CLI](../../overview/civo-cli.md).

:::note
Backup destinations and point-in-time restore need Civo CLI v1.6.0 or later. Run `civo update` to upgrade.
:::

## Scheduled backups

A scheduled backup runs on a cron schedule. Create one with a name and a schedule:

```console
civo database backup create postgres-demo --name nightly --schedule "0 3 * * *"
```

Change the name or schedule of the scheduled backup with `civo database backup update`:

```console
civo database backup update postgres-demo --name nightly --schedule "30 2 * * *"
```

### Backup destinations

Scheduled backups are stored in the Civo Object Store of the database's region unless you give a destination. Both `backup create` and `backup update` accept one:

- `--destination-region` stores the backups in the Civo Object Store of another region, which keeps a copy away from the database.
- The `--s3-*` flags store them in any S3-compatible bucket.

```console
civo database backup create postgres-demo --name offsite --schedule "0 3 * * *" --destination-region FRA1
```

```console
civo database backup create postgres-demo --name external --schedule "0 3 * * *" \
  --s3-endpoint https://s3.example.com --s3-bucket my-backups --s3-region eu-1 \
  --s3-access-key <ACCESS-KEY> --s3-secret-key <SECRET-KEY> --s3-path-prefix postgres-demo/
```

When updating an S3 destination, leave `--s3-secret-key` out to keep the current secret.

## Manual backups

A manual backup is taken once, on demand. It is useful before a risky change such as a migration or a bulk update:

```console
civo database backup create postgres-demo --name before-migration --type manual
```

Manual backups always stay in the database's region and cannot take a destination.

## Listing backups

```console
civo database backup ls postgres-demo
```

The list shows the scheduled backup with its schedule, and every backup taken, by name. Use those names to restore.

## Restoring from a backup

`civo database restore` restores the database in place from one of its backups. Everything written after that backup is lost, so the CLI asks for confirmation:

```console
civo database restore postgres-demo --name restore-nightly --backup 20261021-030012F
```

```console
Warning: Are you sure you want to restore db postgres-demo from 20261021-030012F backup (y/N) ? y
```

To recover the data without touching the original database, [fork it](./fork.md) instead.

## Point-in-time restore

A database can also be restored in place to any moment inside its restore window. The window starts at the oldest full backup kept for the database and ends now. `civo database show` prints its start as `Restore Window From`:

```console
civo database show postgres-demo
...
Restore Window From : 2026-10-21T00:00:00Z
```

Pass the moment to restore to with `--target-time`, in RFC 3339 format. An offset such as `2026-10-21T12:00:00+02:00` is accepted and converted to UTC:

```console
civo database restore postgres-demo --name restore-before-cleanup --target-time 2026-10-21T10:00:00Z
```

```console
Warning: Are you sure you want to restore db postgres-demo in place to its state at 2026-10-21T10:00:00Z (data written after that moment is lost) (y/N) ? y
Restoring database postgres-demo to its state at 2026-10-21T10:00:00Z. Data written after that moment is lost.
```

A [major version upgrade](./upgrades.md#postgresql-major-version-upgrades) starts the restore window again from the first backup on the new version.
