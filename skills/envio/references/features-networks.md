---
name: envio-supported-networks
description: HyperSync and HyperRPC supported networks and endpoint URL patterns.
---

# Envio Supported Networks

HyperSync and HyperRPC support 80+ EVM networks and Fuel. Each network has a tier (service level); see the docs table for the full list and tiers.

## URL Patterns

- **HyperSync**: `https://<network>.hypersync.xyz` or `https://<chainId>.hypersync.xyz`  
  Examples: `https://eth.hypersync.xyz`, `https://arbitrum.hypersync.xyz`, `https://base.hypersync.xyz`, `https://42161.hypersync.xyz`
- **HyperRPC**: `https://<network>.rpc.hypersync.xyz` or `https://<chainId>.rpc.hypersync.xyz`  
  Examples: `https://eth.rpc.hypersync.xyz`, `https://arbitrum.rpc.hypersync.xyz`

## Usage

- In HyperSync clients, set `url` to the desired network’s HyperSync URL.
- For HyperRPC, use the network’s HyperRPC URL and append `/<api-token>`.
- Supported networks list (with tiers and optional trace support): [HyperSync Supported Networks](https://docs.envio.dev/docs/HyperSync/hypersync-supported-networks). HyperIndex supported networks are documented separately (EVM, Solana, Fuel).

## Key Points

- Use the same network identifier (name or chain ID) for both HyperSync and HyperRPC.
- Some chains have a separate “traces” endpoint (e.g. Base Traces). Check the docs table when using trace selection.

<!--
Source references:
- https://docs.envio.dev/docs/HyperSync/hypersync-supported-networks
- https://docs.envio.dev/docs/HyperRPC/hyperrpc-supported-networks
-->
