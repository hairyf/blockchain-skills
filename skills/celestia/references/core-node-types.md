---
name: celestia-node-types
description: Data availability node types (bridge, full, light) and their roles in the Celestia DA network.
---

# Node Types

Celestia-node implements three **data availability (DA) node** types that form the DA network around celestia-core consensus. All share the same public API surface; implementations differ by resource constraints (e.g. Full vs Light availability).

## Bridge

- **Role:** Relays blocks from the celestia-core consensus network to the DA network.
- **Behavior:** Connects to a celestia-core node via RPC, listens for blocks, runs `ValidateBasic()`, extends block data, builds the Data Availability Header (DAH), creates an `ExtendedHeader`, and publishes it to the HeaderSub gossip topic.
- **Sampling:** Does not perform DAS; DAS module is stubbed. Exposes the same API as a full node otherwise.
- **Use when:** You need to feed the DA layer from a trusted core connection (validator or full core node).

## Full

- **Role:** Fully reconstructs and stores blocks by sampling the DA network for shares; serves shares to others.
- **Behavior:** Subscribes to ExtendedHeaders (e.g. via HeaderSub), runs **FullAvailability**: samples enough shares to fully repair the block’s data square and stores it.
- **Use when:** You need full block data and to serve shares to light/full peers.

## Light

- **Role:** Verifies availability of block data by sampling the DA network (no full reconstruction).
- **Behavior:** Subscribes to ExtendedHeaders, runs **LightAvailability**: randomly samples a fixed number of shares (e.g. 16) per block—enough to verify availability with high probability when many light nodes sample.
- **Use when:** You need minimal resource usage and only need to verify data availability.

## Quick reference

| Type   | DAS              | Block storage | Serves shares |
|--------|------------------|---------------|---------------|
| Bridge | No (stubbed)      | No            | No            |
| Full   | FullAvailability  | Yes           | Yes           |
| Light  | LightAvailability| No            | No            |

## Usage

Run and init use the same CLI for all types; `<node_type>` is `bridge`, `full`, or `light`:

```sh
celestia <node_type> init
celestia <node_type> start
```

<!--
Source references:
- https://github.com/celestiaorg/celestia-node (README.md)
- sources/celestia/docs/adr/adr-003-march2022-testnet.md
-->
