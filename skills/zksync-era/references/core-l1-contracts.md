---
name: zksync-era-l1-contracts
description: L1 Diamond proxy, facets (Getters, Admin, Mailbox, Executor), bridges, governance, and ValidatorTimelock.
metadata:
  author: hairy
---

# L1 Smart Contracts

The main L1 interface for a single L2 is a **Diamond proxy** (EIP-2535–style): no external functions, only a fallback that delegatecalls into facets. Facets can be freezable; freezing the diamond blocks access to all freezable facets (dangerous if the upgrade facet is freezable).

## Main facets

- **GettersFacet**: View/pure and diamond loupe; must not be frozen.
- **AdminFacet**: Governor/validator/system params, freeze/unfreeze, upgrade execution. Controlled by Governance (protocol upgrades) and Admin (e.g. validator permissions).
- **MailboxFacet**: L1↔L2 communication, native ETH bridging (legacy), censorship-resistance path. L1→L2 = request stored in queue, executed on L2; L2→L1 = messages/logs in pubdata.
- **ExecutorFacet**: Accepts L2 batches in three steps—`commitBatches` (timestamp, logs, prepare for proof), `proveBatches` (verify zk-proof), `executeBatches` (finalize state, process L1→L2 queue, save Merkle tree of L2 logs).

System log keys (e.g. from `SystemLogKey`) are emitted by L2 system contracts and validated on L1 during commit/execute (e.g. L2_TO_L1_LOGS_TREE_ROOT_KEY, STATE_DIFF_HASH_KEY, PRIORITY_TXN_HASH_KEY).

## Bridges

Separate from the Diamond: **L1ERC20Bridge** (legacy ERC20), **L1AssetRouter** (ETH/WETH), **L2SharedBridge** (L2 side). Lock/mint and burn/unlock via L1↔L2 messaging.

## Governance and ValidatorTimelock

**Governance**: Schedules and executes upgrades (transparent or shadow); delay-based execution or instant (Security Council only). **ValidatorTimelock**: Sits between validator EOA and Diamond; adds a delay between commit and execute so the chain can freeze on suspicious activity. Node reads `executionDelay()` from the contract.

## Agent usage

- When integrating with L1: call Getters for state, Mailbox for L1→L2 requests, and never assume Admin/Mailbox are unfrozen without checking.
- For batch submission: use ExecutorFacet’s commit → prove → execute flow; respect ValidatorTimelock delay when present.
- L1→L2 sender on L2: if `msg.sender != tx.origin`, L2 sender is `AddressAliasHelper.applyL1ToL2Alias(msg.sender)` (L1 address + fixed offset).

<!--
Source references:
- sources/zksync-era/docs/src/specs/l1_smart_contracts.md
-->
