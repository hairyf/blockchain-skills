---
name: ton-cells-serialization
description: TON cells, BOC, builders and slices for TVM and serialization.
---

# TON Cells and Serialization

## Cells

TVM memory, storage, and code are made of **cells**. Each cell has:

- Up to **1023 bits** of data.
- Up to **4 references** to other cells (no cycles; DAG).

Two kinds: **ordinary** (data + refs) and **exotic** (pruned, library, merkle, merkle-update; type ID in first byte). Cell **level** (0–3) is max of children’s levels; affects hashes.

## Standard cell representation

Before transfer or storage, cells are serialized to **CellRepr**: descriptor bytes (refs count, level, exotic flag; data length), then data bytes, then for each ref depth (2 B) + SHA-256 hash (32 B). Graphs are serialized as **BOC** (bag of cells); see foundations/serialization/boc.

## Builders and slices

- **Builder**: write cursor to construct a new cell (e.g. `beginCell()`, `store...()`, `endCell()` in `@ton/core`).
- **Slice**: read cursor over a cell (parse/load data from cells).

TVM cell instructions work with builders and slices; libraries like `@ton/core` and `@ton-community/assets-sdk` wrap cell creation and parsing.

## Key points

- All persistent and in-memory contract data is a DAG of cells (≤1023 bits + ≤4 refs per cell).
- Serialization: standard cell representation + BOC for graphs.
- Use builders to create cells, slices to read them; same idea in TVM and in TypeScript SDKs.

<!--
Source references:
- https://github.com/ton-org/docs (foundations/serialization/cells.mdx, boc.mdx)
- tvm/builders-and-slices
-->
