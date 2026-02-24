---
name: Submit blinded block (v1 and v2)
description: submitBlindedBlock v1 vs submitBlindedBlockV2, blinded block verification, and payload reveal.
metadata:
  author: hairy
---

# Submit Blinded Block (v1 and v2)

The proposer commits to a bid by signing a **SignedBlindedBeaconBlock** and submitting it to the builder. The builder then either returns the full payload (v1) or publishes the block and blobs itself (v2).

## v1: POST /eth/v1/builder/blinded_blocks

- **Response 200:** Body is `{ version, data }` where `data` is the unblinded **ExecutionPayload** (Bellatrix/Capella) or **ExecutionPayloadAndBlobsBundle** (Deneb+). The proposer/relay is responsible for publishing the block and blobs.
- **Deprecated** after Fulu; use v2 for new integrations.

## v2: POST /eth/v2/builder/blinded_blocks

- **Response 202:** Accepted. The builder **MUST** publish the signed unblinded beacon block and blobs to the network. No payload is returned to the client.
- Preferred for Deneb+ and when the builder should handle propagation.

## Builder verification

Before accepting, the builder must verify:

- The signed blinded beacon block is valid under consensus rules.
- **Blinded block signature:** `verify_blinded_block_signature(state, signed_block)` — check that the signature is from the expected proposer for the block’s slot using the beacon block proposal domain.

The proposer must accept **at most one** bid per slot to avoid proposer slashing.

## Request format

- **Eth-Consensus-Version:** Required when sending SSZ; optional for JSON.
- Body: **SignedBlindedBeaconBlock** (JSON or SSZ). Fork-specific (Bellatrix/Capella/Deneb/Electra/Fulu); from Deneb the block body includes `blob_kzg_commitments`.

## Agent usage

- **Proposer/relay:** After selecting a bid, build the BlindedBeaconBlock, sign it, POST to v1 (to receive payload and publish yourself) or v2 (builder publishes). Prefer v2 when supported.
- **Builder:** On submit, verify signature and consensus validity; for v1 return payload/blobs; for v2 return 202 and publish block and blobs to the network.

<!--
Source references:
- sources/searcher-builder/apis/builder/blinded_blocks.yaml
- sources/searcher-builder/apis/builder/blinded_blocks_v2.yaml
- sources/searcher-builder/specs/bellatrix/builder.md (Revealing the ExecutionPayload, verify_blinded_block_signature)
-->
