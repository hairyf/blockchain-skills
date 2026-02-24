---
name: Echidna invariant best practices
description: Practical patterns for writing invariants and multi-sender payable tests.
---

# Invariant best practices

## One concern per invariant

Each `echidna_*` function should check a single property. Split compound conditions into separate invariants so failing traces are easier to interpret.

## Multi-sender tests

When logic depends on `msg.sender`, configure **`sender`** so multiple addresses can send transactions. Default `sender` includes several addresses; ensure the contract does not restrict to a single address unless that is what you are testing.

Example: three functions each require a different sender (0x1, 0x2, 0x3). Config:

```yaml
sender: ["0x1", "0x2", "0x3"]
```

Invariant that at least one of the three state flags is still false (so all three roles have not been used yet in a bad way):

```solidity
function echidna_all_sender() public returns (bool) {
  return (!state1 || !state2 || !state3);
}
```

## Payable and value

- Use **`maxValue`** in config to cap wei sent to payable functions (default is large, e.g. 100 ether).
- Restrict which addresses can send value with **`sender`** and contract logic; use **`balanceAddr`** / **`balanceContract`** if you need specific balances.
- Example config to limit senders for payable tests: set `sender` and optionally a lower `maxValue` for faster exploration.

## Gas and time

- **`propMaxGas`**: Property fails if a single call exceeds this gas (e.g. detect unbounded loops or expensive paths).
- **`testMaxGas`**: Hard cap per sequence; sequence is truncated, not necessarily failed.
- Use **`maxTimeDelay`** / **`maxBlockDelay`** when testing time- or block-dependent logic so generated sequences use bounded time/block deltas.

## Assertions vs invariants

- **Invariants** (`echidna_*`): Check state after arbitrary sequences; good for “always” properties (e.g. balance >= 0, no double spend).
- **Assertions** (`assert(...)`): Use `testMode: assertion` to find any reachable assertion failure; good for internal consistency or safety checks already in the code.
- Use both when appropriate: invariants for high-level properties, assertions for low-level sanity checks.

## Key points

- Name invariants clearly: `echidna_balance_non_negative`, `echidna_only_owner_can_pause`.
- Use `filterFunctions` to focus on relevant functions and avoid wasting effort on view/pure or setup-only functions.
- Set `seed` in config for reproducible campaigns when debugging or CI.

<!--
Source references:
- https://github.com/crytic/echidna (README.md)
- sources/echidna/tests/solidity/basic/multisender.sol
- sources/echidna/tests/solidity/basic/payable.yaml
- sources/echidna/tests/solidity/basic/propGasLimit.yaml
- sources/echidna/tests/solidity/basic/gasprice.sol
-->
