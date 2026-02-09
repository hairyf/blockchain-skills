---
name: alchemy-debug
description: Alchemy Debug API — traceCall, traceTransaction, traceBlock with configurable tracers.
---

# Debug Namespace

`alchemy.debug` exposes non-standard RPC methods for inspecting and replaying transactions and blocks: `traceCall`, `traceTransaction`, `traceBlock`. Use for debugging execution and state changes.

## Methods

- **traceCall(transaction, blockIdentifier, tracer)** — run `eth_call` in the context of the given block; returns trace. `tracer`: `DebugCallTracer` or `DebugPrestateTracer`.
- **traceTransaction(transactionHash, tracer)** — replay the transaction exactly as executed; returns trace.
- **traceBlock(blockIdentifier, tracer)** — replay a mined block; returns trace(s). `blockIdentifier`: block hash, block number hex, or commitment level.

## Tracers

- **DebugCallTracer** — call trace (nested calls, inputs/outputs).
- **DebugPrestateTracer** — state before execution (slot/value).
- Tracer type and config depend on Alchemy’s debug API; see interfaces `DebugCallTracer`, `DebugPrestateTracer`, `DebugCallTrace`, `DebugTransaction`.

## Usage

```ts
const alchemy = new Alchemy();

const callTrace = await alchemy.debug.traceCall(
  { to: '0x…', data: '0x…', from: '0x…' },
  'latest',
  { type: DebugTracerType.CALL_TRACER }
);
const txTrace = await alchemy.debug.traceTransaction(txHash, { type: DebugTracerType.CALL_TRACER });
const blockTrace = await alchemy.debug.traceBlock('0x1234', { type: DebugTracerType.CALL_TRACER });
```

## Key Points

- `traceCall` uses parent block state; `traceTransaction` replays in chain order.
- `blockIdentifier` can be block number (hex), block hash, or commitment (e.g. `latest`).
- Use for debugging reverts, gas, or state diffs without sending transactions.

<!--
Source references:
- sources/alchemy/docs-md/classes/DebugNamespace.md
- sources/alchemy/docs-md/README.md
-->
