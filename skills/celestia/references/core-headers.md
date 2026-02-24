---
name: celestia-headers
description: ExtendedHeader lifecycle, header service flow, and Header module API for syncing and subscribing.
---

# Headers

The **header** package handles generating, requesting, syncing, and storing **ExtendedHeaders**. An ExtendedHeader extends a celestia-core block header with the DataAvailabilityHeader (DAH), ValidatorSet, and Commit so light and full nodes can reconstruct or verify block data via the DAH.

## Components

1. **core.Listener** (bridge only): Listens to celestia-core for blocks, extends them, builds ExtendedHeader, publishes to HeaderSub.
2. **p2p.Subscriber**: Subscribes to new ExtendedHeaders from the DA network (HeaderSub).
3. **p2p.Exchange** / **core.Exchange**: Fetches ExtendedHeaders from DA peers (default for full/light) or from core (bridge only).
4. **Syncer**: Syncs past and recent ExtendedHeaders from the DA network or a core connection (bridge).
5. **Store**: Persists ExtendedHeaders for use by DASer and other services.

## Bridge flow

1. core.Listener receives blocks from core, validates and extends, generates ExtendedHeader, stores extended block shares, publishes to HeaderSub.
2. Syncer (subscribed to HeaderSub) receives new ExtendedHeaders and stores via Store. Past headers are requested from core via core.Exchange when needed.

## Full / Light flow

1. Syncer receives new ExtendedHeaders from HeaderSub.
2. If there is a gap to network head, Syncer requests headers in batches (local head → network head) and appends to Store.
3. DASer and other services read from Store.

## Header module API (RPC)

Use these for querying and waiting on headers:

- **LocalHead** – node’s local chain tip (header store).
- **GetByHash** / **GetByHeight** – fetch a single header from the store.
- **WaitForHeight** – block until the header at the given height is processed or context deadline.
- **GetRangeByHeight(from, to)** – contiguous range of ExtendedHeaders from the store.
- **Subscribe** – long-lived subscription channel for newly validated ExtendedHeaders.
- **SyncState** / **SyncWait** – syncer status and blocking until synced to network head.
- **NetworkHead** – syncer’s view of current network head.

## Key points

- ExtendedHeader is the unit of work for DAS: it carries the DAH used for share sampling.
- Bridge is the only type that generates ExtendedHeaders; full and light only consume and sync them.
- All node types expose the same Header module; bridge can use core.Exchange for historical sync, full/light use p2p.Exchange.

<!--
Source references:
- sources/celestia/header/doc.go
- sources/celestia/docs/adr/adr-009-public-api.md
-->
