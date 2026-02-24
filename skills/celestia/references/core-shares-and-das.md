---
name: celestia-shares-and-das
description: Share retrieval, namespace queries, and data availability sampling (DAS) in celestia-node.
---

# Shares and Data Availability Sampling

The **share** package provides retrieval and sampling of block data shares. The **das** package runs data availability sampling (DAS) over ExtendedHeaders to verify that block data is available on the network.

## Share retrieval

- **GetSharesByNamespace(ctx, root, nID)** – Returns all shares in the block (identified by the data root / DAH) for the given namespace, in row-by-row order. Primary method for fetching application data by namespace.
- **GetShare(ctx, root, row, col)** – Single share at row/col in the data square identified by root.
- **GetEDS(ctx, root)** – Full extended data square (EDS) for the given root (full nodes have this after repair).

**Availability** is defined in the share package: **Light** samples 16 shares per block to verify availability; **Full** samples until the block can be fully reconstructed and repaired.

## DAS module (RPC)

- **Stats()** – Returns current DASer sampling stats (e.g. sampled height range, progress).

DAS does not expose per-block control; the node runs DAS automatically on synced headers.

## Shares module (RPC)

- **GetShare** / **GetEDS** / **GetSharesByNamespace** – As above, with root from a header’s DAH.
- **SharesAvailable(ctx, root)** – Subjective check that shares committed to the root are available on the network.
- **ProbabilityOfAvailability()** – Probability that the data square is available given samples collected (light nodes).

## DASer internals (parallelization)

The DASer uses a **Coordinator**, **Workers**, **Subscriber**, and **CheckpointStore**:

- Coordinator decides which headers to sample next; workers perform sampling in parallel (concurrency limit ~16).
- Subscriber feeds new network head headers; recent heads are prioritized.
- CheckpointStore persists state so DAS resumes after restart. Checkpoints are written periodically and on exit.

Sampling is network-bound; parallel workers improve throughput. Config (e.g. sampling range, concurrency) may be exposed per node type in the future.

## Key points

- Use **GetSharesByNamespace** for application-level blob retrieval by namespace ID.
- Light nodes only verify availability (SharesAvailable, ProbabilityOfAvailability); full nodes can return GetEDS and full shares after repair.
- DAS runs automatically; use Stats() to monitor progress.

<!--
Source references:
- sources/celestia/share/doc.go
- sources/celestia/das/doc.go
- sources/celestia/docs/adr/adr-009-public-api.md
- sources/celestia/docs/adr/adr-012-daser-parallelization.md
-->
