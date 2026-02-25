---
name: wagmi chain and network
description: useChainId, useChains, useSwitchChain for current chain and switching.
---

# Chain and Network

Hooks for reading the current chain and switching: **useChainId**, **useChains**, **useSwitchChain**.

## useChainId

Returns the current chain ID (from config state / active connection).

```tsx
import { useChainId } from 'wagmi'

const chainId = useChainId()
// number — only from chains in createConfig chains
```

If the connected wallet is on a chain not in your config, Wagmi returns the last configured chain ID.

## useChains

Returns the list of chains passed to `createConfig({ chains })`.

```tsx
import { useChains } from 'wagmi'

const chains = useChains()
// readonly [Chain, ...Chain[]]
```

Use to render a chain selector or guard by supported chain.

## useSwitchChain

Switches the target chain. When **connected**, switches the connector's chain; when **disconnected**, updates the config's default chain.

```tsx
import { useChains, useSwitchChain } from 'wagmi'

const switchChain = useSwitchChain()
const chains = useChains()

return (
  <div>
    {chains.map((chain) => (
      <button
        key={chain.id}
        onClick={() => switchChain.mutate({ chainId: chain.id })}
      >
        {chain.name}
      </button>
    ))}
  </div>
)
```

Return: mutation-style `{ mutate, mutateAsync, data, isPending, error, chains (deprecated) }`. Prefer `useChains()` for the chain list instead of `switchChain.chains`.

## Core actions

- **getChainId** / **watchChainId**
- **getChains**
- **switchChain**

## Key points

- Chain IDs returned are limited to those in `createConfig`'s `chains`.
- Use `useSwitchChain` for network switcher UI; handle errors (e.g. user rejection, unsupported chain).

<!--
Source references:
- https://wagmi.sh/react/api/hooks/useChainId
- https://wagmi.sh/react/api/hooks/useChains
- https://wagmi.sh/react/api/hooks/useSwitchChain
- https://wagmi.sh/react/guides/chain-properties
-->
