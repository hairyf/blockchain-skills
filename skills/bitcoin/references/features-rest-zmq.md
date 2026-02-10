---
name: bitcoin-features-rest-zmq
description: REST API and ZMQ notifications.
---

# REST and ZMQ

## REST Interface

Enable with `-rest`. Served on the same port as JSON-RPC (default 8332 mainnet, 18332 testnet, 38332 signet, 18443 regtest). Unauthenticated; do not expose to untrusted networks.

**Endpoints (examples):**

- **Transaction**: `GET /rest/tx/<TXID>.<bin|hex|json>` — Mempool by default; need `txindex=1` for confirmed.
- **Block**: `GET /rest/block/<HASH>.<bin|hex|json>` or `.../notxdetails/...` (JSON without full tx details).
- **Block part**: `GET /rest/blockpart/<HASH>.<bin|hex>?offset=&size=`
- **Headers**: `GET /rest/headers/<HASH>.<bin|hex|json>?count=5` — Up to count block headers.
- **Chaininfo**: `GET /rest/chaininfo.json`
- **UTXO**: `GET /rest/getutxos/<CHECK>.<bin|hex|json>` — UTXO set query (requires rest with specific support).

Same consistency guarantees as RPC (see doc). Limitation: many concurrent connections can exhaust file descriptors; limit concurrency or increase system limits.

## ZMQ (ZeroMQ)

Publish/subscribe for blocks and transactions. Build with `-DWITH_ZMQ=ON`; set options in config or CLI to enable.

- **zmqpubhashblock**, **zmqpubhashtx** — Publish block/tx hashes.
- **zmqpubrawblock**, **zmqpubrawtx** — Publish raw block/tx data.

Subscribers connect to the given ZMQ endpoint; no auth, read-only. Useful for indexers and notification pipelines. See `doc/zmq.md` for topic names and message formats.

<!--
Source references:
- https://github.com/bitcoin/bitcoin doc/REST-interface.md
- https://github.com/bitcoin/bitcoin doc/zmq.md
-->
