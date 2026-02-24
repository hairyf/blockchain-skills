---
name: layerzero-core-endpoint-and-send
description: Endpoint send() API, parameters, nonces, and usage from a UA
metadata:
  author: hairy
---

# Endpoint and send()

The UA sends cross-chain messages by calling the local Endpoint’s `send()` with value to cover fees. The Endpoint manages outbound nonces per (dstChainId, sender).

## Interface

```solidity
interface ILayerZeroEndpoint {
    function send(
        uint16 _dstChainId,
        bytes calldata _destination,
        bytes calldata _payload,
        address payable _refundAddress,
        address _zroPaymentAddress,
        bytes calldata _adapterParams
    ) external payable;
}
```

- **_dstChainId**: LayerZero chain ID of the destination.
- **_destination**: Encoded destination UA address (e.g. `abi.encodePacked(dstAddress)` for EVM).
- **_payload**: Arbitrary bytes (e.g. `abi.encode(...)`).
- **_refundAddress**: Receives excess native token if the fee is overpaid.
- **_zroPaymentAddress**: Address for ZRO fee payment; use `address(0)` when paying in native token.
- **_adapterParams**: Optional relayer/adapter params (e.g. gas for destination `lzReceive`, airdrop). Versioned encoding; see adapter params reference.

## Nonces

- Outbound: `getOutboundNonce(_dstChainId, _srcAddress)` returns the next nonce for that path. Endpoint increments it on each `send()`.
- Inbound: `getInboundNonce(_srcChainId, _srcAddress)` on the destination gives the next expected nonce from that source; the Endpoint enforces ordering on receive.

## Usage example

```solidity
// Estimate fee then send
(uint256 messageFee, ) = endpoint.estimateFees(
    _dstChainId, address(this), payload, false, adapterParams
);
require(address(this).balance >= messageFee, "insufficient fee");

endpoint.send{ value: messageFee }(
    _dstChainId,
    abi.encodePacked(_dstPingPongAddr),
    payload,
    payable(msg.sender),  // refund
    address(0),           // pay in native
    adapterParams
);
```

## Key points

- `send()` is non-reentrant; do not call back into the Endpoint from the same call stack.
- Always pass `msg.value >=` the amount required for the chosen path and adapter params; use `estimateFees()`.
- Destination is bytes to support non-EVM chains; for EVM use 20-byte packed address.

<!--
Source references:
- sources/layerzero/contracts/Endpoint.sol
- sources/layerzero/contracts/interfaces/ILayerZeroEndpoint.sol
- sources/layerzero/contracts/mocks/PingPong.sol, OmniCounter.sol
-->
