---
name: reth-networking
description: Reth P2P tasks, NetworkConfig, FetchClient
---

# Networking

Four tasks: discovery, transactions, ETH requests, network management. start_network(config) returns NetworkHandle; fetch_client() yields FetchClient for pipeline. NetworkHandle: update_status. FetchClient: get_headers, get_block_bodies. EthRequestHandler serves GetBlockHeaders/GetBlockBodies. TransactionsManager: pool import, propagation (full txs + hashes), GetPooledTransactions.
Source: docs/crates/network.md
