---
name: geth-kurtosis
description: Multi-node private network with Kurtosis - post-merge geth + consensus stack.
---

# Kurtosis

Post-merge, a multi-node private network requires both execution (geth) and consensus clients. Kurtosis is the recommended way to run such a setup for testing.

## Use case

When you need multiple geth nodes plus a beacon chain (e.g. private testnet, multi-node dev), use Kurtosis instead of hand-rolling configs. Single-node options remain: Dev mode (geth --dev) or Simulated Backend for Go tests.

## Getting started

Follow the Kurtosis guide at https://geth.ethereum.org/docs/fundamentals/kurtosis. It provisions geth + consensus nodes, network topology, and JWT/Engine API wiring.

## Key Points

- Use Kurtosis for multi-node private nets; use dev mode or simulated backend for single-node/unit testing. Kurtosis handles genesis, bootnodes, and consensus-execution pairing.

<!-- Source: https://github.com/ethereum/go-ethereum (README.md), https://geth.ethereum.org/docs/fundamentals/kurtosis -->
