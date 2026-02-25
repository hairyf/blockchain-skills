---
name: solana-kit-signers
description: Signers — abstraction for accounts that can sign messages and/or transactions (KeyPairSigner, wallet adapters, no-op).
---

# Signers (Kit)

Signers wrap an `Address` and provide signing logic (keypair, wallet, server, etc.). Use them so transaction/message building and sending can collect and invoke signers automatically without hard-coding key handling.

## KeyPairSigner (local keypair)

```ts
import { generateKeyPairSigner, airdropFactory, createSolanaRpc, createSolanaRpcSubscriptions, lamports } from '@solana/kit';

const wallet = await generateKeyPairSigner();
// Airdrop (test env only)
const rpc = createSolanaRpc('http://127.0.0.1:8899');
const rpcSubscriptions = createSolanaRpcSubscriptions('ws://127.0.0.1:8900');
const airdrop = airdropFactory({ rpc, rpcSubscriptions });
await airdrop({
  recipientAddress: wallet.address,
  lamports: lamports(1_000_000_000n),
  commitment: 'confirmed',
});
```

Other keypair helpers: `createSignerFromKeyPair(keyPair)`, `createKeyPairSignerFromBytes(64Bytes)`, `createKeyPairSignerFromPrivateKeyBytes(32Bytes)`.

## Signer types (transactions)

- **TransactionPartialSigner** — signs transactions without modifying them; can run in parallel; order doesn’t matter.
- **TransactionModifyingSigner** — may modify then sign; must run first for a given transaction.
- **TransactionSendingSigner** — signs and sends in one step (e.g. some wallets); only one per transaction, must be last.

`KeyPairSigner` implements `TransactionPartialSigner` and `MessagePartialSigner`. Use wallet adapters (e.g. `useWalletAccountTransactionSendingSigner` from `@solana/react`) for in-browser wallets.

## Message signing

```ts
import { createSignableMessage, generateKeyPairSigner } from '@solana/kit';

const signer = await generateKeyPairSigner();
const message = createSignableMessage('Hello world!');
const [signatures] = await signer.signMessages([message]);
```

## No-op signer

For testing or when you will supply signatures elsewhere (e.g. server):

```ts
import { createNoopSigner, address } from '@solana/kit';
const noop = createNoopSigner(address('1234..5678'));
// signMessages/signTransactions return empty signature dictionaries.
```

## Key points

- Prefer signer objects over raw `CryptoKeyPair` in transaction/message APIs so wallet and keypair are swappable.
- Fee payer and instruction signers are set via signers; `signTransactionMessageWithSigners` gathers and runs them.

<!--
Source references:
- sources/solana-kit/docs/content/docs/getting-started/signers.mdx
- sources/solana-kit/docs/content/docs/concepts/signers.mdx
-->
