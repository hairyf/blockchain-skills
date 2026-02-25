---
name: TronBox CLI
description: All TronBox commands and their options for script and agent use.
---

# TronBox CLI Reference

Entry point: `tronbox` (or `./tronbox.dev` for development). Global options (e.g. `--quiet`) may apply where documented.

## Commands and options

| Command | Description | Options |
|--------|-------------|--------|
| **init** | Create a new project (interactive: sample project or MetaCoin). No template argument. | (none) |
| **compile** | Compile contracts. | `--all`, `--evm`, `--quiet` |
| **migrate** | Run migrations. | `--network <name>`, `--reset`, `--from <n>`, `--to <n>`, `--compile-all`, `--evm`, `--quiet` |
| **test** | Run tests. | `[files...]`, `--file <path>`, `--network <name>`, `--compile-all`, `--evm` |
| **console** | Start REPL. | `--network <name>`, `--evm` |
| **flatten** | Flatten contract(s) and dependencies to stdout. | `<files...>` (positional, required) |
| **unbox** | Download a TronBox Box (template) into current dir. | (box name / URL) |
| **deploy** | Alias or variant of deploy flow (see code). | (see migrate) |
| **help** | Help for commands. | `<command>` |
| **version** | Print version. | (none) |

## Config resolution

- **Default (TVM):** `tronbox.js` or `tronbox-config.js` (found via find-up from cwd).
- **EVM:** `--evm` forces use of `tronbox-evm-config.js` only.

## Network default

For migrate, test, and console: if no `--network` is given and `networks.development` exists, `development` is used; otherwise test may fall back to `networks.test`. If no network is set, commands that need a network will error.

## Usage for agents

- Prefer `tronbox compile --all` before migrate/test when contract sources may have changed.
- Use `--evm` consistently for EVM chain (compile, migrate, test, console) and ensure `tronbox-evm-config.js` exists.
- Private keys: use env vars (e.g. `PRIVATE_KEY_MAINNET`) and document `source .env && tronbox migrate --network mainnet` in config comments; never commit keys.
- `tronbox flatten contracts/Foo.sol` outputs a single concatenated Solidity file; useful for verification or auditing.

<!--
Source references:
- sources/tronbox/src/lib/commands/*.js
- sources/tronbox/README.md
-->
