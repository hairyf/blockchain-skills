---
name: solana-kit-rpc-transports
description: Custom RPC transports — failover, retry, round-robin, sharding — and createSolanaRpcFromTransport for agent and app use.
---

# Custom RPC transports (Kit)

Kit's RPC client can use a custom transport instead of the default HTTP one. Use createSolanaRpcFromTransport(transport). Transport is a function with the same shape as RpcTransport: receives request payload and context, returns JSON-RPC response or throws.

## Failover

Try each URL in sequence on failure; throw last error if all fail.

```ts
const transports = urls.map(url => createDefaultRpcTransport({ url }));
async function failoverTransport(...args) {
  let lastError;
  for (const t of transports) {
    try { return await t(...args); } catch (e) { lastError = e; }
  }
  throw lastError;
}
const rpc = createSolanaRpcFromTransport(failoverTransport);
```

## Retry with backoff

Retry up to N times with exponential delay before giving up.

## Round-robin

Distribute requests across transports in sequence (next = (next + 1) % length).

## Sharding by method

Route by payload.method (e.g. sendTransaction to one endpoint, getAccountInfo to another). Select transport in your wrapper and call it with the same args.

## Key points

Use createSolanaRpcFromTransport(transport); resulting rpc has the same API as createSolanaRpc(url). Failover and retry for resilience; round-robin and sharding for load and rate limits.

<!-- Source: sources/solana-kit/README.md (Custom RPC Transports) -->
