---
name: openzeppelin-erc6909
description: ERC-6909 multi-asset standard—per-id balances, no batching or callbacks, granular approvals, extensions.
---

# ERC6909

Multi-asset standard evolved from ERC-1155: one contract, many token ids, lower gas and simpler design. No batch operations, no transfer callbacks; approvals can be global (operators) or per-id amounts (ERC-20 style). Use when you need multiple token types in one contract and don't need ERC-1155's batch or safe-transfer semantics.

## Differences from ERC-1155

- **No batch ops**: Only single-id `balanceOf(account, id)` and `transfer(to, id, amount)` (and operator `transferFrom`). No `balanceOfBatch` or `safeBatchTransferFrom`.
- **No callbacks**: Transfers to contracts do not require `onERC1155Received`; tokens can be sent to any address.
- **Approvals**: Operator approvals can be global (all ids) or per-id amounts (ERC-20 style).

## Usage

```solidity
import { ERC6909 } from "@openzeppelin/contracts/token/ERC6909/ERC6909.sol";
import { ERC6909Metadata } from "@openzeppelin/contracts/token/ERC6909/extensions/ERC6909Metadata.sol";

contract GameItems is ERC6909, ERC6909Metadata {
    constructor() ERC6909Metadata("Game Items", "GIT") {
        _mint(msg.sender, 0, 10000);  // id 0: fungible
        _mint(msg.sender, 1, 1);      // id 1: NFT
    }
}
```

- **ERC6909**: base balance and transfer; internal `_mint(account, id, amount)`, `_burn(account, id, amount)`. Add access control as needed.
- **ERC6909Metadata**: optional `name`, `symbol`, and `decimals(id)` (per-id decimals for fungible ids).
- **ERC6909ContentURI**: optional `contentURI(id)` for metadata.
- **ERC6909TokenSupply**: optional total supply per id (`totalSupply(id)`). Base implementation does not track total supply.

Mint: `_mint(account, id, amount)`; approve per (owner, id, spender); use `transferFrom(from, to, id, amount)`.

## Key Points

- Prefer ERC-6909 when you don't need batching or receiver callbacks and want lower gas and simpler integration.
- Use `ERC6909Metadata` for decimals per id; use `ERC6909ContentURI` for off-chain or on-chain metadata by id.
- No safe-transfer requirement: sending to contracts does not require receiver interface.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/erc6909.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/tokens.adoc
- EIP-6909 (draft)
-->
