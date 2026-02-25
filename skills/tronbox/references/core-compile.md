---
name: TronBox compile
description: Compiling contracts, --all vs incremental, build output, and compiler config.
---

# TronBox Compile

TronBox compiles Solidity contracts from `contracts_directory` (default `contracts/`) and writes artifacts to `contracts_build_directory` (default `build/contracts/`).

## Commands

- **tronbox compile** – Compile only changed contracts (compares sources to existing build).
- **tronbox compile --all** – Compile every contract under `contracts_directory`.
- **tronbox compile --evm** – Use EVM config (`tronbox-evm-config.js`) and compilers.solc.
- **tronbox compile --quiet** – Suppress non-error output.

Compiler settings come from config: TVM uses top-level `solc`; EVM uses `compilers.solc` (see [core-config](core-config.md)).

## Build output

- Artifacts are written as `.js` files in `contracts_build_directory`.
- Each artifact contains: `contract_name`, `abi`, `bytecode`, `deployedBytecode`, `sourcePath`, `sourceMap`, `deployedSourceMap`, `ast`/`legacyAST`, `compiler` (name/version).
- Link references in bytecode use placeholders (e.g. `__LibraryName_________________________`) until libraries are deployed and linked at migrate time.

## Incremental vs full

- Without `--all`, the compile step uses a profiler to compare source mtimes and content to existing artifacts; only changed files and their dependents are compiled.
- With `--all`, all sources under `contracts_directory` are passed to the compiler. Use when you want a clean slate or when dependency detection might miss changes.

## Usage for agents

- Run `tronbox compile --all` before migrate or test when contract sources may have changed, or when scripting from a clean checkout.
- Use the same config (TVM vs EVM) as the rest of the workflow; `--evm` must match `tronbox-evm-config.js`.
- Artifacts are required for migrate, test, and console; ensure `build/contracts` exists and is populated before those commands.

<!--
Source references:
- sources/tronbox/src/lib/commands/compile.js
- sources/tronbox/src/components/WorkflowCompile.js
- sources/tronbox/src/components/Compile/index.js
-->
