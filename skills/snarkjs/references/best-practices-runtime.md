---
name: snarkjs Runtime and environment
description: Use snarkjs in Node vs browser; single-thread and memory options when workers are unavailable.
metadata:
  author: hairy
---

# Runtime and environment

snarkjs runs in Node and in the browser. Proof generation uses worker threads by default; some environments do not support them.

## Node

```js
const snarkjs = require("snarkjs");
// ESM: import * as snarkjs from "snarkjs";
```

Use the built package (e.g. `./build/main.cjs` or `./main.js`). Witness calculation and proving are async; use `await snarkjs.groth16.fullProve(...)` etc.

## Browser

Load the built bundle (e.g. `snarkjs.min.js` from `build/`). Same API:

```js
const { proof, publicSignals } = await snarkjs.groth16.fullProve(
  { a: 3, b: 11 },
  "circuit.wasm",
  "circuit_final.zkey"
);
```

WASM and zkey files must be served and loaded (e.g. `fetch`) as appropriate for your app.

## Single-thread proving

When worker threads are not available (Bun, browser extensions, SES, etc.):

```js
const result = await snarkjs.groth16.prove(
  zkey_final,
  wtns,
  undefined,
  { singleThread: true }
);
```

Same option applies to the fourth parameter of `prove` (logger is third). Use `singleThread: true` in prover options for PLONK/FFLONK if exposed.

## Witness calculator memory

To reduce initial memory allocation (e.g. in browser):

```js
await snarkjs.wtns.calculate(input, wasmFile, wtns, { memorySize: 0 });
```

## Key points

- Prefer worker threads for faster proving; enable `singleThread` only when required by the environment.
- In browser, ensure `circuit.wasm`, zkey, and verification key are loaded (e.g. from same origin or CORS).
- Use `-v` / `--verbose` on CLI to see progress and spot blocking steps.

<!--
Source references:
- https://github.com/iden3/snarkjs (README.md – Using Node, In the browser, Common Issues)
-->
