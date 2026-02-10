---
name: best-practices-security
description: Security and safety when using bitcoinjs-lib — RNG, address reuse, xpub, verification.
---

# Security and Best Practices

Critical points for agents and implementers: RNG, key handling, and user verification.

## RNG (random number generation)

- Default RNG is **randombytes** (Node `crypto.randomBytes` / browser `crypto.getRandomValues`). Do not rely on default without verifying the environment.
- **Never use `Math.random()`** for keys, nonces, or anything security-sensitive.
- ECC uses RFC6979 (deterministic k) where applicable; bugs in Buffer or RNG can still cause key or nonce reuse and **catastrophic fund loss**. Run the library’s test suite in your target environment.

## Key and address discipline

- **Do not reuse addresses** — use a new address per receive where possible (privacy and safety).
- **Do not share BIP32 extended public keys (xpubs)** without understanding: one leaked extended private key or implementation bug can compromise all derived keys.
- **Do not ask users to invent mnemonics** (brain wallets); use BIP39 or similar with proper RNG.

## Verification before broadcast

- **Always** have users verify a human-readable representation of the transaction (amounts, addresses, fee) before broadcast. The library does not enforce this; it is the integrator’s responsibility.

## Production and trust

- Use **tagged releases** from npm/GitHub, not the master branch. Master is development-only.
- **Audit and verify** the library and dependencies; “don’t trust, verify.” Check that npm package matches a verified clone if possible.

## Summary for agents

When generating or reviewing code that uses bitcoinjs-lib: ensure RNG is cryptographically secure, avoid address reuse and xpub sharing in UX, and enforce manual verification of transactions before broadcast. Prefer TypeScript and run tests in the target environment.

<!--
Source references:
- https://github.com/bitcoinjs/bitcoinjs-lib README (Usage, Can I trust this code?, Should I use this in production?)
-->
