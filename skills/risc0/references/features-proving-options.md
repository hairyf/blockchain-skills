---
name: risc0 proving options
description: Dev-mode, local proving, remote proving (Boundless), and prove_with_opts receipt kinds.
---

# Proving Options

RISC Zero supports three ways to run the zkVM: **dev-mode** (no proof), **local proving** (your CPU/GPU), and **remote proving** (Boundless). Use `prove_with_opts` when you need Succinct or Groth16 receipts.

## 1. Dev-mode (rapid iteration)

No proof is generated; execution only. Receipts are “fake” and only verify when the verifier also runs with dev-mode.

- Set env: `RISC0_DEV_MODE=1` (or `true`) when running.
- Receipts still contain the journal; verification is pass-through in dev-mode.
- For production, build with the `disable-dev-mode` feature so dev-mode cannot be enabled; if `RISC0_DEV_MODE` is set with that feature, the prover panics.

```bash
RISC0_DEV_MODE=1 cargo run --release
```

## 2. Local proving

- Use `default_prover()` or a custom prover; proofs run on your machine.
- Use when you have **private inputs** so data never leaves the host.
- Hardware: CPU (any modern x86/ARM), NVIDIA GPU (CUDA), or Apple Metal. Groth16 prover is x86-only (see project issues for Apple Silicon).
- Constrained memory: consider adjusting segment size (e.g. `ExecutorEnvBuilder::segment_limit_po2`). See benchmarks for memory expectations.

## 3. Remote proving (Boundless)

- Send proof requests to [Boundless](https://boundless.network); permissionless provers generate proofs. Good when you don’t need to keep inputs private and want to avoid local hardware.
- Integrate via Boundless docs (quick start, “request a proof” flow).

## Receipt kind (prove_with_opts)

- `Prover::prove(env, elf)` — Produces a **composite** receipt (default).
- `Prover::prove_with_opts(env, elf, opts)` — Set `ProverOpts::receipt_kind`:
  - `ReceiptKind::Composite` — Default.
  - `ReceiptKind::Succinct` — For proof composition and smaller proofs.
  - `ReceiptKind::Groth16` — For on-chain verification; requires `rzup install risc0-groth16`. See shrink-wrapping docs.

Use Succinct or Groth16 when composing proofs or verifying on Ethereum (or other chains with a RISC Zero verifier contract).

<!--
Source references:
- sources/risc0/website/api_versioned_docs/version-3.0/generating-proofs/proving-options.md
- sources/risc0/website/api_versioned_docs/version-3.0/generating-proofs/dev-mode.md
- sources/risc0/website/api_versioned_docs/version-3.0/generating-proofs/local-proving.md
- sources/risc0/website/api_versioned_docs/version-3.0/generating-proofs/remote-proving.md
- sources/risc0/website/api_versioned_docs/version-3.0/blockchain-integration/shrink-wrapping.md
-->
