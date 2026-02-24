---
name: layerzero-core-receive-and-receiver
description: lzReceive callback, ILayerZeroReceiver, and endpoint delivery
metadata:
  author: hairy
---

# Receiving messages and ILayerZeroReceiver

The destination Endpoint delivers payloads by calling the UA’s `lzReceive`. The UA must implement `ILayerZeroReceiver` and must verify the caller is the Endpoint.

## Interface

```solidity
interface ILayerZeroReceiver {
    function lzReceive(
        uint16 _srcChainId,
        bytes calldata _srcAddress,
        uint64 _nonce,
        bytes calldata _payload
    ) external;
}
```

- **_srcChainId**: LayerZero chain ID of the source.
- **_srcAddress**: Source UA address as bytes (e.g. 20 bytes for EVM).
- **_nonce**: Ordered nonce for this (srcChainId, srcAddress); strictly increasing.
- **_payload**: Payload sent from the source.

## Security: restrict caller

Only the Endpoint should call `lzReceive`. Enforce in the UA:

```solidity
function lzReceive(
    uint16 _srcChainId,
    bytes calldata _srcAddress,
    uint64 _nonce,
    bytes calldata _payload
) external override {
    require(msg.sender == address(endpoint), "only endpoint");
    // ... decode _srcAddress if needed (e.g. EVM: 20 bytes), process _payload
}
```

## Decoding source address (EVM)

For EVM source, `_srcAddress` is typically 20 bytes. Example:

```solidity
address fromAddress;
assembly {
    fromAddress := mload(add(_srcAddress, 20))
}
// or: fromAddress = address(bytes20(_srcAddress));
```

## Delivery and gas

The Endpoint calls `lzReceive` with a gas limit supplied by the relayer path. If execution reverts, the message can be stored and retried (blocking mode). Keep `lzReceive` logic bounded and avoid unbounded loops or external calls that may run out of gas.

## Key points

- Always require `msg.sender == address(endpoint)` in `lzReceive`.
- Nonces are ordered; do not assume gaps or reordering.
- Decode `_srcAddress` according to the source chain’s convention (EVM: 20 bytes).

<!--
Source references:
- sources/layerzero/contracts/interfaces/ILayerZeroReceiver.sol
- sources/layerzero/contracts/Endpoint.sol (receivePayload, retryPayload)
- sources/layerzero/contracts/mocks/PingPong.sol, OmniCounter.sol
-->
