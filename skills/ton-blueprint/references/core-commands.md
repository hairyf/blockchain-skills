---
name: ton-blueprint-commands
description: Blueprint CLI commands — build, test, run, create, rename, help, pack, snapshot, verify, set, convert.
---

# CLI Commands

Invoke with `npx blueprint <command>` or `yarn blueprint <command>`. Commands can be interactive or accept args/flags.

## Command list

| Command | Description | Example |
|---------|-------------|---------|
| `create` | Create a new contract from template (Tolk/FunC/Tact, empty or counter) | `blueprint create MyContract --type func-empty` |
| `build` | Build contract(s) using `.compile.ts`; Tact output in `build/<name>/` | `blueprint build Counter` or `blueprint build --all` |
| `test` | Run Jest test suite (Sandbox); `--coverage`, `--gas-report`/`-g`, `--ui` | `blueprint test` or `blueprint test --gas-report` |
| `run` | Run a script from `scripts/` (e.g. deploy); needs network and wallet choice | `blueprint run deployCounter --testnet --tonconnect` |
| `help` | Show help; pass command name for command-specific help | `blueprint help run` |
| `set` | Set config values (e.g. `func` for @ton-community/func-js version) | `blueprint set func` |
| `verify` | Verify deployed contract on verifier.ton.org | `blueprint verify [Contract] --mainnet --compiler-version 0.4.4-newops.1` |
| `convert` | Convert legacy bash build script to Blueprint compile wrapper | `blueprint convert [path]` |
| `rename` | Rename contract (PascalCase) across wrappers, scripts, tests, contracts | `blueprint rename OldName NewName` |
| `pack` | Build and prepare publish-ready package of wrappers | `blueprint pack` or `blueprint pack --no-warn` |
| `snapshot` | Collect gas usage and cell sizes, write snapshot (for `test --gas-report`) | `blueprint snapshot` or `blueprint snapshot -l "comment"` |

## Run flags

For `blueprint run`:

- **Network:** `--mainnet`, `--testnet`, `--tetra`, or `--custom <endpoint>` with optional `--custom-type`, `--custom-version`, `--custom-key`, `--custom-domain`, `--custom-network-id`.
- **Wallet:** `--tonconnect`, `--deeplink`, `--mnemonic`.
- **Explorer:** `--tonscan`, `--tonviewer`, `--toncx`, `--dton` (default: tonscan in code, README says tonviewer).

Script args go after flags: `blueprint run deployCounter --testnet --tonconnect arg1 arg2`.

## Verify flags

- `--mainnet` / `--testnet` — network (custom requires `--custom-type` mainnet/testnet).
- `--verifier` — verifier ID (default: verifier.ton.org).
- `--list-verifiers` — list available verifiers.
- `--compiler-version` — exact compiler version string (e.g. `0.4.4-newops.1`); does not change local compiler.
- `--custom`, `--custom-version`, `--custom-key`, `--custom-type` — custom API for verify.

## Plugin commands

Plugins registered in `blueprint.config.ts` add extra commands; their help is merged into `blueprint help`.

<!--
Source references:
- https://github.com/ton-org/blueprint/blob/main/README.md (Features overview, Help and additional commands)
- sources/ton-blueprint/src/cli/cli.ts
- sources/ton-blueprint/src/cli/constants.ts
- sources/ton-blueprint/src/cli/help.ts
-->
