---
name: solana-core-accounts
description: Solana account model, address types (public key, PDA), keypair, and account structure for agent-driven development.
---

# Solana Core — Accounts

All data on Solana is stored in **accounts**. The ledger is a key-value store: key = 32-byte address, value = account (data + metadata).

## Account address

- **Public key**: Ed25519 public key; private key signs transactions. Shown as base58.
- **Program-derived address (PDA)**: Deterministically derived from program ID + seeds; no private key; programs can sign for PDAs.

## Keypair (TypeScript)

```ts
// @solana/kit (recommended)
import { generateKeyPairSigner } from "@solana/kit";
const signer = await generateKeyPairSigner();

// Legacy @solana/web3.js
import { Keypair } from "@solana/web3.js";
const keypair = Keypair.generate();
// keypair.publicKey, keypair.secretKey
```

## PDA derivation (TypeScript)

- **Kit**: `getProgramDerivedAddress(programId, seeds)` from `@solana/kit`.
- **Legacy**: `findProgramAddressSync(seeds, programId)` from `@solana/web3.js`.
- Returns `[address, bump]`. Bump is the canonical byte (255 down to 0) that makes the address off-curve.

## Account structure

- **lamports**: Balance (1 SOL = 10^9 lamports).
- **owner**: Program that owns the account (only owner can modify).
- **data**: Opaque bytes (program-defined).
- **executable**: Whether the account is a program (executable).

## Key points

- Only the owning program can change account data.
- Rent: accounts can be rent-exempt if they hold enough lamports (or are system-owned).
- Use PDAs for deterministic, program-controlled addresses (e.g. per-user state).

<!--
Source references:
- https://solana.com/docs/core/accounts
- https://github.com/solana-foundation/solana-com
-->
