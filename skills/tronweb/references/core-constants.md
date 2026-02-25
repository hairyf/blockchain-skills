---
name: tronweb-constants
description: TRON/TronWeb constants — ADDRESS_PREFIX, SUN per TRX, default fee limit, BIP44 path.
---

# Constants

Common constants used by TronWeb and TRON conventions.

## Address and chain

- **ADDRESS_PREFIX** — `'41'` (hex); TRON addresses in hex form start with 41 (not 0x). 34 chars total with prefix.
- **SUN per TRX** — 1 TRX = 1_000_000 SUN. Use `TronWeb.toSun(trx)` / `TronWeb.fromSun(sun)` for conversion.

## Fee limit

- **Default feeLimit** — Instance default for contract calls is `150_000_000` (150 TRX in SUN units). Set per call via `options.feeLimit` or change `tronWeb.feeLimit`.

## BIP44 path

- **TRON path** — `m/44'/195'/0'/0/0` (constant `TRON_BIP39_PATH_INDEX_0`). Use for `TronWeb.fromMnemonic(mnemonic, path)` and `createRandom(..., path)`; path must match `^m/44'/195'`.

## Key points

- All amounts in TRX for contract/transfer APIs are in SUN; convert with toSun/fromSun.
- Address hex is 42 chars (41 + 40 hex digits); base58 is typically 34 chars.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/utils/constants.ts, src/tronweb.ts)
-->