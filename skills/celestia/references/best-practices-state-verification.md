---
name: celestia-state-verification
description: Verifying balance (and other state) against the header AppHash using Merkle proofs.
---

# State Verification

When the node returns balances (or other state) via the State module, results should be verified against the chain. Celestia-node does this by requesting Merkle proofs from celestia-app and verifying them against the latest head’s **AppHash**.

## Why verify

- The StateAccessor may talk to a core endpoint or a P2P state provider. Verification ensures the returned state is consistent with the header chain the node trusts (from the header store).
- The head’s AppHash commits to the state after applying the *previous* block’s transactions, so verification uses the block height **head.Height - 1** for the state query.

## Flow

1. Get the latest head from the header store (header.Getter Head / LocalHead).
2. Issue an ABCI request query for the desired key (e.g. bank balance) at height **head.Height - 1**, with **Prove: true**.
3. Receive response with value and proof ops (e.g. `crypto.ProofOps`).
4. Convert proof ops to a Merkle proof (e.g. using ibc-go commitment types or equivalent).
5. Verify membership: proof.VerifyMembership(specs, root, path, value) where root is the head’s AppHash and path is the store key + key.

## Example (balance)

- Prefixed key: `bank.CreateAccountBalancesPrefix(addr) + bondDenom`.
- Path: `store/<bank.StoreKey>/key`, Data: prefixed key, Height: head.Height - 1, Prove: true.
- After verification, the balance in the response can be trusted relative to the head.

## Availability during sync

The Syncer exposes **NetworkHead()** so state queries can use the current network head for verification even when the node has not finished syncing. This allows the State API to remain available and still return verified state.

## Key points

- Always verify state responses against the header store’s head (or network head) AppHash when building trusted clients.
- Use height **head.Height - 1** for the state query because AppHash commits to the state after the previous block.
- The public State module (Balance, BalanceForAddress) implements this verification; custom or direct core clients should replicate it if they need the same guarantee.

<!--
Source references:
- sources/celestia/docs/adr/adr-004-state-interaction.md
-->
