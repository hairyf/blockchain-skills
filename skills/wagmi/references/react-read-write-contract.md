---
name: wagmi read write contract
description: useReadContract, useWriteContract, useSimulateContract, useWaitForTransactionReceipt.
---

# Read & Write Contract (React)

## useReadContract

Read from contract view/pure functions. No gas; cached via TanStack Query.

```tsx
const { data, error, isPending, refetch } = useReadContract({
  address: '0x...',
  abi: erc20Abi,
  functionName: 'balanceOf',
  args: [address],
  query: { enabled: !!address },
})
```

- **address**, **abi**, **functionName**, **args** (optional) — Contract call.
- **query** — TanStack Query options (e.g. `enabled`, `staleTime`). Do not override `queryKey`/`queryFn`.
- Returns **data** (decoded result), **error**, **isPending**, **refetch**.

## useWriteContract

Write (mutate) contract. Returns mutation: `writeContract`, `writeContractAsync`, `data` (hash), `error`, `isPending`, `reset`.

```tsx
const { writeContract, data: hash, isPending } = useWriteContract()

// call
writeContract({
  address: nftAddress,
  abi: nftAbi,
  functionName: 'mint',
  args: [tokenId],
})
```

Then wait for receipt with **useWaitForTransactionReceipt({ hash })**; `data` is the receipt.

## useSimulateContract

Simulate a write (estimate gas, validate args) before calling **useWriteContract**. Use `useSimulateContract` result in `writeContract` for type-safe args and gas estimation.

```tsx
const { data: simulation } = useSimulateContract({
  address,
  abi,
  functionName: 'mint',
  args: [tokenId],
})
const { writeContract } = useWriteContract()
// writeContract(simulation?.request)
```

## useReadContracts

Batch multiple read contracts in one hook for multiple contracts or functions; returns array of results.

## Chain-specific Behavior

Some chains (e.g. Celo, zkSync) have custom properties; use **useBlock**, **useBlockNumber**, or chain config. For gas/time estimates use **useSimulateContract** or chain-specific hooks.

<!--
Source references:
- https://wagmi.sh/react/guides/read-from-contract
- https://wagmi.sh/react/guides/write-to-contract
- sources/wagmi/site/react/guides/read-from-contract.md
- sources/wagmi/site/react/guides/write-to-contract.md
-->
