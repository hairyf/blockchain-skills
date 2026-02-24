---
name: starknet-rpc-method-mapping
description: Ethereum-to-Starknet JSON-RPC method mapping and per-method differences.
---

# RPC Method Mapping (Ethereum → Starknet)

Starknet's node API maps one-to-one from Ethereum method names by replacing the `eth_` prefix with `starknet_`. Below are the main mappings and Starknet-specific differences.

## Mapping Table

| Ethereum | Starknet | Differences |
|----------|----------|-------------|
| eth_blockNumber | starknet_blockNumber | Returns block number only. Result key: `"result"`. |
| eth_chainId | starknet_chainId | Same semantics. |
| eth_getBlockByHash | starknet_getBlockByHash | No `include_transactions` input. Result key: `"result"`. |
| eth_getBlockByNumber | starknet_getBlockByNumber | No `include_transactions` input. Result key: `"result"`. |
| eth_getBlockTransactionCountByHash | starknet_getBlockTransactionCountByHash | Supports `"latest"` block tag. Result is integer; key `"result"`. May error on invalid block hash. |
| eth_getBlockTransactionCountByNumber | starknet_getBlockTransactionCountByNumber | Block number is decimal integer. Result key: `"result"`. May error on invalid block number. |
| eth_getTransactionByBlockHashAndIndex | starknet_getTransactionByBlockHashAndIndex | Index is decimal integer. |
| eth_getTransactionByBlockNumberAndIndex | starknet_getTransactionByBlockNumberAndIndex | Index is decimal integer. |
| eth_pendingTransactions | starknet_pendingTransactions | Result key: `"result"`. No market fee parameters. |
| eth_protocolVersion | starknet_protocolVersion | — |
| eth_syncing | starknet_syncing | Result does not include known/pulled states. |
| eth_getStorageAt | starknet_getStorageAt | Accepts block hash (block_id). Result key: `"result"`; type is field element. Errors for invalid contract or storage keys. |
| eth_getTransactionByHash | starknet_getTransactionByHash | Input key: `"transaction_hash"`. Result key: `"result"`. Does not return null; errors on invalid hash. |
| eth_getTransactionReceipt | starknet_getTransactionReceipt | Input key: `"transaction_hash"`. Result key: `"result"`. Does not return null; errors on invalid hash. |
| eth_getCode | starknet_getCode | Input key: `"contract_address"`. No block number. Returns bytecode (field elements) and ABI. Errors on invalid contract address. |
| eth_call | starknet_call | Different input shape (request + block_id). Block by block_id. Errors for invalid contract, selector, calldata, or other failure. |

## Agent Usage

- When translating Ethereum RPC code to Starknet, replace `eth_*` with `starknet_*` and adapt parameter names (e.g. `transaction_hash`, `contract_address`).
- Use `block_id` (object with `block_hash`, `block_number`, or `block_tag`) instead of a raw block number or tag string where the spec requires it.
- Expect errors instead of null for missing blocks or transactions; handle `BLOCK_NOT_FOUND`, `CONTRACT_NOT_FOUND`, etc.

<!--
Source references:
- https://github.com/starkware-libs/starknet-specs/blob/master/starknet_vs_ethereum_node_apis.md
-->
