---
name: avail-runtime-apis
description: DataAvailApi, KateApi, ExtensionBuilder — runtime APIs for block length, DA proofs, and header extension.
---
# Runtime APIs (Data Availability)

The Avail runtime exposes runtime APIs used by the node and Kate RPC for block length, Kate proofs/rows, and header extension building. Use this when reasoning about off-chain tooling, RPC behavior, or runtime upgrades.

## DataAvailApi

- **block_length()** — returns `BlockLength` for the current block (used by Kate RPC and sync).

## KateApi

All methods take block context (number, extrinsics, block_len) and operate on the application data grid:

- **rows(block_number, extrinsics, block_len, rows)** — returns `Vec<GRow>` for the given row indices.
- **proof(block_number, extrinsics, block_len, cells)** — returns `Vec<GDataProof>` for the given (row, col) cells.
- **multiproof(block_number, extrinsics, block_len, cells)** — returns `Vec<(GMultiProof, GCellBlock)>` for the given cells.
- **data_proof(block_number, extrinsics, tx_idx)** — returns `Option<ProofResponse>` for a single transaction at index `tx_idx`.

These are the backend for the Kate RPC methods; the RPC layer enforces finalized blocks and `kate-max-cells-size`.

## ExtensionBuilder

- **build_extension(extrinsics, data_root, block_length, block_number)** — builds the `HeaderExtension` (e.g. V3 with Kate commitment).
- **build_data_root(block, extrinsics)** — computes the data root for the block.
- **check_if_extrinsic_is_post_inherent(uxt)** — returns whether the extrinsic is a post-inherent (used during block building).

## Key points

- Kate APIs require valid extrinsics and block length from the same block; the node supplies these from the finalized block.
- Header extension (V3) carries the Kate commitment; empty commitment causes Kate RPC to error for that block.

<!--
Source references:
- sources/avail/runtime/src/apis.rs (decl_runtime_apis, impl_runtime_apis)
- sources/avail/runtime/src/kate/
-->
