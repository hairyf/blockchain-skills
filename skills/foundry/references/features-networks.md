---
name: foundry-networks
description: Custom network features in Foundry — custom precompiles, evm-networks crate.
---

# Custom Network Features

Foundry's `anvil`, `forge`, and `cast` can be extended with network-specific behavior. Currently supported: **custom precompiles**; custom transaction types are planned.

## Implementation

- Custom features are implemented in the **`evm-networks`** crate (`crates/evm/networks`).
- Use this when you need to emulate or support a chain that has non-standard precompiles or other EVM behavior.
- Documentation and examples live inside the `evm/networks` crate.

## Key Points

- For standard Ethereum/mainnet forks, no change is needed.
- When an agent needs to support a custom L2 or sidechain that differs by precompiles or tx types, point to `evm-networks` and the Foundry book/config for network selection.

<!--
Source references:
- https://github.com/foundry-rs/foundry/blob/master/docs/dev/networks.md
-->
