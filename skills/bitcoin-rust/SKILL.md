---
name: bitcoin-rust
description: Rust Bitcoin library—consensus encoding, transactions, scripts, keys, addresses, PSBT, BIP-32, and Taproot for wallets and tooling.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/rust-bitcoin/rust-bitcoin, scripts at https://github.com/antfu/skills
---

> Skill based on rust-bitcoin (rust-bitcoin/rust-bitcoin), generated from `sources/bitcoin-rust`. Doc path: `sources/bitcoin-rust/docs/`, README, and crate `lib.rs`.

Rust Bitcoin supports the Bitcoin network protocol and primitives: de/serialization of blocks and transactions, script parsing and building, private/public keys and addresses (including BIP-32), and PSBT v0. Use for wallets, indexers, and tooling—**not** for consensus validation. All content is in English.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Overview | What rust-bitcoin is, capabilities, limitations, crate stack, features | [core-overview](references/core-overview.md) |
| Consensus encoding | Encodable/Decodable, serialize/deserialize, partial and hex helpers | [core-consensus-encoding](references/core-consensus-encoding.md) |
| Types and crates | Block, Transaction, Script, Amount, hashes, network; crate layout and versions | [core-types-and-crates](references/core-types-and-crates.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Addresses | P2PKH, P2WPKH, P2TR, etc.; creation, parsing, network validation | [features-addresses](references/features-addresses.md) |
| Keys and signing | PrivateKey, PublicKey, XOnlyPublicKey, ECDSA/Taproot sighash and signing | [features-keys-and-signing](references/features-keys-and-signing.md) |
| PSBT | BIP-0174 PSBT v0; creation, signing, extraction; roles and limits | [features-psbt](references/features-psbt.md) |
| Script | ScriptBuf, builder, opcodes, script pubkey types | [features-script](references/features-script.md) |
| BIP-32 | Xpriv, Xpub, derivation paths, PSBT key source | [features-bip32](references/features-bip32.md) |
| Taproot | Tweaks, TapLeafHash, script tree, P2TR and sighash | [features-taproot](references/features-taproot.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Coding policy | Imports, re-exports, errors, rustdoc, BIP references | [best-practices-policy](references/best-practices-policy.md) |
| Dependencies | Policy on adding dependencies; MSRV and unsafe | [best-practices-dependencies](references/best-practices-dependencies.md) |
