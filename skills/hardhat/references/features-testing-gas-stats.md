---
name: hardhat-gas-statistics
description: Gas statistics for test runs (--gas-stats), per-function and deployment.
---

# Gas Statistics

Hardhat can report gas consumed by your contracts’ public functions during a test run. Use the `--gas-stats` flag to print a summary table.

## Usage

```bash
npx hardhat test --gas-stats
npx hardhat test solidity --gas-stats
npx hardhat test nodejs --gas-stats
```

Output is per contract: for each **public function** called directly by tests you get min, average, median, max gas and call count; for deployment you get gas cost and bytecode size.

## What is included

- Only **public** functions that are **called directly by tests** are included. A function called only indirectly (e.g. by another function) does not appear. Private/internal functions are never listed.
- Deployment: one row per deployed contract (gas and size).

## Example

For a contract with `inc()`, `incBy(uint256)`, `reset()`, and private `_incInternal()`: if tests call only `inc()` and `incBy(5)`, the table shows only `inc` and `incBy`. `reset` and `_incInternal` do not appear.

## Key points

- Use `--gas-stats` with `test` or its subtasks to inspect gas usage from the tests you ran.
- Results depend on which tests run (e.g. `test solidity` vs `test nodejs` yield different tables).

<!--
Source references:
- https://hardhat.org/docs/guides/testing/gas-statistics
-->
