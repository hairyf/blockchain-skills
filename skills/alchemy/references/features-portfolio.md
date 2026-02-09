---
name: alchemy-portfolio
description: Alchemy Portfolio API — multi-wallet tokens, NFTs, collections, transactions.
---

# Portfolio Namespace

`alchemy.portfolio` provides multi-wallet, multi-network views of fungible tokens, NFTs, collections, and transactions. Requires `authToken` in `AlchemySettings` (from Alchemy Dashboard).

## Methods

- **getTokensByWallet(addresses)** — fungible tokens (native + ERC-20) for multiple wallet/network pairs. `addresses`: array of `{ address, network }` (limit 2 pairs, max 15 networks each).
- **getTokenBalancesByWallet(addresses, includeNativeTokens?)** — token balances by wallet/network.
- **getNftsByWallet(addresses, withMetadata?, pageKey?, pageSize?)** — NFTs for multiple wallet/network pairs.
- **getNftCollectionsByWallet(addresses, withMetadata?, pageKey?, pageSize?)** — NFT collections (contracts) per wallet/network.
- **getTransactionsByWallet(addresses)** — historical transactions (internal and external) for multiple wallet/network pairs.

## Usage

```ts
const alchemy = new Alchemy({
  apiKey: '…',
  network: Network.ETH_MAINNET,
  authToken: '…',  // from Alchemy Dashboard
});

const tokens = await alchemy.portfolio.getTokensByWallet([
  { address: '0x…', network: Network.ETH_MAINNET },
  { address: '0x…', network: Network.POLYGON_MAINNET },
]);
const nfts = await alchemy.portfolio.getNftsByWallet([
  { address: 'vitalik.eth', network: Network.ETH_MAINNET },
], true, undefined, 50);
const txs = await alchemy.portfolio.getTransactionsByWallet([
  { address: '0x…', network: Network.ETH_MAINNET },
]);
```

## Key Points

- `authToken` is required; get it from the Alchemy Dashboard.
- `addresses` is an array of `PortfolioAddress` (address + network); limits apply (e.g. 2 pairs, 15 networks per pair).
- Use `pageKey` and `pageSize` for paginated NFT/collection responses.

<!--
Source references:
- sources/alchemy/docs-md/classes/PortfolioNamespace.md
- sources/alchemy/docs-md/README.md
-->
