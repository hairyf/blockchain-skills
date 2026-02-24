---
name: risc0 precompiles
description: Cryptographic precompiles and patched Rust crates for faster guest crypto.
---

# Precompiles

The zkVM implements **precompiles** for crypto (e.g. SHA-256, 256-bit modular mul, elliptic curve, RSA). Using them reduces cycles and proving cost compared to pure-software implementations. Use **patched crates** from RISC Zero’s forks so your guest automatically uses these precompiles.

## Patched crates (guest Cargo.toml)

Pin the exact version and patch from the fork. Example for SHA-2:

```toml
[dependencies]
sha2 = "=0.10.8"

[patch.crates-io]
sha2 = { git = "https://github.com/risc0/RustCrypto-hashes", tag = "sha2-v0.10.8-risczero.0" }
```

Check each fork’s **releases/tags** for the correct tag (e.g. `sha2-v0.10.8-risczero.0`, `k256/v0.13.3-risczero.1`). If the patch is applied indirectly, you may need:

```sh
cargo update -p sha2 --precise 0.10.8
```

Confirm in `Cargo.lock` that the crate references the RISC Zero fork. Commit `Cargo.lock` for the guest.

## Commonly used patched crates

- **sha2** — SHA-256 (RustCrypto-hashes).
- **tiny-keccak** — Keccak (may require unstable feature).
- **k256** / **p256** — secp256k1 / P-256 (RustCrypto-elliptic-curves).
- **curve25519-dalek** — Curve25519 (e.g. for ed25519-dalek).
- **rsa** — RSA (RustCrypto-RSA).
- **bls12_381**, **blst**, **c-kzg** — BLS / KZG (see precompiles doc for blst/c-kzg dependency).
- **crypto-bigint** — 256-bit modular ops.

Using these in the guest (without changing algorithm code) gives precompile acceleration. For ECDSA verification, see the official ECDSA example and its guest `Cargo.toml` for a full patched set (e.g. sha2, crypto-bigint, k256).

## Unstable precompiles

Some optimizations require the `unstable` feature on `risc0-zkvm` (guest) and `risc0-build` (build). Check the precompiles table for which crates need it. Production users can avoid `unstable` until those precompiles are stabilized.

## Timing and private data

Precompiles do not guarantee constant-time execution or constant proving time. Avoid using them with **secrets** (e.g. signing with a private key in the guest) if an attacker can observe cycle counts or proving time.

## Debugging precompile usage

Run with `RISC0_INFO=1` to see precompile-usage statistics for your guest.

<!--
Source references:
- sources/risc0/website/api_versioned_docs/version-3.0/zkvm/precompiles.md
-->
