---
name: moralis-wallet-token-nft
description: Moralis Wallet, Token, and NFT API — balances, transfers, metadata, prices.
---

# Wallet, Token & NFT APIs

Agent-friendly patterns for fetching wallet holdings, token metadata, and NFT data via Moralis.

## Wallet API

```ts
// Native balance
const native = await Moralis.EvmApi.balance.getNativeBalance({
  address, chain,
});

// ERC20 balances (with optional token filter)
const erc20 = await Moralis.EvmApi.token.getWalletTokenBalances({
  address, chain,
  tokenAddresses: ["0xA0b869..."], // optional
});

// NFTs
const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
  address, chain,
  limit: 20, cursor: "...",
});

// Wallet transactions (decoded)
const txs = await Moralis.EvmApi.wallet.getWalletTransactions({
  address, chain,
  limit: 10,
});

// ERC20 transfers
const transfers = await Moralis.EvmApi.token.getWalletTokenTransfers({
  address, chain,
});

// NFT transfers
const nftTransfers = await Moralis.EvmApi.nft.getWalletNFTTransfers({
  address, chain,
});

// ENS / domain resolution
const ens = await Moralis.EvmApi.resolve.resolveAddress({
  domain: "vitalik.eth",
});
```

## Token API (ERC20)

```ts
// Token metadata (name, symbol, decimals)
const meta = await Moralis.EvmApi.token.getTokenMetadata({
  addresses: ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"],
  chain,
});

// Token price
const price = await Moralis.EvmApi.token.getTokenPrice({
  address: tokenAddress, chain,
});

// Pair stats (DEX)
const pair = await Moralis.EvmApi.defi.getTokenPairReserves({
  pairAddress, chain,
});
```

## NFT API

```ts
// Collection metadata
const collection = await Moralis.EvmApi.nft.getNFTContractMetadata({
  address: nftContract, chain,
});

// Single NFT metadata
const nftMeta = await Moralis.EvmApi.nft.getNFTMetadata({
  address: nftContract, tokenId, chain,
});

// Floor price
const floor = await Moralis.EvmApi.nft.getNFTLowestPrice({
  address: nftContract, chain,
});
```

## Key Points

- `address` is required for wallet-scoped endpoints.
- Use `cursor` and `limit` for pagination.
- Token addresses use checksum format; ENS domains work where supported.
- For Solana: `Moralis.SolApi.*` namespace with different address formats.

<!--
Source references:
- https://docs.moralis.io/web3-data-api/evm/reference/wallet-api
- https://docs.moralis.io/web3-data-api/evm/reference/token-api
- https://docs.moralis.io/web3-data-api/evm/reference/nft-api
-->
