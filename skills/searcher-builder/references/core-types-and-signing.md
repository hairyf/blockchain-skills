---
name: Builder API types and signing
description: ValidatorRegistration, BuilderBid, SignedBuilderBid, blinded block types, and DOMAIN_APPLICATION_BUILDER signing.
metadata:
  author: hairy
---

# Builder API Types and Signing

## Validator registration

- **ValidatorRegistration:** `fee_recipient` (ExecutionAddress), `gas_limit` (uint64), `timestamp` (uint64), `pubkey` (BLSPubkey).
- **SignedValidatorRegistration:** `message` (ValidatorRegistration), `signature` (BLSSignature). Sent in bulk to `POST /eth/v1/builder/validators`.

Builders must honour the latest registration per pubkey: fee recipient and gas limit for built blocks.

## Builder bid

- **BuilderBid** (fork-dependent):
  - **Bellatrix/Capella:** `header` (ExecutionPayloadHeader), `value` (uint256, wei to fee_recipient), `pubkey` (builder BLS pubkey).
  - **Deneb+:** Adds `blob_kzg_commitments` (list of KZG commitments for blobs).
  - **Electra+:** Adds `execution_requests` (ExecutionRequests).
- **SignedBuilderBid:** `message` (BuilderBid), `signature` (BLSSignature). Returned by `getHeader` in `data`.

## Blinded blocks

- **BlindedBeaconBlock:** Beacon block with `execution_payload_header` instead of full execution payload (and `blob_kzg_commitments` from Deneb).
- **SignedBlindedBeaconBlock:** `message` (BlindedBeaconBlock), `signature`. Proposer signs this after choosing a bid; builder uses it to bind and reveal.

## Signing domain

Builder API–specific messages (validator registration, builder bid) use:

- **Domain:** `DOMAIN_APPLICATION_BUILDER` = `DomainType('0x00000001')`.
- **Signing root:** `compute_signing_root(message, domain)` with `compute_domain(DOMAIN_APPLICATION_BUILDER, fork_version=None, genesis_validators_root=None)`.

In-protocol messages (e.g. BlindedBeaconBlock) use the beacon block proposal domain from consensus-specs.

## Constants

- **MAX_REGISTRATION_LOOKAHEAD:** 10 seconds — registration `timestamp` must be ≤ `current_timestamp + MAX_REGISTRATION_LOOKAHEAD`.

<!--
Source references:
- sources/searcher-builder/beacon-apis/types/registration.yaml
- sources/searcher-builder/types/bellatrix/bid.yaml
- sources/searcher-builder/types/capella/bid.yaml
- sources/searcher-builder/types/deneb/bid.yaml
- sources/searcher-builder/specs/bellatrix/builder.md
-->
