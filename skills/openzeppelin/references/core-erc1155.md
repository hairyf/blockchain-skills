---
name: openzeppelin-erc1155
description: ERC1155 multi-token contract—fungibility-agnostic balances, batch ops, safe transfers, metadata URI.
---

# ERC1155

Multi-token standard: one contract manages many token ids; each id has a balance per account. Use for games (fungible + NFT in one contract), marketplaces, or when you need gas-efficient multi-token state.

## Construction

```solidity
import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract GameItems is ERC1155 {
    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, 0, 1000, "");   // Gold (fungible)
        _mint(msg.sender, 1, 100, "");    // Silver
        _mint(msg.sender, 2, 1, "");      // Thor's Hammer (NFT)
    }
}
```

- `balanceOf(account, id)`: balance of `id` for `account`. No decimals; ids are distinct.
- Use `_mint(account, id, amount, data)` or `_mintBatch` for supply. Override or add access control for minting.

## Batch Operations

- `balanceOfBatch(accounts[], ids[])` returns balances in one call.
- `safeBatchTransferFrom(from, to, ids[], amounts[], data)` transfers multiple ids atomically.
- Internal: `_mintBatch`, `_burnBatch` for batch mint/burn.

## Safe Transfers and Receivers

- Use `safeTransferFrom(from, to, id, amount, data)` (and batch variant). Transfers to contracts may revert with `ERC1155InvalidReceiver(address)` unless the receiver implements `IERC1155Receiver`: `onERC1155Received` and `onERC1155BatchReceived`.
- Inherit `ERC1155Holder` so your contract can receive ERC1155; implement logic to allow transferring tokens out.

```solidity
import { ERC1155Holder } from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract MyReceiver is ERC1155Holder {
    // Add functions to withdraw or use received tokens.
}
```

## Metadata URI

- `uri(id)` returns metadata URI. Base contract supports `{id}` placeholder: clients replace with token id as 64-char lowercase hex (no 0x).
- For dynamic or on-chain metadata use `ERC1155URIStorage` or override `uri(id)`.

## Key Points

- One contract, many token ids; mix fungible and non-fungible by amount (e.g. amount 1 = NFT).
- Prefer safe transfer APIs to avoid locking tokens in contracts that don’t implement the receiver interface.
- No decimals in the standard; each id is a separate unit.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/erc1155.adoc
- https://eips.ethereum.org/EIPS/eip-1155
-->
