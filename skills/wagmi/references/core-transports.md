---
name: wagmi transports
description: HTTP, fallback, and WebSocket transports for createConfig RPC configuration.
---

# Transports

Transports are the layer that executes JSON-RPC requests to RPC providers. Pass them in `createConfig({ transports: { [chainId]: transport } })`. Available from `wagmi`: `http`, `fallback`, `webSocket`, `custom` (EIP-1193).

## http

Connects via HTTP. **Provide a dedicated RPC URL** to avoid rate limits; omitting URL falls back to public RPC.

```ts
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
})
```

Options: `batch: true` (or `{ batchSize, wait }`) for batch JSON-RPC; `fetchOptions` (e.g. headers); `key`, `name`; `retryCount`, `retryDelay`, `timeout`.

## fallback

Tries multiple transports in order; on failure, uses the next.

```ts
import { createConfig, fallback, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: fallback([
      http('https://primary.example.com'),
      http('https://backup.example.com'),
    ]),
  },
})
```

## webSocket

Connects via WebSocket. Use for subscriptions (e.g. `watchBlockNumber`, `watchContractEvent`). Options: `key`, `name`, `retryCount`, `retryDelay`, `timeout`.

```ts
import { createConfig, webSocket } from 'wagmi'
import { mainnet } from 'wagmi/chains'

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: webSocket('wss://mainnet.example.com'),
  },
})
```

## custom (EIP-1193)

Wraps a custom EIP-1193 provider. Use when integrating a non-standard RPC provider that exposes `request({ method, params })`.

## Key points

- Prefer explicit RPC URLs for `http()` and `webSocket()` in production.
- Use `fallback([http(...), http(...)])` for resilience.
- Use `http(..., { batch: true })` to batch multiple RPC calls into one request.

<!--
Source references:
- https://wagmi.sh/react/api/transports
- sources/wagmi/site/shared/transports/http.md
- sources/wagmi/site/shared/transports/fallback.md
- sources/wagmi/site/shared/transports/webSocket.md
-->
