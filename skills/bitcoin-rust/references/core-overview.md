---
name: bitcoin-rust-overview
description: What rust-bitcoin is, crate stack, capabilities, and limitations for agents.
---

# Rust Bitcoin Overview

The `rust-bitcoin` library supports the Bitcoin network protocol and primitives: de/serialization of blocks and transactions, script parsing, keys and addresses (including BIP-32), and PSBT v0. Use it for wallets, indexers, tooling, and non-consensus Bitcoin applications—**not** for full consensus validation.

## Capabilities

- **De/serialization**: Bitcoin protocol network messages, blocks, transactions, scripts (consensus encoding via `Encodable`/`Decodable`).
- **Script**: Parsing and building scripts; opcodes; witness and legacy script types.
- **Keys and addresses**: Private/public keys, WIF, BIP-32 HD keys, P2PKH/P2SH/P2WPKH/P2WSH/P2TR addresses (bech32 and base58).
- **PSBT**: BIP-0174 Partially Signed Bitcoin Transactions (v0); de/serialization and all roles except Input Finalizer (use [rust-miniscript](https://docs.rs/miniscript) to finalize).
- **Taproot**: Taproot keys, tweaks, and script extensions.
- **No_std**: Optional; build with `--no-default-features` for embedded. See `bitcoin/embedded` and `hashes/embedded` for examples.

## Important limitation

**Do not use for consensus.** The library must not be used for fully validating blockchain data. There are known and unknown deviations from the Bitcoin Core reference implementation. For consensus-critical code, use Bitcoin Core or a consensus-compliant implementation.

## Crate stack

The project is split into multiple crates. Main ones:

- **bitcoin**: Top-level crate; re-exports primitives, units, and adds address, PSBT, BIP-32, taproot, signing.
- **primitives**: Block, transaction, script, witness types (re-exported by `bitcoin`).
- **units**: Amount, Weight, FeeRate, Sequence, locktime, etc.
- **hashes**: Hash types and traits used by primitives.
- **secp256k1**, **bech32**, **hex-conservative**, **miniscript**: External repos (rust-bitcoin org or community).

For JSON-RPC with Bitcoin Core use [rust-bitcoincore-rpc](https://github.com/rust-bitcoin/rust-bitcoincore-rpc).

## Cargo features (bitcoin crate)

- `std` (default), `base64`, `bitcoinconsensus` (script/tx validation), `rand`, `serde`, `secp-lowmemory`, `secp-recovery`.

<!--
Source references:
- sources/bitcoin-rust/README.md
- sources/bitcoin-rust/docs/crates.md
- sources/bitcoin-rust/bitcoin/src/lib.rs
-->
