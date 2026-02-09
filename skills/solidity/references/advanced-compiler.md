---
name: solidity-compiler
description: Using the Solidity compiler — command line, Standard JSON, optimizer, libraries, path resolution.
---

# Using the Compiler

## Command Line (solc)

- Single file: `solc --bin sourceFile.sol`
- Multiple outputs: `solc -o outputDir --bin --ast-compact-json --asm sourceFile.sol`
- Optimizer: `solc --optimize --bin sourceFile.sol`. Tune with `--optimize-runs N` (default 200; lower = cheaper deployment, higher runtime cost).

## Base Path and Import Remapping

- `prefix=path` maps import prefix to directory: `solc github.com/ethereum/dapp-bin/=/usr/local/lib/dapp-bin/ file.sol`
- Paths not starting with `./` or `../` are relative to `--base-path` and `--include-path`. Only specified paths (and remapping targets) are allowed unless `--allow-paths` is set.

## Library Linking

Bytecode contains placeholders for library addresses (hex of keccak256 of fully qualified name). Link at compile time: `solc --libraries "file.sol:Math=0x..." sourceFile.sol` or `--libraries libs.txt`. Prefer linking at compile time so metadata stays correct; avoid manual bytecode patching.

## Standard JSON

For tooling and reproducibility: `solc --standard-json` reads JSON from stdin and writes JSON to stdout. Input includes `language`, `sources` (source unit name -> content), `settings` (optimizer, evmVersion, viaIR, etc.). Output includes `contracts`, `errors`, etc. Always exits 0; errors in output.

## solcjs

Node.js build; different CLI. Use Standard JSON for cross-environment builds.

## EVM Version and Via-IR

Set target EVM (e.g. paris, shanghai) and optionally enable IR-based codegen (`viaIR`) for different optimization behavior.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/using-the-compiler.html
- https://docs.soliditylang.org/en/latest/path-resolution.html
-->
