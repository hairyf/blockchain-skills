---
name: risc0 recursion
description: Recursive proving pipeline—segments, lift, join, resolve, Groth16—and receipt kinds.
---

# Recursive Proving

RISC Zero uses **recursive proving** to support unbounded computation, constant proof size, aggregation, and composition. The prover pipeline turns execution **segments** into segment receipts, then compresses them via the **recursion circuit** into a single receipt. Users select the receipt kind via `prove_with_opts`.

## Pipeline (conceptual)

1. **Execute** — Guest run is split into **segments**.
2. **Segment receipts** — Each segment is proven (RISC-V STARK).
3. **Lift** — Segment receipts are “lifted” into **SuccinctReceipt**s (recursion circuit verifies STARKs).
4. **Join** — Pairs of SuccinctReceipts are **joined** until one remains (constant-time verification per segment).
5. **identity_p254** — Optional step for Groth16: convert to Poseidon254 for SNARK.
6. **Compress** — Produce **Groth16Receipt** for on-chain verification (small, fixed size).

## Receipt kinds

- **Composite** — Segment-level receipts; no recursion. Larger, default from `prove()`.
- **Succinct** — After lift + join (and optionally resolve for composition). Use `ReceiptKind::Succinct`.
- **Groth16** — After full pipeline including STARK-to-SNARK; for verifier contracts. Use `ReceiptKind::Groth16` and install `risc0-groth16` via rzup.

## Recursion programs

The recursion circuit runs fixed programs: **lift** (verify RISC-V STARK), **join** (verify two recursion STARKs), **resolve** (used in composition to remove an assumption), **identity_p254** (prepare for Groth16). You don’t implement these; the prover uses them when you request Succinct or Groth16.

## When to use which

- Use **Composite** for simple flows and when you don’t need on-chain verification or composition.
- Use **Succinct** for composition and smaller proof size off-chain.
- Use **Groth16** when verifying on Ethereum (or other chains with a RISC Zero Groth16 verifier contract).

<!--
Source references:
- sources/risc0/website/api_versioned_docs/version-2.3/recursion.md
- sources/risc0/website/api_versioned_docs/version-3.0/blockchain-integration/shrink-wrapping.md
- sources/risc0/website/api_versioned_docs/version-3.0/security-model.md
-->
