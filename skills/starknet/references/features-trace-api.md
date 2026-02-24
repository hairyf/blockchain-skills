---
name: starknet-trace-api
description: Starknet trace and simulation API—trace transaction, simulate transactions, trace block.
---

# Trace API

The Starknet Trace API (schema: `starknet_trace_api_openrpc.json`) provides execution traces and transaction simulation. Use it for debugging, fee estimation insight, and understanding execution flow.

## Methods

### starknet_traceTransaction

Returns the execution trace for a given transaction.

- **Params**: `transaction_hash` (and any other params defined in the schema).
- **Result**: Trace object (structure in schema: function calls, internal calls, execution steps).
- **Errors**: Invalid or missing transaction.

Use for: debugging a single transaction, building trace-based tooling.

### starknet_simulateTransactions

Simulates a sequence of transactions on a given state without submitting them.

- **Params**: Array of transactions to simulate (same shape as for `starknet_estimateFee`), simulation flags, and `block_id` (and any extra params in schema).
- **Result**: Simulation result per transaction (e.g. trace, fee, revert info).
- **Errors**: Invalid block, contract, or execution failure.

Use for: dry runs, fee estimation, and validating transaction sequences before broadcast.

### starknet_traceBlockTransactions

Returns traces for all transactions in a block.

- **Params**: `block_id` (and any other params in schema).
- **Result**: Array or map of transaction hash to trace (see schema).
- **Errors**: `BLOCK_NOT_FOUND` or invalid block.

Use for: block-level analysis and indexing execution data.

## Usage for Agents

- Prefer `starknet_simulateTransactions` when you need both trace and fee/outcome without sending transactions.
- Trace results follow the OpenRPC schema types; use them to walk internal calls and identify reverts or heavy steps.
- Combine with the read API: use `starknet_getBlockWithTxs` then `starknet_traceBlockTransactions` to correlate traces with transaction data.

<!--
Source references:
- https://github.com/starkware-libs/starknet-specs api/starknet_trace_api_openrpc.json
-->
