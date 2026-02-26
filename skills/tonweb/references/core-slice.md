---
name: tonweb-slice
description: Slice — read-only view over a Cell for parsing BOC data (loadBit, loadUint, loadAddress, loadRef).
---

# Slice: Parsing BOC Data

A Slice is a read-only view over a TVM cell used to parse data from Cells (e.g. message bodies, get-method results). Create it from a Cell with `cell.beginParse()`.

## Creating a Slice

```js
const TonWeb = require('tonweb');
const cell = TonWeb.boc.Cell.oneFromBoc(bytes);
const slice = cell.beginParse();
```

## Reading primitives

- **loadBit()** — read one bit, advance cursor.
- **loadBits(bitLength)** — read `bitLength` bits, return `Uint8Array`.
- **loadUint(bitLength)** — unsigned integer, returns `BN`.
- **loadInt(bitLength)** — signed integer, returns `BN`.
- **loadVarUint(bitLength)** — variable-length uint (length prefix then data).
- **loadCoins()** — VarUint 16 (nanotons), returns `BN`.
- **loadAddress()** — TON address; returns `Address` or `null` for addr_none.
- **loadRef()** — load next child cell as Slice; advances ref cursor. Throws if no refs left.

## Cursor and remaining

- **readCursor** — current bit position.
- **getFreeBits()** — bits left in this slice (does not include refs).

## Example: parse transfer body

```js
const slice = TonWeb.boc.Cell.oneFromBoc(bodyBoc).beginParse();
const op = slice.loadUint(32);
const queryId = slice.loadUint(64);
const dest = slice.loadAddress();
const amount = slice.loadCoins();
// ... then load refs if needed: const payload = slice.loadRef();
```

## Key points

- Use Slice when you need to **read** existing BOC (e.g. parsing wallet transfer body, parsing runSmcMethod cell results). Use BitString/Cell when **building** messages.
- Ref order matters: `loadRef()` returns refs in the order they were stored.
- For get-method params you can pass a Slice as `['slice', slice]` to the provider.

<!--
Source references:
- sources/tonweb/src/boc/Slice.js
- sources/tonweb/src/contract/wallet/WalletQueryParser (parseTransferBody uses beginParse)
-->
