---
name: risc0 host code
description: Host setup, ExecutorEnv, proving, and verifying receipts.
---

# Host Code

The **host** builds the execution environment, runs the prover, and obtains the receipt. It does not see private guest state except what the guest sends via `env::write`/stdout/stderr.

## Minimal host: prove and verify

```rust
use risc0_zkvm::{default_prover, ExecutorEnv};
use risc0_zkvm_methods::MY_METHOD_ELF;
use risc0_zkvm_methods::MY_METHOD_ID;

// Build env (optional: .write(&input), .write_slice(...), etc.)
let env = ExecutorEnv::builder().build().unwrap();
let prover = default_prover();
let receipt = prover.prove(env, MY_METHOD_ELF).unwrap().receipt;

// Verify (e.g. before sending to a third party)
receipt.verify(MY_METHOD_ID).unwrap();

// Use public output
let output: MyOutput = receipt.journal.decode().unwrap();
```

- `MY_METHOD_ELF` and `MY_METHOD_ID` come from your methods crate (built with `risc0-build`).
- `ExecutorEnv::builder()` — Add inputs with `.write(&t)` / `.write_slice(&bytes)`, then `.build()`.
- `prover.prove(env, ELF)` — Runs guest and produces a receipt (or errors).
- `receipt.verify(image_id)` — Cryptographically verifies the receipt for that method.
- `receipt.journal` — Decode with `receipt.journal.decode::<T>()` for the committed type.

## Passing input to the guest

```rust
let input = MyInput { ... };
let env = ExecutorEnv::builder()
    .write(&input).unwrap()
    .build().unwrap();
```

Guest reads with `env::read::<MyInput>()`. Use `write_slice` for raw bytes; guest uses `env::read_slice` or `env::stdin().read_to_end()`.

## Serializing receipts

Use `serde` (e.g. `bincode::serialize(&receipt)`) to send receipts off-process or on-chain. Verifier needs the same image ID and the receipt bytes.

<!--
Source references:
- sources/risc0/website/api_versioned_docs/version-3.0/zkvm/host-code-101.md
- sources/risc0/website/api_versioned_docs/version-3.0/zkvm/receipts.md
-->
