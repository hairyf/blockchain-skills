---
name: hardhat-cheatcodes
description: Solidity test cheatcodes (vm.prank, time, etc.) for EVM manipulation in tests.
---

# Solidity Test Cheatcodes

Hardhat supports **cheatcodes** in Solidity tests: special functions (typically on `vm`) that manipulate EVM state and execution context. Use them with Solidity tests (`.t.sol` or under `test/`) and, when needed, with [forge-std](https://github.com/foundry-rs/forge-std) for a `Test` base contract.

## Environment (msg.sender / tx.origin)

- **vm.prank(caller)** – Next call (including static calls) sees `msg.sender = caller`. Does not affect delegate calls.
- **vm.prank(caller, origin)** – Set both `msg.sender` and `tx.origin` for the next call.
- **vm.prank(caller, delegateCall)** – When `delegateCall` is true, sets `msg.sender` for the next delegate call.

Example: test a function that requires `msg.sender == owner` by pranking as another account:

```solidity
vm.prank(nonOwner);
myContract.withdraw(); // reverts if only owner can call
```

## Other cheatcodes

The full set is documented in the [Hardhat cheatcodes reference](https://hardhat.org/docs/reference/cheatcodes/cheatcodes-overview). Common categories include time manipulation, storage/state, and FFI. Enable `ffi` in `test.solidity` config if you use the FFI cheatcode.

## Configuration

- Solidity test execution (including which cheatcodes are allowed) is configured under `test.solidity` in `hardhat.config` (e.g. `ffi: true`, `from: "0x..."`). See [Solidity tests configuration](https://hardhat.org/docs/reference/configuration#solidity-tests-configuration).

## Key points

- Use `vm.prank` (and related overloads) to change `msg.sender` / `tx.origin` for the next call in Solidity tests.
- Combine with forge-std's `Test` and assertion helpers for readable tests. Check the cheatcodes reference for the full list.

<!--
Source references:
- https://hardhat.org/docs/reference/cheatcodes/cheatcodes-overview
- https://hardhat.org/docs/reference/cheatcodes/environment/prank
- https://hardhat.org/docs/guides/testing/using-solidity
-->
