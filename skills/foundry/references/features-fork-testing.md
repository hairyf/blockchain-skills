---
name: foundry-fork-testing
description: Fork testing — createSelectFork, selectFork, activeFork, multi-fork.
---

# Fork Testing

Foundry can fork a live chain in tests so you run against real contract state. Use RPC URLs (or aliases from `foundry.toml` `rpc_endpoints`) and optional block or tx pinning for determinism.

## Create and select a fork

```solidity
uint256 forkId = vm.createSelectFork(MAINNET_RPC_URL);
// or pin block
uint256 forkId = vm.createSelectFork(MAINNET_RPC_URL, 18_000_000);
// or fork at a specific tx (replays up to that tx)
uint256 forkId = vm.createSelectFork(MAINNET_RPC_URL, txHash);
```

`createSelectFork` creates the fork and makes it active. Returns a fork id for switching later. Use block number or tx hash for reproducible tests.

## Multiple forks

```solidity
uint256 mainnet = vm.createSelectFork(MAINNET_RPC);
uint256 arb = vm.createSelectFork(ARB_RPC);
vm.selectFork(mainnet);
// ... use mainnet ...
vm.selectFork(arb);
// ... use arb ...
assertEq(vm.activeFork(), arb);
```

Use `selectFork(forkId)` to switch; `activeFork()` returns the current fork id. Roll state with `vm.rollFork(blockNumber)` on the active fork.

## Key points

- Fork tests need a reachable RPC; use env vars or `rpc_endpoints` in config.
- Pin block (or tx) so tests don't depend on latest state.
- `createFork` + `selectFork` separately if you need to create without switching; `createSelectFork` does both in one step.
- Roll fork to a later block when testing time-dependent logic.

<!--
Source references:
- https://getfoundry.sh/reference/cheatcodes/create-select-fork/
- https://book.getfoundry.sh/reference/cheatcodes/forking
- https://getfoundry.sh/forge/fork-testing
-->
