---
name: solana-kit-setup
description: Install Kit, create RPC/RPC Subscriptions clients, and set up a minimal client type for the app.
---

# Setup (Kit)

Kit is a JavaScript SDK for Solana (Node, web, React Native). No single `Connection`-style class: use `createSolanaRpc` and `createSolanaRpcSubscriptions`, then compose a custom client type so only used APIs are bundled (tree-shaking).

## Install

```bash
npm install @solana/kit
```

For program interactions, install the program clients you need (e.g. System, Token, Compute Budget):

```bash
npm install @solana-program/system @solana-program/memo @solana-program/token @solana-program/compute-budget
```

## Create RPC and RPC Subscriptions

```ts
import {
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  sendAndConfirmTransactionFactory,
} from '@solana/kit';

const rpc = createSolanaRpc('https://api.devnet.solana.com');
const rpcSubscriptions = createSolanaRpcSubscriptions('wss://api.devnet.solana.com');
const sendAndConfirmTransaction = sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions });
```

## Typed client pattern

Define a small `Client` type with only the RPC/subscriptions and helpers your app uses. This keeps bundle size minimal.

```ts
import { Rpc, RpcSubscriptions, SolanaRpcApi, SolanaRpcSubscriptionsApi } from '@solana/kit';

export type Client = {
  rpc: Rpc<SolanaRpcApi>;
  rpcSubscriptions: RpcSubscriptions<SolanaRpcSubscriptionsApi>;
};

export function createClient(): Client {
  return {
    rpc: createSolanaRpc('http://127.0.0.1:8899'),
    rpcSubscriptions: createSolanaRpcSubscriptions('ws://127.0.0.1:8900'),
  };
}
```

## Key points

- Use `createSolanaRpc(url)` for HTTP RPC; `createSolanaRpcSubscriptions(wsUrl)` for WebSocket subscriptions.
- For sending transactions you typically need both RPC and RPC Subscriptions plus a strategy like `sendAndConfirmTransactionFactory`.
- Addresses: use `address('base58...')` from `@solana/kit` (replaces `PublicKey`).

<!--
Source references:
- sources/solana-kit/docs/content/docs/index.mdx
- sources/solana-kit/docs/content/docs/getting-started/setup.mdx
-->
