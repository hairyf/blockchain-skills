---
name: tron-features-tools
description: TronIDE, TronBox, TronWeb, TronGrid, Trident — when to use each for TRON development.
---

# TRON Developer Tools

| Tool | Purpose |
|------|--------|
| **TronIDE** | Develop and debug Solidity contracts (compile, run, debug). [tronide.io](https://www.tronide.io/) |
| **TronBox** | Deploy and migrate TRON contracts (compile, deploy, migrations). [tronbox.io](https://tronbox.io/) |
| **TronWeb** | JS library: connect to mainnet/testnet, deploy and call contracts, build transactions. [tronweb.network](https://tronweb.network/) |
| **TronGrid** | Event/indexing and API services; query contract event logs. [trongrid.io](https://www.trongrid.io/) |
| **Trident** | Java SDK: system and contract APIs, lightweight. [tronprotocol.github.io/trident](https://tronprotocol.github.io/trident/) |

## Usage for agents

- **Frontend/dApp (browser)**: TronWeb (wallet integration, contract calls, TRX/TRC-20).
- **Backend (Node)**: TronWeb or HTTP APIs to a FullNode/TronGrid.
- **Contract deployment/migrations**: TronBox or custom scripts with TronWeb/Trident.
- **Event/log queries**: TronGrid or node HTTP/API.
- **Java backends**: Trident for type-safe integration with java-tron APIs.

<!--
Source references:
- sources/tron/docs/contracts/tools.md
-->
