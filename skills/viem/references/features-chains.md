---
name: viem-chains
description: Use built-in chains and define custom chains with viem.
---

# Chains

Clients are configured with a **chain** (id, name, RPC URLs, block explorers, optional contracts like multicall). Use `viem/chains` for built-in chains or `defineChain` for custom ones.

## Built-in chains

```ts
import { mainnet, polygon, base, zora } from 'viem/chains'
import { createPublicClient, http } from 'viem'

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
```

[Full list](https://github.com/wagmi-dev/viem/tree/main/src/chains/index.ts): mainnet, sepolia, polygon, arbitrum, optimism, base, zora, etc.

## Custom chain

Use `defineChain` when the chain is not in viem. Include `rpcUrls`, `blockExplorers`, and for multicall batching include `contracts.multicall3`.

```ts
import { defineChain } from 'viem'

export const myChain = defineChain({
  id: 7777777,
  name: 'My Chain',
  nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
  rpcUrls: {
    default: { http: ['https://rpc.example.com'], webSocket: ['wss://rpc.example.com'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.example.com' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 1,
    },
  },
})
```

## Key points

- Pass `chain` to `createPublicClient` / `createWalletClient` so RPC and formatters match the network.
- Custom chains need correct `id` and `rpcUrls`; add `contracts.multicall3` if you use Public Client multicall.
- Chain-specific config (e.g. fees, formatters) can be set on the chain object for advanced use.

<!--
Source references:
- https://viem.sh/docs/chains/introduction
- https://viem.sh/docs/chains/fees
-->
