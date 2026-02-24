---
name: risc0 proof composition
description: Verifying receipts inside the guest and resolving assumptions for composite proofs.
---

# Proof Composition

**Proof composition** lets one zkVM guest verify another program’s receipt and fold that into a single receipt. The guest does not run the full verifier (which would not compress); instead it adds **assumptions** to the receipt claim, and the prover **resolves** them when producing a Succinct or Groth16 receipt.

## Flow

1. **Host**: Before proving, call `env.add_assumption(receipt)` (or equivalent) to register a receipt the guest will verify.
2. **Guest**: Call `env::verify(&receipt)` (or the appropriate API). This adds an **assumption** to the current receipt claim (a “conditional receipt”).
3. **Prover**: When you call `prove_with_opts` with `ReceiptKind::Succinct` or `ReceiptKind::Groth16`, the prover **resolves** assumptions (by checking the assumed receipts and folding them into the final proof).

If assumptions are not resolved (e.g. you only produce a composite receipt), the receipt remains conditional and may not be acceptable to verifiers that expect a resolved claim.

## When to use

- Build modular apps: one method verifies receipts of other methods and commits to a combined claim.
- Aggregate or chain proofs without the verifier re-running all sub-proofs.

Use the **composition example** in the RISC Zero repo for a full host/guest pattern (`add_assumption` on the host, `env::verify` in the guest, then `prove_with_opts` with Succinct or Groth16).

## Key APIs

- Host: `ExecutorEnvBuilder::add_assumption` (or prover API that adds assumptions).
- Guest: `risc0_zkvm::guest::env::verify` (or equivalent) to verify an incoming receipt and add its claim as an assumption.
- Prover: `Prover::prove_with_opts(..., ReceiptKind::Succinct)` or `ReceiptKind::Groth16` so resolution runs.

<!--
Source references:
- sources/risc0/website/api_versioned_docs/version-3.0/zkvm/composition.md
- sources/risc0/website/api_versioned_docs/version-2.3/recursion.md (resolve program)
-->
