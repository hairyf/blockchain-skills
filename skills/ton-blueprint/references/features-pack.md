---
name: ton-blueprint-pack
description: Publish-ready wrapper package — blueprint pack, buildAll, package.ts, dist, tsconfig/package.json updates.
---

# Pack (publish wrappers)

The `blueprint pack` command builds all contracts and produces a publish-ready npm package containing wrappers and compiled code. Use it before `npm publish` when shipping contract interfaces to consumers.

## Usage

```bash
blueprint pack
blueprint pack --no-warn   # skip confirmation about modifying files
```

Without `--no-warn`, the command prompts to confirm because it will modify `tsconfig.json`, `package.json`, and remove `dist/`.

## What pack does

1. **Build all contracts** — runs `buildAll(ui)` (same as `blueprint build --all`).
2. **Generate `package.ts`** — entry point that imports each contract wrapper and exports `ContractNameCode` (Cell from `build/<Contract>.compiled.json`).
3. **Update `tsconfig.json`** — sets `outDir: 'dist'`, `declaration: true`, `esModuleInterop: true`, adds `package.ts` to `include`.
4. **Remove `dist/`** and run `tsc` to compile the package.
5. **Update `package.json`** — sets `main: 'dist/package.js'`, `files: ['dist/**/*']`.

Result: a `dist/` tree ready for publishing; consumers get wrappers and compiled code cells.

## Wrapper path resolution

- **FunC/Tolk:** wrapper path is `./wrappers/<Contract>`.
- **Tact:** wrapper path is `./<output>/<Contract>_<Contract>` (from Tact config, typically `build/<Contract>/`).

All contracts returned by `findContracts()` (from compilables/wrappers and Tact config) are included. Each must have a `build/<Contract>.compiled.json` artifact after build.

## When to use

- Before `npm publish --access public` when publishing a library of TON contract wrappers.
- Ensure `tsconfig.json`, `package.json`, and important source files are committed before running; use `--no-warn` in CI once confident.

<!--
Source references:
- https://github.com/ton-org/blueprint/blob/main/README.md (Publishing Wrapper Code)
- sources/ton-blueprint/src/cli/pack.ts
- sources/ton-blueprint/src/paths.ts
-->
