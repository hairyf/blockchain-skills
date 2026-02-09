---
name: java-tron APIs
description: HTTP, gRPC, JSON-RPC interfaces and config for FullNode.
---

# java-tron APIs

After FullNode starts, the node exposes:

- **HTTP API** — [HTTP API reference](https://tronprotocol.github.io/documentation-en/api/http/).
- **gRPC** — [gRPC reference](https://tronprotocol.github.io/documentation-en/api/rpc/); high-performance, service-to-service.
- **JSON-RPC** — Ethereum-compatible; [JSON-RPC methods](https://tronprotocol.github.io/documentation-en/api/json-rpc/).

## Config (enable/disable and ports)

In config file (e.g. `config.conf`):

```
node {
  http {
    fullNodeEnable = true
    fullNodePort   = 8090
  }

  jsonrpc {
    httpFullNodeEnable = true
    httpFullNodePort   = 8545
  }

  rpc {
    enable = true
    port   = 9090
  }
}
```

## Usage

- Public hosted HTTP (mainnet/testnet): [TronGrid](https://developers.tron.network/docs/connect-to-the-tron-network#tron-network-http-endpoints).
- When exposing APIs publicly: use authentication, rate limiting, and network access controls.

## Key Points

- HTTP: typical REST-style TRON endpoints (wallet, node, etc.).
- gRPC: Wallet, WalletSolidity, etc.; use for server-to-server.
- JSON-RPC: use when integrating with Ethereum-style tooling (e.g. 8545 port).

<!--
Source references:
- https://github.com/tronprotocol/java-tron (README.md)
- https://tronprotocol.github.io/documentation-en/api/
-->
