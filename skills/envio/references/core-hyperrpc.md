---
name: hyperrpc-usage
description: When to use HyperRPC, supported methods, and endpoint format.
---

# HyperRPC

HyperRPC is a read-only, JSON-RPC–compatible endpoint optimized for data-heavy reads. Prefer **HyperSync** for new code when you need maximum speed and flexibility.

## When to Use

- **HyperRPC**: Drop-in RPC replacement; existing code or tools that call `eth_getLogs`, `eth_getBlockByNumber`, etc. Minimal integration.
- **HyperSync**: New integrations; need filtering, field selection, or best performance.

## Supported Methods

- Chain: `eth_chainId`, `eth_blockNumber`
- Blocks: `eth_getBlockByNumber`, `eth_getBlockByHash`, `eth_getBlockReceipts`
- Transactions: `eth_getTransactionByHash`, `eth_getTransactionByBlockHashAndIndex`, `eth_getTransactionByBlockNumberAndIndex`, `eth_getTransactionReceipt`
- Logs: `eth_getLogs`
- Traces: `trace_block` (only on select chains; see supported networks).

## Endpoint and Token

- Base URL per network, e.g. `https://100.rpc.hypersync.xyz` or `https://arbitrum.rpc.hypersync.xyz`. See supported networks doc for full list.
- Append API token to path: `https://<network>.rpc.hypersync.xyz/<api-token>`.
- Example request:

```javascript
const response = await fetch("https://100.rpc.hypersync.xyz/<api-token>", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getLogs",
    params: [{ fromBlock: "0x1000000", toBlock: "0x1000100", address: "0x..." }],
  }),
});
```

## Key Points

- Read-only; no sending transactions.
- Under active development; not all RPC methods supported. Check docs for latest method list and tier/network support.

<!--
Source references:
- https://docs.envio.dev/docs/HyperRPC/overview-hyperrpc
- https://docs.envio.dev/docs/HyperSync/hypersync-supported-networks
-->
