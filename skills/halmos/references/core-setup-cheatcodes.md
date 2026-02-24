---
name: Halmos setUp and symbolic cheatcodes
description: setUp with symbolic constructor args and Halmos cheatcodes (svm) for creating symbols.
---

# setUp and symbolic cheatcodes

## setUp and symbolic constructor args

`setUp()` runs before each test. You can deploy contracts with **symbolic** constructor arguments so that the test is verified for all possible initial configurations.

Install the Halmos cheatcodes package (separate repo):

```sh
forge install a16z/halmos-cheatcodes
```

Example: ERC20 with symbolic initial supply

```solidity
import {SymTest} from "halmos-cheatcodes/SymTest.sol";
import {Test} from "forge-std/Test.sol";
import {MyToken} from "../src/MyToken.sol";

contract MyTokenTest is SymTest, Test {
    MyToken token;

    function setUp() public {
        uint256 initialSupply = svm.createUint256("initialSupply");
        token = new MyToken(initialSupply);
    }
}
```

Here `svm.createUint256("initialSupply")` creates a **symbol** representing any value in `[0, 2^256-1]`, not a single random value. Halmos then checks the test for every possible `initialSupply`.

## Creating symbols (Halmos cheatcodes)

Symbols can be created in `setUp()` or inside test functions via the `svm` (symbolic VM) interface from `halmos-cheatcodes`. Full list: [SVM.sol](https://github.com/a16z/halmos-cheatcodes/blob/main/src/SVM.sol).

Common patterns:

- **Scalars**: `svm.createUint256("name")`, `svm.createAddress("name")` — name is a label for counterexample output.
- **Bytes**: `svm.createBytes(length, "name")` — fixed-length bytes (e.g. 96 for ECDSA).
- **Dynamic arrays**: Create a fixed-length array and fill elements with symbols:
  ```solidity
  uint256[] memory arr = new uint256[3];
  for (uint i = 0; i < 3; i++) {
      arr[i] = svm.createUint256("element");
  }
  ```

Dynamic-sized parameters (e.g. `bytes`, `string`, `uint256[]`) cannot be symbolic **function parameters**; they must be built inside the test with these cheatcodes and optional `--array-lengths` / `--default-*-lengths` for length choices.

## Foundry vm cheatcodes

Standard Foundry cheatcodes work in Halmos tests: `vm.assume`, `vm.prank`, `vm.deal`, `vm.expectRevert`, etc. Use `vm.assume` to constrain symbolic inputs; avoid `bound()` in symbolic tests in favor of `vm.assume(lo <= x && x <= hi)`.

## Key points

- Use `SymTest` from `halmos-cheatcodes/SymTest.sol` to get `svm`.
- Symbolic constructor args make the test cover all possible initial states.
- For bytes/string/dynamic arrays use `svm.createBytes`, fixed-length arrays filled with `svm.createUint256` (or similar), and `--array-lengths` / `--default-bytes-lengths` / `--default-array-lengths` as needed.

<!--
Source references:
- https://github.com/a16z/halmos-cheatcodes
- sources/halmos/docs/getting-started.md
- sources/halmos/README.md
-->
