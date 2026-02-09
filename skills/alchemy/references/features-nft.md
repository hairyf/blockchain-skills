---
name: alchemy-nft-api
description: Alchemy NFT API — metadata, owners, transfers, iterators, spam, rarity, floor price.
---

# NFT Namespace

`alchemy.nft` provides the Alchemy NFT API: metadata, ownership, transfers, pagination via iterators, spam classification, rarity, and floor price.

## Metadata and Ownership

- **getNftMetadata(contractAddress, tokenId, options?)** — single NFT metadata.
- **getNftMetadataBatch(tokens)** — batch NFT metadata.
- **getContractMetadata(contractAddress)** / **getContractMetadataBatch(contractAddresses)** — contract-level metadata.
- **getNftsForOwner(owner, options?)** — NFTs owned by address; options: `pageKey`, `pageSize`, `omitMetadata`, `excludeFilters` (e.g. SPAM), `contractAddresses`, etc.
- **getNftsForOwnerIterator(owner, options?)** — async iterator over all NFTs for owner (handles paging).
- **getNftsForContract(contractAddress, options?)** / **getNftsForContractIterator(...)** — all NFTs in a contract.
- **getOwnersForNft(contractAddress, tokenId, options?)** — owners of a token.
- **getOwnersForContract(contractAddress, options?)** — owners for a contract (with optional token balances).
- **getContractsForOwner(owner, options?)** — NFT contracts owned by address.
- **getMintedNfts(owner, options?)** — NFTs minted by owner.
- **verifyNftOwnership(owner, contractAddresses)** — check ownership for given contracts.

## Transfers and Refresh

- **getTransfersForOwner(owner, options?)** / **getTransfersForContract(contractAddress, options?)** — transfer history.
- **refreshNftMetadata(contractAddress, tokenId)** — refresh cached metadata for one token.
- **refreshContract(contractAddress)** — enqueue full contract metadata refresh.

## Spam and Rarity

- **isSpamContract(contractAddress)** — whether contract is classified as spam.
- **getSpamContracts()** — list of spam contracts.
- **reportSpam(contractAddress)** — report contract as spam.
- **isAirdropNft(contractAddress, tokenId)** — whether token is marked as airdrop.
- **computeRarity(contractAddress, tokenId)** — rarity per attribute.
- **summarizeNftAttributes(contractAddress)** — attribute prevalence for contract.

## Sales and Floor Price

- **getFloorPrice(contractAddress)** — floor price by marketplace.
- **getNftSales(options)** — NFT sales from on-chain marketplaces.
- **searchContractMetadata(keyword)** — search ERC-721/1155 contract metadata by keyword.

## Pagination

Responses return `pageKey` for the next page. Prefer **getNftsForOwnerIterator** / **getNftsForContractIterator** when iterating over all results.

```ts
for await (const nft of alchemy.nft.getNftsForOwnerIterator('vitalik.eth', { omitMetadata: false })) {
  console.log(nft.contract.address, nft.tokenId, nft.media);
}
```

## Key Points

- SDK uses `omitMetadata` (vs REST `withMetadata`), `pageKey` (vs `nextToken`/`startToken`), and renames "Collection" to "Contract" in method names.
- Token ID is normalized to integer string on `BaseNft`/`Nft`.
- Filter spam with `excludeFilters: [NftExcludeFilters.SPAM]` in get options.

<!--
Source references:
- sources/alchemy/docs-md/classes/NftNamespace.md
- sources/alchemy/docs-md/README.md
-->
