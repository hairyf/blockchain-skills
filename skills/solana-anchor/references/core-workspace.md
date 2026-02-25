---
name: Workspace and Project Layout
description: anchor init, new, default program structure, build/test/deploy flow.
---

# Workspace and Project Layout

Anchor workspaces are created with `anchor init` and extended with `anchor new`. The default layout supports modular programs and a standard build/test/deploy flow.

## Creating a workspace

- **`anchor init <name>`** – Create a new workspace with default (modular) or single-file program. Uses `--template multiple` (default) or `--template single`.
- **`anchor new <program-name>`** – Add another program under `programs/` in an existing workspace.

Program ID is derived from `target/deploy/<program>-keypair.json`; `declare_id!` in source is set from this keypair. Use `anchor keys sync` after cloning to refresh `declare_id!` from keypairs.

## Default program structure (modular)

For `anchor init <name>` with default template, each program under `programs/<name>/` typically has:

| Path | Purpose |
|------|---------|
| `src/lib.rs` | Entry: `declare_id!`, `#[program]` module, re-exports |
| `src/instructions/` | Instruction handlers and `#[derive(Accounts)]` structs |
| `src/state/` | `#[account]` state structs |
| `src/error.rs` | `#[error_code]` custom errors |
| `src/constants.rs` | Program constants |

`#[program]` methods usually delegate to handlers in `instructions/`. Single-file template (`--template single`) puts everything in `lib.rs`.

## Tests

- **TypeScript (default):** `tests/*.ts`; `Anchor.toml` `[scripts] test` runs them (e.g. ts-mocha). Use `anchor.setProvider(anchor.AnchorProvider.env())` and `anchor.workspace.<ProgramName>`.
- **Rust:** `anchor init --test-template rust` → tests in `tests/src/` using `anchor-client`.
- **Mollusk:** `anchor init --test-template mollusk` → Rust tests using Mollusk harness.

## Build, test, deploy

- **`anchor build`** – Compile programs, emit IDL to `target/idl/`. Binaries at `target/deploy/<program>.so`.
- **`anchor test`** – Build, start local validator (unless `--skip-local-validator`), deploy, run `[scripts] test`. Logs under `.anchor/program-logs/`.
- **`anchor deploy`** – Deploy all workspace programs to the cluster in `Anchor.toml` `[provider] cluster`.
- **`anchor migrate`** – Run `migrations/deploy.js` with provider from config.

Switch cluster (e.g. Devnet) by setting `[provider] cluster` in `Anchor.toml`; program IDs per cluster are in `[programs.<cluster>]`.

## Key points

- Modular layout: `lib.rs` + `instructions/` + `state/` + `error.rs`; single-file template available.
- Program ID comes from keypair; sync with `anchor keys sync` when keypairs change or after clone.
- `anchor test` runs the script in `[scripts] test` (default: TypeScript); use `--test-template rust` or `mollusk` for alternative test setup.

<!--
Source references:
- https://github.com/solana-foundation/anchor/tree/master/docs/content/docs/quickstart/local.mdx
-->
