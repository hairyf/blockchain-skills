---
name: foundry-ffi-signatures
description: vm.ffi and signing — FFI calls, vm.sign, EIP-712 helpers.
---

# FFI and Signing Cheatcodes

Foundry provides `vm.ffi` to run external binaries in tests and `vm.sign` / EIP-712 helpers for signature-based logic.

## vm.ffi

Execute a command and use its stdout as return data:

```solidity
string[] memory inputs = new string[](3);
inputs[0] = "node";
inputs[1] = "script.js";
inputs[2] = "arg";
bytes memory result = vm.ffi(inputs);
```

Use for proofs, hashing, or any off-chain computation that must match in tests. Enable with `ffi = true` in `foundry.toml` under the test profile; CI may restrict or disable FFI.

## vm.sign

Sign a digest with a private key; returns (v, r, s):

```solidity
(uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, digest);
// use in signature-based logic, e.g. permit, meta-txs
```

Use for testing `ecrecover`, permit, or other raw signature checks. For EIP-712, use the typed-data helpers and then sign the final digest.

## EIP-712 helpers

- `vm.eip712HashType(typeDefinition)` — typeHash from struct definition.
- `vm.eip712HashStruct(typeName, structData)` — structHash.
- `vm.eip712HashTypedData(jsonTypedData)` — full EIP-712 digest to sign.

Then pass the digest to `vm.sign`. Use `forge eip712` and `forge bind-json` to get canonical type strings and Solidity bindings for structs.

## Key points

- FFI is opt-in and can be disabled in CI for security; use only when necessary.
- For EIP-712, build the typed data (domain + struct), hash with the helpers, then sign.
- `vm.sign` is for raw digests; pair with EIP-712 hashing for typed structured data.

<!--
Source references:
- https://getfoundry.sh/reference/cheatcodes/sign/
- https://getfoundry.sh/guides/eip712
- https://book.getfoundry.sh/reference/cheatcodes/signing
- https://book.getfoundry.sh/tutorials/testing-eip712
-->
