---
title: Upgrading a Civo PostgreSQL Database
description: Learn how to upgrade the engine release of your Civo PostgreSQL databases and upgrade a database in place to a newer PostgreSQL major version, such as 17 to 18, with the Civo CLI.
---

<head>
  <title>Upgrading a Civo PostgreSQL Database | Civo Documentation</title>
</head>

# Upgrading a PostgreSQL database

There are two kinds of upgrade, and neither happens until you run it:

- An **engine upgrade** moves the databases on a network to a newer engine release, which brings newer PostgreSQL versions and fixes.
- A **major version upgrade** moves one database to a newer PostgreSQL major version, for example from 17 to 18, keeping its data, endpoint and credentials.

:::note
Upgrades need Civo CLI v1.6.0 or later. Run `civo update` to upgrade.
:::

`civo database show` reports what is available:

| Field | Meaning |
|---|---|
| `Engine` | The engine release the database runs on |
| `Upgrade Available` | The engine release it can be upgraded to |
| `Major Upgrades Available` | The PostgreSQL major versions it can be upgraded to |
| `Version Upgrade` | Progress of the latest major version upgrade |

## Engine upgrades

All the databases on the same network share an engine release, which decides the PostgreSQL versions they can run. They are upgraded together, and each one restarts during the upgrade, possibly more than once as the engine steps through releases.

Check first what an upgrade would do with `--dry-run`. It prints the databases that would restart and changes nothing:

```console
civo database upgrade postgres-demo --dry-run
```

```console
Upgrading postgres-demo would move the engine from 2.7.0 to 3.1.0 and restart: analytics, postgres-demo
```

Then run the upgrade. The CLI names every database that will restart and asks for confirmation:

```console
civo database upgrade postgres-demo
```

```console
Warning: Are you sure you want to upgrade the engine from 2.7.0 to 3.1.0 for analytics, postgres-demo (each restarts during the upgrade) (y/N) ? y
Upgrading the engine from 2.7.0 to 3.1.0 for analytics, postgres-demo. Each database restarts during the upgrade; follow progress with civo db show.
```

By default the upgrade goes to the release `civo database show` reports as `Upgrade Available`. `--version` picks a specific release instead, and `--yes` skips the confirmation.

Some PostgreSQL versions need a newer engine. For example, PostgreSQL 18 needs engine 3.1.0, so `civo database create --version 18` on a network still on 2.7.0 is refused until that network's engine is upgraded.

## PostgreSQL major version upgrades

`--postgres-version` upgrades one database in place to a newer PostgreSQL major version.

### Pre-flight checks

Before anything changes, the API runs pre-flight checks. They confirm that:

- the database is PostgreSQL and the target is a newer major version
- the database is not on the legacy PostgreSQL 14 platform (see [Migrating from PostgreSQL 14 to 17](./migrate-from-14-to-17.md))
- its engine can run the target, and the region offers it
- the database is ready and no other upgrade is in progress
- every enabled extension is available for the target

The CLI prints every check the API returns, so this list may grow. `--dry-run` only runs the checks, and exits with a non-zero code when one fails, so you can also use it as a readiness check in scripts:

```console
civo database upgrade postgres-demo --postgres-version 18 --dry-run
```

```console
+------------------------+--------+--------+
| Check                  | Result | Detail |
+------------------------+--------+--------+
| postgresql             | passed |        |
| target_newer           | passed |        |
| not_legacy             | passed |        |
| engine_supports_target | passed |        |
| target_offered         | passed |        |
| database_ready         | passed |        |
| no_operation_in_flight | passed |        |
| extensions_available   | passed |        |
+------------------------+--------+--------+
All checks passed: postgres-demo can be upgraded from PostgreSQL 17 to 18.
```

If a check fails, it is printed the same way and nothing is upgraded. A failed `engine_supports_target` check means the network needs an [engine upgrade](#engine-upgrades) first.

### Running the upgrade

When every check passes, the CLI explains what happens and asks for confirmation:

```console
civo database upgrade postgres-demo --postgres-version 18
```

```console
Upgrading from PostgreSQL 17 to 18:
  - a backup is taken first and kept; its name is shown once the upgrade starts
  - the database stops for a few minutes while its data is upgraded
  - replicas re-sync afterwards; until then there is no high availability or read-only endpoint
  - point-in-time restore starts again from the first backup on PostgreSQL 18
  - there is no downgrade; to go back, restore that backup into a new database
Warning: Are you sure you want to upgrade postgres-demo from PostgreSQL 17 to 18 (y/N) ? y
Upgrading postgres-demo from PostgreSQL 17 to 18. A backup named pre-upgrade-pg18 is taken first; follow progress with civo db show postgres-demo.
```

The backup is normally named `pre-upgrade-pgN`. If an earlier attempt at the same major version kept its backup, the new one gets a timestamp suffix.

Plan the upgrade for a quiet period: the database is unavailable for a few minutes while its data is upgraded.

### Following progress

`civo database show` reports the progress as `Version Upgrade`: `BackingUp`, `Upgrading`, `Finalizing`, then `Completed`, or `Failed` with a message.

There is no downgrade. The backup taken before the upgrade is kept and appears in `civo database backup ls`.
