---
name: java-tron start.sh
description: start.sh — run/stop FullNode, config/data paths, build from source or release, manifest rebuild.
---

# start.sh Quick Start Script

The `start.sh` script in the java-tron root can run or stop FullNode, and optionally clone/build or fetch the latest release. Target: x86_64, JDK 8 (see `start.sh.simple` for ARM64/JDK 17).

## Service operation

| Option | Description |
|--------|-------------|
| `--run` | Start the FullNode service. |
| `--stop` | Stop the running FullNode. |
| `-c <file>` | Config file (default: config.conf next to FullNode.jar). |
| `-d <dir>` | Database/output directory (default: same as FullNode.jar). |
| `-j <jar>` | JAR path (default: FullNode.jar in current directory). |
| `-mem <MB>` | Max heap in MB; JVM -Xmx/-Xms adjusted accordingly. |
| `--net <name>` | Network: `main` (default), `test`, or `private`. |

## Build / release

| Option | Description |
|--------|-------------|
| `--release` | Download latest release JAR from GitHub and use it. |
| `-cb` | Clone repo (master) and build; then run from built artifacts. |

Use with `--run` to start after obtaining or building:

```bash
sh start.sh --release --run
sh start.sh -cb --run
```

## Manifest rebuild (LevelDB)

When using `-d` (or default output-directory), the script can rebuild the manifest (TIP-298 / LevelDB startup optimization). Options:

| Option | Description |
|--------|-------------|
| `-m <size>` | Min manifest size (MB); only rewrite when manifest exceeds this (default: 0). |
| `-b <size>` | Batch manifest size (default: 80000). |
| `-dr` / `--disable-rewrite-manifest` | Disable manifest rewrite. |

Examples:

```bash
sh start.sh --run -d /tmp/db/database -m 128 -b 64000
sh start.sh --release --run -d /tmp/db/database -m 128 -b 64000
```

## Typical usage

- **Local JAR, default config/data:** `sh start.sh --run`
- **Custom config and data:** `sh start.sh --run -c /path/config.conf -d /path/output-directory`
- **Stop:** `sh start.sh --stop`
- **Latest release and run:** `sh start.sh --release --run`
- **Clone, build, run:** `sh start.sh -cb --run`

## Key Points

- FullNode.jar, start.sh, and config.conf are usually in the same directory (or use -j/-c/-d).
- After `-cb`, a `FullNode/` directory is created with JAR and config copied; script can run from there.
- Manifest rebuild reduces LevelDB startup time; use -m/-b when you need to tune it.

<!--
Source references:
- sources/tron-java/shell.md
- https://github.com/tronprotocol/java-tron (README.md, shell.md)
-->
