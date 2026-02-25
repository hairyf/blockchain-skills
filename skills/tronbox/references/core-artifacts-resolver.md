---
name: TronBox artifacts and resolver
description: Where artifacts live, artifact shape, and how contract resolution works (artifacts.require, resolve).
---

# TronBox Artifacts and Resolver

Compiled contracts are written as JSON files in `contracts_build_directory` (default `build/contracts/`). The Resolver loads these artifacts and wraps them as contract abstractions for migrate, test, and console.

## Artifact location and format

- **Path:** `contracts_build_directory` / `<ContractName>.json`.
- **Normalized keys** (ContractSchema): `contractName`, `abi`, `bytecode`, `deployedBytecode`, `sourceMap`, `deployedSourceMap`, `source`, `sourcePath`, `ast`, `legacyAST`, `compiler`, `networks`, `schemaVersion`, `updatedAt`.
- **networks:** `{ [networkId: string]: { address, ... } }`. TVM stores address with `0x` replaced by `41`; EVM does the reverse when saving.

## Resolver order

When you call `artifacts.require(import_path)` or the Resolver’s `require(import_path, search_path)`, sources are tried in order:

1. **EPM** – Ethereum Package Manager (working_directory, contracts_build_directory).
2. **NPM** – `node_modules` under working_directory.
3. **NPM** – TronBox’s own `node_modules` (built-in).
4. **FS** – Filesystem: `contracts_build_directory` for artifact JSON; source resolution uses working_directory and import paths (e.g. `./contracts/Foo.sol`).

First source that returns a result wins. For `require`, the raw JSON is normalized and turned into a Contract abstraction (provisioned with the config).

## artifacts.require(import_path)

- **Contract name:** `artifacts.require('ContractName')` – looks up by contract name in build dir.
- **Path:** `artifacts.require('./contracts/Foo.sol')` – FS source can match by `sourcePath` to get the right contract name, then load the JSON.
- **Error:** “Could not find artifacts for X from any sources” if no source has the artifact.

## resolve(import_path, imported_from, callback)

Used by compile and flatten to find Solidity source. Tries EPM, NPM, FS; callback `(err, body, resolved_path)`. FS resolves relative imports from `imported_from`’s directory.

## Usage for agents

- Use `artifacts.require('ContractName')` or `artifacts.require('./path/to/Contract.sol')` in migrations and tests; do not read JSON from disk manually.
- Ensure contracts are compiled before migrate/test so `build/contracts` contains the expected `.json` files.
- When generating or merging artifact-like objects, include at least `contractName`, `abi`, `bytecode`, and `networks`; Schema.normalize accepts legacy keys like `contract_name`, `binary`, `unlinked_binary`.

<!--
Source references:
- sources/tronbox/src/components/Resolver/index.js
- sources/tronbox/src/components/Resolver/fs.js
- sources/tronbox/src/components/Artifactor.js
- sources/tronbox/src/components/ContractSchema/index.js
-->
