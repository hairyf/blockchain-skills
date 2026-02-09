---
name: wagmi Core actions
description: Use Wagmi Core (vanilla) actions with config for accounts, ENS, contracts, and chain data.
---

# Wagmi Core Actions

Wagmi Core (`@wagmi/core`) is framework-agnostic. Pass `config` to actions to read/write chain data, resolve ENS, and interact with contracts without React/Vue.

## Setup

```ts
import { createConfig, http } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: { [mainnet.id]: http(), [sepolia.id]: http() },
})
```

## Common Actions

- **getConnection(config)** — Get current connection (`address`, `chainId`, `connector`). Returns `undefined` when disconnected.
- **getEnsName(config, { address })** — Resolve ENS name for address.
- **getEnsAddress(config, { name })** — Resolve address for ENS name.
- **getBlockNumber(config, { chainId? })** — Latest block number.
- **readContract(config, { address, abi, functionName, args?, chainId? })** — Read from contract (view/pure).
- **writeContract(config, { address, abi, functionName, args?, account?, chainId? })** — Write to contract (returns tx hash).
- **sendTransaction(config, { to, value?, data?, account?, chainId? })** — Send a transaction.

All async actions accept `config` as first argument; chain-specific options use `chainId` from config or override.

## Usage

```ts
import { getConnection, getEnsName, readContract } from '@wagmi/core'
import { config } from './config'

const { address } = getConnection(config) ?? {}
const ensName = address ? await getEnsName(config, { address }) : null
const balance = await readContract(config, {
  address: '0x...',
  abi: erc20Abi,
  functionName: 'balanceOf',
  args: [address],
})
```

## Framework Adapters

Core is the base for React (`wagmi`), Vue (`@wagmi/vue`), and Solid (`@wagmi/solid`). Hooks/composables wrap these actions with reactive state and TanStack Query. For custom frameworks, use Core actions directly or build an adapter that subscribes to `config.subscribe`.

<!--
Source references:
- https://wagmi.sh/core/getting-started
- sources/wagmi/site/core/getting-started.md
- sources/wagmi/site/core/api/actions
-->
