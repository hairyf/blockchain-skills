---
name: solana-kit-rpc-subscriptions
description: RPC Subscriptions — WebSocket subscriptions for account changes, slot notifications, signature status, etc.
---

# RPC Subscriptions (Kit)

RPC Subscriptions provide WebSocket-based notifications (account changes, slot updates, signature status). Use with `AbortSignal` to cancel cleanly.

## Create and subscribe

```ts
import { createSolanaRpcSubscriptions, address } from '@solana/kit';

const rpcSubscriptions = createSolanaRpcSubscriptions('wss://api.devnet.solana.com');
const abortController = new AbortController();

const accountNotifications = await rpcSubscriptions
  .accountNotifications(address('1234..5678'), { commitment: 'confirmed' })
  .subscribe({ abortSignal: abortController.signal });

for await (const accountInfo of accountNotifications) {
  console.log(accountInfo);
}
```

## Slot notifications example

```ts
const slotNotifications = await rpcSubscriptions
  .slotNotifications()
  .subscribe({ abortSignal: AbortSignal.timeout(10_000) });
for await (const n of slotNotifications) {
  console.log('Slot', n.slot);
}
```

## Key points

- Always pass `abortSignal` (e.g. `AbortController.signal` or `AbortSignal.timeout(ms)`) to `.subscribe()` for cancellation and cleanup.
- Subscriptions are async iterables; use `for await` or iterate manually.
- Endpoints: `wss://api.mainnet-beta.solana.com`, `wss://api.testnet.solana.com`, `wss://api.devnet.solana.com`.

<!--
Source references:
- sources/solana-kit/docs/content/docs/concepts/rpc-subscriptions.mdx
-->
