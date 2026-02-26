---
name: solana-kit-keypairs
description: Key pairs — generateKeyPair, createKeyPairSignerFromBytes, Web Crypto Ed25519; when to use Signers instead.
---

# Key pairs (Kit)

Kit uses the Web Crypto API for Ed25519. Prefer **Signers** (e.g. `KeyPairSigner`) for transaction and message signing in app code; use key pairs when you need raw keys (e.g. ephemeral account creation, custom signer impl).

## Generate

```ts
import { generateKeyPair, generateKeyPairSigner } from '@solana/kit';

const keyPair: CryptoKeyPair = await generateKeyPair();
const signer = await generateKeyPairSigner();
```

## Import from bytes

- 64-byte secret (full key): `createKeyPairSignerFromBytes(bytes)`.
- 32-byte private key: `createKeyPairSignerFromPrivateKeyBytes(bytes)`.

```ts
import { createKeyPairSignerFromBytes } from '@solana/kit';
import fs from 'fs';

const keypairFile = fs.readFileSync('~/.config/solana/id.json');
const keypairBytes = new Uint8Array(JSON.parse(keypairFile.toString()));
const signer = await createKeyPairSignerFromBytes(keypairBytes);
```

## Signer from key pair

```ts
import { createSignerFromKeyPair, generateKeyPair } from '@solana/kit';

const keyPair = await generateKeyPair();
const signer = await createSignerFromKeyPair(keyPair);
```

## Polyfill

In runtimes without Ed25519 (e.g. older Node), use `@solana/webcrypto-ed25519-polyfill` and install before any crypto usage.

## Key points

- For signing transactions and messages in app code, use Signers (`generateKeyPairSigner`, `createSignerFromKeyPair`, wallet adapters); reserve raw `CryptoKeyPair` for key generation/import and low-level signer implementations.

<!--
Source references:
- sources/solana-kit/docs/content/docs/concepts/keypairs.mdx
-->
