---
name: ton-blueprint-build-api
description: Programmatic build — buildOne, buildAll, buildAllTact, artifact output, BUILD_DIR.
---

# Build API

Blueprint exports `buildOne`, `buildAll`, and `buildAllTact` for building contracts from code (e.g. in plugins or custom scripts). The CLI `blueprint build` uses these internally.

## Functions

```ts
import { buildOne, buildAll, buildAllTact } from '@ton/blueprint';
import type { UIProvider } from '@ton/blueprint';

// Build a single contract
await buildOne('Counter', ui);

// Build all discovered contracts (wrappers/compilables + Tact projects)
await buildAll(ui);

// Build only Tact contracts (legacy .compile.ts Tact + tact.config.json projects)
await buildAllTact(ui);
```

- **buildOne(contract: string, ui?: UIProvider)** — Compiles one contract, writes artifact to `build/<contract>.compiled.json`, and for FunC/Tolk writes Fift to `build/<contract>/<contract>.fif`. For Tact, writes generated files from `result.fs` to disk. Optional `ui` for progress messages and action prompt.
- **buildAll(ui?)** — Resolves all contracts via `findContracts()` (compilables + Tact config) and runs `buildOne` for each.
- **buildAllTact(ui?)** — Builds only Tact contracts: those with `lang === 'tact'` in compilables plus projects from root `tact.config.json`.

## Artifact format

`build/<Contract>.compiled.json` contains:

- **hash** — code cell hash (hex).
- **hashBase64** — same hash in base64.
- **hex** — full BOC of the code cell (hex).
- **libraryHash**, **libraryBoc** — present only when compiler config has `buildLibrary: true`.

Tact also writes generated files (wrappers, etc.) under paths from the compiler result; FunC/Tolk write `<Contract>.fif` into `build/<Contract>/`.

## When to use

- **buildAll** — Before `pack`, or when you need every contract built (e.g. CI).
- **buildOne** — After creating a single new contract (e.g. `create` runner builds the new Tact contract once).
- **buildAllTact** — When only Tact contracts need rebuilding.

<!--
Source references:
- sources/ton-blueprint/src/build.ts
- sources/ton-blueprint/src/index.ts (exports)
- sources/ton-blueprint/src/paths.ts (BUILD_DIR)
-->
