---
name: bitcoin-rust-types-and-crates
description: Main types (Block, Transaction, Script, Amount) and crate/version layout.
---

# Core Types and Crate Stack

## Main types (from `bitcoin` / `primitives`)

- **Block / BlockHeader**: `primitives::block`; `BlockHash`, `WitnessCommitment`, merkle roots.
- **Transaction**: `primitives::transaction`; `Txid`, `Wtxid`, `Ntxid`; `TxIn`, `TxOut`, `OutPoint`; `Version`, `Witness`.
- **Script**: `ScriptBuf` / `Script` (borrowed); `ScriptPubKey`, `ScriptSig`, `RedeemScript`, `WitnessScript`, `TapScript`; `Witness` for witness stack.
- **Amounts**: `Amount`, `SignedAmount` (from `units`); use `Amount::from_sat`, `to_sat`, denomination helpers.
- **Locktime**: `absolute::LockTime`, `relative::LockTime`; sequence via `Sequence`.
- **Hashes**: `Txid`, `Wtxid`, `BlockHash`, `ScriptHash`, `WScriptHash`, `PubkeyHash`, `WPubkeyHash` (from hashes/crypto).
- **Network**: `Network`, `NetworkKind`, `Params`; `Network::Bitcoin`, `Testnet`, `Signet`, `Regtest`.

Re-export hierarchy: `units` → `primitives` → `bitcoin`; use types from the highest crate in scope (e.g. `bitcoin::Transaction` when using the `bitcoin` crate).

## Crates in this repo

| Crate | Purpose |
|-------|--------|
| bitcoin | Main library; address, PSBT, BIP-32, taproot, consensus encoding |
| primitives | Block, tx, script, witness types |
| units | Amount, Weight, FeeRate, Sequence, time, etc. |
| hashes | Hash types and engines |
| consensus_encoding | Sans-I/O encoding (newer) |
| io | I/O traits for no_std |
| addresses | Address types (placeholder/split) |
| base58 | Base58 check encoding |
| crypto | Key and sighash crypto |
| p2p | P2P message types |
| bip158 | Compact block filters |
| internals | Internal shared code |

External: `secp256k1`, `bech32`, `hex-conservative`, `miniscript` (separate repos).

## Versioning

- LTS: v0.30, v0.31 (security/bugfix); v0.32 actively maintained; v0.33 in development (primitives/units 1.0).
- Match dependency versions to the `bitcoin` version (see `docs/supported-versions.md`).

<!--
Source references:
- sources/bitcoin-rust/bitcoin/src/lib.rs
- sources/bitcoin-rust/docs/crates.md
- sources/bitcoin-rust/docs/supported-versions.md
-->
