---
name: hyperlane-core-sdk
description: MultiProvider, ChainMap, HyperlaneCore, WarpCore, and multi-chain deployment patterns.
metadata:
  author: hairy
---

# Hyperlane SDK (TypeScript)

The SDK (`@hyperlane-xyz/sdk`) provides multi-chain provider management and core contract interactions for building and deploying interchain apps.

## MultiProvider and ChainMap

- **MultiProvider** – Manages chain metadata and RPC providers for many chains. Use for reads/writes across chains.
- **ChainMap&lt;T&gt;** – Type-safe per-chain configuration (e.g. `ChainMap<{ mailbox: string }>`). Use for addresses and config, not for provider instances.

```typescript
import { MultiProvider } from '@hyperlane-xyz/sdk';

const multiProvider = new MultiProvider(chainMetadata); // or from registry
const provider = multiProvider.getProvider(chainName);
const signer = multiProvider.getSignerOrProvider(chainName);
```

## HyperlaneCore / MultiProtocolCore

- **HyperlaneCore** – Common interactions with core deployments (Mailbox, IGP, ISMs, etc.) on EVM chains.
- **MultiProtocolCore** – Unified interface across VMs (EVM, Cosmos, Sealevel, etc.) when working with multiple VMs.

```typescript
import { HyperlaneCore } from '@hyperlane-xyz/sdk';

const core = HyperlaneCore.fromAddressesMap(addressesMap, multiProvider);
// Use core for contract instances, message verification, gas estimation, etc.
```

## Apps and deployment

- **HyperlaneApp / MultiProtocolApp** – Base to extend for a multi-chain app (contract addresses, helpers).
- **HyperlaneDeployer** – Base for running multi-chain contract deployments (config-driven, per-chain deploy).

## Token and Warp

- **Token** – Interact with existing Warp Route token contracts.
- **WarpCore** – Deploy and manage Warp Route deployments (canonical/collateral, config).

## Multi-VM (AltVM)

For Cosmos, Sealevel, Starknet, Radix:

- **@hyperlane-xyz/provider-sdk** – Protocol-agnostic provider abstractions.
- **@hyperlane-xyz/deploy-sdk** – Deployment modules for all VM types.
- **MultiProtocolProvider** – Unified provider interface across VMs.

Prefer these when the app spans non-EVM chains; use `MultiProtocolCore` / `MultiProtocolApp` for core interactions.

## Usage tips

- Import types and classes from `@hyperlane-xyz/sdk` instead of redefining.
- Chain metadata is often loaded from `@hyperlane-xyz/registry`; use `.registryrc` or env to point to registry version/path.
- Validate config at boundaries (e.g. Zod schemas); use `assert()` for invariants.

<!--
Source references:
- sources/hyperlane/AGENTS.md (TypeScript SDK, Multi-VM Package Structure)
- sources/hyperlane/typescript/sdk/README.md
-->
