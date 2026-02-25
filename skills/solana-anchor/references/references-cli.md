---
name: Anchor CLI
description: Commands for build, deploy, test, IDL, keys, migrate, upgrade, verify, and workspace management.
---

# Anchor CLI

Run `anchor -h` and `anchor <subcommand> -h` for full options.

## Build and deploy

- **`anchor build`** – Build workspace programs and emit IDLs to `target/idl/`. Use `-- <cargo-args>` to pass flags (e.g. `--features my-feature`).
- **`anchor build --verifiable`** – Build in Docker for reproducible builds (run from program directory, e.g. `programs/my_program/`).
- **`anchor deploy`** – Deploy all workspace programs to the configured cluster (generates new program IDs each time unless already deployed).
- **`anchor upgrade <path/to/program.so> --program-id <id>`** – Upgrade a single program (wallet must be upgrade authority).

## Keys

- **`anchor keys list`** – List program keypairs.
- **`anchor keys sync`** – Update `declare_id!` in source from `target/deploy/<program>.json`. Run after cloning or when IDs change.

## IDL

- **`anchor idl build`** – Generate IDL from build.
- **`anchor idl init -f target/idl/program.json <program-id>`** – Create on-chain IDL account.
- **`anchor idl fetch -o out.json <program-id>`** – Fetch IDL from chain.
- **`anchor idl upgrade <program-id> -f target/idl/program.json`** – Update on-chain IDL (wallet = authority).
- **`anchor idl set-authority -n <new-authority> -p <program-id>`** – Change IDL authority.
- **`anchor idl erase-authority -p <program-id>`** – Make IDL immutable (wallet = current authority).

## Test and migrate

- **`anchor test`** – Build, deploy to localnet (starts validator if needed), run `scripts.test`. Use `--skip-local-validator` to use an already-running validator. Logs stream to `.anchor/program-logs/`.
- **`anchor migrate`** – Run `migrations/deploy.js` with provider from Anchor.toml.

## Workspace and programs

- **`anchor init <name>`** – Create new workspace. Use `--template multiple` (default) or `--template single`.
- **`anchor new <program-name>`** – Add a new program under `programs/` (same template options).

## Utilities

- **`anchor expand`** – Expand macros (run in program dir for one program, or workspace root for all).
- **`anchor shell`** – Start Node REPL with Anchor client wired from config.
- **`anchor account <program>.<AccountType> <pubkey>`** – Fetch and deserialize account with IDL (use `--idl` if outside workspace).
- **`anchor cluster list`** – Print cluster endpoints.
- **`anchor verify <program-id>`** – Verify on-chain bytecode matches local build (run in program directory). Also checks IDL if present.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/references/cli.mdx)
-->
