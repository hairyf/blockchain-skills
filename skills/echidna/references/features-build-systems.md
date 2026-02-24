---
name: Echidna build systems
description: Using Echidna with Foundry, Hardhat, Truffle, and allContracts.
---

# Build system support

Echidna uses **crytic-compile** and works with common Solidity project layouts. Use this to fuzz contracts that depend on libraries or other contracts.

## Project root invocation

From the project root (where the build config lives):

```sh
echidna .
```

Echidna will use the existing compilation framework (Foundry, Hardhat, Truffle, etc.) to compile. No need to point at a single `.sol` file when you have dependencies.

## Contract and config

When multiple contracts exist, select the test contract and optionally a config:

```sh
echidna . --contract MyFuzzTest --config echidna.yaml
```

## Testing multiple contracts

Set **`allContracts: true`** in config so Echidna can call into any contract with a known ABI. Pass the corresponding Solidity sources on the CLI so ABIs are available. Use this when the contract under test interacts with other deployed contracts.

## State forking

Echidna can start from an existing network state (e.g. mainnet fork) instead of an empty chain. Configure RPC and block so crytic-compile/Echidna can fetch contracts and state. See external docs (e.g. secure-contracts.com) for `rpcUrl`, `rpcBlock`, and forking setup.

## Library linking

For solc library placeholders (e.g. unresolved libraries), use **`solcLibs`** in config:

```yaml
solcLibs: ["path/to/file.sol:LibraryName"]
```

Example from tests: `solcLibs: ["basic/library.sol:Test"]`.

## Key points

- Prefer `echidna .` for Foundry/Hardhat projects so dependencies and remappings are correct.
- Ensure the project builds (e.g. `forge build` or `npx hardhat compile`) before running Echidna.
- Use `allContracts: true` only when you need to fuzz interactions across multiple contracts and have provided their sources.

<!--
Source references:
- https://github.com/crytic/echidna (README.md)
- sources/echidna/README.md
- sources/echidna/tests/solidity/basic/library.yaml
-->
