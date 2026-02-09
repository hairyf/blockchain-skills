---
name: java-tron overview
description: What java-tron is, TRON Protocol, main artifacts and networks.
---

# java-tron Overview

java-tron is the Java implementation of the [TRON Protocol](https://tron.network): a high-throughput (2000+ TPS), scalable blockchain with DPoS consensus. TRON Virtual Machine (TVM) is EVM-compatible for smart contracts.

## Key Artifacts

| Artifact | Location | Purpose |
|----------|----------|---------|
| **FullNode.jar** | `build/libs/` after build | Main node executable; full node by default. `java -jar FullNode.jar --help` for CLI options. |
| **Toolkit.jar** | `build/libs/` | Node maintenance: partition, prune, copy, convert DBs; shadow-fork. [Usage](https://tronprotocol.github.io/documentation-en/using_javatron/toolkit/) |
| **start.sh** | project root | Quick start (x86_64, JDK 8). See `shell.md`. |
| **start.sh.simple** | project root | Quick start template (ARM64, JDK 17). |

## Networks

- **Mainnet** — production; config: `framework/src/main/resources/config.conf`.
- **Nile Testnet** — forward-looking testnet; config: [config-nile.conf](https://github.com/tron-nile-testnet/nile-testnet/blob/master/framework/src/main/resources/config-nile.conf). Build from [nile-testnet](https://github.com/tron-nile-testnet/nile-testnet) repo when needed.
- **Shasta Testnet** — mirrors Mainnet; no public node peers; use [TronGrid](https://developers.tron.network/docs/trongrid) for programmatic access.
- **Private networks** — [Private Network guide](https://tronprotocol.github.io/documentation-en/using_javatron/private_network/).

## Key Points

- Linux/macOS only (Windows not supported). JDK 8 or 17.
- Full node: gateway to TRON network; HTTP and RPC APIs. SR node: add `--witness`; fill `localwitness` in config with SR private key.
- Official docs: [documentation-en](https://tronprotocol.github.io/documentation-en/), [TRON Developer Hub](https://developers.tron.network/).

<!--
Source references:
- https://github.com/tronprotocol/java-tron (README.md)
- https://tronprotocol.github.io/documentation-en/
-->
