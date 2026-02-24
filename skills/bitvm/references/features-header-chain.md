---
name: bitvm-header-chain
description: Bitcoin header chain prover and library with Risc0.
metadata:
  author: hairy
---

# Header Chain (Prover and Library)

BitVM uses **Risc0** to prove the Bitcoin header chain. The **header-chain** library builds the circuit; the **prover** binary produces proofs over batches of headers.

## Prerequisites

- [Risc0 toolchain](https://dev.risczero.com/api/zkvm/install) installed.
- For building ELFs: run from repo root with `REPR_GUEST_BUILD=1` and `BITCOIN_NETWORK=<NETWORK>`.

## Building the Header Chain Circuit

```bash
REPR_GUEST_BUILD=1 BITCOIN_NETWORK=<NETWORK> cargo build -p header-chain-circuit --release
```

ELF path: `prover/elfs/<NETWORK>-header-chain-guest`.

## Building the Prover

```bash
BITCOIN_NETWORK=<NETWORK> cargo build -p prover --release
```

## Data

Download Bitcoin headers and place as `prover/data/mainnet-headers.bin` (e.g. from [zerosync](https://zerosync.org/chaindata/headers.bin)):

```bash
cd prover/data
wget https://zerosync.org/chaindata/headers.bin -O mainnet-headers.bin
cd ../..
```

## Proving

```bash
./target/release/prover <PREV_PROOF_PATH> <OUTPUT_PROOF_PATH> <NUM_HEADERS>
```

- **First run** (from genesis): use `None` as previous proof path.
- **Later runs**: pass the previous proof file to verify and extend.

Examples:

```bash
# Prove first 10 headers
./target/release/prover None prover/data/first_10.bin 10

# Prove next 90 headers (verifies first_10.bin)
./target/release/prover prover/data/first_10.bin prover/data/first_100.bin 90
```

Use the same `<NETWORK>` as in the build for consistency.

<!--
Source references:
- sources/bitvm/prover/README.md
- sources/bitvm/header-chain/README.md
-->
