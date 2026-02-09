---
name: wagmi React setup
description: React setup with WagmiProvider, QueryClient, and config.
---

# React Setup

Wagmi React uses a single config, `WagmiProvider`, and TanStack Query for caching and reactivity.

## Provider Tree

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* app */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

Order: `WagmiProvider` wraps `QueryClientProvider` (or vice versa per docs; typically Wagmi outer so config is available everywhere).

## Config

Create config with `createConfig` from `wagmi`: set `chains`, `connectors`, and `transports`. Same config is used by all hooks via context; optional `config` argument on hooks overrides for testing or multiple configs.

## Hooks Scope

Hooks (`useAccount`, `useReadContract`, etc.) must run under both providers. Pass `config` to a hook to use a specific config instead of context.

<!--
Source references:
- https://wagmi.sh/react/getting-started
- sources/wagmi/site/react/getting-started.md
- sources/wagmi/site/react/guides/connect-wallet.md
-->
