---
name: wagmi connectors
description: Wallet connectors (injected, WalletConnect, MetaMask, Coinbase, Safe) and EIP-6963.
---

# Connectors

Connectors link wallets to Wagmi. Import from `wagmi/connectors` (React) or `@wagmi/vue/connectors` (Vue), etc.

## Built-in Connectors

- **injected()** — EIP-1193 injected provider (MetaMask, Brave, etc.). Use `shimDisconnect: true` (default) to simulate disconnect in storage. Optional `target` for EIP-6963 provider.
- **walletConnect({ projectId })** — WalletConnect v2; requires [Project ID](https://cloud.reown.com/).
- **metaMask()** — MetaMask extension.
- **coinbaseWallet({ appName, preference })** — Coinbase Wallet.
- **safe()** — Safe (formerly Gnosis Safe) wallet.
- **baseAccount()** — Base ecosystem account connector.

## Usage

```ts
import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected, walletConnect, metaMask } from 'wagmi/connectors'

const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
    walletConnect({ projectId: 'YOUR_PROJECT_ID' }),
    metaMask(),
  ],
  transports: { [mainnet.id]: http() },
})
```

## EIP-6963 (multi-injected)

`createConfig` has **multiInjectedProviderDiscovery** (default `true`), which uses [mipd](https://github.com/wevm/mipd) to discover EIP-6963 providers and expose them as injected connectors. Set to `false` to disable.

## Creating Connectors

See dev docs for implementing custom connectors (e.g. `createConnector` and connector interface).

<!--
Source references:
- https://wagmi.sh/react/api/connectors
- sources/wagmi/site/shared/connectors/injected.md
- sources/wagmi/site/react/guides/connect-wallet.md
-->
