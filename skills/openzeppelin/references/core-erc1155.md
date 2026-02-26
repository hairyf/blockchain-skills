---
name: openzeppelin-erc1155
description: ERC1155 multi-token standard—fungible + NFT, batch ops, safe transfers to contracts, metadata URI.
---

# ERC1155

Multi-token standard: one contract manages many token ids; each id has a balance per account (fungible when balance > 1, NFT when balance 1). Use for games, marketplaces, or gas-efficient multi-token systems.

## Usage

```solidity
import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract GameItems is ERC1155 {
    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, 0, 10000, "");   // Gold (fungible)
        _mint(msg.sender, 1, 100, "");    // Silver
        _mint(msg.sender, 2, 1, "");      // Thor's Hammer (NFT)
    }
}
```

- `balanceOf(account, id)`: balance of `id` for `account`. No decimals; ids are distinct.
- Use `_mint(account, id, amount, data)` or `_mintBatch` for supply; add access control as needed.
- `balanceOfBatch(accounts[], ids[])` returns balances in one call.
- `safeTransferFrom(from, to, id, amount, data)` and `safeBatchTransferFrom(from, to, ids[], amounts[], data)` for transfers.

## Sending to contracts

Transfers to contracts revert with `ERC1155InvalidReceiver(address)` unless the receiver implements `IERC1155Receiver` (`onERC1155Received`, `onERC1155BatchReceived`). Use `ERC1155Holder` so the contract can receive and optionally implement logic to send tokens out:

```solidity
import { ERC1155Holder } from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract MyHolder is ERC1155Holder {
    // Add functions to withdraw or use received tokens.
}
```

## Metadata URI

- `uri(id)` returns metadata URI. Base contract supports `{id}` placeholder: clients replace with token id as 64-char lowercase hex (no 0x).
- For dynamic or on-chain metadata use `ERC1155URIStorage` or override `uri(id)`.

## Key Points

- One contract, many token ids; mix fungible and non-fungible by amount (e.g. amount 1 = NFT).
- Prefer safe transfer APIs to avoid locking tokens in contracts that don’t implement the receiver interface.
- No decimals in the standard; each id is a separate unit. Batch ops reduce gas vs multiple ERC20/721 contracts.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/erc1155.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/tokens.adoc
- https://eips.ethereum.org/EIPS/eip-1155
-->
