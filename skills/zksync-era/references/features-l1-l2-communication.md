---
name: zksync-era-l1-l2-communication
description: Priority operations, L1→L2 requestL2Transaction, address aliasing, L2→L1 logs and messages, Mailbox.
metadata:
  author: hairy
---

# L1–L2 Communication

## L1 → L2 (priority operations)

Users call **requestL2Transaction** (or equivalent) on the L1 Mailbox. The request is appended to the priority queue. The operator includes it in a batch; the Bootloader does **not** verify signatures for L1-originated txs but maintains:

- `numberOfPriorityTransactions`
- `priorityOperationsRollingHash` = rolling keccak of processed priority op hashes

On **executeBatches**, L1 pops the same number of priority ops from the queue and checks that the rolling hash matches. So the operator cannot forge or reorder priority ops. For each priority tx the Bootloader emits an L2→L1 user log with hash and result (e.g. for proving failed deposits).

**Address aliasing**: On L2, if `msg.sender != tx.origin` the effective sender is `AddressAliasHelper.applyL1ToL2Alias(msg.sender)` (L1 address + `0x1111...1111` offset) to avoid cross-chain replay/identity confusion.

**Upgrade transactions**: Only during protocol upgrades; one per batch, must be first; hash is emitted via system L2→L1 log *before* execution so it cannot be replaced by a malicious Keccak precompile.

## L2 → L1

- **User logs**: Contracts call the L1Messenger system contract; logs are hashed into a rolling hash and Merkle tree root is published in pubdata. Proofs of log inclusion use the same leaf format as pre-Boojum for compatibility.
- **System logs**: Emitted by VM opcodes; fixed set per batch; hashes are part of block commitment and verified on L1.

Bridges: lock on L1 → priority op or message → mint on L2; burn on L2 → L2→L1 message → unlock on L1 via Mailbox `finalizeWithdrawal` / bridge finalizers.

## Agent usage

- When building L1→L2 flows: use the official Mailbox interface; respect gas and fee requirements for priority ops.
- When proving L2→L1 events: use the Merkle tree of L2→L1 logs from executed batches; leaf = `keccak256(abi.encodePacked(l2ShardId, isService, txNumberInBlock, sender, key, value))`.
- For L2 sender in contracts: if the tx is from L1, expect aliased address unless it’s the origin.

<!--
Source references:
- sources/zksync-era/docs/src/specs/l1_smart_contracts.md (MailboxFacet)
- sources/zksync-era/docs/src/specs/contracts/settlement_contracts/priority_queue/l1_l2_communication/l1_to_l2.md
- sources/zksync-era/docs/src/specs/contracts/settlement_contracts/data_availability/pubdata.md
-->
