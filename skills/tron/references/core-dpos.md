---
name: tron-core-dpos
description: TRON DPoS consensus, Super Representatives, voting, slots, and epochs.
---

# TRON DPoS Consensus

TRON uses **Delegated Proof of Stake (DPoS)**. Block producers are **Super Representatives (SRs)** elected by vote.

## Concepts

- **SR (27)**: Produce blocks; elected by vote count. **SRP (28th–127th)**: No block production; receive voting rewards.
- **Slot**: 3 seconds; one block per slot under normal conditions.
- **Epoch**: 6 hours. Last 2 slots of each epoch = **maintenance period** (no blocks); votes tallied, block order for next epoch set.
- **TRON Power (TP)**: 1 TP per 1 TRX staked. Required to vote. Unstaking removes TP and invalidates current votes. Only latest vote per account counts per tally.

## Block production

1. Collect and validate transactions; package into block.
2. Sign block; set parent hash; broadcast.
3. Other nodes verify and append. Order of production determined by vote ranking (highest first).

## Voting

- Voting is a transaction type (`VoteWitnessContract`). Use `wallet/votewitnessaccount` (HTTP) or gRPC.
- Parameters: owner_address, list of (vote_address, vote_count). vote_count is in TP units.

## Usage for agents

- Query SR list: `wallet/listwitnesses`. Query brokerage/rewards: `wallet/getbrokerage`, `wallet/getreward`.
- Build vote tx: `wallet/votewitnessaccount` with owner_address and votes array. Sign and broadcast like any transaction.
- Time-sensitive logic: slot ≈ 3s; epoch 6h; maintenance at end of each epoch.

<!--
Source references:
- sources/tron/docs/mechanism-algorithm/dpos.md
- sources/tron/docs/mechanism-algorithm/sr.md
-->
