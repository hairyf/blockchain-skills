---
name: solidity-security
description: Security considerations — reentrancy, gas limits, visibility, randomness, front-running.
---

# Security Considerations

Smart contracts handle value and run in public; assume attackers. Follow checks-effects-interactions, avoid trust in randomness and `tx.origin`, and be aware of front-running and gas limits.

## Reentrancy

Any external call (including ether transfer) hands control to the callee, which can call back. Update state before external calls (Checks-Effects-Interactions): (1) validate, (2) update storage, (3) then call out.

```solidity
// Bad: state update after call
function withdraw() public {
    (bool success,) = msg.sender.call{value: shares[msg.sender]}("");
    if (success) shares[msg.sender] = 0;
}
// Good: update first
uint share = shares[msg.sender];
shares[msg.sender] = 0;
(bool success,) = payable(msg.sender).call{value: share}("");
require(success);
```

Reentrancy can also occur via other contracts you depend on (multi-contract).

## Gas Limit and Loops

Loops without a bounded iteration count (e.g. over storage) can exceed block gas and stall the transaction. Document unbounded loops; consider caps or pagination.

## Visibility and Private Data

`private` and `internal` state is still readable from chain data. Do not store secrets in contract state. Everything in a contract is public.

## Randomness and Oracles

Block data (`block.timestamp`, `block.prevrandao`) is predictable by builders. Do not use as sole source of randomness for value-bearing logic. Use commit-reveal or oracles when needed.

## Sending and Receiving Ether

Contracts cannot prevent receiving ether (e.g. `selfdestruct` to address, coinbase reward). Use a payable function and/or withdrawal pattern to control flows. Prefer pull (withdraw) over push (send) to avoid reentrancy and griefing.

## Front-Running and MEV

Transactions are visible in the mempool. Design critical operations (e.g. large trades, auctions) with MEV in mind (e.g. private order flow, commit-reveal, or accepted MEV).

## Known Bugs

Check the compiler’s list of known security-relevant bugs and use a fixed/supported compiler version.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/security-considerations.html
-->
