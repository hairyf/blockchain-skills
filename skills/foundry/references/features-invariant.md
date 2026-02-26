---
name: foundry-invariant
description: Invariant testing — invariant_* functions, runs, depth, stateful fuzz.
---

# Invariant Testing

Invariant tests assert that specified invariants hold across many randomized sequences of function calls. Use them to find bugs in stateful logic that unit tests might miss.

## Defining invariants

Name functions `invariant_*`; they are run after each call in a generated sequence:

```solidity
function invariant_totalSupplyEqualsBalances() public {
    uint256 sum;
    for (uint i = 0; i < users.length; i++) sum += token.balanceOf(users[i]);
    assertEq(sum, token.totalSupply());
}
```

The fuzzer generates sequences of calls (e.g. transfer, approve, transferFrom); after each call all `invariant_*` functions are executed. If one fails, Foundry reports the failing call sequence.

## Runs and depth

- **Runs**: number of sequences (campaigns).
- **Depth**: number of calls per sequence.

Configure in `foundry.toml` or per-test. More runs/depth improve coverage but take longer. Alternatively set a **timeout** in seconds.

## afterInvariant

Use `afterInvariant()` to run logic at the end of each run (e.g. reset state, log metrics). Each `invariant_*` function runs in its own executor; to assert multiple invariants on the same state, put them in one function.

## Key points

- Invariants should be properties that always hold (e.g. sum of balances = totalSupply, xy = k).
- Combine with handlers that call contract functions with fuzzed inputs; Foundry can use storage-aware fuzz when enabled.
- Start with small runs/depth to get fast feedback; increase for CI or pre-release.
- Group related assertions in a single `invariant_*` so they see the same state.

<!--
Source references:
- https://getfoundry.sh/forge/advanced-testing/invariant-testing/
- https://book.getfoundry.sh/forge/invariant-testing
-->
