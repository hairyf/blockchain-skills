---
name: risc0 zkVM overview
description: RISC Zero zkVM concepts—guest, host, method, image ID, journal, receipt.
---

# zkVM Overview

RISC Zero is a zero-knowledge verifiable computing platform based on zk-STARKs and the RISC-V microarchitecture. The **zkVM** emulates a small RISC-V machine so arbitrary code (Rust, C, C++) can run and be proven without revealing inputs or execution state.

## Core terminology

- **Method** — Code to be proven, compiled to a RISC-V ELF with a special entry point. Built with `risc0-build` / `cargo risczero build`.
- **Image ID** — Cryptographic hash of the method ELF; required for verification. Use the same image ID as the verifier (e.g. from your methods crate).
- **Guest** — The logical RISC-V machine running inside the zkVM; the code that is executed and proven.
- **Host** — The prover process that runs the zkVM, provides inputs, and obtains the receipt. Cannot modify guest execution or the proof is invalid.
- **Journal** — Append-only log written by the guest; the public output of the computation. Part of the receipt.
- **Receipt** — Proof of correct execution: journal + **seal** (opaque cryptographic blob). Verifiers check the seal and can read the journal.
- **Seal** — The cryptographic part of the receipt attesting validity.

## Flow

1. Compile guest code into a **method** (ELF); compute **image ID**.
2. Host builds `ExecutorEnv`, runs the **prover** with the method ELF, gets a **receipt**.
3. Receipt contains **journal** (public outputs) and **seal**.
4. Any party with the same image ID can **verify** the receipt and read the journal; they learn nothing else about inputs or execution.

## Key point

Verification only needs the receipt and the expected image ID. The verifier does not re-run the program and does not see private inputs or host–guest traffic (except what the guest committed to the journal).

<!--
Source references:
- https://github.com/risc0/risc0 (README)
- sources/risc0/website/api_versioned_docs/version-3.0/zkvm/zkvm-overview.md
- sources/risc0/website/api_versioned_docs/version-3.0/introduction.md
-->
