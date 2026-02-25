---
name: openzeppelin-erc1155
description: ERC1155 multi-token standard, batch operations, and safe transfers to contracts.
---

# ERC1155

Multi-token standard: one contract represents many token ids; each id can be fungible (balance &gt; 1) or non-fungible (balance 1). Use for games, mixed fungible/non-fungible assets, gas-efficient multi-token systems.

## Usage

```solidity
import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract GameItems is ERC1155 {
    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, 0, 10000, "");   // Gold (fungible)
        _mint(msg.sender, 1, 100, "");      // Silver
        _mint(msg.sender, 2, 1, "");        // Thor's Hammer (NFT)
    }
}
```

- `balanceOf(account, id)`: balance of `id` for `account`. No `decimals`; ids are distinct.
- `safeTransferFrom(from, to, id, amount, data)` and `safeBatchTransferFrom(from, to, ids[], amounts[], data)` for transfers. Use batch for multiple ids in one tx.
- `balanceOfBatch(accounts[], ids[])` returns multiple balances in one call.
- Internal: `_mint(account, id, amount, data)`, `_mintBatch(account, ids[], amounts[], data)`.

## Sending to contracts

Transfers to contracts revert with `ERC1155InvalidReceiver(address)` unless the receiver implements `IERC1155Receiver`. Use `ERC1155Holder` so the contract can receive and optionally implement logic to send tokens out:

```solidity
import { ERC1155Holder } from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract MyHolder is ERC1155Holder {
    // implement onERC1155Received / onERC1155BatchReceived if needed
    // and functions to transfer tokens out
}
```

## Key points

- Single contract holds all token state; batch ops reduce gas vs multiple ERC20/721 contracts.
- Metadata: optional `IERC1155MetadataURI`; `uri(id)` can use `{id}` placeholder (clients replace with 64-char hex, no 0x).
- For on-chain metadata use `ERC1155URIStorage` or override `uri()` (e.g. Base64 data URI); costly.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/erc1155.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/tokens.adoc
-->
