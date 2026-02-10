---
name: bitcoin-core-cli
description: bitcoin-cli, bitcoin rpc, and common RPC usage patterns.
---

# CLI and RPC Usage

## bitcoin-cli / bitcoin rpc

- **bitcoin-cli** — Sends JSON-RPC to a running `bitcoind` or `bitcoin-qt` (with `-server`). Default: mainnet, localhost, default port.
- **bitcoin rpc** — Same as `bitcoin-cli` with `-named` style; preferred for named parameters.

Options (examples): `-rpcuser`, `-rpcpassword`, `-rpcport`, `-rpcwallet=<name>`, `-testnet`, `-signet`, `-regtest`, `-datadir`, `-conf`.

## Common Patterns

```sh
# One wallet
bitcoin-cli -rpcwallet=mywallet getbalance

# Named params
bitcoin-cli -named createwallet wallet_name=w1 load_on_startup=true

# List RPCs
bitcoin-cli help
bitcoin-cli help getblock
```

When multiple wallets are loaded, always pass `-rpcwallet` for wallet methods so the request goes to `/wallet/<name>/`.

## Wrapper: bitcoin

- `bitcoin node` — same as `bitcoind`
- `bitcoin gui` — same as `bitcoin-qt`
- `bitcoin rpc ...` — same as `bitcoin-cli -named ...`
- `bitcoin help` — list subcommands

<!--
Source references:
- https://github.com/bitcoin/bitcoin doc/README.md
- https://github.com/bitcoin/bitcoin doc/JSON-RPC-interface.md
-->
