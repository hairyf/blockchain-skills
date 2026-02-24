---
name: getHeader and bidding
description: How getHeader works, bid eligibility, and constructing BuilderBid and SignedBuilderBid.
metadata:
  author: hairy
---

# getHeader and Bidding

## getHeader semantics

`GET /eth/v1/builder/header/{slot}/{parent_hash}/{pubkey}` returns a **SignedBuilderBid** when the builder has a valid bid for that (slot, parent_hash, pubkey). Return **204** when no bid is available (e.g. no block built, or not eligible).

Optional headers:

- **Date-Milliseconds:** Unix timestamp in ms when the request was sent (for latency measurement).
- **X-Timeout-Ms:** Proposer’s timeout in ms; relays may delay forwarding getHeader to maximize rewards while staying within this timeout.

## Bid eligibility (builder side)

The builder should only return a bid when `is_eligible_for_bid(state, registrations, slot, parent_hash, pubkey)` holds:

- `state.slot == slot`.
- `pubkey` is in `registrations` (validator has registered).
- `pubkey` is the beacon proposer for `slot` (`get_beacon_proposer_index(state)`).
- `parent_hash == state.latest_execution_payload_header.block_hash`.

## Constructing the bid

- Build an **ExecutionPayload** that pays the validator’s `fee_recipient` as much as possible and respects the registered `gas_limit` (or as close as consensus allows).
- Build **ExecutionPayloadHeader** from the payload (e.g. `transactions_root = hash_tree_root(payload.transactions)`).
- **BuilderBid:** `header`, `value` (wei to fee_recipient), `pubkey` (builder). Deneb+: add `blob_kzg_commitments`; Electra+: add `execution_requests`.
- **SignedBuilderBid:** Sign the bid with builder’s BLS key using `DOMAIN_APPLICATION_BUILDER`; set `message` and `signature`.

## Agent usage

- **Proposer/relay:** Call getHeader at slot start with (slot, parent_hash, proposer pubkey); handle 200 (use `data`) and 204 (no bid).
- **Builder:** Maintain consensus state and registration store; only respond 200 when eligibility holds and you have a bid; otherwise 204 or 400.

<!--
Source references:
- sources/searcher-builder/specs/bellatrix/builder.md (Building, Bidding)
- sources/searcher-builder/apis/builder/header.yaml
-->
