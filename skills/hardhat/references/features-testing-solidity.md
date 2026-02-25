---
name: hardhat-solidity-tests
description: Writing and running Solidity tests (.t.sol), setUp, fuzz, forge-std, cheatcodes.
---

# Solidity Tests

Hardhat supports Solidity tests out of the box: test contracts are deployed and their test functions are run by the test runner.

## Test files and contracts

A file is a test file if:

- It lives under `contracts/` and has the `.t.sol` extension, or
- It lives under `test/` (default paths; configurable).

A contract in a test file is a **test contract** if it has at least one function whose name starts with `test`. The runner deploys each test contract and calls each of those functions; a revert means failure.

```solidity
contract CounterTest {
  function testInc() public {
    Counter counter = new Counter();
    counter.inc();
    require(counter.count() == 1, "count should be 1");
  }
}
```

## Fuzz tests

Functions that take parameters are fuzz tests: the runner calls them many times with random arguments.

```solidity
function testIncBy(uint by) public {
  Counter counter = new Counter();
  counter.incBy(by);
  require(counter.count() == by, "count should match the 'by' value");
}
```

## setUp

A `setUp()` function is run before each test. Use it to share deployment/setup:

```solidity
contract CounterTest {
  Counter counter;
  function setUp() public {
    counter = new Counter();
  }
  function testInc() public {
    counter.inc();
    require(counter.count() == 1, "count should be 1");
  }
  function testIncBy(uint by) public {
    counter.incBy(by);
    require(counter.count() == by, "count should match the 'by' value");
  }
}
```

## Assertion libraries (forge-std)

For better failure messages and helpers, use [forge-std](https://github.com/foundry-rs/forge-std):

```bash
npm add --save-dev 'github:foundry-rs/forge-std#v1.9.7'
```

```solidity
import { Test } from "forge-std/Test.sol";

contract CounterTest is Test {
  function testIncBy(uint by) public {
    Counter counter = new Counter();
    counter.incBy(by);
    assertEq(counter.count(), by, "count should match the 'by' value");
  }
}
```

## Cheatcodes

Hardhat supports [Solidity test cheatcodes](https://hardhat.org/docs/reference/cheatcodes/cheatcodes-overview) (e.g. `vm.prank`, time, storage) to control EVM state. Use them with forge-std’s `Test` or the Hardhat cheatcodes API.

Example: change `msg.sender` for the next call with `vm.prank(alice)`.

## Running Solidity tests

```bash
npx hardhat test
npx hardhat test solidity
npx hardhat test solidity path/to/Test.t.sol
```

## Config

- **Paths:** `paths.tests.solidity` to change the Solidity test directory.
- **Execution:** `test.solidity` in config (e.g. `ffi: true`, `from: "0x..."`) — see [Solidity tests configuration reference](https://hardhat.org/docs/reference/configuration#solidity-tests-configuration).
- **Multichain:** use `--chain-type op` (or other chain type) so tests run against a different chain simulation (e.g. OP Mainnet).

## Key points

- Put tests in `contracts/*.t.sol` or `test/*.sol`; name test functions `test*`; use `setUp()` for shared setup.
- Use forge-std and cheatcodes for clearer assertions and EVM manipulation.

<!--
Source references:
- https://hardhat.org/docs/guides/testing/using-solidity
- https://hardhat.org/docs/reference/configuration#solidity-tests-configuration
- https://hardhat.org/docs/reference/cheatcodes/cheatcodes-overview
-->
