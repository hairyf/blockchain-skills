---
name: getblock-endpoints
description: Creating and managing GetBlock RPC endpoints — protocol, network, full/archive, API type, region; endpoint URL is the credential.
---

# GetBlock Endpoints

Endpoints are created in the GetBlock Dashboard. Each endpoint URL includes a unique access token and encodes protocol, network, and routing.

## Creating an endpoint

1. Dashboard → **Endpoints** → **Get endpoint**.
2. Select: **protocol** (Ethereum, BNB Chain, Polygon, etc.), **network** (mainnet/testnet), **mode** (full or archive), **API** (JSON-RPC, WebSockets, GraphQL, etc.), **region** (Frankfurt, New York, Singapore).
3. Click **Get** to generate the endpoint URL with access token.

Example URL forms:

- EU: `https://go.getblock.io/<ACCESS_TOKEN>/`
- US: `https://go.getblock.us/<ACCESS_TOKEN>/`
- Asia: `https://go.getblock.asia/<ACCESS_TOKEN>/`

## Full vs archive mode

- **Full**: Standard full (pruned) node — current state, send tx, read blocks.
- **Archive**: Historical chain state — past balances, contract storage, historical calls, simulation at a past block. Archive usage is billed differently (see CU/pricing docs).

## Managing endpoints

Endpoints appear in the dashboard list. Use the right-side menu (three dots) to **roll** (regenerate token) or **delete** the endpoint. The URL is the credential; keep it secret; if exposed, regenerate or revoke from the account.

<!--
Source references:
- https://github.com/GetBlock-io/getblock-docs
- getting-started/endpoint-setup/creating-node-endpoints.md
-->
