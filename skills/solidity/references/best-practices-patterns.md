---
name: solidity-common-patterns
description: Common patterns — withdrawal, access control, proxy, upgradeability.
---

# Common Patterns

## Withdrawal (Pull) Pattern

Prefer users withdrawing funds over the contract pushing funds. Reduces reentrancy risk and avoids push failures (e.g. contract rejectors). Track balances and set to zero before external transfer.

```solidity
mapping(address => uint) pendingWithdrawals;
function withdraw() public {
    uint amount = pendingWithdrawals[msg.sender];
    pendingWithdrawals[msg.sender] = 0;
    (bool success,) = payable(msg.sender).call{value: amount}("");
    require(success);
}
```

## Access Control

Restrict sensitive functions to an owner or role (e.g. OpenZeppelin’s Ownable or AccessControl). Use modifiers: `modifier onlyOwner() { require(msg.sender == owner); _; }`. Prefer role-based over single owner when multiple actors needed.

## Checks-Effects-Interactions

Always: (1) validate inputs and state, (2) update contract state, (3) perform external calls. Prevents reentrancy and keeps state consistent.

## Restricting Access to Contracts

Contracts cannot block ether sent via `selfdestruct` or miner/coinbase. They can reject normal calls in `receive()`/`fallback()` by reverting. Use withdrawal pattern for payments.

## Upgradeability and Proxies

Upgradeability typically uses a proxy (delegatecall to implementation). Be aware of storage layout: proxy and implementation share the same storage layout; append new variables, do not change order or types of existing ones. Use transparent or UUPS proxy patterns and avoid constructor side effects in the implementation (use initializer functions).

<!--
Source references:
- https://docs.soliditylang.org/en/latest/common-patterns.html
- https://docs.soliditylang.org/en/latest/security-considerations.html
-->
