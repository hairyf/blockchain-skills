---
name: alchemy
description: Alchemy SDK for JavaScript — client, core RPC and Enhanced APIs, NFT, WebSockets, Transact, Portfolio, Notify, Debug.
metadata:
  author: hairy
  version: "2026.2.9"
  source: Generated from https://github.com/alchemyplatform/alchemy-sdk-js (docs), scripts at https://github.com/antfu/skills
---

> Skill based on Alchemy SDK JS (alchemy-sdk) docs, generated at 2026-02-09.

The Alchemy SDK is a JavaScript SDK for blockchain access: Ethers.js–compatible provider plus Enhanced APIs (token balances, asset transfers, NFT API, WebSockets, transaction simulation, private tx, Portfolio, Notify, Debug). One client instance per network/API key; namespaces: core, nft, ws, transact, notify, portfolio, prices, debug.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Client | Instantiation, namespaces, AlchemySettings, Network | [core-client](references/core-client.md) |
| Core Namespace | JSON-RPC, Enhanced APIs, token balances, asset transfers, findContractDeployer | [core-namespace](references/core-namespace.md) |

## Features

### NFT

| Topic | Description | Reference |
|-------|-------------|-----------|
| NFT API | Metadata, owners, transfers, iterators, spam, rarity, floor price, pagination | [features-nft](references/features-nft.md) |

### Realtime and Transact

| Topic | Description | Reference |
|-------|-------------|-----------|
| WebSockets | Subscriptions, AlchemySubscription, reconnection and backfill | [features-websockets](references/features-websockets.md) |
| Transact | Simulate asset changes/execution, send tx, private tx (Flashbots), cancel | [features-transact](references/features-transact.md) |

### Portfolio and Notify

| Topic | Description | Reference |
|-------|-------------|-----------|
| Portfolio | Multi-wallet tokens, NFTs, collections, transactions (authToken) | [features-portfolio](references/features-portfolio.md) |
| Notify | Webhooks CRUD, address/NFT activity, mined/dropped, GraphQL (authToken) | [features-notify](references/features-notify.md) |

### Debug

| Topic | Description | Reference |
|-------|-------------|-----------|
| Debug | traceCall, traceTransaction, traceBlock, tracers | [features-debug](references/features-debug.md) |
