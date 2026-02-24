---
name: risc0 blockchain Ethereum
description: Verifying RISC Zero proofs on Ethereum—verifier contracts, Groth16, and integration patterns.
---

# RISC Zero on Ethereum

Prove computation in the zkVM and verify on Ethereum (or other EVM chains) using RISC Zero’s **verifier contracts**. On-chain verification expects a **Groth16** receipt (shrink-wrapped); use `prove_with_opts(..., ReceiptKind::Groth16)` and install the Groth16 prover component (`rzup install risc0-groth16`).

## Verifier usage

Contracts call an **IRiscZeroVerifier**-compatible contract. Typical flow:

1. Construct the expected **journal** bytes (e.g. `abi.encode(x)` for a single value).
2. Call `verifier.verify(seal, image_id, sha256(journal))` (or the exact interface of the deployed verifier). Reverts if the seal is invalid or journal doesn’t match.

Example (Solidity-style):

```solidity
bytes memory journal = abi.encode(x);
verifier.verify(seal, IS_EVEN_ID, sha256(journal));
```

The **image ID** must match the method that produced the receipt. The **seal** is the Groth16 proof (and any other inputs required by the contract). The contract hashes the journal and checks it against the claim in the proof.

## Verifier router

RISC Zero deploys a **RiscZeroVerifierRouter** that routes to the correct base verifier per zkVM version. Prefer the router so your app supports multiple receipt types and future versions. Contract addresses and supported chains (Ethereum mainnet, Sepolia, Arbitrum, Base, etc.) are in the [verifier contract docs](https://github.com/risc0/risc0-ethereum/tree/release-3.0/contracts); use the repo’s version-management design for upgrades and emergency stop.

## Shrink-wrapping (Groth16)

Default proofs are composite (STARK). For on-chain verification you need a **Groth16** receipt:

- Use `ProverOpts { receipt_kind: ReceiptKind::Groth16, ... }` with `prove_with_opts`.
- Install Groth16 component: `rzup install risc0-groth16` (rzup >= 0.5.0).

The Groth16 receipt is small and verified by the on-chain verifier contract.

## Integration examples

- **risc0-ethereum** — Verifier contracts, Steel (view-call proofs), and blockchain examples.
- **Foundry template** — Minimal app with Boundless remote proving and verifier call.
- **Governance example** — Batched signature verification for DAO votes (e.g. OpenZeppelin Governor), large gas savings.
- **Zeth** — zkEVM (EVM block proofs) using revm in the zkVM.

Use the zkVM as a **coprocessor**: heavy or awkward logic (e.g. ed25519, custom parsers) runs in the guest; the contract only verifies the receipt and reads the journal.

<!--
Source references:
- sources/risc0/website/api_versioned_docs/version-3.0/blockchain-integration/risc-zero-on-eth.md
- sources/risc0/website/api_versioned_docs/version-3.0/blockchain-integration/contracts/verifier.md
- sources/risc0/website/api_versioned_docs/version-3.0/blockchain-integration/shrink-wrapping.md
-->
