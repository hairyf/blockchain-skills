---
name: tron-core-resource-model
description: TRON Bandwidth, Energy, and TRON Power (TP); staking, consumption, and fee_limit.
---

# TRON Resource Model

Three system resources: **TRON Power (TP)**, **Bandwidth**, and **Energy**.

## TRON Power (TP)

- **Use**: Voting for Super Representatives (SRs) and SR Partners only.
- **How to get**: Stake TRX for Bandwidth or Energy → 1 TRX staked = 1 TP. Query: `wallet/getaccountresource`.

## Bandwidth

- **What it is**: Byte size of a transaction (rate = 1). Every non-query transaction consumes Bandwidth.
- **Ways to get**: (1) Stake TRX for Bandwidth (share of network pool); (2) Delegation from another account; (3) Daily free allowance (e.g. 600; committee parameter).
- **Consumption order (typical)**: Staked Bandwidth → free allowance → burn TRX (size × 1000 sun). New-account creation: staked first, then burn 0.1 TRX (no free allowance). TRC-10: issuer Bandwidth can pay under conditions, else initiator.
- **Recovery**: Free and staked Bandwidth recover over 24 hours.
- **Query**: `wallet/getaccountresource`; remaining free = `freeNetLimit - freeNetUsed`, staked = `NetLimit - NetUsed`.

## Energy

- **What it is**: TVM computation for smart contract deployment and execution.
- **When used**: Deploy or trigger contracts only; not for plain TRX/TRC-10 transfers.
- **Ways to get**: Stake TRX for Energy (share of pool) or delegation.
- **Consumption**: Contract execution consumes Energy; if user doesn’t have enough, TRX is burned (sun per unit). Set **fee_limit** on trigger/deploy to cap burn.
- **fee_limit**: Mandatory for contract calls; maximum TRX (sun) the caller is willing to burn. Estimate or use a safe upper bound to avoid failed txs.

## Usage for agents

- For transfers: ensure account has Bandwidth (or allow TRX burn). For contract calls: set `fee_limit` and consider Energy/TRX balance.
- Query resources: `wallet/getaccountresource`, `wallet/getaccountnet` (per-token Bandwidth for TRC-10).
- Staking: `wallet/freezebalancev2` (ResourceCode 0 = Bandwidth, 1 = Energy); delegation: `wallet/delegateresource`.

<!--
Source references:
- sources/tron/docs/mechanism-algorithm/resource.md
-->
