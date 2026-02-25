---
name: openzeppelin-erc20-supply
description: Creating ERC-20 token supply with _mint and _update, fixed supply and reward patterns.
---

# Creating ERC-20 Supply

ERC-20 does not define how supply is created. OpenZeppelin uses internal `_mint(account, amount)` so that extensions can implement custom supply logic while keeping `totalSupply` and balances consistent and emitting `Transfer` correctly.

## Fixed supply

Mint once in the constructor to the deployer (or a designated address):

```solidity
contract ERC20FixedSupply is ERC20 {
    constructor() ERC20("Fixed", "FIX") {
        _mint(msg.sender, 1000);
    }
}
```

Do not write to `totalSupply` or balances directly; use `_mint` so events and invariants stay correct.

## Reward or conditional minting

Use `_mint` from any function (e.g. reward to block proposer, staking rewards, airdrops). Restrict with access control (e.g. `onlyRole(MINTER_ROLE)`) or custom rules:

```solidity
function mintMinerReward() public {
    _mint(block.coinbase, 1000);
}
```

## Hooking transfers (_update)

Override `_update(from, to, amount)` to run logic on every transfer, mint, or burn (mint: `from == address(0)`, burn: `to == address(0)`). For example, mint a reward to the block proposer on every transfer:

```solidity
function _update(address from, address to, uint256 amount) internal override {
    super._update(from, to, amount);
    if (from != address(0)) {
        _mint(block.coinbase, 1000);
    }
}
```

Use with care: minting on every transfer can have economic and gas implications.

## Key points

- All supply changes should go through `_mint` (and `_burn` if applicable); never touch `totalSupply`/balances directly.
- Restrict who can mint (roles, owner, or specific conditions) to avoid unbounded supply.
- For more complex supply (cap, timelock, governance), combine `_mint`/`_update` with access control and optional extensions (e.g. ERC20Votes for governance).

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/erc20-supply.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/erc20.adoc
-->
