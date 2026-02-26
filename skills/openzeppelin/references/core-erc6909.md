---
name: openzeppelin-erc6909
description: ERC6909 multi-token standard—per-id balances, no batching or callbacks, granular approvals.
---

# ERC6909

Multi-token standard evolved from ERC1155: same idea (one contract, many token ids) with lower gas and simpler design. No batch operations, no transfer callbacks; approvals can be global (operators) or per-id amounts (ERC20-style).

## Differences from ERC1155

- No batch functions: use single `transfer(to, id, amount)` and repeated calls if needed.
- No receiver callbacks: tokens can be sent to any address (including contracts) without `onERC1155Received`.
- Approvals: set operators (global) or approve per (owner, id, spender) with amount.

## Construction

```solidity
import { ERC6909 } from "@openzeppelin/contracts/token/ERC6909/ERC6909.sol";
import { ERC6909Metadata } from "@openzeppelin/contracts/token/ERC6909/extensions/ERC6909Metadata.sol";

contract GameItems is ERC6909, ERC6909Metadata {
    constructor() ERC6909Metadata("Game Items", "GIT") {
        _mint(msg.sender, 0, 1000);  // Gold
        _mint(msg.sender, 2, 1);     // NFT
    }
}
```

- Base `ERC6909` has no decimals or metadata. Use `ERC6909Metadata` for name/symbol and optional decimals per id.
- `ERC6909TokenSupply` extension tracks total supply per id.
- `ERC6909ContentURI` adds content URI per id.

## Usage

- `balanceOf(account, id)` / `transfer(to, id, amount)`.
- Mint: `_mint(account, id, amount)`; burn: `_burn(account, id, amount)`. Add access control as needed.
- Approve per (owner, id, spender): set allowance; use `transferFrom(from, to, id, amount)`.

## Key Points

- Prefer ERC6909 when you don’t need batching or receiver callbacks and want lower gas and simpler integration.
- Use extensions for metadata, decimals, total supply, or content URI.
- No safe-transfer requirement: sending to contracts does not require receiver interface.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/erc6909.adoc
- EIP-6909 (draft)
-->
