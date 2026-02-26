---
name: tonweb-boc
description: BOC (Bag of Cells) — Cell, BitString, serialization and deserialization.
---

# BOC: Cell and BitString

TON messages and state are serialized as BOC. TonWeb provides `Cell` and `BitString` for building and parsing them.

## BitString

```js
const { Cell, BitString } = TonWeb.boc;
const bits = new BitString(1023);

bits.length;      // max bits
bits.cursor;      // current write position
bits.getFreeBits();
bits.getUsedBits();
bits.get(n);      // read bit at n
bits.on(n); bits.off(n); bits.toggle(n);

// Writing (advances cursor)
bits.writeBit(b);
bits.writeBitArray([0,1,1]);
bits.writeUint(num, bitLength);
bits.writeInt(num, bitLength);
bits.writeBytes(uint8Array);
bits.writeString(s);
bits.writeGrams(amount);   // nanograms (BN or number)
bits.writeAddress(Address | null);
bits.writeBitString(anotherBitString);

bits.clone();
bits.toHex();
```

## Cell

```js
const cell = new Cell();
cell.bits;   // BitString(1023)
cell.refs;   // Array<Cell> (max 4)

cell.writeCell(anotherCell);  // append another cell's bits and refs into this one
cell.hash();                  // Promise<Uint8Array>
cell.print();                 // Fift-like string for debugging
cell.toBoc(has_idx?, hash_crc32?, has_cache_bits?, flags?);  // Promise<Uint8Array>
```

Default `toBoc(false)` matches Fift `2 boc+>B`.

## BOC (de)serialization

```js
const bytes = await cell.toBoc(false);
const cells = TonWeb.boc.Cell.fromBoc(bytes);   // Cell[] (all roots)
const one = TonWeb.boc.Cell.oneFromBoc(bytes); // single root cell, throws if !== 1
```

## Example: build a simple message cell

```js
const Cell = TonWeb.boc.Cell;
const cell = new Cell();
cell.bits.writeUint(0, 32);           // op
cell.bits.writeAddress(senderAddress);
cell.bits.writeGrams(TonWeb.utils.toNano(1));
const bocBytes = await cell.toBoc();
```

## Key points

- Each cell has up to 1023 bits and 4 refs; use multiple cells for larger payloads.
- Use `writeGrams` for nanotons; use `writeAddress(null)` for addr_none.
- For get-method stack params: pass `Cell` objects as `['cell', cell]` or `['slice', slice]`; Slice is from `TonWeb.boc.Slice`.

<!--
Source references:
- https://github.com/toncenter/tonweb/blob/master/src/boc/README.md
- sources/tonweb/src/boc/README.md
- sources/tonweb/src/boc/Cell.js
- sources/tonweb/src/boc/BitString.js
-->
