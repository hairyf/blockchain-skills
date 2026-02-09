---
name: solidity-units-and-globals
description: Ether/time units, block/msg/tx globals, ABI helpers, mathematical/crypto functions.
---

# Units and Globally Available Variables

## Ether Units

Suffixes multiply by power of ten: `wei`, `gwei`, `ether` (1 ether == 1e18 wei). Removed: `finney`, `szabo` (0.7.0), `years` (0.5.0).

## Time Units

`seconds`, `minutes`, `hours`, `days`, `weeks` — naive conversion (1 days == 24 hours, etc.). Not for calendar math; leap seconds not represented. Apply to literals only, not variables.

## Block and Transaction

- **block:** `basefee`, `blobbasefee`, `chainid`, `coinbase`, `difficulty`/`prevrandao`, `gaslimit`, `number`, `timestamp`
- **msg:** `data` (calldata), `sender`, `sig` (bytes4), `value`
- **tx:** `gasprice`, `origin` (full call chain)
- **Other:** `blockhash(uint blockNumber)`, `blobhash(uint index)`, `gasleft()`

`msg.sender` and `msg.value` change on every external call. Prefer `msg.sender` over `tx.origin` (origin can be spoofed by intermediate contract).

## ABI Encoding / Hashing

- `abi.encode(...)`, `abi.encodePacked(...)`, `abi.encodeWithSelector(selector, ...)`, `abi.encodeWithSignature(sig, ...)`, `abi.encodeCall(f, (args))`
- `abi.decode(bytes memory data, (T, ...))`
- `keccak256(bytes memory)`, `sha256(bytes memory)`, `ripemd160(bytes memory)`
- `ecrecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) returns (address)`

## Contract / Address

- `balance`, `code`, `codehash` — on `address` or `address payable`
- `selfdestruct(payable dest)` — destroy contract, send ether to dest (deprecated in EVM; use with care)

## Mathematical and Crypto

- `addmod`, `mulmod` — (x + y) % k with arbitrary precision
- `block.prevrandao` — beacon chain randomness (EVM >= Paris)

<!--
Source references:
- https://docs.soliditylang.org/en/latest/units-and-global-variables.html
-->
