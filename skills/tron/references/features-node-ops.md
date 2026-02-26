---
name: tron-features-node-ops
description: java-tron node deployment - hardware, JDK, build/run, config; upgrade process; optional private network, lite fullnode, backup, metrics, toolkit.
---

# java-tron Node Deployment and Operations

## Deployment (installing_javatron)

- **Platform**: Linux or macOS. x86_64: Oracle JDK 8. arm64 (from 4.8.1): JDK 17.
- **Hardware**: Min 8 CPU, 16 GB RAM, 3 TB SSD, 100 Mbps. Recommended 16 CPU, 32 GB, 3.5 TB SSD. SR block-producing node: 32 CPU, 64 GB, 3.5 TB SSD.
- **Obtain client**: Download FullNode.jar from java-tron releases or compile from source (git clone, checkout branch, ./gradlew clean build -x test). Output: build/libs/FullNode.jar.
- **Config**: config.conf (genesis block, RPC ports, storage, etc.). Customize for mainnet/testnet/private.
- **Start**: java -jar FullNode.jar -c config.conf. Event subscription: add --es. Lite FullNode: use lite config and corresponding JAR if available.

## Upgrade (releases/upgrade-instruction)

- **Standard process**: (1) Prepare new version (download JAR or compile); verify signature per signature_verification guide. (2) Stop node (kill -15 PID). (3) Back up data (database, config). (4) Replace JAR and optional config. (5) Start new version. For primary/backup HA, follow primary/backup upgrade guide to switch over without downtime.

## Other operational docs

- **Private network**: Configure genesis and peer list for isolated network.
- **Lite FullNode**: Lighter sync/storage option; see litefullnode.md.
- **Backup and restore**: Snapshot/backup procedures and data restore; FullNode data snapshots.
- **Metrics**: Node monitoring (using_javatron/metrics).
- **Toolkit**: Node maintenance tool (using_javatron/toolkit).
- **Connecting**: Network connection and peer configuration (connecting_to_tron).

## Usage for agents

When automating node deployment or upgrade: use correct JDK for architecture; always verify JAR signature before replace; back up before upgrade; for event subscription include --es and event plugin config. Refer to official docs for exact config keys and snapshot URLs.

<!-- Source: sources/tron/docs/using_javatron/installing_javatron.md, releases/upgrade-instruction.md, architecture/database.md -->
