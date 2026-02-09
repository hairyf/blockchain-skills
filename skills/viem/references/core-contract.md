---
name: viem-contract
description: Create contract instances and call readContract, writeContract, simulateContract with viem.
---

# Contract: getContract, read, write, simulate

Type-safe contract interaction via **getContract** (instance) or standalone **readContract** / **writeContract** / **simulateContract**.

## getContract (instance)

Creates a contract instance with `address`, `abi`, and `client` (Public and/or Wallet). Use when you repeatedly call the same contract.

```ts
import { getContract } from 'viem'
import { publicClient, walletClient } from './client'
import { erc20Abi } from './abi'

const contract = getContract({
  address: '0x...',
  abi: erc20Abi,
  client: { public: publicClient, wallet: walletClient },
})

const balance = await contract.read.balanceOf(['0xa5cc...'])
const hash = await contract.write.transfer(['0xa5cc...', 100n], { account })
const unwatch = contract.watchEvent.Transfer({}, { onLogs: (logs) => console.log(logs) })
```

Instance methods: `read.*`, `write.*`, `simulate.*`, `estimateGas.*`, `getEvents.*`, `watchEvent.*`, `createEventFilter`.

## readContract

Read-only (view/pure) calls; no gas, no account. Use Public Client.

```ts
const totalSupply = await publicClient.readContract({
  address: '0x...',
  abi: erc20Abi,
  functionName: 'totalSupply',
})
const balance = await publicClient.readContract({
  address: '0x...',
  abi: erc20Abi,
  functionName: 'balanceOf',
  args: ['0xa5cc...'],
})
```

## writeContract & simulateContract

Write functions change state and require gas; need Wallet Client and account. **Always simulate before sending** to validate success.

```ts
const { request } = await publicClient.simulateContract({
  account,
  address: '0x...',
  abi: erc20Abi,
  functionName: 'transfer',
  args: ['0xa5cc...', 100n],
})
await walletClient.writeContract(request)
```

Use `simulateContract` to get the `request` object, then pass it to `writeContract` so the same params are used and errors are caught before broadcast.

## Key points

- Use **getContract** when you have a fixed contract and want `contract.read.*` / `contract.write.*` without repeating address/abi.
- Use **readContract** for one-off reads or when you don't need an instance.
- Pair **simulateContract** with **writeContract**; never send a write without simulating first when possible.
- ABI types are inferred; `args` and return types come from the ABI.

<!--
Source references:
- https://viem.sh/docs/contract/getContract
- https://viem.sh/docs/contract/readContract
- https://viem.sh/docs/contract/writeContract
- https://viem.sh/docs/contract/simulateContract
-->
