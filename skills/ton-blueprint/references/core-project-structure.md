---
name: ton-blueprint-project-structure
description: Blueprint directory layout and where contracts, wrappers, tests, and scripts live.
---

# Project Structure

Blueprint projects follow a fixed layout. Use this when creating or navigating a TON project created with `npm create ton@latest`.

## Directory layout

| Directory | Purpose |
|-----------|--------|
| `contracts/` | Smart contract source (`.tolk`, `.fc`, `.tact`) and shared imports (e.g. `contracts/imports/*.fc`) |
| `wrappers/` | TypeScript wrapper classes implementing `Contract` from `@ton/core`; message encode/decode and compilation entrypoints. **Tact** puts generated wrappers under `build/<CONTRACT>/` per `tact.config.json` |
| `compilables/` | Optional; compilation scripts `*.compile.ts` when `separateCompilables: true`. Otherwise compilables live in `wrappers/` |
| `tests/` | Test files `*.spec.ts` using Sandbox and wrappers |
| `scripts/` | Deployment and other runnable scripts; must export `run(provider, args?)` |
| `build/` | Build output: `build/<CONTRACT>.compiled.json`, Tact artifacts in `build/<CONTRACT>/`, Fift in `build/<CONTRACT>/*.fif` |

## Conventions

- One contract name maps to: `contracts/<Name>.(tolk|fc|tact)`, a wrapper (or Tact-generated wrapper), and optionally `compilables/<Name>.compile.ts` (or inside `wrappers/`).
- Wrappers implement `Contract` and usually expose `createFromAddress`, `createFromConfig`, and `sendDeploy` (or equivalent).
- Scripts are run with `npx blueprint run <SCRIPT> [args...]`; the script file must export `run(provider: NetworkProvider, args?: string[])`.

<!--
Source references:
- https://github.com/ton-org/blueprint/blob/main/README.md (Directory structure, Building contracts)
-->
