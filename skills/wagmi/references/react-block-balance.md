---
name: wagmi block and balance
description: useBlockNumber and useBalance for chain state and native balance.
---

# Block Number & Balance

**useBlockNumber** — most recent block number. **useBalance** — native currency balance for an address.

## useBlockNumber

```tsx
import { useBlockNumber } from 'wagmi'

const { data: blockNumber } = useBlockNumber()
// blockNumber: bigint | undefined
```

Parameters: `chainId`, `config`, `scopeKey`, `cacheTime`, and **watch** — set `watch: true` to subscribe to new blocks (or pass options for `useWatchBlockNumber`). Query options (`enabled`, etc.) apply.

## useBalance

```tsx
import { useBalance } from 'wagmi'

const { data } = useBalance({
  address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
})
// data: { decimals, symbol, value: bigint } | undefined
```

Parameters: **address** (required for balance), `chainId`, `blockNumber`, `blockTag`, `config`, `scopeKey`, plus query options.

Typical usage with connected account:

```tsx
const { address } = useAccount()
const { data: balance } = useBalance({ address })
// balance.value is wei (bigint); use formatEther(balance.value) for display
```

## Core actions

- **getBlockNumber** / **watchBlockNumber**
- **getBalance**

## Key points

- Use `watch: true` on `useBlockNumber` for live block updates (e.g. countdowns).
- Balance is in **wei**; use viem’s `formatEther` / `formatUnits` for display.
- Omit `address` or set `enabled: false` when address is not yet available.

<!--
Source references:
- https://wagmi.sh/react/api/hooks/useBlockNumber
- https://wagmi.sh/react/api/hooks/useBalance
-->
