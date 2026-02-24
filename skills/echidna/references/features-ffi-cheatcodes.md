---
name: Echidna FFI and HEVM cheatcodes
description: allowFFI and HEVM cheatcode support for advanced testing.
---

# FFI and cheatcodes

Echidna can use **HEVM**-style cheatcodes (e.g. FFI) when enabled. This allows tests to call out to the environment or manipulate VM state in ways useful for property tests.

## Enabling FFI

In config:

```yaml
allowFFI: true
```

Without this, FFI cheatcode usage typically causes a failure or is ignored (tool-dependent). Enable only when your invariants or test contract rely on FFI.

## HEVM context

Echidna uses hevm for EVM execution. HEVM provides cheatcodes (e.g. for prank, warp, FFI) that some tests use. When `allowFFI: true`, the FFI cheatcode is allowed so contracts can invoke external binaries or scripts during fuzzing.

## Use with care

- FFI can reduce reproducibility (external processes, filesystem) and may be slower or flaky.
- Use for tests that explicitly need to call out (e.g. oracles, cross-process checks). For standard invariants, leave `allowFFI: false`.
- Test configs that use FFI often pair with limited runs for debugging (e.g. `testLimit: 1`, `seqLen: 1`) in the repo examples; production fuzzing may keep FFI disabled.

## Key points

- Set `allowFFI: true` only when the contract or invariants use the FFI cheatcode.
- Check Echidna/HEVM docs for the exact list of supported cheatcodes and signatures.
- Prefer pure Solidity invariants when possible to keep campaigns fast and reproducible.

<!--
Source references:
- https://github.com/crytic/echidna (README.md)
- sources/echidna/tests/solidity/cheat/ffi.yaml
- sources/echidna/tests/solidity/basic/default.yaml
-->
