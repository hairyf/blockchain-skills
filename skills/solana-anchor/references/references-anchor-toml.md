---
name: Anchor.toml Configuration
description: Workspace config—provider, scripts, workspace, programs, test, toolchain, hooks.
---

# Anchor.toml

Main workspace config at the repo root.

## provider (required)

```toml
[provider]
cluster = "localnet"   # or devnet, mainnet
wallet = "~/.config/solana/id.json"
```

Used by deploy, test, and other CLI commands.

## scripts (required for testing)

```toml
[scripts]
test = "yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/**/*.ts"
```

`anchor test` runs the `test` script.

## features

```toml
[features]
resolution = true   # IDL account resolution (default true)
```

## workspace

- **types** – Directory to copy generated IDL TypeScript types (e.g. for frontend).
- **members** – Paths to program crates (default `programs/*`).
- **exclude** – Paths to exclude from the workspace.

## programs

Per-cluster program IDs:

```toml
[programs.localnet]
my_program = "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"
```

Use `programs.devnet` and `programs.mainnet` for other clusters. `programs.localnet` is used with `solana-test-validator` and `--bpf-program`.

## test

- **startup_wait** – Ms to wait for the test validator (e.g. when cloning many accounts).
- **genesis** – Pre-load programs at validator start (`address`, `program`, `upgradeable`).
- **upgradeable** – Deploy test program with upgradeable loader; upgrade authority = provider wallet.

## test.validator

Options passed to `solana-test-validator`: `url`, `warp_slot`, `rpc_port`, `ledger`, `faucet_sol`, etc.

- **test.validator.clone** – Clone accounts from `url` (e.g. mainnet) into the test validator. `address` per account; program accounts are cloned automatically when address is upgradeable loader.
- **test.validator.account** – Load account from a JSON file (`address`, `filename`).

## toolchain

Override toolchain (e.g. for CI/verifiable builds):

```toml
[toolchain]
anchor_version = "0.32.1"   # requires avm
solana_version = "2.3.0"
package_manager = "yarn"    # npm, yarn, pnpm, bun
```

## hooks

Run commands at pipeline stages (pre/post build, test, deploy). Non-zero exit aborts.

```toml
[hooks]
pre-build = "echo foo"
post_build = "echo bar"
pre-test = ["echo 1", "echo 2"]
```

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/references/anchor-toml.mdx)
-->
