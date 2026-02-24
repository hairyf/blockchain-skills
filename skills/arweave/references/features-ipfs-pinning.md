---
name: features-ipfs-pinning
description: Arweave + IPFS — ipfs_pin mode, IPFS_Add tag, monitoring.
---

# Arweave and IPFS Pinning

When running `arweave-server` with IPFS pinning, the server can pin transaction data to a local IPFS node when transactions include the `IPFS_Add` tag with the corresponding hash.

## Prerequisites

- Go-IPFS installed and in PATH (e.g. from https://dist.ipfs.io/#go-ipfs).
- IPFS daemon running (`ipfs daemon`) before starting the Arweave server with pinning.

## Enabling Pinning

**Command line:**

```bash
arweave-server peer ... ipfs_pin
```

**In Erlang shell (after starting server):**

```erlang
app_ipfs:start_pinning().
```

## Behavior

- Server listens for incoming transactions that have **data** and a tag `{"IPFS_Add", Hash}`.
- It runs `ipfs add` for that data and pins it to the local IPFS node, associating the hash with the transaction.

## Monitoring

**Server state:**

```erlang
app_ipfs:report(app_ipfs).
% or
app_ipfs:report(IPFSPid).
```

Returns a proplist including `adt_pid`, `queue`, `wallet`, `ipfs_name`, `ipfs_key`, `blocks`, `txs`, `ipfs_hashes`.

**Hash status:**

```erlang
app_ipfs:ipfs_hash_status(Hash).
```

Returns `[{pinned, true|false}, {tx, list()}]` (tx = list of tx IDs containing that IPFS hash and data).

## Key Points

- Pinning is optional and requires a running IPFS daemon and `ipfs_pin` (or `start_pinning()`).
- Only transactions with data and the appropriate IPFS tag trigger pinning.
- Use `ipfs_hash_status/1` to check whether a hash is pinned and which tx(s) reference it.

<!--
Source references:
- https://github.com/ArweaveTeam/arweave (doc/ar-ipfs-howto.md)
-->
