---
name: alchemy-core-namespace
description: Alchemy core namespace — JSON-RPC, Enhanced APIs, token balances, asset transfers.
---

# Core Namespace

`alchemy.core` exposes standard Ethers.js provider methods plus Alchemy Enhanced APIs. It is a drop-in replacement for an Ethers.js provider for common operations.

## Standard Provider Methods

Use as you would with Ethers: `getBlockNumber`, `getBalance`, `getBlock`, `getTransaction`, `getTransactionReceipt`, `getTransactionCount`, `getCode`, `getLogs`, `call`, `estimateGas`, `sendTransaction`, `waitForTransaction`, `getNetwork`, `getFeeData`, `getGasPrice`, `resolveName`, `lookupAddress`, `getStorageAt`, `ready`, `send`.

## Enhanced APIs

- **getTokenMetadata(contractAddress)** — metadata for a token contract.
- **getTokenBalances(ownerAddress, contractAddresses?)** — token balances for an owner; omit contract list for all tokens.
- **getAssetTransfers(params)** / **getAssetTransfersWithMetadata(params)** — transfers for addresses; params include `fromAddress`, `toAddress`, `fromBlock`, `toBlock`, `category`, etc.
- **getTransactionReceipts(params)** — all receipts for a block (params: `blockNumber`).
- **findContractDeployer(contractAddress)** — deployer address and block (binary search; can be slow; beta).
- **getTokensForOwner(ownerAddress, options?)** — all token balances and metadata for an owner.
- **isContractAddress(address)** — whether address has code.

## Usage

```ts
const alchemy = new Alchemy({ apiKey: 'demo', network: Network.ETH_MAINNET });

// Standard
const blockNumber = await alchemy.core.getBlockNumber();
const balance = await alchemy.core.getBalance('vitalik.eth');

// Enhanced
const tokenBalances = await alchemy.core.getTokenBalances('vitalik.eth');
const transfers = await alchemy.core.getAssetTransfers({
  fromAddress: 'vitalik.eth',
  fromBlock: '0x0',
  toBlock: 'latest',
});
const tokensForOwner = await alchemy.core.getTokensForOwner('vitalik.eth');
const deployer = await alchemy.core.findContractDeployer('0x…');
```

## Key Points

- ENS is supported for address parameters.
- For full Ethers provider (e.g. `formatter`), use `alchemy.config.getProvider()`.
- Pagination for Enhanced APIs often uses `pageKey` from the previous response.

<!--
Source references:
- sources/alchemy/docs-md/classes/CoreNamespace.md
- sources/alchemy/docs-md/README.md
-->
