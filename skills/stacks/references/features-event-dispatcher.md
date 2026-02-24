---
name: stacks-event-dispatcher
description: Stacks event observer — subscribe to blocks, mempool, burn blocks, StackerDB, and contract/asset events via HTTP POST.
---

# Event Observer (Dispatcher)

Configure one or more `[[events_observer]]` entries in the node config. The node POSTs JSON payloads to the given endpoint for subscribed events.

## Config

```toml
[[events_observer]]
endpoint = "listener:3700"
events_keys = ["*"]      # or specific keys (see below)
timeout_ms = 5000        # optional, default 1000
disable_retries = false # optional
```

Invalid `events_keys` cause startup panic. All observers implicitly receive **/attachments/new** for new AtlasDB attachments.

## Event keys and endpoints

| Key | Delivered to | Notes |
|-----|----------------|-------|
| `"*"` | /new_block, /new_microblocks, /new_mempool_tx, /drop_mempool_tx, /new_burn_block | Does **not** include stackerdb or block_proposal |
| `"stx"` | /new_block, /new_microblocks | STX events only; microblocks deprecated after epoch 2.5 |
| `"memtx"` | /new_mempool_tx, /drop_mempool_tx | |
| `"burn_blocks"` | /new_burn_block | |
| `"microblocks"` | /new_microblocks | Deprecated since epoch 2.5 |
| `"stackerdb"` | /stackerdb_chunks | Not in `*` |
| `"block_proposal"` | /proposal_response | Miner block validation result; not in `*` |
| `"{addr}.{contract}::{event}"` | /new_block, /new_microblocks | Single contract event |
| `"{addr}.{contract}.{asset}"` | /new_block, /new_microblocks | FT/NFT asset events |

## Payload summary

- **POST /new_block** — Block hash/height, parent hashes, `transactions` array, `events` (filtered), `matured_miner_rewards`, cost aggregates. Tx with `raw_tx: "0x00"` is a burnchain op; see `burnchain_op` (e.g. `transfer_stx`, `stack_stx`, `delegate_stx`, `pre_stx`, `vote_for_aggregate_key`).
- **POST /new_burn_block** — `burn_block_hash`, `consensus_hash`, `burn_block_height`, `reward_recipients`, `reward_slot_holders`, `burn_amount`.
- **POST /new_mempool_tx** — JSON array of hex-encoded raw transactions.
- **POST /drop_mempool_tx** — `dropped_txids`, `reason` (e.g. ReplaceByFee, ReplaceAcrossFork, TooExpensive, StaleGarbageCollect), optional replacement txid.
- **POST /stackerdb_chunks** — `contract_id`, `modified_slots` (slot_id, slot_version, signature, data).
- **POST /attachments/new** — Array of attachment objects (attachment_index, index_block_hash, block_height, content_hash, contract_id, metadata, tx_id, content).
- **POST /proposal_response** — `result`: Ok (block hex, cost, size) or Reject (reason, reason_code).

## Key points

- Microblock events are only supported until epoch 2.5.
- Subscribe to specific contract/asset keys to reduce payload size.
- Block proposal responses are async: submit via POST /v3/block_proposal and receive result on observer `/proposal_response`.

<!--
Source references:
- sources/stacks/docs/event-dispatcher.md
- https://github.com/stacks-network/stacks-blockchain
-->
