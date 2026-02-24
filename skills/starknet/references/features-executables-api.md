---
name: starknet-executables-api
description: Starknet executables API—get compiled CASM.
---

# Executables API

The Starknet Executables API (schema: `starknet_executables.json`) provides access to compiled contract bytecode (CASM) for declared classes.

## starknet_getCompiledCasm

Returns the compiled CASM (Cairo Assembly) for a given class.

- **Params**: Defined in the schema (typically `class_hash` and possibly `block_id` or similar).
- **Result**: Compiled CASM representation (structure in schema).
- **Errors**: Class not found or not declared.

Use for: verification of on-chain class bytecode, debugging compilation, or tooling that needs the exact CASM (e.g. for security or compatibility checks).

## Usage for Agents

- Call this when you need the CASM of a declared class (e.g. to compare with a local build or to inspect bytecode).
- Class must already be declared on chain; otherwise the method returns an error.
- Schema details (param names, result shape) are in `api/starknet_executables.json`.

<!--
Source references:
- https://github.com/starkware-libs/starknet-specs api/starknet_executables.json
-->
