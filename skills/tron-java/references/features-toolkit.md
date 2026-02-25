---
name: java-tron Toolkit
description: Toolkit.jar — DB archive, convert, copy, lite (split/merge), move, root; node maintenance.
---

# Toolkit (Toolkit.jar)

Toolkit.jar is built with java-tron in `build/libs/`. It provides node maintenance and DB operations. Run: `java -jar Toolkit.jar <command> [options]`.

## Commands

### db archive (x86 + LevelDB)

Reformat manifest for the current database. Compatible with ArchiveManifest behavior.

```bash
java -jar Toolkit.jar db archive [-h] [-b=<maxBatchSize>] [-d=<databaseDirectory>] [-m=<maxManifestSize>]
```

- **-d** — Database directory (default: output-directory/database).
- **-b** — Batch manifest size (default: 80000).
- **-m** — Minimum manifest size in MB; only optimize when manifest exceeds this (default: 0).

### db convert (x86 + LevelDB)

Convert LevelDB data to RocksDB.

```bash
java -jar Toolkit.jar db convert [-h] <src> <dest>
# e.g.
java -jar Toolkit.jar db convert output-directory/database /tmp/database
```

### db cp

Copy LevelDB or RocksDB by creating hard links (same file system). Fast clone for backups or duplicates.

```bash
java -jar Toolkit.jar db cp [-h] <src> <dest>
# e.g.
java -jar Toolkit.jar db cp output-directory/database /tmp/database
```

### db lite (LevelDB not on ARM)

Produce or use lite (split) datasets: snapshot vs history. For Lite FullNode workflows.

- **split** — Split full DB into snapshot and/or history datasets.
- **merge** — Merge snapshot and history back.

```bash
# split: snapshot
java -jar Toolkit.jar db lite -o split -t snapshot --fn-data-path output-directory/database --dataset-path /tmp
# split: history
java -jar Toolkit.jar db lite -o split -t history --fn-data-path output-directory/database --dataset-path /tmp
# merge
java -jar Toolkit.jar db lite -o merge --fn-data-path /tmp/snapshot --dataset-path /tmp/history
```

- **-o** — operate: split | merge (default: split).
- **-t** — type when splitting: snapshot | history (default: snapshot).
- **-fn / --fn-data-path** — FullNode database path.
- **-ds / --dataset-path** — For split: output path for snapshot/history; for merge: path to history dataset.

### db mv

Move selected DBs to new paths (e.g. move `block`, `trans` to HDD). Paths are defined in config `storage.properties`; then run:

```bash
java -jar Toolkit.jar db mv [-h] [-c=<config>] [-d=<database-directory>]
# e.g.
java -jar Toolkit.jar db mv -c main_net_config.conf -d /data/tron/output-directory
```

### db root (LevelDB; large DBs may hit GC limit)

Compute Merkle root for a tiny DB. Used for verification.

```bash
java -jar Toolkit.jar db root [-h] [<src>] [--db=dbname]
```

## Key Points

- **archive** and **convert** require x86 and LevelDB. **lite** is not available on ARM (LevelDB).
- Use **db cp** for quick copies on same filesystem; **db convert** when switching to RocksDB or moving across systems.
- **db mv** reads paths from config; set `storage.properties` for the DBs to move before running.

<!--
Source references:
- sources/tron-java/plugins/README.md
- https://github.com/tronprotocol/java-tron (README.md)
- https://tronprotocol.github.io/documentation-en/using_javatron/toolkit/
-->
