---
name: bitcoin-core-overview
description: Bitcoin Core — what it is, executables, and main usage flows.
---

# Bitcoin Core Overview

Bitcoin Core is the reference Bitcoin full-node implementation. It syncs and validates the full blockchain, runs a headless daemon or GUI, and exposes JSON-RPC and REST for wallets and chain data.

## Executables

| Command | Purpose |
|--------|---------|
| **bitcoind** | Headless daemon; runs the node and JSON-RPC server (enabled by default). |
| **bitcoin-qt** | GUI client; RPC disabled by default (use `-server` to enable). |
| **bitcoin** | Wrapper with subcommands: `bitcoin gui`, `bitcoin node`, `bitcoin rpc`. Use `bitcoin help` to list. |
| **bitcoin-cli** | RPC client; call methods via CLI. `bitcoin rpc` is an alternative. |
| **bitcoin-tx** | Build/inspect raw transactions (offline). |
| **bitcoin-wallet** | Wallet utility (e.g. create, migrate). |
| **bitcoin-util** | Misc utilities (e.g. signet tool). |

## Common Flows

- **Run node**: `bitcoind` or `bitcoin node`; data in default datadir (e.g. `~/.bitcoin` on Unix). Use `-testnet`, `-signet`, or `-regtest` for other networks.
- **Config**: `bitcoin.conf` in datadir; options override with command-line. See [core-config](core-config.md).
- **RPC**: Default port 8332 (mainnet), 18332 (testnet), 38332 (signet), 18443 (regtest). Auth via `-rpcuser`/`-rpcpassword` or cookie file.
- **Wallet**: No default wallet since 0.21; create with `createwallet` RPC or GUI. Use descriptor wallets for descriptors/PSBT.

## Key Points

- Full sync requires substantial disk (hundreds of GB+). Pruning available via `-prune`.
- Build: see [core-build](core-build.md). Binaries: [bitcoincore.org](https://bitcoincore.org/en/download/).
- Do not expose RPC to untrusted networks without auth and understanding of security (spend, consensus, privacy).

<!--
Source references:
- https://github.com/bitcoin/bitcoin doc/README.md
- https://github.com/bitcoin/bitcoin README.md
-->
