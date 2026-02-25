---
name: java-tron API security
description: Securing HTTP, gRPC, and JSON-RPC when exposing FullNode APIs to the public.
---

# API Security Best Practices

When exposing java-tron APIs (HTTP, gRPC, or JSON-RPC) to a public or untrusted network, harden the node to reduce abuse and unauthorized access.

## Recommendations

1. **Authentication** — Add authentication in front of the node (reverse proxy, API gateway, or gRPC interceptors) so only authorized clients can call the APIs. Do not rely on "internal only" if the ports are reachable from the internet.

2. **Rate limiting** — Apply rate limits per IP or per API key to prevent DoS and resource exhaustion. Tune limits for your capacity (e.g. RPC throughput, block sync).

3. **Network access controls** — Restrict who can reach the API ports (firewall, security groups, VPN). Prefer exposing APIs only to known clients or a proxy, not 0.0.0.0 to the whole internet unless necessary.

4. **Use TronGrid for public access** — For mainnet and testnet, [TronGrid](https://developers.tron.network/docs/connect-to-the-tron-network#tron-network-http-endpoints) provides hosted HTTP endpoints with built-in scaling and security. Prefer TronGrid when you do not need to run your own node.

5. **Minimal exposure** — In config, enable only the APIs you need (node.http, node.rpc, node.jsonrpc) and use non-default ports if it helps with policy or filtering.

## Config reminder

API enable/disable and ports are in `config.conf` under `node.http`, `node.rpc`, and `node.jsonrpc`. Changing ports does not replace authentication or rate limiting.

## Key Points

- Do not expose API ports publicly without authentication, rate limiting, and network controls.
- For production or high-value nodes, put the node behind a reverse proxy or gateway that enforces auth and limits.

<!--
Source references:
- https://github.com/tronprotocol/java-tron (README.md — "When exposing any of these APIs to a public interface...")
- https://developers.tron.network/docs/connect-to-the-tron-network
-->
