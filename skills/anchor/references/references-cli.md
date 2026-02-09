---
name: anchor-cli
description: Anchor CLI — build, deploy, test, idl, keys, account, expand, upgrade, verify.
---

# Anchor CLI

CLI for building and managing Anchor workspaces. Run `anchor -h` and `anchor <subcommand> -h` for full options.

## Core commands

| Command | Purpose |
|---------|--------|
| `anchor build` | Build workspace programs and emit IDLs to `target/idl` |
| `anchor build --verifiable` | Deterministic build (Docker); run from program dir |
| `anchor deploy` | Deploy all workspace programs to configured cluster |
| `anchor test` | Run integration tests (local validator) |
| `anchor keys sync` | Update `declare_id!` from keypair in `target/deploy/<program>.json` |

## IDL and accounts

| Command | Purpose |
|---------|--------|
| `anchor idl init ...` | Initialize on-chain IDL at deterministic address |
| `anchor idl upgrade ...` | Upgrade on-chain IDL |
| `anchor account <program>.<AccountType> <pubkey>` | Fetch and deserialize account to JSON using workspace IDL |
| `anchor account ... --idl <path>` | Use given IDL file instead of workspace |

Program name = crate/folder name (e.g. kebab-case). AccountType = PascalCase struct name.

## Program and workspace

| Command | Purpose |
|---------|--------|
| `anchor init` | Create new workspace |
| `anchor new <name>` | Add new program to workspace |
| `anchor expand` | Expand macros (in program dir or workspace) |
| `anchor upgrade <program>` | Upgrade single program; wallet must be upgrade authority |
| `anchor verify <program>` | Verify on-chain bytecode matches local build; run inside program dir |

## Cluster

- `anchor cluster list` — List mainnet/devnet/testnet RPC URLs.
- Cluster and wallet are configured in `Anchor.toml` (or env).

## Tips

- Pass args to `cargo build-sbf` via `anchor build -- --features my-feature`.
- `anchor deploy` creates a new program id per run; use `upgrade` for existing programs.

<!--
Source references:
- docs/content/docs/references/cli.mdx
-->
