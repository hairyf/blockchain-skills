---
name: tonweb-nft-content-royalty
description: NftUtils — offchain URI cell, parse offchain URI, getRoyaltyParams, parseAddress for NFT metadata and royalties.
---

# NFT Content and Royalty Utils

TonWeb’s NFT helpers use `NftUtils` for offchain metadata (URI) and royalty params. Handy when building or reading NFT collections/items.

## Offchain URI (metadata link)

- **createOffchainUriCell(uri)** — build a BOC cell for offchain content: 8-bit prefix `0x01` + UTF-8 encoded URI. Use as NFT content cell.
- **parseOffchainUriCell(cell)** — read URI from such a cell (follows refs for chunked data). Throws if not offchain prefix.

```js
const NftUtils = require('tonweb').contract.token.nft.NftUtils;
// or from NftCollection/NftItem if re-exported
const cell = NftUtils.createOffchainUriCell('https://example.com/meta/1.json');
const uri = NftUtils.parseOffchainUriCell(cell);
```

## Royalty params

Call collection get-method `royalty_params` and parse to a usable object:

```js
const params = await NftUtils.getRoyaltyParams(provider, collectionAddress);
// { royalty, royaltyFactor, royaltyBase, royaltyAddress }
// royalty = royaltyFactor / royaltyBase (e.g. 0.05 for 5%)
```

Use when displaying or enforcing royalty in marketplaces.

## parseAddress(cell)

Parse an Address from a cell whose first bits encode workchain (8 bits) and hash (256 bits). Used internally by get-method result parsing (e.g. royalty_address). Exported for custom parsing.

## Constants

- `NftUtils.OFFCHAIN_CONTENT_PREFIX` (0x01), `ONCHAIN_CONTENT_PREFIX` (0x00)
- `NftUtils.SNAKE_DATA_PREFIX`, `CHUNK_DATA_PREFIX` for on-chain content layout

## Key points

- Offchain content is the common “metadata URL” pattern; onchain content uses different prefixes and layout.
- getRoyaltyParams expects the collection contract to implement `royalty_params`; not all collections do.

<!--
Source references:
- sources/tonweb/src/contract/token/nft/NftUtils.js
- sources/tonweb/src/contract/token/nft/index.js
-->
