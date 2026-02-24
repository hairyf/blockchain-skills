---
name: bitcoin-rust-taproot
description: Taproot keys, tweaks, TapLeafHash, script tree, and P2TR address integration.
---

# Taproot

Taproot support is in the `taproot` module and in `crypto::key` (tweaked keys, `TapTweak` trait). Use for P2TR outputs, key-path and script-path spends, and sighash.

## Types

- **TapLeafHash**, **TapNodeHash**, **TapTweakHash**: Hashes used in taproot tree and tweak.
- **TapLeafTag**, **TapBranchTag**: Tags for leaf and branch hashes (BIP-0341).
- **TapTweak** (trait): Tweaking untweaked keys to get output key; implemented for `UntweakedPublicKey` and `UntweakedKeypair`.
- **TapSighash**, **TapSighashType**: Sighash for Taproot; use with `SighashCache::taproot_*_sighash`.

## Key tweaking

```rust
use bitcoin::taproot::{TapTweak, TapTweakTag};
use bitcoin::key::UntweakedPublicKey;

// Output key from internal key (key-path spend)
let (output_key, _parity) = internal_key.tap_tweak(&secp, None);

// With script tree (script-path spend)
let (output_key, _parity) = internal_key.tap_tweak(&secp, Some(merkle_root));
```

Use `Address::p2tr` with optional script tree to build the tweaked address; or `Address::p2tr_tweaked` if you already have the tweaked key.

## Sighash

- **Key-path**: `SighashCache::taproot_key_spend_sighash(prevouts, TapSighashType::Default)` (or custom type).
- **Script-path**: `taproot_script_spend_sighash(prevouts, leaf_hash, leaf_script, ...)` with the leaf being spent.
- Sign the resulting `TapSighash` with the appropriate key (tweaked for key-path, or script key for script-path).

## Script and tree

- **TapScript**: Script in a taproot leaf; use script builder and `TapScriptBuf`/extension methods where provided.
- Merkle tree construction: use `taproot` helpers for leaf hashes and branch hashes (BIP-0341); pass merkle root into `tap_tweak` when building script-path outputs.
- PSBT: Taproot keys and scripts appear in PSBT input maps; attach signatures and final script witness per BIP-0371.

## Key points

- Taproot is entangled with `secp256k1` across the codebase; key and taproot modules depend on it.
- For script-path spends, leaf version and leaf script must match the committed tree.
- BIP-0341 defines the exact tweak and sighash formats; the library follows them.

<!--
Source references:
- sources/bitcoin-rust/bitcoin/src/taproot/mod.rs
- sources/bitcoin-rust/docs/taproot.md
- BIP-0341
-->
