---
name: Echidna function filtering
description: Whitelisting and blacklisting functions with filterFunctions and filterBlacklist.
---

# Function filtering

Control which functions Echidna may call using **`filterFunctions`** and **`filterBlacklist`**.

## Options

| Option | Purpose |
|--------|---------|
| `filterFunctions` | List of function signatures to include or exclude. |
| `filterBlacklist` | `true` = list is a blacklist (exclude these). `false` = list is a whitelist (only these). Default `true`. |

Signatures use Solidity-style form: `ContractName.functionName(type1,type2)`.

## Blacklist (default)

Exclude specific functions from fuzzing:

```yaml
filterBlacklist: true
filterFunctions: ["Test.set0(int256)"]
```

Only `set0(int256)` is excluded; all other public/external functions of the test contract can be called.

## Whitelist

Restrict fuzzing to a subset of functions:

```yaml
filterBlacklist: false
filterFunctions: ["Test.deposit(uint256)", "Test.withdraw(uint256)"]
```

Echidna will only call these two functions (and any invariants). Use when the contract has many entrypoints but you want to test a specific flow.

## Key points

- Signatures must match exactly (e.g. `int256` not `int`).
- Filtering applies to the contract under test; invariant (prefix) functions are still executed for checks.
- Useful to exclude view/pure or setup helpers and focus on state-changing functions, or to whitelist only the functions relevant to a property.

<!--
Source references:
- https://github.com/crytic/echidna (README.md)
- sources/echidna/tests/solidity/basic/whitelist.yaml
- sources/echidna/tests/solidity/basic/default.yaml
-->
