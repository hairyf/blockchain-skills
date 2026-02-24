---
name: optimism-bridges-and-messaging
description: Standard bridges, deposits (tx type 0x7E), withdrawals (prove/finalize), and cross-domain messengers.
---

# Bridges, Deposits, Withdrawals, and Messengers

Reference for implementing or debugging L1–L2 asset flows and cross-domain messages.

## Standard bridges

- **L2StandardBridge** predeploy: `0x4200000000000000000000000000000000000010`.
- Interface: `bridgeETH`, `bridgeETHTo`, `bridgeERC20`, `bridgeERC20To`; `finalizeBridgeETH`, `finalizeBridgeERC20`. Built on top of cross-domain messengers.
- For ERC20, remote domain must have an `OptimismMintableERC20` (e.g. from `OptimismMintableERC20Factory`).

## Deposits (L1 → L2)

- **Deposit contract**: OptimismPortal. User calls `depositTransaction`; emits `TransactionDeposited`. Rollup node derives L2 blocks including these as **deposited transactions**.
- **Deposited transaction type**: EIP-2718 type `0x7E`. Fields: `sourceHash`, `from`, `to`, `mint`, `value`, `gas`, `isSystemTx` (disabled from Regolith), `data`. No signature; no nonce in tx (API may expose nonce for compatibility).
- **sourceHash**: Uniquely identifies origin (user-deposited: `keccak256(0, keccak256(l1BlockHash, l1LogIndex))`; L1-attributes: domain 1; upgrade: domain 2). Prevents duplicate deposit tx hashes.
- **Address aliasing**: On L2, deposit sender address is aliased (applies to contract-originated deposits). See best-practices for security implications.

## Withdrawals (L2 → L1)

- **On L2**: Call **L2ToL1MessagePasser** predeploy `initiateWithdrawal(target, gasLimit, data)` (payable for ETH). Contract at `0x4200000000000000000000000000000000000016`. Emits `MessagePassed`; stores hash in `sentMessages`.
- **On L1**: (1) **Prove**: `OptimismPortal.proveWithdrawalTransaction(_tx, _l2OutputIndex, _outputRootProof, _withdrawalProof)` — proves inclusion in L2 output. (2) After challenge period (~7 days): **Finalize**: `OptimismPortal.finalizeWithdrawalTransaction(_tx)` — relays and marks replayed. Addresses are **not** aliased on withdrawals; use `OptimismPortal.l2Sender()` on L1 to get L2 sender.

## Cross-domain messengers

- **L2CrossDomainMessenger** predeploy: `0x4200000000000000000000000000000000000007`.
- **Send**: `sendMessage(target, message, minGasLimit)` (payable for value). Stores nonce; message identified by hash.
- **Relay**: On the other domain, `relayMessage(nonce, sender, target, value, minGasLimit, message)`. Successful/failed hashes stored in `successfulMessages` / `failedMessages` (replay possible for failed).
- L1→L2: User pays L2 gas on L1; execution is pulled into L2 automatically. L2→L1: User initiates on L2; relayer proves then finalizes on OptimismPortal (which calls into L1CrossDomainMessenger).
- **Message versioning**: First 2 bytes of nonce encode version (V0 vs V1 relayMessage signature/encoding).

## Usage

- To bridge assets: use StandardBridge for ETH/ERC20; use messengers for arbitrary contract calls.
- To implement withdrawal tooling: read `MessagePassed` and L2ToL1MessagePasser storage; build `WithdrawalTransaction` and inclusion proof; call `proveWithdrawalTransaction` then after challenge period `finalizeWithdrawalTransaction`.

<!--
Source references:
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/bridges.md
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/deposits.md
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/withdrawals.md
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/messengers.md
-->
