---
name: alchemy-client
description: Alchemy SDK client — instantiation, namespaces, settings, Network.
---

# Alchemy Client

The Alchemy SDK client is the main entry point. One instance = one network + one API key. Use `new Alchemy(settings?)` and access namespaces via `alchemy.core`, `alchemy.nft`, `alchemy.ws`, etc.

## Instantiation

```ts
import { Alchemy, Network } from 'alchemy-sdk';

const alchemy = new Alchemy({
  apiKey: 'your-api-key',  // default: 'demo' (rate-limited)
  network: Network.ETH_MAINNET,
  maxRetries: 5,
  url: undefined,          // override generated URL if set
  authToken: undefined,     // required for notify + portfolio
  batchRequests: false,
  requestTimeout: undefined,
});
```

## Namespaces

| Namespace   | Access       | Purpose |
|------------|--------------|---------|
| core       | `alchemy.core` | JSON-RPC + Enhanced APIs (balances, transfers, receipts) |
| nft        | `alchemy.nft`  | NFT API (metadata, owners, transfers, floor price) |
| ws         | `alchemy.ws`  | WebSockets / subscriptions |
| transact   | `alchemy.transact` | Send/simulate tx, private tx (Flashbots) |
| notify     | `alchemy.notify`   | Webhooks CRUD (requires `authToken`) |
| portfolio  | `alchemy.portfolio`| Multi-wallet tokens/NFTs/txs (requires `authToken`) |
| prices     | `alchemy.prices`   | Token price APIs |
| debug      | `alchemy.debug`    | traceCall, traceTransaction, traceBlock |

## Config and Underlying Provider

- `alchemy.config` — holds settings; use `alchemy.config.getProvider()` to get the underlying Ethers.js `AlchemyProvider` when you need low-level methods (e.g. `formatter`).
- ENS: Address parameters accept ENS names (e.g. `vitalik.eth`) wherever an EOA address is expected.

## Key Points

- One `Alchemy` instance per network/API key; create a new instance for another network.
- `authToken` (from Alchemy Dashboard) is required for `notify` and `portfolio`.
- Supported networks: `Network` enum (e.g. `ETH_MAINNET`, `POLYGON_MAINNET`, `ARBITRUM_MAINNET`, many L2s and alt chains).

<!--
Source references:
- https://github.com/alchemyplatform/alchemy-sdk-js
- sources/alchemy/docs-md/README.md
- sources/alchemy/docs-md/classes/Alchemy.md
- sources/alchemy/docs-md/interfaces/AlchemySettings.md
-->
