---
name: ton-payments
description: TON payment processing, Toncoin, Jettons, finality, monitoring.
---

# Payment Processing on TON

## On-chain vs off-chain

- **On-chain**: all logic in contracts; good for simple transfers or AMMs.
- **Off-chain**: your service watches the chain, keeps DB, runs business logic; needed for accounts, history, refunds, external systems. Typical for exchanges and merchants.

## Finality

Finality is reached after **one masterchain block** that references the shard block (~5 s). No multi-block wait like Ethereum or Bitcoin. When monitoring, treat only transactions included in masterchain as final; many APIs expose this.

## Assets

- **Toncoin**: native currency; any wallet can receive; process by watching incoming transfers to your address.
- **Jettons** (TEP-74): fungible tokens; master contract + per-holder wallet contracts. Process by monitoring the Jetton wallet contract for your deposit address; parse transfer notifications (sender, amount). See standard/tokens/jettons.

## Implementation options

1. **Self-built**: your service + TON API or liteserver; poll blocks, filter by address, parse, verify finality, update DB. Full control, more work.
2. **Self-hosted processor**: e.g. Bicycle; you run it, configure addresses/assets, consume its API. Balance of control and effort.
3. **Third-party**: external API/webhooks; fast to integrate, dependency and often fees.

Monitoring flow: fetch blocks → filter transactions for your addresses → parse amount/metadata → confirm masterchain finality → update records. Often poll every few seconds; can combine with indexer webhooks and reconciliation.

## Key points

- Use off-chain processing for anything beyond simple transfers (accounts, history, external systems).
- Finality: one masterchain confirmation (~5 s).
- Toncoin = native; Jettons = TEP-74, monitor Jetton wallet contract. Choose self-built, self-hosted processor, or third-party API by control vs effort.

<!--
Source references:
- https://github.com/ton-org/docs (payments/overview.mdx, toncoin.mdx, jettons.mdx)
- standard/tokens/jettons
-->
