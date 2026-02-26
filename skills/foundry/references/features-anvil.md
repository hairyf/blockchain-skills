---
name: foundry-anvil
description: Anvil local node — dev chain, fork, accounts, block time.
---

# Anvil

Anvil is Foundry's local Ethereum node. Use it for fast local tests, scripting against a chain, or forking mainnet.

## Start

```bash
anvil
anvil --port 8546
anvil --fork-url $RPC_URL
anvil --fork-url $RPC_URL --fork-block-number 18000000
```

- Default port 8545; default chain id 31337.
- `--fork-url`: run as fork of given RPC; optional `--fork-block-number` for a fixed block.

## Pre-funded accounts

Anvil starts with 10 deterministic accounts (same keys every run). Check `anvil --help` for the list; typically used via `--account` or in scripts with known private keys. Useful for `forge script` and tests without loading keys.

## Block time

```bash
anvil --block-time 2
```

Default is instant (mine on demand). `--block-time N` mines a new block every N seconds.

## Key points

- Start Anvil before `forge script` or tests that need a local RPC; point them at `http://127.0.0.1:8545`.
- Fork mode: use for scripts that depend on mainnet state; pin block for reproducibility.
- Pre-funded accounts are for dev only; never use those keys on mainnet.

<!--
Source references:
- https://book.getfoundry.sh/reference/anvil/
- https://getfoundry.sh/anvil/
-->
