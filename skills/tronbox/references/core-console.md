---
name: TronBox console
description: Interactive console with contract abstractions and TronWeb/ethers.
---

# TronBox Console

The console is an interactive REPL that runs in a TronBox environment with contract abstractions and network access. It uses the same config and Environment.detect as other commands.

## CLI

```bash
tronbox console              # Start with development network
tronbox console --network <name>
tronbox console --evm        # Use EVM config
```

Network selection follows the same rules as migrate/test; TronWrap is initialized with the chosen network and `--evm` if set.

## REPL context

- **artifacts** – Resolver: `artifacts.require('ContractName')` to load contract abstractions.
- **config** – Resolved config (with network, provider, paths).
- **Contract abstractions** – Once required, use `.deployed()`, `.at(address)`, `.new(...)` and contract methods as in migrations/tests.
- **tronWeb** / **ethers** – Available per mode (TVM vs EVM) for low-level calls.

Subcommands (e.g. compile, migrate, test) are available in the console except excluded ones (console, init, flatten, unbox). The prompt shows the current network, e.g. `tronbox(development)>`.

## Usage for agents

- Use the console for ad-hoc contract calls and inspection; for scripting, prefer migration scripts or test files.
- Ensure the network in config has valid credentials and `network_id` so Environment.detect and TronWrap init succeed.
- In EVM mode, use `--evm` and the same config as `tronbox migrate --evm` / `tronbox test --evm`.

<!--
Source references:
- sources/tronbox/src/lib/commands/console.js
- sources/tronbox/src/lib/console.js
- sources/tronbox/README.md
-->
