---
name: viem-clients-transports
description: Create and use Public/Wallet/Test clients and HTTP/WebSocket/Custom transports in viem.
---

# Clients & Transports

Clients expose **Actions**; transports execute RPC requests. Use Public Client for reads, Wallet Client for signing/sending, Test Client for local dev (Anvil).

## Client types

- **Public Client**: `getBlockNumber`, `getBalance`, `readContract`, logs, etc.
- **Wallet Client**: `sendTransaction`, `signMessage`, `signTypedData`, wallet actions.
- **Test Client**: `mine`, `impersonateAccount`, `setBalance`, etc. (for Anvil).

## Usage

```ts
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http('https://eth.llamarpc.com'),
})

const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(), // or custom(window.ethereum) for browser
})
```

Public Client supports **multicall batching**: set `batch: { multicall: true }` so `readContract` calls are aggregated into a single `aggregate3` request (reduces RPC calls and compute units).

## Transports

- **HTTP**: `http(url?, { batch: true, fetchOptions })` — default for RPC. Use a dedicated RPC URL to avoid rate limits.
- **WebSocket**: `webSocket(url)` — for subscriptions (`watchBlockNumber`, `watchEvent`, etc.).
- **Custom (EIP-1193)**: `custom(provider)` — inject wallet provider (`window.ethereum` or WalletConnect).
- **IPC**: `ipc(path)` — Node.js only, for local nodes.
- **Fallback**: `fallback([http(url1), http(url2)])` — try transports in order.

## Key points

- Always pass an RPC URL to `http()` in production; omit only for public fallback.
- Use `custom(provider)` for wallet actions in browsers.
- Enable `batch.multicall` on Public Client when doing many `readContract` calls.
- Wallet Client needs an **account** for signing; pass `account` per action or set `account` on the client.

<!--
Source references:
- https://viem.sh/docs/clients/intro
- https://viem.sh/docs/clients/public
- https://viem.sh/docs/clients/transports/http
-->
