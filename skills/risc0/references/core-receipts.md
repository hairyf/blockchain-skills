---
name: risc0 receipts
description: Receipt structure, verification, journal extraction, and serialization.
---

# Receipts

A **receipt** is the output of a successful zkVM run: it bundles the **journal** (public outputs) with a **seal** (cryptographic proof). Verifiers only need the receipt and the expected **image ID** to be convinced the journal was produced by correct execution of that method.

## Structure

- **Journal** — Public outputs committed by the guest via `env::commit` / `env::commit_slice`. Verifier can read it.
- **Seal** — Opaque proof blob; tampering or wrong execution makes verification fail.

## Verifying

```rust
receipt.verify(expected_image_id).unwrap();
```

Verification ensures (1) the execution was valid, and (2) the executed program matches `expected_image_id`. Use the image ID from your methods crate (`MY_METHOD_ID`).

## Extracting the journal

```rust
let value: T = receipt.journal.decode().unwrap();
// or raw bytes: receipt.journal.bytes
```

## Serialization

Receipts implement `serde`. Example:

```rust
let bytes = bincode::serialize(&receipt).unwrap();
// send bytes; receiver:
let receipt: Receipt = bincode::deserialize(&bytes).unwrap();
receipt.verify(image_id).unwrap();
```

## Receipt kinds

- **Composite** — Default; larger, full segment receipts.
- **Succinct** — From `prove_with_opts(..., ReceiptKind::Succinct)`; compressed via recursion.
- **Groth16** — From `prove_with_opts(..., ReceiptKind::Groth16)`; for on-chain verification (small, constant size). Requires `rzup install risc0-groth16`.

Use `prove_with_opts` when you need Succinct or Groth16 (e.g. for composition or Ethereum verifier contracts).

<!--
Source references:
- sources/risc0/website/api_versioned_docs/version-3.0/zkvm/receipts.md
- sources/risc0/website/api_versioned_docs/version-3.0/generating-proofs/proving-options.md
- sources/risc0/website/api_versioned_docs/version-3.0/blockchain-integration/shrink-wrapping.md
-->
