---
name: openzeppelin-utilities
description: ECDSA, MerkleProof, Math, ERC165, structures, StorageSlot, Multicall, and other utils.
---

# Utilities

Libraries and contracts in `@openzeppelin/contracts/utils` and token/governance modules. Use via `using X for type` or inheritance as appropriate.

## Cryptography

- **ECDSA:** `ECDSA.recover(hash, signature)`; use `MessageHashUtils.toEthSignedMessageHash(hash)` for Ethereum signed messages. Use for EOA signature verification.
- **SignatureChecker:** Unified check for EOA (ECDSA), ERC-1271 (contract wallets), and ERC-7913. `SignatureChecker.isValidSignatureNow(signer, hash, signature)`.
- **MerkleProof:** `MerkleProof.verify(proof, root, leaf)` and `multiProofVerify` for whitelists/airdrops. Build trees off-chain (e.g. OpenZeppelin merkle-tree JS).
- **P256/RSA:** Use when you need non-ECDSA curves or RSA; see docs for verify interfaces.

## Introspection

- **ERC165 / IERC165:** `supportsInterface(interfaceId)`. Implement with `ERC165` and `_registerInterface`. Use `ERC165Checker` for address: `using ERC165Checker for address; token.supportsInterface(interfaceId)`.

## Math

- **Math / SignedMath:** `using Math for uint256;` then `a.tryAdd(b)`, `a.average(b)`, etc. Use for safe arithmetic and averages.
- **SafeCast:** Safe casting with overflow checks when converting between integer types.

## Structures

- **EnumerableSet / EnumerableMap:** Set/map with enumeration (e.g. iterate role members).
- **Checkpoints:** Time-indexed values for voting or history.
- **MerkleTree (on-chain):** Build and update Merkle roots on-chain; use custom hash consistently.
- **BitMaps, DoubleEndedQueue, Heap:** Packed booleans, queue, priority queue; see API.

## Storage and Low-Level

- **StorageSlot:** `StorageSlot.getAddressSlot(slot).value` for proxy/implementation slots. Use for ERC-1967 or custom slots; avoid collision with Solidity layout.
- **SlotDerivation:** ERC-7201 namespaced slot: `bytes32 namespace; namespace.erc7201Slot()`.
- **TransientSlot:** Transient storage (EIP-1153) via UDVTs.
- **LowLevelCall:** `target.callNoReturn(data)` or `callReturn64Bytes(data)` to cap return size and avoid return bombing.

## Misc

- **Base64:** Encode bytes for Data URI (e.g. tokenURI).
- **Multicall:** Inherit `Multicall`; call `multicall(data[])` to batch calls and revert all if one fails.
- **Time:** `Time.Delay` for safe, setback-resistant delay updates (e.g. governance). `Blockhash` for L2 historical block hashes (EIP-2935).

## Key Points

- Prefer SignatureChecker when accepting both EOA and contract signatures.
- Use MerkleProof for gas-efficient whitelists; keep tree building off-chain.
- StorageSlot/SlotDerivation are for advanced patterns (proxies, namespaced storage); ensure no slot collision.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/utilities.adoc
-->
