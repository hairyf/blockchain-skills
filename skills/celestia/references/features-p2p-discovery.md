---
name: celestia-p2p-discovery
description: P2P discovery of full nodes, advertising, and connection behavior for bridge, full, and light nodes.
---

# P2P Discovery

Discovery lets light and full nodes find and connect to full nodes on the DA network. Full nodes advertise themselves; light and bridge nodes discover and connect to them. Connections to discovered full nodes are protected from trimming via tagging.

## Namespace and limits

- Discovery uses the **full** topic/namespace: nodes advertise or discover peers that provide full-node capability (share serving).
- **peersLimit** (e.g. 3): Maximum number of discovered full-node peers to keep in the set.
- **peerWeight** (e.g. 1000): Tag weight for discovered full nodes so the ConnManager does not trim them.

## Full nodes

1. On startup, advertise self on the DHT under the **full** namespace so others can find this node.
2. Discover other full nodes and connect to them; on successful connection, tag the peer and add to the limited set.
3. If connection fails, drop the discovered peer.

## Bridge nodes

- Behave like full nodes for discovery: advertise at **full** and actively discover/connect to full nodes.
- Bridges do not sample (they get blocks from core), but connecting to full nodes improves topology so full nodes have more peers with shares for EDS repair.

## Light nodes

1. Discover full nodes via DHT at **full** namespace using the discoverer interface.
2. On discovering a peer, attempt connection; on success, tag peer and add to the set; otherwise drop.
3. Rely on these connections for share sampling (DAS) and state (if using P2P state access).

## Implementation note

Discovery combines advertise and discover services and stores active peers in a **limitedSet** (thread-safe, max size). The libp2p Host is used to connect to discovered peers; Tag Peer ensures ConnManager does not garbage-collect these connections.

<!--
Source references:
- sources/celestia/docs/adr/adr-008-p2p-discovery.md
-->
