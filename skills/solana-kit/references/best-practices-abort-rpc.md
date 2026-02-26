---
name: solana-kit-abort-rpc
description: Abort RPC requests and subscriptions with AbortController — timeouts, cancel on navigation, required for subscribe().
---

# Aborting RPC and subscriptions (Kit)

RPC requests and subscriptions accept an abortSignal so you can cancel in-flight work, set timeouts, or clean up when the user navigates away.

## RPC requests

Each RPC method returns a call object; .send() accepts options including abortSignal. Pass AbortController.signal to cancel when the controller aborts:

```ts
const controller = new AbortController();
const slot = await rpc.getSlot().send({ abortSignal: controller.signal });
// Later: controller.abort() cancels the request.
```

Use AbortSignal.timeout(ms) for a timeout: await rpc.getSlot().send({ abortSignal: AbortSignal.timeout(5000) }).

## Subscriptions

subscribe() requires abortSignal. Use it to stop the subscription (e.g. when leaving the page or when a condition is met). If the subscription fails (connection down), the for-await loop throws; if aborted, it exits without throwing. Always pass a signal and abort in cleanup.

## Key points

- Pass abortSignal to .send() for requests and to .subscribe() for subscriptions. Use AbortSignal.timeout(ms) for timeouts. Aborted subscriptions exit the loop; failed subscriptions throw.

<!-- Source: sources/solana-kit/README.md Aborting RPC Requests, Aborting RPC Subscriptions -->
