---
name: openzeppelin-erc6909
description: ERC-6909 multi-asset token standard, no batch/callbacks, granular approvals.
---

# ERC6909

Multi-asset standard aimed at lower gas and simpler design than ERC-1155: one contract, multiple token ids, no batch operations and no transfer callbacks. Use when you need multiple token types in one contract and don’t need ERC-1155’s batch or safe-transfer semantics.

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
        _mint(msg.sender, 1, 1);       // id 1: NFT
    }
}
```

- **ERC6909**: base balance and transfer; internal `_mint(account, id, amount)`.
- **ERC6909Metadata**: optional `name`, `symbol`, and `decimals(id)` (per-id decimals for fungible ids).
- **ERC6909ContentURI**: optional `contentURI(id)` for metadata.
- **ERC6909TokenSupply**: optional total supply per id (`totalSupply(id)`).

Base implementation does not track total supply; use `ERC6909TokenSupply` if needed. No content URI in base; add `ERC6909ContentURI` for metadata by id.

## Key points

- Prefer ERC-6909 when you want a single contract for many ids and can give up batching and receiver callbacks for gas and simplicity.
- Use `ERC6909Metadata` for decimals per id; use `ERC6909ContentURI` for off-chain or on-chain metadata by id.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/erc6909.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/tokens.adoc
-->
