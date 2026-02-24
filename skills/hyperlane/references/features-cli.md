---
name: hyperlane-features-cli
description: Hyperlane CLI commands for config, core deployment, warp deployment, and sending messages.
metadata:
  author: hairy
---

# Hyperlane CLI

The Hyperlane CLI (`@hyperlane-xyz/cli`) is a TypeScript CLI for core and warp deployments and common operations. Use it for deploying to new chains and sending test messages.

## Setup

- Node 18+.
- Install: `npm install -g @hyperlane-xyz/cli` or run via `npx @hyperlane-xyz/cli` / `pnpm dlx @hyperlane-xyz/cli`.
- From source: build from monorepo then `pnpm hyperlane` in `typescript/cli`.

## Common commands

| Task | Command |
|------|---------|
| Help | `hyperlane --help` |
| Create core deployment config | `hyperlane config create` |
| Deploy core (Mailbox, ISMs, hooks, etc.) | `hyperlane deploy core` |
| Deploy warp routes | `hyperlane deploy warp` |
| View SDK contract addresses | `hyperlane chains addresses` |
| Send a test message | `hyperlane send message` |

Use `--help` on subcommands (e.g. `hyperlane core deploy --help`, `hyperlane warp deploy --help`) for options and required config.

## Logging

- **Format:** `LOG_FORMAT=pretty|json` or `--log <pretty|json>`.
- **Verbosity:** `LOG_LEVEL` or `--verbosity <trace|debug|info|warn|error|off>`.
- If colors don’t show, try `FORCE_COLOR=true`.

## E2E tests (development)

CLI e2e tests run against local chains and agents:

```bash
pnpm -C typescript/cli test:ethereum:e2e
pnpm -C typescript/cli test:cosmosnative:e2e
pnpm -C typescript/cli test:radix:e2e
```

Use these to validate core and warp deploy flows.

<!--
Source references:
- sources/hyperlane/typescript/cli/README.md
- sources/hyperlane/AGENTS.md (CLI Development, E2E)
-->
