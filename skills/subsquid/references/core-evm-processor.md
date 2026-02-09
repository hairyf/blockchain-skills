---
name: subsquid-core-evm-processor
description: EvmBatchProcessor configuration — gateway, RPC, addLog, setFields, batch context.
---

# EvmBatchProcessor

`EvmBatchProcessor` from `@subsquid/evm-processor` indexes EVM chains. Configure data sources and requested data, then run with a store and a batch handler.

## Data sources (required: at least one)

- **`setGateway(url | GatewaySettings)`** — SQD Network gateway (historical, fast). Use when the network has a gateway.
- **`setRpcEndpoint(rpc: string | ChainRpc)`** — Chain RPC. Used for real-time ingestion (unfinalized blocks), direct RPC queries in code, or when there is no gateway. `ChainRpc` can specify `url`, `capacity`, `maxBatchCallSize`, `rateLimit`, `requestTimeout`, `headers`.

Choose based on use case:
- Real-time + gateway available: set both `setGateway()` and `setRpcEndpoint()`; processor uses gateway for history then RPC for hot blocks.
- Only historical, no RPC: `setGateway()` only.
- No gateway (e.g. local node): `setRpcEndpoint()` only.
- Direct RPC queries in code: `setRpcEndpoint()` required; add `setGateway()` to reduce RPC load; optionally disable RPC ingestion with `setRpcDataIngestionSettings({ disabled: true })`.

**`setFinalityConfirmation(nBlocks: number)`** — Required when RPC ingestion is enabled. Number of blocks after which data is considered final (e.g. 75 for Ethereum mainnet).

## Data requests

- **`addLog(options)`** — Event logs. `options`: `address?`, `topic0`–`topic3?`, `range?`; related: `transaction?`, `transactionLogs?`, `transactionTraces?`.
- **`addTransaction(options)`** — Transactions (filter by address, sighash, range).
- **`addTrace()`** / **`addStateDiff()`** — Traces and state diffs (EVM).

**`setFields(fields)`** — Select which fields to fetch for logs, transactions, traces, state diffs, block headers. Omit to use defaults.

**`setBlockRange({ from, to? })`** — Global block range; processor exits with 0 when upper bound is reached.

## Batch handler and context

```ts
processor.run(db, async (ctx) => {
  for (const block of ctx.blocks) {
    // block.header, block.logs, block.transactions, block.traces, block.stateDiffs
    for (const log of block.logs) {
      // decode and collect
    }
  }
  await ctx.store.insert(entities) // batch write
})
```

`ctx.blocks` is an array of `BlockData`: `header`, `logs`, `transactions`, `traces`, `stateDiffs`. Field availability follows `setFields()`. Use typegen-generated event topics/sighashes for filtering (e.g. `usdcAbi.events.Transfer.topic`).

## Other settings

- **`setRpcDataIngestionSetting(settings)`** — RPC ingestion: `disabled`, `preferTraceApi`, `useDebugApiForStateDiffs`, `debugTraceTimeout`, `headPollInterval`, `newHeadTimeout`.
- **`includeAllBlocks(range?)`** — Fetch all blocks in range, not only blocks with requested items.
- **`setPrometheusPort(port)`** — Metrics server port.

<!--
Source references:
- https://docs.subsquid.io/sdk/reference/processors/evm-batch/general
- https://docs.subsquid.io/sdk/reference/processors/evm-batch/logs
- https://docs.subsquid.io/sdk/reference/processors/evm-batch/context-interfaces
-->
