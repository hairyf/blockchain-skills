---
name: moralis-web3-data-api
description: Moralis Web3 Data API — EVM/Solana indexed APIs for wallet, token, NFT, price, blockchain data.
---

# Moralis Web3 Data API

Moralis indexes blockchain data and exposes structured REST APIs for EVM and Solana chains. Use for wallet balances, token/NFT metadata, prices, transactions, and blocks.

## SDK Usage (JavaScript/TypeScript)

```ts
import Moralis from "moralis";
import { EvmChain } from "moralis/common-evm-utils";

await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

// Native balance
const balance = await Moralis.EvmApi.balance.getNativeBalance({
  address: "0x...",
  chain: EvmChain.ETHEREUM,
});

// ERC20 token balances with prices
const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
  address: "0x...",
  chain: EvmChain.ETHEREUM,
});

// NFTs in wallet
const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
  address: "0x...",
  chain: EvmChain.ETHEREUM,
});

// Token price
const price = await Moralis.EvmApi.token.getTokenPrice({
  address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
  chain: EvmChain.ETHEREUM,
});
```

## API Namespaces

| Namespace | Purpose |
|-----------|---------|
| `Moralis.EvmApi.balance` | Native (ETH, etc.) balances |
| `Moralis.EvmApi.token` | ERC20 metadata, balances, transfers, prices |
| `Moralis.EvmApi.nft` | NFT metadata, ownership, transfers, floor prices |
| `Moralis.EvmApi.block` | Block contents, transactions, logs |
| `Moralis.EvmApi.transaction` | Transaction details, decoded methods |
| `Moralis.EvmApi.resolve` | ENS, Unstoppable Domains lookups |

## Key Points

- **Chain parameter**: Use `EvmChain.ETHEREUM`, `EvmChain.POLYGON`, hex chain ID, or string (`"0x1"`, `"eth"`).
- **Response shape**: `response.result` or `response.raw` depending on endpoint.
- **Rate limits**: Free tier has limits; paid plans for production.
- **REST fallback**: Call `https://deep-index.moralis.io/api/v2/...` with `X-API-Key` header if not using SDK.

<!--
Source references:
- https://docs.moralis.io/web3-data-api/evm
- https://github.com/MoralisWeb3/docs
-->
