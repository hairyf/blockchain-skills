---
name: celestia-state-and-txs
description: State access, balance queries, and submitting transactions (PayForBlob, transfer, staking) via the State module.
---

# State and Transactions

The **state** package defines how celestia-node accesses chain state and submits transactions. The public API is the **StateModule** (and embedded **StakingModule**); implementations use a **StateAccessor** (Core, P2P, or future local).

## StateModule (RPC)

- **AccountAddress** – Node’s account/signer address.
- **Balance** – Celestia balance for the node’s account, verified against the head’s AppHash.
- **BalanceForAddress(ctx, addr)** – Balance for a given address, also verified.
- **SubmitTx(ctx, tx)** – Submit a raw transaction; blocks until included in a block.
- **SubmitPayForBlob(ctx, nID, data, config)** – Build, sign, and submit a PayForBlob transaction for the given namespace and data.
- **Transfer(ctx, to, amount, config)** – Send coins from the node’s wallet to an address.

## StakingModule (embedded in StateModule)

- **Delegate** / **BeginRedelegate** / **Undelegate** / **CancelUnbondingDelegation** – Staking operations with optional TxConfig.
- **QueryDelegation** / **QueryRedelegations** / **QueryUnbonding** – Query delegation state for a delegator/validator.

All state-modifying methods accept an optional **state.TxConfig** for gas/fee and other options.

## StateAccessor implementations

- **CoreAccess:** gRPC connection to a celestia-core node. Used when a core endpoint is configured at init.
- **P2PAccess:** Discovers state-providing nodes (e.g. bridge) via P2P and sends state requests over libp2p streams. Bridge runs a StateProvider that proxies to its core connection.
- **Local** (future): Full nodes may serve state locally from applied blocks.

## Availability during sync

StateService is available while the node is syncing. The Syncer exposes **NetworkHead()** so state can be queried against the current network head even if the node has not finished syncing; balance verification uses the head’s AppHash (see best-practices).

## Key points

- Use **SubmitPayForBlob** for posting blobs to a namespace; use **GetSharesByNamespace** (Shares module) to read them back.
- Balances are verified against the latest head’s AppHash via Merkle proofs when using the public State API.
- Bridge nodes act as state providers for P2P state access; light/full nodes typically use Core or P2P accessor.

<!--
Source references:
- sources/celestia/state/doc.go
- sources/celestia/docs/adr/adr-009-public-api.md
- sources/celestia/docs/adr/adr-004-state-interaction.md
-->
