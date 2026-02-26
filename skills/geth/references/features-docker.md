---
name: geth-docker
description: Running geth in Docker - quick start, ports, volume, and exposing RPC.
---

# Docker

Geth provides official Docker images for quick local or server deployment.

## Quick start

docker run -d --name ethereum-node -v /Users/alice/ethereum:/root -p 8545:8545 -p 30303:30303 ethereum/client-go

Starts geth in snap-sync mode with default DB memory. Volume persists chain data. Ports: 8545 (HTTP-RPC), 30303 (P2P). Alpine tag available for slimmer image.

## Exposing RPC to host/other containers

By default geth binds RPC to localhost. To allow access from other containers or the host:

docker run ... ethereum/client-go --http --http.addr 0.0.0.0

Then map -p 8545:8545 so host can reach RPC. Restrict --http.api to eth,net,web3 unless you need more (and only on trusted networks).

## Key Points

- Use a volume for datadir so state persists across container restarts. Do not expose RPC with unlocked accounts or admin/debug on untrusted networks.

<!-- Source: https://github.com/ethereum/go-ethereum (README.md) -->
