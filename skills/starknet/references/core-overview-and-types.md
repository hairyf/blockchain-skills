---
name: starknet-overview-and-types
description: Starknet specs and node API—field elements, block tags, naming conventions, and result format.
---

# Starknet Overview and Types

Starknet specifications (starknet-specs repo) define the JSON-RPC API for Starknet full nodes. The API is similar to Ethereum's execution API but uses Starknet-specific types and conventions.

## Key Concepts

- **Field element**: The fundamental type. All hashes (block, transaction), addresses, and storage values are field elements. Value range: `0 ≤ x < P` where `P = 2^251 + 17·2^192 + 1` (Cairo VM field).
- **Block tags**: Only `latest` is supported (no `earliest` or `pending` like Ethereum).
- **Naming**: Method names mirror Ethereum with the `eth_` prefix replaced by `starknet_` (e.g. `eth_call` → `starknet_call`).
- **Result key**: Responses use the key `"result"` (and `"events"` for `starknet_getEvents`). Invalid requests return errors rather than `null`.

## Block and Transaction Objects

Block and transaction structures differ from Ethereum due to different network mechanics (e.g. no proof of work). Use the OpenRPC schemas for exact shapes: `BLOCK_ID`, `BLOCK_WITH_TX_HASHES`, `BLOCK_WITH_TXS`, transaction and receipt types.

## Block ID

A block is identified by `block_id`: either a block hash (field element), block number (decimal integer), or the tag `"latest"`.

```json
{ "block_hash": "0x..." }
{ "block_number": 12345 }
{ "block_tag": "latest" }
```

## Usage

- When implementing or calling the node API, use field elements (hex string or decimal) for addresses, hashes, and storage keys.
- Prefer `block_id` with `"block_tag": "latest"` when you need the current state.
- Handle API errors explicitly; the spec returns structured errors (e.g. `BLOCK_NOT_FOUND`, `CONTRACT_NOT_FOUND`) instead of null results.

<!--
Source references:
- https://github.com/starkware-libs/starknet-specs (README, starknet_vs_ethereum_node_apis.md)
- api/starknet_api_openrpc.json
-->
