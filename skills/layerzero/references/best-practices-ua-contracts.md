---
name: layerzero-best-practices-ua-contracts
description: Implementing a LayerZero UA contract safely — auth, reentrancy, nonces, address encoding
metadata:
  author: hairy
---

# Best practices for UA contracts

Practical patterns for implementing User Applications that send and receive LayerZero messages.

## 1. Restrict lzReceive to the Endpoint

Always enforce that only the known Endpoint can call `lzReceive`:

```solidity
require(msg.sender == address(endpoint), "LayerZero: only endpoint");
```

Use the same Endpoint instance you use for `send()` (set in constructor or config). Do not trust arbitrary callers.

## 2. Encode destination address correctly

For EVM destinations use 20-byte packed address:

```solidity
bytes memory destination = abi.encodePacked(_dstAddress);
endpoint.send(_dstChainId, destination, payload, ...);
```

Chain IDs and address formats are chain-specific; use the correct encoding for the destination chain (e.g. 32 bytes on some non-EVM chains).

## 3. Pay correct fee and handle refunds

- Call `estimateFees(dstChainId, address(this), payload, payInZRO, adapterParams)` with the exact payload and adapterParams you will use.
- Send at least that amount: `send{ value: messageFee }(...)`.
- Set `_refundAddress` to an address that should receive excess (e.g. `payable(msg.sender)` or the UA).

## 4. Keep lzReceive bounded

`lzReceive` runs with a gas limit chosen by the relayer. Avoid:

- Unbounded loops or heavy storage writes.
- External calls to untrusted contracts that might consume a lot of gas or revert.

Decode payload, update state, and optionally trigger known internal flows. For complex work, consider emitting events and processing off-chain or via a separate call.

## 5. Do not reenter the Endpoint

The Endpoint uses non-reentrancy guards. Do not call `endpoint.send()` or other Endpoint methods from inside `lzReceive` in a way that could reenter the same Endpoint receive path. Calling `send()` from `lzReceive` to another chain is allowed (different path); calling back into the same Endpoint’s receive flow is not.

## 6. Handle blocking and retry

If `lzReceive` can revert (e.g. temporary conditions), plan for stored payload:

- Use `retryPayload` after fixing the issue, or
- Use `forceResumeReceive` from the UA if you intend to skip the failed message.

Document which path your UA supports so operators know whether to retry or force resume.

## 7. Version and config delegation

When implementing `ILayerZeroUserApplicationConfig`, delegate to the Endpoint and use the UA’s current version for config:

```solidity
endpoint.setConfig(endpoint.getSendVersion(address(this)), _chainId, _configType, _config);
```

Use the same version for getConfig so config is read from the library your UA actually uses.

## Key points

- Endpoint-only for `lzReceive`; correct destination encoding; pay ≥ estimateFees; bounded lzReceive; no reentry into Endpoint receive path; clear plan for retry vs forceResumeReceive.

<!--
Source references:
- sources/layerzero/contracts/Endpoint.sol
- sources/layerzero/contracts/mocks/PingPong.sol, OmniCounter.sol
- sources/layerzero/README.md
-->
