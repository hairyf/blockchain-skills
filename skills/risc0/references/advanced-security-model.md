---
name: risc0 security model
description: RISC Zero security components, soundness, zero-knowledge caveats, and audits.
---

# Security Model

RISC Zero’s security model covers the toolchain, RISC-V prover, recursion prover, STARK-to-SNARK prover, and on-chain verifier contracts. Each component has been audited; see the [rz-security](https://github.com/risc0/rz-security) repo for reports and dates.

## Components

- **cargo risczero** — Builds guest code to RISC-V ELF deterministically.
- **RISC-V Prover** — Executes and proves ELF (STARK).
- **Recursion Prover** — Aggregates proofs (lift, join, resolve); identified by control ID / control root.
- **STARK-to-SNARK Prover** — Compresses to Groth16; control root as public input allows prover updates without a new trusted setup.
- **Verifier contracts** — Verify Groth16 on-chain; control root is fixed in the contract (see version-management for upgrades and deprecation).

Security of **guest programs** and **smart contracts** is the integrator’s responsibility (secure development, audits).

## Soundness and zero-knowledge

- **Soundness** — A valid receipt implies correct execution of the claimed program (image ID) producing the given journal. On-chain verifiers target ~96 bits security; recursion and STARK-to-SNARK have their own assumptions (see docs).
- **Zero-knowledge** — Default design aims for perfect ZK (hides inputs and witness). There is no published full ZK proof yet; treat as a caveat for strict privacy requirements.
- **Who can see secrets** — The **prover** sees all inputs. For private data, use local proving. Proofs from the RISC-V prover that are **not** passed through the recursion prover can leak execution length; use Succinct/Groth16 (recursion pipeline) to avoid that.

## Groth16 and BN254

The STARK-to-SNARK step uses Groth16 over BN254. Security relies on the elliptic curve and the Groth16 trusted setup. Not post-quantum safe; STARK provers are quantum-safe.

When implementing or auditing, use the official security calculator and ethSTARK/BN254 references linked in the security model docs.

<!--
Source references:
- sources/risc0/website/api_versioned_docs/version-3.0/security-model.md
-->
