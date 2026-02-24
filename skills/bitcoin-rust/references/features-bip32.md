---
name: bitcoin-rust-bip32
description: BIP-0032 HD keys (Xpriv, Xpub), derivation paths, and key source for PSBT.
---

# BIP-32 Hierarchical Deterministic Keys

The `bip32` module implements BIP-0032: extended private key (`Xpriv`), extended public key (`Xpub`), derivation paths, and child derivation. Use for HD wallets and PSBT key paths.

## Types

- **Xpriv**: `network`, `depth`, `parent_fingerprint`, `child_number`, `private_key` (secp256k1 `SecretKey`), `chain_code`.
- **Xpub**: Same structure but public key and chain code; no private key.
- **ChildNumber**: Normal or hardened; use for path segments.
- **DerivationPath**: Path of `ChildNumber`s (e.g. `m/84'/0'/0'`).
- **KeySource**: (fingerprint, path) used in PSBT global and per-input/output.

## Derivation

```rust
use bitcoin::bip32::{Xpriv, Xpub, DerivationPath, ChildNumber};

// Parse or build path
let path = "m/84'/0'/0'/0/0".parse::<DerivationPath>()?;

// Derive from xpriv
let child = xpriv.derive_priv(&secp, &path)?;
let private_key = child.to_priv();

// Derive from xpub (non-hardened steps only)
let child_pub = xpub.derive_pub(&secp, &path)?;
```

- Hardened derivation (`ChildNumber::Hardened`) requires `Xpriv`; normal steps can use `Xpub`.
- Use `network` on `Xpriv` for WIF when exporting; match network when importing.

## Fingerprint and identifiers

- **Fingerprint**: First 4 bytes of parent key hash (for key source in PSBT).
- **XKeyIdentifier**: BIP-32 extended key identifier (hash160 of serialized pubkey); used in PSBT xpub map.

## PSBT integration

- Global `xpub`: map `Xpub` → `KeySource` (fingerprint + derivation path).
- Per-input/per-output key paths: same `KeySource` format so signers can derive keys and sign.
- Use `bip32::KeySource` when building or reading PSBT key path data.

## Key points

- BIP-0380 (new key derivation) is planned; current API is BIP-0032.
- Always use the correct network (mainnet vs testnet) for WIF and address creation from derived keys.
- Prefer deriving at the path you need rather than storing many keys.

<!--
Source references:
- sources/bitcoin-rust/bitcoin/src/bip32.rs
- sources/bitcoin-rust/docs/bip-32.md
- BIP-0032
-->
