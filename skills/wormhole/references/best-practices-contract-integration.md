---
name: wormhole-best-practices-contract-integration
description: Emitter filtering, replay protection, redeem timing, and VAA repair
metadata:
  author: hairy
---

# Contract Integration Best Practices

## Emitter authorization

Token Bridge and other modules accept VAAs only from **registered** (emitterChain, emitterAddress) pairs. Token Bridge endpoints are registered via governance (RegisterChain). Your application contract should enforce an allowlist of allowed emitters for the payload types it handles; do not process VAAs from arbitrary emitters.

## Replay protection

- Core and Token Bridge track consumed VAA body hashes (or equivalent). Never execute the same VAA twice.
- Use the VAA body hash (or digest) as the replay key, not only (chainId, emitter, sequence), since the same logical message could be re-observed with a new VAA in edge cases.

## Redeem timing and guardian set changes

- Guardian sets are valid for at least 24 hours. If a user redeems a transfer more than 24 hours after signing, the guardian set may have changed and the VAA might not verify with the current set.
- **Options**: (1) Use the SDK `repairVaa()` to update guardian set index and remove old signatures so the VAA validates against the new set. (2) Fetch additional signatures (e.g. Wormholescan API) if the intersection of signers still meets quorum. (3) Request re-observation from guardians (possible if quorum has archive nodes).
- Prefer completing transfers within 24 hours when possible.

## TransferWithPayload

- Only the recipient should call `completeTransferWithPayload`; the payload is application-specific and must be handled by the designated target. Do not allow arbitrary relayers to redeem TransferWithPayload.

## Wrapped asset setup

- The first transfer of a token to a chain requires that the wrapped asset exists (via AssetMeta and `createWrapped`). Transfers for not-yet-wrapped assets become executable once the wrapped asset is created; no need to block the transfer.

## Token metadata

- AssetMeta name/symbol may be truncated at 32 bytes; validate UTF-8 and trim invalid trailing bytes before displaying.

## Amounts and decimals

- Amounts are truncated to 8 decimals over the bridge. Refund dust to the user on deposit. Ensure total bridged per token does not exceed MaxUint64 in 8-decimal units.

<!--
Source references:
- sources/wormhole/whitepapers/0003_token_bridge.md (Caveats)
- sources/wormhole/sdk/js/README.md
-->
