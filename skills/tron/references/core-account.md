---
name: tron-core-account
description: TRON account model, address derivation, and transaction signing (ECDSA, Base58Check).
---

# TRON Account Model

TRON uses an account-based ledger. All operations (transfers, voting, contract deployment) are tied to accounts.

## Key concepts

- **Address**: Unique identifier, typically starts with `T`. Base58Check-encoded; default API format is HexString (prefix `0x41`).
- **EOA vs contract**: Externally owned accounts (key pair) vs contract accounts (code).
- **Activation**: New addresses must be activated by receiving TRX or a TRC-10 token (or via `CreateAccount` system contract). Cost: 1 TRX creation fee; Bandwidth from staking or 0.1 TRX burn.

## Address generation

1. ECDSA key pair (SECP256K1): private key 32 bytes, public key point P.
2. Hash: `H = Keccak256(public_key)`; take last 20 bytes, prepend `0x41`.
3. Base58Check on `address` (SHA256 twice, first 4 bytes as checksum; Base58 alphabet without 0, O, I, l).
4. Result: 34 characters, first character `T`.

## Transaction signing

- **Input**: Transaction `rawdata` serialized to bytes.
- **Hash**: `sha256(rawdata_bytes)`.
- **Signature**: ECDSA (SECP256K1); output `r || s || recoveryId` (or `r || s || v` with `v = 27 + recoveryId`). wallet-cli and java-tron use `recoveryId`.
- **Verification**: Recover public key from signature and hash (ecrecover); derive address; compare with transaction owner.

## Usage for agents

- Validate addresses before sending: `wallet/validateaddress` (supports HexString, Base58Check, base64).
- Use `visible` parameter: `false` (default) = HexString in requests/responses; `true` = Base58Check.
- Account creation: `wallet/createaccount` (owner_address, account_address) or offline key generation + first incoming transfer.

<!--
Source references:
- sources/tron/docs/mechanism-algorithm/account.md
- sources/tron/docs/getting_started/getting_started_with_javatron.md
-->
