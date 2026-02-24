---
name: Halmos best practices for writing tests
description: assume vs bound, assertions, revert handling, and dynamic types.
---

# Best practices for writing symbolic tests

## Input conditions: assume vs bound

- Use **`vm.assume(condition)`** to restrict valid inputs. Inputs that fail the condition are discarded.
- Avoid **`bound(x, lo, hi)`** in symbolic tests; it tends to perform poorly. Prefer:
  ```solidity
  vm.assume(lo <= x && x <= hi);
  ```
- Be careful not to over-constrain: too strong assumptions can exclude valid bugs.

## Assertions and what Halmos reports

- Halmos reports **assertion failures** only: reverts with **Panic(1)** (Solidity `assert`). Other reverts (e.g. Panic(0), custom errors, arithmetic overflow) are not reported as counterexamples.
- To treat other panic codes as failures: `--panic-error-codes 0x01,0x11` or `*` for all.
- For compilers before 0.8.0 that use `INVALID` for `assert`, Halmos does not report those. Use a custom assertion that reverts with Panic(1) (see getting-started.md in the repo).

## Checking revert conditions

- If you want to assert that a call **reverts** under certain conditions, use a **low-level call** and check the return value:
  ```solidity
  (bool success,) = address(token).call(
      abi.encodeWithSelector(token.transfer.selector, receiver, amount)
  );
  if (!success) {
      // assert conditions that imply failure
  }
  ```
- This keeps execution going and lets you add assertions about when and why the call fails.

## Dynamic arrays, bytes, and string

- Symbolic **parameters** cannot be dynamic-sized (e.g. `bytes`, `string`, `uint256[]`). Create them inside the test:
  - `bytes memory data = svm.createBytes(96, 'data');`
  - Fixed-length array with symbolic elements: `uint256[] memory arr = new uint256[3];` then fill with `svm.createUint256('elem')`.
- Control lengths via `--array-lengths name1={1,2},name2=3`, `--default-array-lengths`, and `--default-bytes-lengths`.

## Storage layout

- `--storage-layout solidity|generic`: Use `solidity` (default) for normal Solidity; use `generic` for Vyper, Huff, or unconventional Yul storage.

## Key points

- Prefer `vm.assume` over `bound`; use low-level calls when you need to reason about revert behavior.
- Rely on `assert` (Panic(1)) for failures Halmos will report; use `--panic-error-codes` if you need other panic codes.
- Build dynamic types inside the test with `svm` and optional CLI length options.

<!--
Source references:
- https://github.com/a16z/halmos
- sources/halmos/docs/getting-started.md
- sources/halmos/src/halmos/config.py
-->
