---
name: optimism-derivation
description: L2 chain derivation from L1—sequencing window, batch/channel format, pipeline, and payload attributes.
---

# L2 Chain Derivation

The rollup node derives the L2 chain from the L1 chain. Use this when implementing or debugging derivation, batcher encoding, or Engine API usage.

## Inputs per epoch

For L1 block (epoch) `E`:

- **Sequencing window**: L1 blocks `[E, E + SWS)` (SWS = sequencing window size). Batcher transactions in this window supply sequencer batches.
- **Deposits**: `TransactionDeposited` events from the L1 origin (OptimismPortal).
- **L1 block attributes**: For the L1 attributes deposited transaction.
- **Previous L2 state**: Last block of previous epoch or L2 genesis.

Each epoch has at least one L2 block. L2 block timestamp: `block.timestamp = prev_l2_timestamp + l2_block_time` (e.g. 2s). Constraint: `l1_origin.timestamp <= block.timestamp <= max_l2_timestamp` (max_sequencer_drift bounds aheadness).

## Batch submission (wire format)

- **Batcher transaction**: Sent to Batch Inbox address; data = frames.
- **Frame**: Fixed-size chunks; frames grouped into **channels**. Channel has expiry (timeout); must be read within channel bank limits (`MAX_RLP_BYTES_PER_CHANNEL`, `MAX_CHANNEL_BANK_SIZE`; increased in Fjord).
- **Batch**: Decoded from channel; contains L2 block data. Batch format includes L1 origin hash; L1 origin block never contains batch data for that same epoch.

## Derivation pipeline (high level)

1. **L1 traversal** → **L1 retrieval** (batcher txns, deposit logs).
2. **Frame queue** → **Channel bank** (pruning, timeouts, reading) → **Channel reader** (batch decoding) → **Batch queue**.
3. **Payload attributes derivation**: Build transaction list (L1 attributes tx, user deposits, sequenced txns); build payload attributes per block.
4. **Engine queue**: Submit payload attributes to Engine API; forkchoice sync; handle unsafe vs safe head, L1 consolidation.

## Engine API usage

- **Bedrock / Canyon / Delta**: V2 for pre-Ecotone blocks.
- **Ecotone+**: Use V3 for `newPayload` and related.
- Sequence: `forkChoiceUpdated` (payload attributes) → `getPayload` → `newPayload` → `forkChoiceUpdated` (update head).

## Key points

- Eager block derivation: Often entire epoch can be derived before full sequencing window is available (worst case: batch data in last block of window).
- Protocol parameters (e.g. `max_sequencer_drift`, channel limits) can change by upgrade (e.g. Fjord); see derivation spec table.

<!--
Source references:
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/derivation.md
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/overview.md
-->
