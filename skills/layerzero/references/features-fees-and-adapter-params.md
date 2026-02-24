---
name: layerzero-features-fees-and-adapter-params
description: estimateFees, native vs ZRO payment, and adapter params encoding
metadata:
  author: hairy
---

# Fees and adapter params

Before calling `send()`, the UA should get the required fee with `estimateFees()` and pass optional `adapterParams` for destination gas or airdrop.

## estimateFees

```solidity
function estimateFees(
    uint16 _dstChainId,
    address _userApplication,
    bytes calldata _payload,
    bool _payInZRO,
    bytes calldata _adapterParam
) external view returns (uint nativeFee, uint zroFee);
```

- Use the same `_payload` and `_adapterParam` you will pass to `send()` for an accurate quote.
- **nativeFee**: Amount of native token to send with `send{ value: nativeFee }()` when not paying in ZRO.
- **zroFee**: ZRO token amount when `_payInZRO == true`; then pass `_zroPaymentAddress` in `send()` and pay in ZRO instead of native.

Typical usage (pay in native):

```solidity
(uint256 messageFee, ) = endpoint.estimateFees(
    _dstChainId, address(this), payload, false, adapterParams
);
endpoint.send{ value: messageFee }(..., adapterParams);
```

## Adapter params (relayer params)

`adapterParams` is versioned. It is passed to the relayer and can specify gas for `lzReceive` and optional airdrop.

**V1** — gas for destination `lzReceive`:

```solidity
uint16 version = 1;
uint256 gasForDestinationLzReceive = 350000;
bytes memory adapterParams = abi.encodePacked(version, gasForDestinationLzReceive);
```

**V2** — gas + airdrop native to an address on destination:

```solidity
uint16 version = 2;
bytes memory adapterParams = abi.encodePacked(
    version,
    gasForDestinationLzReceive,
    airdropEthQty,
    airdropAddr
);
```

Use empty `adapterParams` if you do not need extra gas or airdrop (relayer may use defaults). Fee from `estimateFees` depends on payload size and adapter params.

## Key points

- Always use `estimateFees` with the same payload and adapterParams as `send()` to avoid underpayment.
- Pay in native by passing the returned native fee as `msg.value` and `_zroPaymentAddress = address(0)` in `send()`.
- Adapter params are optional; encode according to the version your relayer/backend expects.

<!--
Source references:
- sources/layerzero/contracts/interfaces/ILayerZeroEndpoint.sol
- sources/layerzero/contracts/mocks/PingPong.sol, OmniCounter.sol
- sources/layerzero/constants/config.json
-->
