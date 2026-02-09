---
name: wagmi TypeScript
description: Register config and infer chain/ABI types for strict typing in hooks.
---

# TypeScript Best Practices

## Register config (recommended)

Register the app config so hooks infer `chainId` and chains from your config instead of `number`:

```ts
import { type Config } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: { [mainnet.id]: http(), [sepolia.id]: http() },
})
```

Then `useBlockNumber({ chainId: 123 })` will error; only `mainnet.id` / `sepolia.id` allowed.

## Hook config property

Alternatively pass **config** to each hook so types use that config: `useBlockNumber({ config, chainId: mainnet.id })`. Useful for tests or multiple configs.

## ABI inference

Pass **const** ABIs for inferred types and autocomplete:

```ts
const erc20Abi = [
  { type: 'function', name: 'balanceOf', stateMutability: 'view', inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }] },
] as const

useReadContract({ address: '0x...', abi: erc20Abi, functionName: 'balanceOf', args: [addr] })
// args and return type inferred
```

Lock wagmi and TypeScript to patch versions when upgrading to avoid type churn.

<!--
Source references:
- https://wagmi.sh/react/typescript
- sources/wagmi/site/react/typescript.md
- sources/wagmi/site/react/getting-started.md (register config snippet)
-->
