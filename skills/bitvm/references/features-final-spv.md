---
name: bitvm-final-spv
description: Final SPV circuit—header chain verification and tx inclusion proof.
metadata:
  author: hairy
---

# Final SPV Circuit

The **final-spv** library verifies the Bitcoin header chain, proves inclusion of a transaction in that chain, and compresses the public values to 32 bytes using **Blake3**. Built with Risc0.

## Prerequisites

- Risc0 toolchain installed.

## Building

From repository root:

```bash
REPR_GUEST_BUILD=1 BITCOIN_NETWORK=<NETWORK> cargo build -p final-spv-circuit --release
```

Output ELF: `prover/elfs/<NETWORK>-final-spv-guest`.

## Role

- **Input**: Header chain (or its proof) and a Bitcoin transaction.
- **Output**: A single 32-byte digest (Blake3) that commits to the verified chain and the inclusion claim.

Use this digest downstream (e.g. in contracts or other proofs) instead of passing full chain or inclusion data. Ensure `BITCOIN_NETWORK` matches the header chain and prover build.

<!--
Source references:
- sources/bitvm/final-spv/README.md
-->
