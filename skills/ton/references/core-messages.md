---
name: ton-messages
description: TON message types, transactions, StateInit and deploy.
---

# TON Messages and Transactions

## Message structure

```tlb
message$_ {X:Type}
  info:CommonMsgInfo
  init:(Maybe (Either StateInit ^StateInit))
  body:(Either X ^X)
= Message X;
```

- **info**: message type and routing (internal, external-in, external-out).
- **init**: optional StateInit to deploy or unfreeze a contract (see foundations/messages/deploy).
- **body**: payload for the receiver (in-place or in ref).

Message types:

- **Internal**: contract → contract; always creates a transaction.
- **External incoming**: off-chain → contract; transaction only if contract accepts.
- **External outbound**: contract → off-chain (e.g. logs); no transaction.

## StateInit (deploy)

Sent with a message to deploy a contract or unfreeze it. TL-B:

```tlb
_ fixed_prefix_length:(Maybe (## 5)) special:(Maybe TickTock)
  code:(Maybe ^Cell) data:(Maybe ^Cell) library:(Maybe ^Cell)
= StateInit;
```

- **code**, **data**, **library**: initial contract code and data.
- **fixed_prefix_length**: allows deploying to a different shard by letting the first N bits of the destination differ from `hash(StateInit)`; rest must match. Max 8 (config param 43).

Address from StateInit: `account_id = hash(initial_code, initial_data)` (same for current TVM).

## Transactions

A **transaction** records state changes of one account. Contract state only changes via a transaction.

- Triggered by: processing an internal or accepted external message, or by tick-tock/split-prepare/split-install/storage-tx.
- Each transaction has `lt` (logical time), `now` (Unix time), `state_update` (Merkle update), `in_msg`, `out_msgs`, `total_fees`.
- Transactions form an AccountChain; order is strict (`prev_trans_hash`). Finality when referenced in a masterchain block (~5 s).

## Key points

- Messages carry optional `init` (StateInit) and `body`; type is in `info`.
- Deploy = send message with StateInit; address derived from hash of code+data; use `fixed_prefix_length` for shard placement.
- Transactions are immutable records; one per account state change; finality after masterchain confirmation.

<!--
Source references:
- https://github.com/ton-org/docs (foundations/messages/overview.mdx, deploy.mdx)
- foundations/messages/internal, external-in, external-out, ordinary-tx
-->
