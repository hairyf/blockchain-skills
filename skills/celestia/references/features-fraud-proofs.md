---
name: celestia-fraud-proofs
description: Bad Encoding Fraud Proofs (BEFP), subscription, verification, and service halting behavior.
---

# Fraud Proofs

The **Fraud** service handles fraud proof types (currently **Bad Encoding**, BEFP). Full nodes generate BEFPs when block reconstruction fails verification; they broadcast the proof and all nodes that receive and validate it halt dependent services (DAS, Syncer, SubmitTx). Light and bridge nodes subscribe to BEFP and halt on valid proof.

## Bad Encoding Fraud Proof (BEFP)

- **When:** A full node gets `ErrByzantineData` from rsmt2d during block repair (recovered data does not match row/column roots in the DAH).
- **Content:** Height, header hash, row/column index, axis (row/col), and shares with Merkle proofs for the verified shares in that row/column.
- **Flow:** Full node creates the proof, broadcasts via Fraud Broadcaster (pubsub); all nodes subscribed to the BEFP topic receive it, verify it, and if valid store it and halt DAS, Syncer, and SubmitTx.

## Verification (light nodes)

On receiving a BEFP:

1. Verify Merkle proofs for the included shares.
2. Reconstruct the row or column from **BadEncodingProof.Shares**, compute its Merkle root (same as rsmt2d), and compare with the root in the ExtendedHeader’s DAH. If roots match, the BEFP is invalid.

## Storage and startup

- Valid BEFPs are stored in the datastore (e.g. path `fraud/badEncodingProof`, keyed by block hash).
- On startup, the node checks for any stored BEFP; if present, it does not start (node remains halted).

## Fraud sync

For nodes that start after a BEFP was already broadcast:

- Light nodes (and similar) wait for new connections to full/bridge peers (share discovery).
- They send a small number of requests (e.g. 5) to new peers for a fraud proof.
- If a proof is received, it is validated and propagated to local subscriptions so services halt. Invalid proofs result in the remote peer being blacklisted.
- Full and bridge nodes register a stream handler to respond to fraud proof requests.

## Bridge behavior

Bridge nodes subscribe to the BEFP topic like light nodes. On receiving a valid BEFP they shut down dependent services, including broadcasting new ExtendedHeaders.

## Fraud module API

- **Subscribe(proofType)** – Subscribe to a proof type (registers pubsub validator).
- **List()** – Currently subscribed proof types.
- **Get(proofType)** – Return stored proofs of that type.

<!--
Source references:
- sources/celestia/docs/adr/adr-006-fraud-service.md
- sources/celestia/docs/adr/adr-003-march2022-testnet.md
-->
