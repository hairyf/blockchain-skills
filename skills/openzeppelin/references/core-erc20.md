---
name: openzeppelin-erc20
description: ERC20 token construction, decimals, transfer, and supply patterns.
---

# ERC20

Fungible token: balances, transfer, approve. Use for currency, voting, staking.

## Construction

```solidity
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GLDToken is ERC20 {
    constructor() ERC20("Gold", "GLD") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}
```

- Name, symbol, and optional decimals (default 18) come from ERC20/ERC20Metadata.
- Create supply in constructor via `_mint` or add a minter role and mint later; see erc20-supply docs for patterns (fixed, capped, mintable).

## Decimals

- `decimals()` is for display only; all math is in raw units. To send “5” tokens use `5 * (10 ** decimals())`.
- Override `decimals()` to use a value other than 18.

## Transfer and Approval

- `transfer(to, amount)`, `approve(spender, amount)`, `transferFrom(from, to, amount)`.
- Use extensions (e.g. ERC20Permit for gasless approvals) as needed.

## Key Points

- Restrict minting/burning with access control (e.g. AccessControl + MINTER_ROLE).
- Use the official package; do not copy-paste. Only used code is deployed.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/erc20.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/erc20-supply.adoc
-->
