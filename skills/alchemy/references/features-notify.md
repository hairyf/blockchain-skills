---
name: alchemy-notify
description: Alchemy Notify API — webhooks CRUD, address activity, NFT activity, GraphQL webhooks.
---

# Notify Namespace

`alchemy.notify` provides CRUD for Alchemy Notify webhooks (address activity, NFT activity, mined/dropped transactions, custom GraphQL). Requires `authToken` in `AlchemySettings` (from Alchemy Dashboard, Notify tab).

## Methods

- **getAllWebhooks()** — list all webhooks for the team.
- **getAddresses(webhookId)** — addresses tracked for an Address Activity webhook.
- **getNftFilters(webhookId)** — NFT filters for an NFT Activity webhook.
- **createWebhook(url, type, params)** — create webhook; `type` from `WebhookType` (e.g. ADDRESS_ACTIVITY, NFT_ACTIVITY, MINED_TRANSACTION, DROPPED_TRANSACTION, GRAPHQL); `params` type depends on webhook type.
- **updateWebhook(webhookId, update)** — update active status, addresses, or NFT filters.
- **deleteWebhook(webhookId)** — delete webhook.
- **verifyConfig(config)** — verify webhook config.
- **getGraphqlQuery(webhookId)** — get GraphQL query for a custom webhook.
- **sendWebhookRequest(webhookId, ...)** — trigger test request.

## Usage

```ts
const alchemy = new Alchemy({ apiKey: '…', authToken: '…' });

const webhooks = await alchemy.notify.getAllWebhooks();
const addresses = await alchemy.notify.getAddresses(webhookId);

const newWebhook = await alchemy.notify.createWebhook(
  'https://your-server.com/webhook',
  WebhookType.ADDRESS_ACTIVITY,
  { addresses: ['0x…'], network: Network.ETH_MAINNET }
);
await alchemy.notify.updateWebhook(webhookId, { addresses: ['0x…', '0x…'] });
await alchemy.notify.deleteWebhook(webhookId);
```

## Key Points

- `authToken` is required; Notify tab in Alchemy Dashboard.
- Not all networks are supported for Notify; check Alchemy docs.
- Webhook types: address activity, NFT activity, mined/dropped transactions, custom GraphQL.

<!--
Source references:
- sources/alchemy/docs-md/classes/NotifyNamespace.md
- sources/alchemy/docs-md/README.md
-->
