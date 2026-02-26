---
name: openzeppelin-erc20-supply
description: ERC20 supply mechanisms—fixed supply, _mint, _update, and custom mint triggers.
---

# ERC20 Supply

Supply is not defined by the ERC-20 standard. Create it using OpenZeppelin’s internal **`_mint`** (and optionally **`_update`**) so that `totalSupply`, balances, and `Transfer` events stay correct.

## Fixed supply at deploy

```solidity
contract ERC20FixedSupply is ERC20 {
    constructor() ERC20("Fixed", "FIX") {
        _mint(msg.sender, 1000);
    }
}
```

Never write to `totalSupply` or balances directly; use `_mint` so events and state stay in sync.

## Custom mint triggers

Use `_mint` wherever you create new supply (e.g. rewards, airdrops, vesting). Example: reward block proposer on demand:

```solidity
function mintMinerReward() public {
    _mint(block.coinbase, 1000);
}
```

Gate with access control (e.g. MINTER_ROLE) or caps as needed.

## Hooking into transfers: _update

Override or extend behavior on every balance change (including mints/burns) via **`_update(from, to, amount)`**. ERC20’s `transfer`, `transferFrom`, and internal `_mint`/`_burn` go through `_update`. Use it to implement auto-rewards, fees, or snapshot logic:

```solidity
function _update(address from, address to, uint256 amount) internal override {
    super._update(from, to, amount);
    if (from != address(0) && to != address(0)) {
        _mint(block.coinbase, 1000); // e.g. miner reward per transfer
    }
}
```

## Key Points

- All new supply: use `_mint`. Do not touch `totalSupply`/balances directly.
- For logic on every balance change, use `_update` and call `super._update` to keep ERC20 behavior.
- Restrict minting (roles, caps) in your contract to avoid unbounded supply.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/erc20-supply.adoc
-->
