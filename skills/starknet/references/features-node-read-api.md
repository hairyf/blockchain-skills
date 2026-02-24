---
name: starknet-node-read-api
description: Starknet JSON-RPC read methods—blocks, transactions, state, events, chain info.
---

# Node Read API

The Starknet Node API (OpenRPC schema: `starknet_api_openrpc.json`) provides read-only methods for blocks, transactions, state, and chain info. All methods use JSON-RPC 2.0; response result key is `"result"` (except `starknet_getEvents` which uses `"events"`).

## Spec and Chain Info

- **starknet_specVersion** — Returns the JSON-RPC spec version (semver string). No params.
- **starknet_blockNumber** — Latest accepted block number. Errors with `NO_BLOCKS` if none.
- **starknet_blockHashAndNumber** — Latest block hash and number. Errors: `NO_BLOCKS`.
- **starknet_chainId** — Chain ID. No params.
- **starknet_syncing** — Syncing status (object). No params.

## Blocks

- **starknet_getBlockWithTxHashes** — Block + transaction hashes. Params: `block_id`. Errors: `BLOCK_NOT_FOUND`.
- **starknet_getBlockWithTxs** — Block + full transactions. Params: `block_id`.
- **starknet_getBlockWithReceipts** — Block + full transactions + receipts. Params: `block_id`.
- **starknet_getBlockTransactionCount** — Transaction count for block. Params: `block_id`. Errors: `BLOCK_NOT_FOUND`.
- **starknet_getStateUpdate** — State update for block. Params: `block_id`. Errors: `BLOCK_NOT_FOUND`.

## Transactions and Receipts

- **starknet_getTransactionByHash** — Transaction by hash. Params: `transaction_hash`. Errors (no null): invalid hash.
- **starknet_getTransactionByBlockIdAndIndex** — Transaction by block and index. Params: `block_id`, `index`.
- **starknet_getTransactionReceipt** — Receipt by transaction hash. Params: `transaction_hash`. Errors (no null): invalid hash.
- **starknet_getTransactionStatus** — Status for a transaction. Params: `transaction_hash`.
- **starknet_getMessagesStatus** — Status for L1→L2 messages. Params: array of message identifiers.
- **starknet_pendingTransactions** — Pending transactions (result key `"result"`; no market fee params).

## State and Contracts

- **starknet_getStorageAt** — Storage value at contract + key. Params: `contract_address`, `key`, `block_id`. Result: field element. Errors: invalid contract or key.
- **starknet_getCode** — Contract bytecode (field elements) and ABI. Params: `contract_address`. No block; errors on invalid address.
- **starknet_getClass** — Class definition by hash. Params: `block_id`, `class_hash`.
- **starknet_getClassHashAt** — Class hash at address. Params: `block_id`, `contract_address`.
- **starknet_getClassAt** — Class definition at address. Params: `block_id`, `contract_address`.
- **starknet_getNonce** — Nonce at address in block. Params: `block_id`, `contract_address`. Errors: `BLOCK_NOT_FOUND`, `CONTRACT_NOT_FOUND`.
- **starknet_getStorageProof** — Merkle paths for state/classes/contract storage. Params: `block_id` (no `pre_confirmed`), optional `class_hashes`, `contract_addresses`, `storage_keys`. Single request can mix proof types.

## Call and Events

- **starknet_call** — Execute a view/pure call (no state change). Params: `request` (FUNCTION_CALL: contract_address, entry_point_selector, calldata), `block_id`. Result: array of field elements (Cairo return). Errors: `CONTRACT_NOT_FOUND`, `ENTRYPOINT_NOT_FOUND`, `CONTRACT_ERROR`, `BLOCK_NOT_FOUND`.
- **starknet_getEvents** — Events matching filter. Params: `filter` (EVENT_FILTER + RESULT_PAGE_REQUEST). Result key: `"events"` (EVENTS_CHUNK). Errors: `PAGE_SIZE_TOO_BIG`, `INVALID_CONTINUATION_TOKEN`, `BLOCK_NOT_FOUND`, `TOO_MANY_KEYS_IN_FILTER`.

## Example: starknet_call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "starknet_call",
  "params": {
    "request": {
      "contract_address": "0x...",
      "entry_point_selector": "0x...",
      "calldata": ["0x..."]
    },
    "block_id": { "block_tag": "latest" }
  }
}
```

Response: `"result": [ "0x...", "0x..." ]` (array of felt).

## Usage for Agents

- Use `block_id` with `block_tag: "latest"` for current state when no specific block is needed.
- For getCode/getClass, note that `starknet_getCode` does not take a block_id; class methods do.
- Prefer `starknet_getBlockWithReceipts` when both block and receipt data are needed in one call.
- Handle `BLOCK_NOT_FOUND`, `CONTRACT_NOT_FOUND`, and `CONTRACT_ERROR` when building robust clients.

<!--
Source references:
- https://github.com/starkware-libs/starknet-specs api/starknet_api_openrpc.json
- starknet_vs_ethereum_node_apis.md
-->
