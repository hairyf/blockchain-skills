---
name: wormhole-core-vaa-and-messaging
description: VAA structure, postMessage, consistency levels, and message publishing
metadata:
  author: hairy
---

# VAA and Message Publishing

## VAA structure (generic message passing)

VAAs have a **header** (not signed) and a **body** (signed). The body is hashed for replay protection.

**Header:** `version`, `guardianSetIndex`, `lenSignatures`, `signatures[]` (index + 65-byte signature).

**Body (signed):**
- `timestamp` — block timestamp when message was observed
- `nonce` — from emitter
- `emitterChain` — Wormhole chain ID
- `emitterAddress` — 32-byte contract address (left-zero-padded)
- `sequence` — per-(emitterChain, emitterAddress) counter from core contract
- `consistencyLevel` — finality requirement
- `payload` — arbitrary bytes (max 750 for `postMessage`)

Verifying contracts check guardian set index, validate signatures against the stored guardian set, then use body fields and payload.

## Posting messages

Core contract API (per chain):

- `postMessage(bytes payload, uint8 consistencyLevel)` — Publish a message. Pay fee in native currency. Core increments sequence for the sender/emitter.

Fees are set per chain via governance (`SetMessageFee` VAA). Message fee is enforced on-chain.

## Consistency levels

Guardians wait until the requested commitment level before signing.

**EVM:**
- `200` — publish immediately
- `201` — safe (or finalized fallback)
- `202` — finalized
- `203` — custom (read from `CustomConsistencyLevel` contract by emitter address)
- Other → treated as finalized

**Solana:** Core uses Confirmed (1) or Finalized (32) in the instruction; guardian maps to same semantics.

Other chains may not expose configurable levels (field 0).

## Trust and security

- Header fields depend on the core bridge and runtime.
- Body `emitterChain` is set by guardians (trust: guardian set).
- `timestamp` comes from the chain RPC (trust: guardians + chain).
- `emitterAddress`, `sequence` from core bridge (trust: guardians + chain + core implementation).
- `nonce`, `consistencyLevel`, `payload` from the calling contract (trust: all of the above + emitter contract).

Always verify VAA on the target chain via the official core/bridge contract; do not trust payload content without verification.

## Usage

When building an app:
1. Call core `postMessage` with your payload and desired consistency level.
2. Read `sequence` and `emitterAddress` from logs/tx to fetch the signed VAA (e.g. guardian API or Wormholescan).
3. Submit the VAA to the target chain contract that parses your payload and enforces emitter allowlist.

<!--
Source references:
- sources/wormhole/whitepapers/0001_generic_message_passing.md
- sources/wormhole/whitepapers/0004_message_publishing.md
-->
