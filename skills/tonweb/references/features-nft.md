---
name: tonweb-features-nft
description: TonWeb NFT — NftCollection, NftItem, NftMarketplace, NftSale; deploy and mint.
---

# NFT (Token Standard)

TonWeb includes NFT contracts compatible with the [TON token standard](https://github.com/ton-blockchain/token-contract): `NftCollection`, `NftItem`, `NftMarketplace`, `NftSale`.

## NftCollection

Create and deploy a collection; mint items by index.

```js
const { NftCollection } = TonWeb.token.nft;

const collection = new NftCollection(tonweb.provider, {
  ownerAddress: ownerAddress,
  collectionContentUri: 'https://...',
  nftItemContentBaseUri: 'https://.../',
  nftItemCodeHex: '...',  // optional, has default
  royalty: 0.05,          // 5%, must be <= 1
  royaltyAddress: ownerAddress,
});
const collectionAddress = await collection.getAddress();
```

Mint body (send as message to collection):

```js
const body = collection.createMintBody({
  itemIndex: 0,
  amount: TonWeb.utils.toNano('0.05'),
  itemOwnerAddress: buyerAddress,
  itemContentUri: 'https://.../0.json',
  queryId: 0,
});
```

Get-methods: `getCollectionData`, `getNftItemAddressByIndex`, `getNftItemContent`, `getRoyaltyParams`.

## NftItem

Wrap an existing NFT item by address. Use for transfer, get content, or listing.

```js
const { NftItem } = TonWeb.token.nft;
const item = new NftItem(tonweb.provider, { address: itemAddress });
const addr = await item.getAddress();
// Use contract methods for transfer, get data, etc.
```

## NftMarketplace and NftSale

`NftMarketplace` and `NftSale` model marketplace and sale contracts. Instantiate with provider and options (address/code); use their methods to build sale listings and purchase messages.

## Key points

- Collections use offchain content URIs; content layout follows TON NFT metadata conventions.
- Royalty is 0–1 (e.g. 0.05 = 5%); stored with royalty base 1000.
- Mint is a message to the collection contract with correct op and payload from `createMintBody`.

<!--
Source references:
- https://github.com/toncenter/tonweb/blob/master/src/contract/token/nft/NftCollection.js
- https://github.com/toncenter/tonweb/blob/master/src/contract/token/nft/NftItem.js
- https://github.com/toncenter/tonweb/blob/master/src/contract/token/nft/index.js
-->
