---
name: optimism-batcher-system-config
description: Batch submitter (batcher) role and loop; SystemConfig contract and parameters (batch inbox, batcher hash, fee scalars).
---

# Batcher and System Config

Reference for implementing or operating a batcher, or reading rollup configuration from L1.

## Batcher (batch submitter)

- **Role**: Submits L2 sequencer data to L1 so verifiers can derive the L2 chain. Data format is defined in the [derivation spec](core-derivation.md): channels, frames, batches; encoding is inverse of derivation decoding.
- **Minimal loop**: (1) If unsafe L2 block > safe block, there is data to submit. (2) Iterate unsafe L2 blocks, skip already-submitted. (3) Open channel; buffer L2 block data with spec encoding/compression. (4) Fill data transactions from channel. (5) Send transactions to L1 (Batch Inbox). Implementation must avoid duplicate submissions (safe/unsafe view updates with delay).

## SystemConfig (L1)

- **Role**: Source of truth for rollup configuration. Emits log events; derivation and other components read these. Key concepts:
- **Batch Inbox**: Address to which batcher sends transactions (batched L2 data in calldata or blobs).
- **Batcher hash**: Identifies which sender(s) are accepted for batch inbox txns. V0 = `bytes32(batcher_address)` (single address).
- **Fee scalars**: L1 data fee parameters. Pre-Ecotone: scalar, overhead (big-endian uint256). Post-Ecotone: scalar is versioned encoding (e.g. scalar-version 0: baseFeeScalar in bytes [28,32]); overhead ignored for L2 state transition.
- **Unsafe block signer**, **L2 gas limit**, **Resource config**, **Guardian**, and contract addresses (L1CrossDomainMessenger, bridges, OptimismPortal, DisputeGameFactory, etc.) are also in SystemConfig.

## Usage

- Batcher: Encode batches per derivation spec; submit to `SystemConfig.batchInbox()`; sign with key whose address matches batcher hash.
- Verifiers / nodes: Read SystemConfig logs from L1 to get batch inbox, batcher hash, and fee parameters for derivation and fee calculation.
- Gas estimation: Fee scalars (and Ecotone blob scalars) feed into GasPriceOracle / L1 fee computation on L2.

<!--
Source references:
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/batcher.md
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/system-config.md
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/derivation.md
-->
