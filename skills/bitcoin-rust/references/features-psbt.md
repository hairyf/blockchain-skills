---
name: bitcoin-rust-psbt
description: BIP-0174 PSBT v0 creation, signing, and extraction; roles and limits.
---

# Partially Signed Bitcoin Transactions (PSBT)

The `psbt` module implements BIP-0174 Partially Signed Bitcoin Transaction format (v0). Use for building, signing, and combining partially signed transactions. **Input Finalizer** role (script/witness construction from satisfaction) is not implemented here—use [rust-miniscript](https://docs.rs/miniscript) for that.

## Structure

```rust
use bitcoin::psbt::Psbt;

pub struct Psbt {
    pub unsigned_tx: Transaction,  // script_sigs and witnesses must be empty
    pub version: u32,
    pub xpub: BTreeMap<Xpub, KeySource>,
    pub proprietary: BTreeMap<raw::ProprietaryKey, Vec<u8>>,
    pub unknown: BTreeMap<raw::Key, Vec<u8>>,
    pub inputs: Vec<Input>,
    pub outputs: Vec<Output>,
}
```

## Creating a PSBT

```rust
let tx = Transaction { version: 2, lock_time: LockTime::ZERO, input: vec![...], output: vec![...] };
// Ensure tx has no script_sigs or witnesses
let psbt = Psbt::from_unsigned_tx(tx)?;
```

## Input/Output maps

- **Input**: `witness_utxo`, `non_witness_utxo`, `final_script_sig`, `final_script_witness`, key paths, signatures, etc.
- **Output**: `redeem_script`, `witness_script`, key paths, BIP-32 derivation.
- Add UTXO data (witness or full previous tx) and key derivation so signers can produce signatures.

## Signing and extraction

- Sign inputs using sighash (legacy/Segwit/Taproot) and attach signatures to the corresponding PSBT input entries.
- **Extract transaction**: `psbt.extract_tx()` or `extract_tx_fee_rate_limit()` to get a `Transaction` once inputs are finalized. Extraction checks fee rate; use `DEFAULT_MAX_FEE_RATE` or a custom limit to avoid accidental overpayment.

## Serialization

- PSBTs use base64 or raw bytes; use the `psbt` module’s encode/decode helpers (and `base64` feature if needed).
- Non-standard sighash types in a PSBT are considered invalid by this library.

## Key points

- Do not use for consensus; library is for construction and signing tooling.
- For finalizing inputs (computing script_sig/witness from a satisfaction), use rust-miniscript’s PSBT support.
- Always validate fee and outputs when extracting.

<!--
Source references:
- sources/bitcoin-rust/bitcoin/src/psbt/mod.rs
- sources/bitcoin-rust/README.md
- BIP-0174
-->
