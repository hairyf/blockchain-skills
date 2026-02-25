---
name: geth-rpc-security
description: Best practices - which APIs to expose, avoid account unlock over HTTP/WS, prefer IPC and Clef.
---

# RPC and API Security

Exposing geth over HTTP/WS creates risk. Follow these practices so agents and tools do not recommend unsafe setups.

## API exposure

- Default --http.api and --ws.api are eth,net,web3. Only enable additional namespaces (admin, debug, txpool, personal, etc.) when necessary and never expose them on a public endpoint.
- admin and debug allow node control and state extraction; restrict to IPC or trusted networks only.
- Use --http.corsdomain and --ws.origins to limit browser origins when serving DApps.

## Account unlocking

- Account unlocking over HTTP or WebSocket is disabled by default when --http or --ws is enabled. Do not use --allow-insecure-unlock on any reachable interface; it is deprecated and unsafe.
- For local scripts: use IPC (geth attach <ipcpath>) with unlock, or run geth with --http only on localhost and accept the risk only for dev.
- For DApps and signing: use Clef (geth --signer <clef-url>). Keys stay in Clef; geth never holds unlocked accounts when using external signer.

## Transport choice

- IPC: most secure for local tools; supports all namespaces and subscriptions; not remote.
- HTTP: simple request/response; no subscriptions; restrict to needed APIs and bind to localhost or firewall.
- WebSocket: subscriptions; same API restrictions as HTTP.

## Key Points

- Prefer IPC for local; Clef for remote node + local signing. Never expose admin/debug over public HTTP/WS. Do not unlock accounts over HTTP/WS in production.

<!-- Source: https://geth.ethereum.org/docs/interacting-with-geth/rpc, https://github.com/ethereum/go-ethereum (README.md) -->
