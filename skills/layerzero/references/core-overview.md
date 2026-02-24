---
name: layerzero-core-overview
description: LayerZero protocol overview, endpoint per chain, and chain identifiers
metadata:
  author: hairy
---

# LayerZero Overview

LayerZero is an omnichain interoperability protocol for lightweight, authentic message passing across chains. Each chain has an **Endpoint** contract; User Applications (UAs) call the local Endpoint to send messages and implement `ILayerZeroReceiver` to receive them.

## Key concepts

- **Endpoint**: Single per-chain contract implementing `ILayerZeroEndpoint`. UAs use it for `send()`, config, and fee estimation.
- **Chain ID**: `uint16` LayerZero chain identifier (distinct from EVM chainId). Use the chain’s endpoint and official chain list to resolve.
- **UA (User Application)**: Your contract that implements `ILayerZeroReceiver` and optionally `ILayerZeroUserApplicationConfig`. It sends via `endpoint.send()` and receives via `lzReceive()`.
- **Messaging library**: Versioned library (e.g. Ultra Light Node) used by the Endpoint for send/receive. UAs can set send/receive versions via the config interface.

## Flow

1. **Send**: UA calls `endpoint.send(dstChainId, destination, payload, refundAddress, zroPaymentAddress, adapterParams)` with `msg.value >=` estimated fee.
2. **Relay**: Oracle and Relayer (off-chain) relay block proof and payload to the destination chain.
3. **Receive**: Destination Endpoint calls `ua.lzReceive(srcChainId, srcAddress, nonce, payload)` with a gas limit; nonces are enforced in order.

## Address encoding

- **EVM**: Destination is typically `abi.encodePacked(dstAddress)` (20 bytes). Source address in `lzReceive` is bytes; decode with the same convention (e.g. 20-byte address).
- Non-EVM chains may use different address length; check the chain’s endpoint/docs.

## Key points

- One Endpoint per chain; get the address from LayerZero docs or constants for the network you use.
- Messages are ordered per (srcChainId, srcAddress) via nonces; do not skip or reorder.
- Endpoint uses non-reentrancy guards for send and receive; reentrancy into the Endpoint from `lzReceive` is blocked.

<!--
Source references:
- https://github.com/LayerZero-Labs/LayerZero (README, contracts)
- https://layerzero.gitbook.io/docs/
-->
