---
name: tron-features-trongrid
description: TronGrid hosted API - FullNode/SolidityNode proxy and v1 REST (accounts, assets, blocks, contracts, events).
---

# TronGrid

TronGrid is a hosted TRON API. Base URL: https://api.trongrid.io/ (mainnet); testnets use different hostnames (e.g. Shasta).

## API types

1. **FullNode/SolidityNode proxy**: Same as self-hosted. e.g. https://api.trongrid.io/wallet/getnowblock, wallet/getaccount.
2. **TronGrid v1 REST**: Resources under https://api.trongrid.io/v1/. Addresses in base58 or hex; responses in snake_case.

## TronGrid v1 endpoints (summary)

- **Accounts**: GET /v1/accounts/:address (only_confirmed); GET /v1/accounts/:address/transactions (only_to, only_from, limit, fingerprint, order_by, min/max_block_timestamp); GET /v1/accounts/:address/resources.
- **Assets**: GET /v1/assets; GET /v1/assets/:identifier; GET /v1/assets/:name/list (TRC-10; pagination, order_by).
- **Blocks**: GET /v1/blocks/:identifier/events (identifier = latest, block number, or block id).
- **Contracts**: GET /v1/contracts/:address/events (only_confirmed, event_name, block_number, min/max_block_timestamp, limit, fingerprint, order_by); GET /v1/contracts/:address/transactions.
- **Transactions**: GET /v1/transactions/:id/events; GET /v1/transactions/:id.

## Usage for agents

Read-only: Use TronGrid wallet proxy or v1 to avoid running a node. Event indexing: GET /v1/contracts/:address/events with filters; paginate with limit/fingerprint. Broadcast: POST /wallet/broadcasttransaction; build and sign tx locally (never send private keys).

<!-- Source: sources/tron/docs/clients/tron-grid.md -->
