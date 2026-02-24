---
name: features-compilation
description: circom CLI—output flags (r1cs, wasm, c, sym, json), optimization -O0/O1/O2, prime, -l, sanity_check, inspect.
---

# Compilation Options

## Output flags

- **`--r1cs`** — R1CS in binary.
- **`--sym`** — Symbol file (signal id, witness index, component id, qualified name) for debugging/annotated output.
- **`--wasm`** — WebAssembly witness generator (directory `*_js`).
- **`-c` / `--c`** — C++ witness generator (directory `*_cpp`). Use **`--no_asm`** for portability.
- **`--json`** — R1CS in JSON.
- **`--wat`** — Compile to WAT.
- **`-o <dir>`** — Output directory (default `.`).
- **`--simplification_substitution`** — JSON with substitutions from simplification.

## Optimization

- **`--O0`** — No simplification.
- **`--O1`** — Signal-to-signal and signal-to-constant simplification (default).
- **`--O2`** — Full linear simplification (Gauss); reduces constraints but slower and more memory; not compatible with PLONK. Use **`--O2round N`** to limit rounds.

Only one of `--O0`, `--O1`, `--O2`/`--O2round` per run.

## Other options

- **`-p` / `--prime`** — Curve/prime: bn128 (default), bls12377, bls12381, goldilocks, grumpkin, pallas, secq256r1, vesta.
- **`-l <dir>`** — Add directory to include path (repeatable).
- **`--sanity_check`** — 0 (none), 1 (assert for `===`), 2 (also check subcomponents executed). Default 2.
- **`--inspect`** — Extra R1CS checks (underconstrained signals, `<--` that could be `<==`).
- **`--no_init`** — Omit zero-initialization of `var` in witness code.
- **`--verbose`** — Log known values during constraint generation.

## Example

```bash
circom circuit.circom --r1cs --wasm --sym -o build -l ./lib
```

<!--
Source references:
- https://docs.circom.io/getting-started/compilation-options/
- https://docs.circom.io/getting-started/compiling-circuits/
- https://github.com/iden3/circom
-->
