---
name: core-blocks
description: Arweave block structure and endpoints — hash, indep_hash, height, current block.
---

# Arweave Blocks

Blocks contain the blockweave metadata and transaction lists. Use **indep_hash** (not `hash`) when requesting a block by ID.

## Block Fields (JSON)

| Field            | Description |
|------------------|-------------|
| `nonce`          | Mining nonce. |
| `previous_block` | Previous block hash. |
| `timestamp`      | Unix timestamp. |
| `last_retarget`  | Last difficulty retarget time. |
| `diff`           | Difficulty. |
| `height`         | Block height. |
| `hash`           | Internal hash. |
| `indep_hash`     | Block identifier — use this for `/block/hash/{block_id}`. |
| `txs`            | List of transaction IDs. |
| `hash_list`      | Block hash list. |
| `wallet_list`    | Wallet list. |
| `reward_addr`    | Miner reward address (or "unclaimed"). |

## Usage

**By block ID (use indep_hash):**

```
GET /block/hash/{block_id}
```

**By height:**

```
GET /block/height/{block_height}
```

**Current block (network head):**

```
GET /current_block
```

## Key Points

- Requesting by hash must use `indep_hash` from block JSON; `hash` is internal.
- Block height is numeric; use `/block/height/{n}` for historical queries.

<!--
Source references:
- https://github.com/ArweaveTeam/arweave (http_iface_docs.md)
-->
