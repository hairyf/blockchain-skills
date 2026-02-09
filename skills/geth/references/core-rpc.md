---
name: geth-rpc
description: Geth JSON-RPC transports (HTTP, WebSocket, IPC) and namespaces.
---

# Geth JSON-RPC

Geth exposes JSON-RPC over three transports. Methods are namespaced (e.g. `eth_call`). Access is controlled per transport and per namespace.

## Transports

| Transport | Enable | Default | Event subscription | Remote |
|-----------|--------|---------|--------------------|--------|
| **HTTP**  | `--http` | `--http.addr localhost`, `--http.port 8545` | No | Yes |
| **WebSocket** | `--ws` | `--ws.port 8546` | Yes | Yes |
| **IPC**   | On by default | `~/.ethereum/geth.ipc` (Unix) or `\\.\pipe\geth.ipc` (Windows) | Yes | No (local only) |

- HTTP: `geth --http` or `geth --http --http.port 3334`. Whitelist APIs with `--http.api eth,net,web3`. CORS: `--http.corsdomain` (e.g. `*` or `https://remix.ethereum.org`).
- WebSocket: `geth --ws --ws.port 3334 --ws.api eth,net,web3`. Origins: `--ws.origins`.
- IPC: All namespaces by default. Disable with `--ipcdisable`; custom path: `--ipcpath`.

## Namespaces

- **eth**, **net**, **web3** — Default for HTTP/WS. Standard execution APIs.
- **admin**, **debug**, **clique**, **txpool**, **miner** (deprecated), **personal** (deprecated) — Must be enabled explicitly via `--http.api` / `--ws.api`. Do not expose admin/debug over public HTTP/WS.

## Security

- Account unlocking is **forbidden** by default when HTTP or WS is enabled. Use `--allow-insecure-unlock` only if you fully accept the risk (not recommended).
- Prefer IPC for local tools; use Clef for remote nodes + local signing.

## Choosing a Transport

- **IPC**: Most secure, local only, supports subscriptions.
- **HTTP**: Simple, one request/response; no subscriptions.
- **WebSocket**: Persistent connection, subscriptions (e.g. `eth_subscribe`), lower per-message overhead for many calls.

## Engine API

Geth exposes the Engine API for consensus clients by default (JWT auth, etc.). Not for end-user RPC use.

<!--
Source references:
- https://geth.ethereum.org/docs/interacting-with-geth/rpc
- https://github.com/ethereum/go-ethereum (README.md)
-->
