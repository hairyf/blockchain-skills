---
name: optimism-protocol-overview
description: OP Stack architecture, design goals, L1/L2 contracts, rollup node, and block derivation loop.
---

# OP Stack Protocol Overview

High-level technical overview for agents that need to reason about Optimism's rollup architecture, contract roles, and derivation flow.

## Architecture design goals

- **Execution-level EVM equivalence**: Same developer experience as L1 (no special compiler, standard gas/tooling); change chain ID only.
- **Maximal compatibility with ETH1 nodes**: Rollup node uses Engine API; execution engine (Geth) reuses mempool, sync, snap sync.
- **Minimize state and complexity**: Stateless services where possible; replicas recover from DB using P2P and on-chain sync.

## Core L1 contracts

- **Batch Inbox (EOA)**: Address receiving sequencer transaction batches (not a contract; conventionally `0xFF0000...<L2_chain_id>`).
- **L1StandardBridge / L1ERC721Bridge**: Token bridging; sit on top of L1CrossDomainMessenger.
- **L1CrossDomainMessenger**: Cross-domain messaging (legacy ResolvedDelegateProxy).
- **OptimismPortal**: Deposit entry (`depositTransaction`) and withdrawal exit (prove + finalize).
- **SuperchainConfig**: Pause/unpause; Guardian.
- **SystemConfig**: Rollup config (batch inbox, batcher hash, fee scalars, gas limit) emitted as logs; derivation reads these.
- **DisputeGameFactory / FaultDisputeGame / AnchorStateRegistry / DelayedWETH**: Fault proof (output proposals, bonds, challenges).

## Core L2 contracts (predeploys)

- **L1Block**, **GasPriceOracle**, **L1FeeVault**, **BaseFeeVault**, **SequencerFeeVault**: System/fee contracts.
- **L2CrossDomainMessenger**, **L2ToL1MessagePasser**, **L2StandardBridge**, **L2ERC721Bridge**: Bridging and messaging.

## L2 node and derivation

- **Rollup node** + **Execution engine** (Geth): Rollup node derives L2 chain from L1; drives execution engine via Engine API.
- **Block derivation**: `derive_rollup_chain(l1_blockchain) -> rollup_blockchain`. For each L1 block (epoch), need: sequencing window of L1 blocks (for batcher txns), deposit events from OptimismPortal, L1 block attributes. Batcher submits batches to Batch Inbox; rollup node reads batches + deposits and builds payload attributes for the Engine API.
- **Engine API sequence**: (1) `forkChoiceUpdated` with payload attributes → payload ID; (2) `getPayload`; (3) `newPayload` (Ecotone+ use V3); (4) `forkChoiceUpdated` to set new head.

## Usage

When answering questions about Optimism:

- Use this overview to map components (who submits batches, who reads deposits, who proves withdrawals).
- For exact interfaces and addresses, refer to predeploys, bridges, and derivation specs.

<!--
Source references:
- https://github.com/ethereum-optimism/specs/blob/main/specs/root.md
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/overview.md
-->
