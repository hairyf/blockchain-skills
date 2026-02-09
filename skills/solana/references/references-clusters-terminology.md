---
name: solana-references-clusters-terminology
description: Solana clusters (mainnet, devnet, testnet), staking, and core terminology for agents.
---

# Solana — Clusters and Terminology

## Clusters

- **Mainnet-beta**: Production; real SOL and tokens.
- **Devnet**: Development; airdrop SOL; similar to mainnet.
- **Testnet**: Staging/validation; may be deprecated or repurposed.
- **Local**: solana-test-validator; RPC http://localhost:8899, WS ws://localhost:8900.

## Terminology

- **Account**: Key-value record; holds lamports, owner program, data, executable flag.
- **Lamport**: Smallest unit of SOL (10^9 lamports = 1 SOL).
- **Program**: Executable on-chain (smart contract).
- **Instruction**: Single operation for one program; transaction = list of instructions.
- **PDA**: Program-derived address; no private key; program can sign.
- **Blockhash**: Identifies a block; used in transaction message for expiry (~60–90 s).
- **Commitment**: processed / confirmed / finalized; how much confirmation the RPC reports.
- **Slot**: Leader schedule unit; one block per slot (typically).
- **Signer**: Account that must sign the transaction; first signer pays base fee.
- **Compute unit (CU)**: Measure of execution; fees and limits expressed in CUs.

## Staking

- **Stake account**: Holds delegated SOL; owner delegates to a validator.
- **Stake program**: Create stake account, delegate, withdraw, deactivate.
- **Rewards**: Validator rewards distributed to delegators; check stake program docs and RPC (getStakeActivation, etc.).

## Key points

- Use devnet or local for testing; mainnet for production. Same RPC API; different endpoints and chain state.
- Account **owner** is the program that can modify the account; **authority** is an address with a permission (e.g. mint authority).

<!--
Source references:
- https://solana.com/docs/references/clusters
- https://solana.com/docs/references/terminology
- https://solana.com/docs/references/staking
- https://github.com/solana-foundation/solana-com
-->
