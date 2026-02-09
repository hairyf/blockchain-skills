---
name: solidity-abi-metadata
description: ABI specification and contract metadata (CBOR, IPFS/swarm).
---

# ABI and Metadata

## ABI (Application Binary Interface)

JSON description of contract interface: function/event/error signatures, types, inputs/outputs. Used by clients to encode calls and decode logs/return data.

- **Types:** uint/int, address, bool, bytes, string, arrays, tuples, fixed-size bytes.
- **Function:** name, type "function", inputs, outputs, stateMutability (pure/view/nonpayable/payable).
- **Event:** name, type "event", inputs (indexed flag).
- **Error:** name, type "error", inputs.

Encoding: 4-byte selector (keccak256 of signature, first 4 bytes) then ABI-encoded arguments. Events: topic0 = keccak256(signature), indexed args as further topics, non-indexed as data.

## Contract Metadata

Compiler emits metadata JSON (CBOR-encoded in contract bytecode or appended) with compiler version, source info, and ABI. Used by verification and tooling. Contains IPFS/Swarm hashes when available for source retrieval. Do not strip metadata if you want on-chain verification.

## NatSpec

Structured comments (`///` or `/** ... */`) for dev/user docs and custom errors. Tags: `@title`, `@author`, `@param`, `@return`, `@dev`, `@notice`, etc. Compiler can output user-facing and dev docs from NatSpec.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/abi-spec.html
- https://docs.soliditylang.org/en/latest/metadata.html
- https://docs.soliditylang.org/en/latest/natspec-format.html
-->
