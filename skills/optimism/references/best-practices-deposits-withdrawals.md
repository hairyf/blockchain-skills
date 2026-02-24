---
name: optimism-deposits-withdrawals-practices
description: Address aliasing on deposits, no aliasing on withdrawals, and using l2Sender() on L1.
---

# Best Practices: Deposits and Withdrawals

Security and correctness when handling L1–L2 messaging and withdrawals.

## Address aliasing (deposits, L1 → L2)

- On **deposits**, the sender address on L2 may be **aliased**: the L1 contract address is transformed (e.g. added to a constant) so that the same address cannot represent both an L1 and L2 identity in the same context. This prevents a contract on L2 from impersonating an L1 contract address.
- On L2, the deposit sender is the one returned by `CALLER`; contracts cannot easily tell if the call originated on L1 or L2 without additional context (e.g. knowing that the first tx in a block is an L1 deposit).

## Withdrawals: no aliasing

- On **withdrawals**, the L2 sender address is **not** aliased when relayed on L1. The L1 contract receives the same address as the L2 sender.
- To get the **L2 sender** on L1, always use **`OptimismPortal.l2Sender()`** (or the equivalent in your portal abstraction). Do not rely on `msg.sender` for the L2 origin: `msg.sender` on L1 is the relayer (or OptimismPortal), not the L2 account.
- Same address on L1 and L2 does not imply same behavior (different code/state); design contracts to explicitly consider L2 vs L1 origin when needed.

## Replay and proof verification

- Withdrawal proving: Use the correct `l2OutputIndex` and output root proof for the block that contains the withdrawal. If the output root is challenged and changes, the withdrawal may need to be re-proven.
- Finalization: Only after the challenge period; each withdrawal hash can only be finalized once. Successfully verified messages that fail when relayed are recorded so they can be retried (see spec: handling failed relay).

## Usage

- When writing L1 contracts that receive withdrawals: read `l2Sender()` to attribute actions to the L2 account; do not trust `msg.sender` as the L2 identity.
- When writing L2 contracts that initiate withdrawals: document that the L1 target will see the same address via `l2Sender()` and must not conflate it with L1 callers.

<!--
Source references:
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/deposits.md (address aliasing)
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/withdrawals.md (addresses not aliased, l2Sender, security considerations)
-->
