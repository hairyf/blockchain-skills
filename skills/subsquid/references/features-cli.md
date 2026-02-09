---
name: subsquid-features-cli
description: Squid CLI (sqd) — init, run, deploy; templates and project layout.
---

# Squid CLI (sqd)

Squid CLI (`@subsquid/cli`, global: `npm i -g @subsquid/cli`) scaffolds and runs squids locally and deploys to SQD Cloud.

## Init project

```bash
sqd init NAME [-t TEMPLATE] [--dir DIR] [-r]
```

- **NAME** — Project name (alphanumeric or dash).
- **-t, --template** — GitHub repo URL with valid `squid.yaml` in root, or alias:
  - `evm` — Minimal EVM squid.
  - `abi` — Generate squid from contract ABI (events + txs).
  - `multichain` — Multi-chain indexing.
  - `gravatar` — Sample Gravatar EVM squid.
  - `substrate`, `ink`, `ink-abi`, `frontier-evm` — Substrate/Ink/Frontier EVM.
- **-d, --dir** — Target directory (default: new folder NAME).
- **-r, --remove** — Clean target dir if it exists.

Example: `sqd init my-squid -t https://github.com/subsquid-labs/showcase01-all-usdc-transfers`

## Run and deploy

- **`sqd run`** — Run all processes defined in the squid (e.g. processor + GraphQL server) according to project config.
- **`sqd deploy`** — Deploy to SQD Cloud (auth and manifest required).

Other commands: `sqd logs`, `sqd secrets`, `sqd prod`, etc. See project `squid.yaml` and [Squid CLI reference](https://docs.subsquid.io/squid-cli) for full command set.

<!--
Source references:
- https://docs.subsquid.io/squid-cli/init
- https://docs.subsquid.io/squid-cli/run
- https://docs.subsquid.io/squid-cli/installation
-->
