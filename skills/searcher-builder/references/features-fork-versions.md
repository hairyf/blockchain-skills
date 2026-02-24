---
name: Fork-specific builder types
description: BuilderBid and payload differences across Bellatrix, Capella, Deneb, Electra, and Fulu.
metadata:
  author: hairy
---

# Fork-Specific Builder Types

Builder API payloads and bids vary by consensus version. Use the correct schema and `Eth-Consensus-Version` when sending or interpreting SSZ.

## Bellatrix / Capella

- **BuilderBid:** `header` (ExecutionPayloadHeader), `value`, `pubkey`.
- **Submit response (v1):** `ExecutionPayload` (no blobs).

Capella adds withdrawals; ExecutionPayloadHeader includes `withdrawals_root`.

## Deneb

- **BuilderBid:** Adds `blob_kzg_commitments` (list of KZG commitments for blobs).
- **getHeader:** Response includes blob KZG commitments.
- **Submit (v1):** `ExecutionPayloadAndBlobsBundle` — `execution_payload` + `blobs_bundle` (commitments, proofs, blobs).
- **Block scoring:** Builder must not include withdrawal `amount`s in the bid `value`. Relays verify: `proposer_payment = balance_difference - sum(withdrawal amounts to fee_recipient)` and must equal `bid_value`.

## Electra

- **BuilderBid:** Same as Deneb plus `execution_requests` (ExecutionRequests).
- **BlindedBeaconBlockBody:** Attester/proposer slashing and attestation list limits updated (EIP-7549); adds `execution_requests`.

## Fulu

- **BlobsBundle:** `proofs` length changes (EIP-7594): `FIELD_ELEMENTS_PER_EXT_BLOB * MAX_BLOB_COMMITMENTS_PER_BLOCK`.
- **ExecutionPayloadAndBlobsBundle:** Uses the updated BlobsBundle.
- **v1 blinded_blocks:** Deprecated; use v2.

## Agent usage

- When parsing or building requests/responses, branch on `version` or `Eth-Consensus-Version` (bellatrix, capella, deneb, electra, fulu).
- For Deneb+, implement or rely on relay `verify_bid_value` logic that excludes withdrawals from the proposer payment when validating bid value.

<!--
Source references:
- sources/searcher-builder/specs/bellatrix/builder.md
- sources/searcher-builder/specs/capella/builder.md
- sources/searcher-builder/specs/deneb/builder.md
- sources/searcher-builder/specs/electra/builder.md
- sources/searcher-builder/specs/fulu/builder.md
- sources/searcher-builder/builder-oapi.yaml (ConsensusVersion enum)
-->
