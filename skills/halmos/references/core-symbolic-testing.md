---
name: Halmos symbolic testing
description: How symbolic tests differ from fuzz tests and how to structure check_ tests.
---

# Symbolic testing

Halmos is a symbolic testing tool for EVM smart contracts. It verifies properties for **all possible inputs** (within bounds) by symbolic execution, rather than sampling random inputs like a fuzzer.

## Test naming and structure

- **Symbolic tests**: functions whose names match the configured prefix (default `check_` or `invariant_`).
- Typical pattern: `function check_<function-name>_<behavior>(<symbolic params>) { ... }`.
- Same test file can be run with `forge test` (fuzz) and `halmos` (symbolic); symbolic runs explore the full input space for the test.

Example:

```solidity
function check_transfer(address sender, address receiver, uint256 amount) public {
    vm.assume(receiver != address(0));
    vm.assume(token.balanceOf(sender) >= amount);
    uint256 balanceSender = token.balanceOf(sender);
    uint256 balanceReceiver = token.balanceOf(receiver);
    vm.prank(sender);
    token.transfer(receiver, amount);
    assert(token.balanceOf(sender) == balanceSender - amount);
    assert(token.balanceOf(receiver) == balanceReceiver + amount);
}
```

## Symbolic vs random inputs

- In symbolic tests, each parameter is a **symbol** representing all values of that type (e.g. all `uint256` or all `address`).
- Halmos uses an SMT solver to find any assignment to those symbols that violates an `assert`.
- Only **assertion violations** (`Panic(1)`) are reported as failures; other reverts (e.g. overflow) are not reported unless you use low-level calls or unchecked blocks.

## Key points

- Use `vm.assume(condition)` to restrict valid inputs; inputs not satisfying assumptions are ignored.
- Prefer `vm.assume()` over `bound()`; assume is more efficient and clearer in symbolic mode.
- For dynamic arrays / `bytes` / `string`, use fixed sizes and create symbols via Halmos cheatcodes (e.g. `svm.createBytes(len, 'name')`); they cannot be declared as symbolic parameters.
- Counterexamples are printed with concrete values that violate the assertion.

<!--
Source references:
- https://github.com/a16z/halmos
- sources/halmos/README.md
- sources/halmos/docs/getting-started.md
-->
