---
name: core-overview
description: ord index, block explorer, wallet integration, and Bitcoin Core requirements.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ordinals/ord (README, docs/)
---

# ord Overview

`ord` is an index, block explorer, and command-line wallet for Ordinals. It consists of:

- **Index**: Tracks location of all satoshis by talking to a Bitcoin Core node (requires `-txindex`).
- **Block explorer**: `ord server` serves inscriptions and explorer UI.
- **Wallet**: `ord wallet` subcommands use Bitcoin Core for keys and signing; ord handles sat control and inscription creation.
- **Inscribing**: Create and manage Bitcoin-native digital artifacts on sats.

## Requirements

- **Bitcoin Core**: Must be synced with `txindex=1`. ord uses RPC (and optionally REST).
- **Authentication**: By default ord uses the `.cookie` file from Bitcoin Core's datadir. Override with `--cookie-file`, `--bitcoin-rpc-username` / `--bitcoin-rpc-password`, or env `ORD_BITCOIN_RPC_USERNAME` / `ORD_BITCOIN_RPC_PASSWORD`.

```bash
# Cookie file
ord --cookie-file /path/to/.cookie server

# Config file (data_dir, bitcoin_rpc_username, bitcoin_rpc_password)
ord --config /path/to/ord.yaml server
```

## Important caveats

- Bitcoin Core is **not** inscription-aware; mixing `bitcoin-cli`/RPC sends with ord wallets can move inscribed sats unintentionally.
- `ord wallet` loads the ord wallet (default name `ord`); after a wallet command that wallet may remain loaded in Bitcoin Core.
- Do not use ord with wallets holding large amounts; keep ordinal and cardinal wallets separate.

## Syncing

Run `bitcoind -txindex` and leave it running. ord builds its index from the node. Index is stored in the data directory (e.g. `~/.local/share/ord/index.redb` on Linux). Use `ord index update` or `ord server` to build/update the index.

## Logging

ord uses env_logger. Example:

```bash
RUST_LOG=info ord server
RUST_LOG=debug RUST_BACKTRACE=1 ord server
```

<!--
Source references:
- sources/ordinals/README.md
- sources/ordinals/docs/src/overview.md
- sources/ordinals/docs/src/guides/wallet.md
-->
