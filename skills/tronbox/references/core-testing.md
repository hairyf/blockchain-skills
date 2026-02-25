---
name: TronBox testing
description: Test discovery, Mocha, contract()/artifacts, tronWeb/ethers in tests.
---

# TronBox Testing

TronBox runs tests with Mocha. Tests live in `test_directory` (default `test/`) and are discovered by file extension (default `.js`). Contract abstractions are available via `artifacts.require()`.

## Commands

- **tronbox test** – Run all tests under `test/`.
- **tronbox test test/file.js** – Run one or more files (positional).
- **tronbox test --file test/file.js** – Run a single file.
- **tronbox test --network &lt;name&gt;** – Use the given network (default: `development` or `test`).
- **tronbox test --compile-all** – Recompile all contracts before running.
- **tronbox test --evm** – Use EVM config and ethers.

If neither `development` nor `test` network is configured, the test command errors; configure at least one in `tronbox.js` (or EVM config).

## Test globals

In test files the following are injected:

- **contract(name, tests)** – Mocha `describe` wrapper; runs `before`/`beforeEach`/`afterEach` for snapshotting and cleanup. `tests(accounts)` receives the accounts array.
- **contract.only** / **contract.skip** – Same as Mocha’s describe.only / describe.skip.
- **artifacts** – `artifacts.require('ContractName')` or `artifacts.require('./Path.sol')` returns the contract abstraction for the current build.
- **config** – Resolved TronBox config object.
- **tronWeb** / **tronWrap** – TronWeb (TronWrap) instance for the selected network.
- **waitForTransactionReceipt** – Helper bound to tronWrap for waiting for a transaction receipt.
- **ethers** – (EVM only) The ethers object from TronWrap.
- **assert** / **expect** – Chai assertions.

Tests run against a temporary build directory; artifacts are not written to the project’s `build/contracts`. Before tests, migrations are run with `reset: true` to deploy a fresh set of contracts.

## Discovery

- All files matching `config.test_file_extension_regexp` (default `.js`) under `test_directory` are collected.
- Solidity tests (`.sol`) are supported: they are compiled with the project and test contracts, then executed via the same runner.

## Usage for agents

- Use `artifacts.require('ContractName')` in tests; do not require contract abstractions from disk paths.
- Use `contract('ContractName', (accounts) => { ... })` so the runner can set up and tear down state.
- For EVM tests use `--evm` and access `ethers` and EVM-style options (e.g. `value`) on deployments and calls.

<!--
Source references:
- sources/tronbox/src/lib/commands/test.js
- sources/tronbox/src/lib/test.js
- sources/tronbox/src/lib/testing/testrunner.js
- sources/tronbox/src/lib/testing/testresolver.js
-->
