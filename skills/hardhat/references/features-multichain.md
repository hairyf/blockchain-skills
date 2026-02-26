---
name: hardhat-multichain
description: Chain types (l1, op, generic), --chain-type, simulating different chains.
---

# Multichain Support

Hardhat 3 simulates chains by **Chain Type**. Tests and scripts can run against the correct chain behavior (e.g. OP Mainnet) instead of a generic EVM, so chain-specific bugs are caught early.

## Chain types

- **l1** – Ethereum Mainnet and its testnets (default for Solidity tests).
- **op** – OP Mainnet and its testnets (different RPC responses, gas/L1 gas, precompiles, etc.).
- **generic** – Permissive EVM approximation (similar to Hardhat 2).

Same Chain Type = same behavior. Specify the type when creating a simulation or running Solidity tests.

## Solidity tests

Default is `l1`. Override with `--chain-type`:

```bash
npx hardhat test solidity --chain-type op
npx hardhat test --chain-type op
```

## Scripts and Network Manager

When connecting via the Network Manager (e.g. in scripts), pass `chainType` so the simulation matches the target chain:

```ts
import { network } from "hardhat";

const { viem } = await network.connect({
  network: "hardhatOp",
  chainType: "op",
});

const publicClient = await viem.getPublicClient();
// Chain-specific APIs (e.g. estimateL1Gas for OP) are available when chainType is "op".
```

You can also set the chain type for a network in config; see the Network Manager reference.

## Why it matters

Chain Type changes RPC response shapes, how methods like `eth_estimateGas` work, gas/L1 gas handling, predeploys, precompiles, opcodes, and gas costs. Using the right type makes tests and scripts accurate for the chain you deploy to.

## Key points

- Use `--chain-type op` (or other) when running Solidity tests for OP or other supported chains.
- Use `chainType` in `network.connect({ chainType: "op" })` in scripts so plugins (e.g. hardhat-viem) expose chain-specific APIs.

<!--
Source references:
- https://hardhat.org/docs/explanations/multichain-support
- https://hardhat.org/docs/reference/network-manager
-->
