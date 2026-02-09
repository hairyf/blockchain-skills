---
name: openzeppelin-tokens
description: Token standards and when to use ERC20, ERC721, ERC1155, ERC4626, ERC6909.
---

# Tokens

Tokens are on-chain representations of value or rights. OpenZeppelin implements standard interfaces; choose by fungibility and use case.

## Standards

- **ERC20:** Fungible (balances, transfer, approve). Use for currency, voting rights, staking. See core-erc20.
- **ERC721:** Non-fungible (unique tokenId, ownerOf, transferFrom). Use for collectibles, in-game items, deeds.
- **ERC1155:** Multi-token (fungible and non-fungible in one contract, batch operations). Use for games, mixed assets.
- **ERC4626:** Tokenized vault (shares vs assets). Use for yield-bearing or wrapped assets.
- **ERC6909:** Multi-asset (multiple “ids” per contract, minimal interface). Lightweight multi-token.

## Key Points

- Token contract = smart contract; “sending tokens” = calling methods that update balances or ownership.
- Fungible: “how much”; non-fungible: “which one”. ERC1155/6909 support both in one contract.
- Always use the library’s implementations via inheritance; restrict minting/burning with access control (e.g. onlyRole(MINTER_ROLE)).

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/tokens.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/erc20.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/erc721.adoc
-->
