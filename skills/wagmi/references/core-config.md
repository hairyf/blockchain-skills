---
name: wagmi createConfig
description: Create and configure Wagmi config (chains, transports, connectors, storage).
---

# createConfig

Creates the Wagmi `Config` object that manages chains, transports, connectors, and internal state. Used by both Core (vanilla) and React/Vue/Solid.

## Usage

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

With connectors (React/Vue):

```ts
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected(), walletConnect({ projectId: '...' })],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## Key Parameters

- **chains** — `readonly [Chain, ...Chain[]]`. Chains the config uses; built-in chains from `wagmi/chains`.
- **transports** — `Record<chainId, Transport>`. Map chain ID to transport (e.g. `http()`, `fallback([...])`, `webSocket()`). Used to create internal Viem clients.
- **connectors** — Optional. Connectors for wallet connection (injected, metaMask, walletConnect, etc.).
- **client** — Optional. Function `({ chain }) => Client` for custom Viem client creation instead of `transports`.
- **storage** — Optional. Persists config state (e.g. `createStorage({ storage: window.localStorage })`). Defaults to localStorage when available.
- **ssr** — Set `true` for server-side rendering.
- **syncConnectedChain** — Keep `state.chainId` in sync with current connection (default `true`).
- **multiInjectedProviderDiscovery** — EIP-6963 injected provider discovery (default `true`).
- **batch**, **cacheTime**, **pollingInterval** — Tune batching and polling; see Viem client docs.

## Config API

- `config.getClient({ chainId })` — Get Viem client for a chain.
- `config.setState(updater)` — Update internal state (advanced).
- `config.subscribe(selector, listener)` — Subscribe to state slices; returns unsubscribe.

## State Shape

`Config.state` includes: `chainId`, `connections` (Map of connector id → Connection), `current` (active connection id), `status` (`'connected' | 'connecting' | 'disconnected' | 'reconnecting'`).

<!--
Source references:
- https://wagmi.sh/react/api/createConfig
- sources/wagmi/site/shared/createConfig.md
-->
