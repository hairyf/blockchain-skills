---
name: Mythril about
description: What Mythril is, what it detects, and its limitations.
---

# Mythril Overview

Mythril is a **symbolic-execution-based security analysis tool** for EVM bytecode. It finds common vulnerabilities in smart contracts for Ethereum and other EVM-compatible chains; it is not designed to find business-logic bugs.

## What it detects

- Integer underflows/overflows
- Unprotected self-destruct (suicide)
- Owner overwrite leading to Ether withdrawal
- Reentrancy patterns (e.g. state change after external call, unchecked retval)
- Use of `tx.origin`, predictable env vars (e.g. weak PRNG)
- Delegatecall to user-controlled address
- Arbitrary storage write / arbitrary jump
- And other patterns covered by the built-in analysis modules

## Limitations

- **Not sound**: Symbolic execution often cannot explore all program states; some bugs may be missed.
- **Targeted at common bugs**: Business-logic flaws and protocol-level issues are out of scope.
- **EVM bytecode**: Analysis runs on compiled bytecode (from Solidity or other EVM compilers).

## Commands (CLI)

- `myth analyze` / `myth a` — run security analysis (main use).
- `myth disassemble` / `myth d` — disassemble contract to EASM.
- `myth safe-functions` — list functions that appear safe under symbolic execution.
- `myth list-detectors` — list available detection modules.
- `myth read-storage` — read storage slots via RPC.
- `myth version` — print version.

Use `myth --help` and `myth analyze --help` for full options.

<!--
Source references:
- https://github.com/ConsenSys/mythril
- sources/mythril/README.md
- sources/mythril/docs/source/about.rst
-->
