---
name: thegraph-features-graph-node-dev
description: Graph Node Dev (gnd) — local subgraph development with optional IPFS, auto Postgres, and live redeploy.
---

# The Graph — Graph Node Developer Mode (gnd)

**gnd** is a developer-oriented Graph Node runner for local subgraph development. It simplifies setup (no IPFS required by default, automatic Postgres on Unix) and supports live redeployment when the build changes.

## Prerequisites

- Subgraph that builds with `graph build`
- PostgreSQL installed and running (or let gnd manage it on Unix)
- Ethereum RPC endpoint (e.g. local Anvil, Hardhat, or remote)

## Install

```bash
npm i @graphprotocol/graph-cli
graph node install
```

This installs the `gnd` binary (Unix: `~/.local/bin`, Windows: `%USERPROFILE%\gnd\bin`). Ensure that directory is in your `PATH`.

## Run

From the subgraph project directory:

**Unix (minimal):**
```bash
gnd --ethereum-rpc mainnet:http://localhost:<PORT>
```

**Unix with hot-reload** (redeploy when build changes):
```bash
gnd --ethereum-rpc mainnet:http://localhost:<PORT> --watch
```

**Windows** (Postgres URL required):
```bash
gnd --ethereum-rpc mainnet:http://localhost:<PORT> --postgres-url "postgresql://graph:yourpassword@localhost:5432/graph-node"
```

## Query endpoint

After deploy, query at:

```
http://localhost:8000/subgraphs/name/subgraph-0/
```

(Exact path may depend on deploy name; check gnd output.)

## Options

| Flag | Description |
|------|-------------|
| `--ethereum-rpc` | `network[:capabilities]:URL`. Required. |
| `--postgres-url` | PostgreSQL connection URL. Required on Windows; optional on Unix (auto temporary DB in `--database-dir`). |
| `--watch` | Watch build directory and redeploy on changes. |
| `--manifests` | Path(s) to manifest. Default: `./subgraph.yaml`. |
| `--database-dir` | Directory for temporary Postgres (Unix). Default: `./build`. |
| `--ipfs` | IPFS endpoint(s). Default: `https://api.thegraph.com/ipfs`. |

## Key points

- On Unix, omit `--postgres-url` to use an automatic temporary Postgres instance.
- Use `--watch` for a faster feedback loop when editing mappings.
- IPFS defaults to The Graph’s public IPFS; override if you use a local node.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/developing/creating/graph-node-dev/
-->
