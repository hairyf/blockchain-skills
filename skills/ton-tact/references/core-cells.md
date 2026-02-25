---
name: Cells, Builders, and Slices in Tact
description: Cell, Builder, Slice primitives; beginCell, store/load, hash, and Struct/Message toCell/fromCell.
---

# Cells, Builders, and Slices

**Cell** — Immutable 1023-bit data + up to 4 references; standard data unit on TON.  
**Builder** — Mutable buffer to build a cell.  
**Slice** — Mutable view over a cell for reading.

## Common functions

- **`beginCell(): Builder`** — New empty builder.
- **`emptyCell(): Cell`** — Empty cell (same as `beginCell().endCell()`).
- **`emptySlice(): Slice`** — Empty slice (same as `emptyCell().asSlice()`).
- **`c.beginParse()` / `c.asSlice()`** — Get Slice from Cell.
- **`c.hash(): Int`** — SHA-256 hash of cell’s standard representation.

Builder: `.storeUint(n, bits)`, `.storeInt(n, bits)`, `.storeRef(cell)`, `.storeAddress(addr)`, etc., then `.endCell()`.  
Slice: `.loadUint(bits)`, `.loadInt(bits)`, `.loadRef()`, `.loadAddress()`, `.preloadUint(bits)`, etc.

## Struct and Message helpers

Prefer these over manual Builder/Slice when the type is a struct or message:

- **`MyStruct.toCell()`** / **`MyMessage.toCell()`** — Serialize to Cell.
- **`MyStruct.fromCell(c: Cell)`** / **`MyStruct.fromSlice(s: Slice)`** — Deserialize; same for Message. Throws if layout doesn’t match; use try/catch if needed.

## Key points

- Document TL-B layout when building/parsing manually; structs/messages act as living schemas.
- Bounced message bodies are limited (256 bits total, 224 bits usable after opcode); design message layout so critical fields fit.
- Use `.toCell()`/`.fromCell()` for structs/messages to avoid layout mistakes.

<!--
Source references:
- https://docs.tact-lang.org/ref/core-cells
- sources/ton-tact/docs/src/content/docs/zh-cn/ref/core-cells.mdx
- sources/ton-tact/docs/src/content/docs/book/cells
-->
