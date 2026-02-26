---
name: tron-core-sr-committee
description: Super Representative and SR Partner election, brokerage, block/vote rewards, and Committee (proposals, vote, cancel).
---

# Super Representatives and Committee

## SR and SR Partner

- **SRs**: Top 27 by vote; produce blocks; receive block and vote rewards. **SR Partners**: 28th-127th; no block production; share vote rewards. Apply: 9999 TRX fee (WitnessCreateContract).
- **Voting**: TRON Power (TP) = 1 per 1 TRX staked. Last vote overwrites all previous. Unstaking reclaims TP (unused first, then proportional from votes).
- **APIs**: CreateWitness (apply), UpdateWitness (e.g. URL), VoteWitnessAccount (vote), GetBrokerageInfo, GetRewardInfo, UpdateBrokerage (commission rate 0-100%). ListWitnesses, GetPaginatedNowWitnessList.

## Brokerage and rewards

- **Brokerage (commission)**: Default 20%. SR/SRP sets via UpdateBrokerage; 100% = all to SR; 0% = all to voters.
- **Block production rewards**: Per block (on-chain parameter, e.g. 8 TRX). SR gets brokerage share; voters get rest (when they trigger VoteWitness/Unfreeze/WithdrawBalance).
- **Vote rewards**: Pool (e.g. 128 TRX) distributed to SRs/SR Partners and voters by vote share; withdrawn on WithdrawBalanceContract.
- **WithdrawBalanceContract**: Withdraws accumulated rewards to account balance.

## Committee

- **Composition**: 27 active SRs. **Powers**: Create proposal to modify network parameters; vote on proposals. Proposal passes with >= 18 approvals; takes effect next maintenance period.
- **Create proposal**: Any SR/SRP/candidate. createproposal id0 value0 ... idN valueN (parameter ids and values). Parameters: see TRONSCAN committee page.
- **Vote**: approveProposal id is_or_not_add_approval. Approval only; not voting = disapprove. Proposal valid 3 days.
- **Cancel**: Creator can deleteProposal proposalId before effect.
- **Query**: ListProposals, GetPaginatedProposalList, GetProposalById (HTTP/gRPC).

## Usage for agents

Use wallet/updatebrokerage (or gRPC UpdateBrokerage) to set commission. Query brokerage and rewards with getbrokerage, getreward. Build proposal/vote/cancel txs via corresponding APIs; sign and broadcast. Check parameter ids and current values from chain/committee docs.

<!-- Source: sources/tron/docs/mechanism-algorithm/sr.md -->
