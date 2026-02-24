---
name: wormhole-features-queries-ccq
description: Cross Chain Queries (CCQ), proxy server, permissions, and call types
metadata:
  author: hairy
---

# Cross Chain Queries (CCQ)

Wormhole Queries (CCQ) let clients request attestations for cross-chain data. Guardians run query support; a **query proxy server** validates requests, forwards them to the guardian P2P network, aggregates responses, and returns results when quorum is reached.

## Running the proxy

Same binary as guardiand: `guardiand query-server`. Required: `--env` (mainnet/testnet/devnet), `--nodeKey`, `--permFile`, `--signerKey`, `--listenAddr`. Need at least one chain config (e.g. `--ethRPC`, `--ethContract`) for guardian set read. Proxy must be reachable from the internet for REST and must reach guardian P2P (port 8996/udp). Generate signer key: `guardiand keygen --desc "CCQ proxy" --block-type "CCQ SERVER SIGNING KEY" /path/to/file`.

Guardians are permissioned: they only accept queries from configured proxy P2P keys and signed requests from configured signer keys. New proxies must be allowlisted by guardians.

## Permissions file (permFile)

JSON: `allowAnythingSupported` (testnet only), `defaultRateLimit`, `defaultBurstSize`, and `permissions[]`. Each permission has:

- `userName`, `apiKey` — Client identifies with API key.
- `allowUnsigned` — If true, proxy signs with `signerKey` for this user.
- `allowedCalls` — List of allowed query shapes (see below). Omit if using `allowAnything` (testnet only).
- Optional: `rateLimit`, `burstSize`, `logResponses`.

Supported call types (see whitepaper 0013 for exact schema):

- **EVM**: `ethCall`, `ethCallByTimestamp`, `ethCallWithFinality` — each needs `chain`, `contractAddress`, `call` (4-byte selector). `contractAddress` can be `"*"` for any contract.
- **Solana**: `solAccount` (needs `account`), `solPDA` (needs `programAddress`). Addresses as 32-byte hex or base58.

Validate permissions file without reloading: `guardiand query-server --env mainnet --verifyPermissions --permFile path/to/file.json`.

## Rate limiting

Global: `defaultRateLimit`, `defaultBurstSize`. Per-user: `rateLimit`, `burstSize`. Rate in queries/sec; burst size for spikes. Zero rate disables limiting.

## Usage

Clients send REST requests to the proxy with API key and query payload. Proxy forwards to guardians, collects responses, verifies quorum, and returns. Use for reading state or proofs across chains without submitting on-chain transactions.

<!--
Source references:
- sources/wormhole/docs/query_proxy.md
- sources/wormhole/whitepapers/0013_ccq.md
- sources/wormhole/sdk/js-query/README.md
-->
