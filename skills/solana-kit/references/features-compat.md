---
name: solana-kit-compat
description: Convert between legacy web3.js types (PublicKey, Keypair, VersionedTransaction) and Kit types (Address, CryptoKeyPair, Transaction).
---

# Web3.js compatibility (Kit)

The `@solana/compat` package converts legacy web3.js 1.x class instances to Kit types so you can interoperate with code or libraries that still use the old API.

## PublicKey to Address

```ts
import { fromLegacyPublicKey } from '@solana/compat';
const address = fromLegacyPublicKey(new PublicKey('49XBVQsvSW44ULKL9qufS9YqQPbdcps1TQRijx4FQ9sH'));
```

## Keypair to CryptoKeyPair

```ts
import { fromLegacyKeypair } from '@solana/compat';
const cryptoKeyPair = await fromLegacyKeypair(Keypair.generate());
```

## VersionedTransaction to Transaction

```ts
import { fromVersionedTransaction } from '@solana/compat';
const transaction = fromVersionedTransaction(legacyVersionedTransaction);
```

## TransactionInstruction to Instruction

```ts
import { fromLegacyTransactionInstruction } from '@solana/compat';
const instruction = fromLegacyTransactionInstruction(legacyInstruction);
```

## When to use

Migrating incrementally; consuming libraries that return PublicKey, Keypair, or VersionedTransaction. Do not use for new code; prefer Kit types directly. Package: @solana/compat, re-exported from @solana/kit. All conversions are one-way (legacy to Kit). fromLegacyKeypair is async.

<!-- Source: sources/solana-kit/packages/compat/README.md, README.md Compatibility Layer -->
