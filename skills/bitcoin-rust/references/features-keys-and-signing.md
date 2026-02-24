---
name: bitcoin-rust-keys-and-signing
description: PrivateKey, PublicKey, XOnlyPublicKey, ECDSA and Taproot signing, sighash types.
---

# Keys and Signing

Keys and signing live in `bitcoin::crypto::key`, `bitcoin::crypto::ecdsa`, `bitcoin::crypto::sighash`, and re-exports at `bitcoin::key` and related modules.

## Key types

- **PrivateKey**: WIF encode/decode; `NetworkKind` for WIF prefix; can produce `Keypair` and `PublicKey`.
- **PublicKey**: Compressed (33 bytes) or uncompressed; use `CompressedPublicKey` where required (e.g. P2WPKH).
- **XOnlyPublicKey**: 32-byte x-only (Taproot); from `PublicKey` or secp256k1 `Keypair`.
- **TweakedPublicKey / TweakedKeypair**: Taproot output key and keypair after tweak.

```rust
use bitcoin::secp256k1::Secp256k1;
use bitcoin::{PrivateKey, PublicKey, CompressedPublicKey, Keypair, Network};

let secp = Secp256k1::new();
let (sk, pk) = secp256k1::generate_keypair(&mut rand::thread_rng());
let public_key = PublicKey::new(pk);
let compressed = CompressedPublicKey::from(public_key);

// WIF
let priv_key = PrivateKey::new(sk, Network::Bitcoin);
let wif = priv_key.to_wif();
let decoded = PrivateKey::from_wif(&wif)?;
```

## Sighash and signing

- **EcdsaSighashType**: Legacy (e.g. `All`, `Single`, `None`) and optional `AnyoneCanPay`.
- **TapSighashType**: Default or custom (`TapSighashType::All` etc.); use with `SighashCache` for Taproot.
- **SighashCache**: Builds legacy, Segwit v0, or Taproot sighash for a transaction; then sign with secp256k1.

```rust
use bitcoin::sighash::{EcdsaSighashType, SighashCache, Prevouts};
use bitcoin::{Transaction, ScriptBuf};

let mut cache = SighashCache::new(&tx);
// Legacy
let sighash = cache.legacy_sighash(input_index, &script_code, amount.as_sat(), EcdsaSighashType::All)?;
// Segwit v0
let sighash = cache.segwit_sighash(input_index, &script_code, amount.as_sat(), EcdsaSighashType::All)?;
// Taproot (BIP-0341)
let prevouts = Prevouts::All(&outputs);
let sighash = cache.taproot_key_spend_sighash(prevouts, TapSighashType::Default)?;
// or taproot_script_spend_sighash with (leaf_hash, leaf_script)
```

Sign the `sighash` (as `secp256k1::Message`) with the appropriate key; then attach the signature to the script_sig or witness.

## BIP-32

Use `bitcoin::bip32::Xpriv` / `Xpub` for HD keys; derive children and get `PrivateKey`/`PublicKey` for signing. See [features-bip32](features-bip32.md).

<!--
Source references:
- sources/bitcoin-rust/bitcoin/src/crypto/key.rs
- sources/bitcoin-rust/bitcoin/src/crypto/sighash.rs
- sources/bitcoin-rust/bitcoin/src/sighash.rs
- sources/bitcoin-rust/bitcoin/src/lib.rs
-->
