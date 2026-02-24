---
name: avail-kate-rpc
description: Kate RPC methods, enabling the RPC, and cell/row limits for data-availability queries.
---

# Kate RPC

Kate RPC exposes data-availability queries (rows, proofs, block length, per-tx data proof). Use it when building light clients, explorers, or tooling that verify or fetch DA data.

## Enabling Kate RPC

- **CLI:** `--enable-kate-rpc` (default: false). `--dev` implies `--enable-kate-rpc`.
- **Cell limit:** `--kate-max-cells-size <N>` (default 64, max 10_000). Caps how many cells can be requested in one `kate_queryProof` / `kate_queryMultiProof` call.
- **Metrics:** `--enable-kate-rpc-metrics` for Kate RPC metrics (optional).

```bash
./avail-node --chain mainnet --enable-kate-rpc
./avail-node --enable-kate-rpc --kate-max-cells-size 256
```

## RPC methods

All methods accept an optional block hash `at`; if omitted, the node uses the best block. **Only finalized blocks are queried**; requesting a non-finalized block returns an error.

| Method                | Purpose |
|-----------------------|--------|
| `kate_queryRows`      | Get grid rows by row indices (max 64 rows). |
| `kate_queryProof`     | Get data proofs for a set of cells (bounded by `--kate-max-cells-size`). |
| `kate_queryMultiProof`| Get multiproof and cell block for a set of cells (same bound). |
| `kate_blockLength`    | Get block length at a block. |
| `kate_queryDataProof` | Get data proof for a single transaction by block and transaction index. |

Example (conceptual) for proof queries:

- **Cells:** list of `{ row, col }`; length must be ≤ `kate-max-cells-size` (or you get a clear error suggesting to increase the flag or request fewer cells).
- **Rows:** up to 64 row indices for `kate_queryRows`.

If the requested block has empty commitments (e.g. pre-DA block), the RPC returns an error.

## Key points

- Queries are only valid for **finalized** blocks.
- Increase `--kate-max-cells-size` (max 10_000) if you need larger batch proof requests.
- Empty commitments on the requested block cause `kate_queryRows` / `kate_queryProof` / `kate_queryMultiProof` to fail.

<!--
Source references:
- https://github.com/availproject/avail (README.md, RPCs and Custom Flags)
- sources/avail/rpc/kate-rpc/src/lib.rs
- sources/avail/node/src/cli.rs
-->
