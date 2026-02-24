---
name: celestia-public-api
description: Module-centric public API (Header, Shares, P2P, Node, DAS, State, Fraud, Metrics) and design goals.
---

# Public API

Celestia-node exposes a **module-centric** public API. All DA node types (bridge, full, light) implement the same set of modules; differences are in implementation (e.g. Full vs Light availability). The API is designed to be ergonomic, embeddable (library-style Node construction), and language-agnostic over RPC.

## Modules overview

| Module   | Purpose |
|----------|---------|
| Header   | Local head, get by hash/height, wait for height, range, subscribe, sync state |
| Shares   | GetShare, GetEDS, GetSharesByNamespace, SharesAvailable, ProbabilityOfAvailability |
| P2P      | Info, Peers, Connect/ClosePeer, Block/Unblock, Mutual peer list, Bandwidth, PubSubPeers |
| Node     | Info, LogLevelSet, AuthVerify, AuthNew |
| DAS      | Stats (DASer sampling stats) |
| State    | AccountAddress, Balance, SubmitTx, SubmitPayForBlob, Transfer, StakingModule |
| Fraud    | Subscribe/List proof types, Get stored proofs |
| Metrics  | List, Enable/Disable meters, ExportTo endpoint |

## NodeModule

- **Info** – Administrative node information.
- **LogLevelSet(name, level)** – Set log level for a component.
- **AuthVerify(token)** – Permissions for a token.
- **AuthNew(perms)** – Create a new signed token with given permissions.

## P2P module (excerpt)

- **Info** / **Peers** / **PeerInfo** – Host and peer addressing.
- **Connect** / **ClosePeer** / **Connectedness** / **NATStatus** – Connection management.
- **BlockPeer** / **UnblockPeer** / **ListBlockedPeers** – Blocklist.
- **MutualAdd** / **MutualRm** / **IsMutual** – Bidirectional protected peers (tagged).
- **BandwidthStats** / **BandwidthForPeer** / **BandwidthForProtocol** – Bandwidth metrics.
- **ResourceState** – Resource manager state.
- **PubSubPeers(topic)** – Peers on a given topic.

## Fraud module

- **Subscribe(proofType)** – Subscribe to a fraud proof type (e.g. bad encoding).
- **List()** – Proof types currently subscribed.
- **Get(proofType)** – Stored fraud proofs of that type.

## Metrics module

- **List** – Registered meters.
- **Enable** / **Disable** – Toggle a meter.
- **ExportTo(endpoint)** – Export metrics to an endpoint.

## Design goals

- **Unified:** Same API across node types; implementation differences (e.g. availability) are internal.
- **Embeddable:** Construct a Node with options; no framework mandate.
- **Language-agnostic:** Easy to mirror module interfaces in other languages via RPC clients.

Public RPC docs: <https://node-rpc-docs.celestia.org/>.

<!--
Source references:
- sources/celestia/docs/adr/adr-009-public-api.md
-->
