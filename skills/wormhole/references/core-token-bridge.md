---
name: wormhole-core-token-bridge
description: Token Bridge payloads, attestToken, transfer, completeTransfer, createWrapped
metadata:
  author: hairy
---

# Token Bridge

The Token Bridge is an application on top of Wormhole core. It locks/burns on source and mints/releases on target. Each chain has a token bridge endpoint; only registered (emitterChain, emitterAddress) pairs are accepted.

## Payload types

- **Transfer** (PayloadID 1): Amount, TokenAddress, TokenChain, To, ToChain, Fee. Redeemable by anyone; fee can go to relayer.
- **TransferWithPayload** (PayloadID 3): Same plus FromAddress and Payload. Must be redeemed by the target address (recipient handles payload).
- **AssetMeta** (PayloadID 2): TokenAddress, TokenChain, Decimals, Symbol, Name. Required before first transfer to a chain to create wrapped asset.
- **RegisterChain** / **UpgradeContract**: Governance-only; emitted by governance contract.

## API (conceptual)

- `attestToken(token)` — Emit AssetMeta for a token (on native chain).
- `transfer(token, amount, recipientChain, recipient, fee)` — Lock/burn and emit Transfer.
- `transferWithPayload(token, amount, recipientChain, recipient, payload)` — Same with custom payload; recipient must redeem.
- `createWrapped(assetMetaVaa)` — Create wrapped asset from AssetMeta VAA.
- `completeTransfer(transferVaa)` — Execute Transfer (optionally specify fee recipient).
- `completeTransferWithPayload(transferVaa)` — Execute TransferWithPayload (called by recipient).

## Amounts and decimals

Amounts over the bridge are truncated to 8 decimals. Total bridged per token (all targets) must not exceed MaxUint64 in 8-decimal units. Dust from truncation should be refunded to the user. Target chain can either preserve 8 decimals on wrapped tokens or shift back using AssetMeta decimals.

## Replay and guardian set

Consumed message digests (including nonce) are stored for replay prevention. If the guardian set changes before redeem, the VAA may need to be repaired (e.g. SDK `repairVaa()`): update guardian set index and drop signatures from guardians no longer in the new set. Redeem within 24h when possible; after that, repair or re-observation may be required.

## TransferWithPayload

Only the designated recipient can call `completeTransferWithPayload`; use for flows where the recipient must interpret the payload (e.g. swap instructions).

<!--
Source references:
- sources/wormhole/whitepapers/0003_token_bridge.md
- sources/wormhole/sdk/js/README.md
-->
