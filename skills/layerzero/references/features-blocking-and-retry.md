---
name: layerzero-features-blocking-and-retry
description: Stored payload, retryPayload, forceResumeReceive, and blocking mode
metadata:
  author: hairy
---

# Blocking and retry

When `lzReceive` reverts, the Endpoint can store the payload (blocking mode). Further messages from the same (srcChainId, srcAddress) are blocked until the stored payload is cleared by retry or force resume.

## Stored payload

- On revert of `lzReceive`, the Endpoint stores the payload for that (srcChainId, srcAddress) and does not increment the inbound nonce for the next message, so delivery order is preserved.
- `hasStoredPayload(_srcChainId, _srcAddress)` returns true while a payload is stored.

## retryPayload

Anyone can retry a stored payload by calling the Endpoint:

```solidity
function retryPayload(
    uint16 _srcChainId,
    bytes calldata _srcAddress,
    bytes calldata _payload
) external;
```

The payload must match the stored hash and length. On success, the Endpoint clears the stored payload and calls `lzReceive` again. Use this after fixing the cause of the revert (e.g. more gas, contract upgrade, or state fix).

## forceResumeReceive

The **UA only** (the destination contract that owns the stored payload) can clear the stored payload without redelivery:

```solidity
endpoint.forceResumeReceive(_srcChainId, _srcAddress);
```

Use when the UA decides to drop the failed message and accept the next one. After this, the next message from that (srcChainId, srcAddress) will be delivered (nonce ordering is preserved; the failed message is skipped).

## When to use which

- **retryPayload**: You want to deliver the same payload again (e.g. after increasing relayer gas or fixing the UA).
- **forceResumeReceive**: You want to give up on the failed message and unblock the channel so subsequent messages can be delivered.

## Key points

- One stored payload per (srcChainId, srcAddress); all later messages from that path are blocked until it is cleared.
- Only the UA (dstAddress) may call `forceResumeReceive` for its stored payload.
- `retryPayload` can be called by any address; payload must match stored hash and length.

<!--
Source references:
- sources/layerzero/contracts/Endpoint.sol (receivePayload, retryPayload, forceResumeReceive, storedPayload, hasStoredPayload)
- sources/layerzero/contracts/interfaces/ILayerZeroEndpoint.sol, ILayerZeroUserApplicationConfig.sol
-->
