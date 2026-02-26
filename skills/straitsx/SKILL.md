---
name: straitsx
description: StraitsX Card Issuing API — CMS (users, cards, lifecycle), Remote Host Authorization, webhooks; use for integrating card issuance and transaction approval.
metadata:
  author: Hairy
  version: "2026.2.25"
  source: Manual init from https://docs.straitsx.com/v1-CARDS/docs/introduction, cache at .bonfire/cache/straitsx
---

> Skill based on **StraitsX Card Issuing API** (v1-CARDS), generated 2026-02-25 from docs.straitsx.com.

StraitsX Card Issuing lets you launch and manage a payment card program: create users and cards, activate, enroll 3DS, set PIN, and handle authorizations and webhooks. CMS is REST (Bearer token); RHA and webhook are endpoints you implement and StraitsX calls.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Overview | CMS vs RHA, hosts, when to use which | [core-overview](references/core-overview.md) |
| Authentication | Bearer token, SSO token endpoint | [core-authentication](references/core-authentication.md) |
| Usage patterns | Node (npx api install + SDK) and Shell (curl), Base URL | [core-usage-patterns](references/core-usage-patterns.md) |
| Getting started | Flow from user creation to activation and RHA/webhook | [core-getting-started](references/core-getting-started.md) |
| Error responses | Error JSON format and error codes (4xx/5xx) | [core-errors](references/core-errors.md) |
| Pagination & sorting | page[size], page[number], sort query params | [core-pagination-sorting](references/core-pagination-sorting.md) |

## Features

### Card Management (CMS)

| Topic | Description | Reference |
|-------|-------------|-----------|
| Issuer Plan | Create, Update, Get Issuer Plan Card List | [features-cms-issuer-plan](references/features-cms-issuer-plan.md) |
| Card Product | Link Issuer Plan with Card Product, Get Card Product List, Create, BINs, Card Art | [features-cms-card-product](references/features-cms-card-product.md) |
| User | Create, Update, Get User List / Detail / Card List | [features-cms-user](references/features-cms-user.md) |
| Lifecycle | Create User, Create Card, Activate Card | [features-cms-lifecycle](references/features-cms-lifecycle.md) |
| Card | Get Detail, Update Status, Close, Balance, Config, Printing, Token, Reissue | [features-cms-card](references/features-cms-card.md) |
| Spend Limit | Create, Get, Update, Delete Card Spending Limit | [features-cms-spend-limit](references/features-cms-spend-limit.md) |
| Transaction | Get Card/Issuer Transaction List, Get Detail, Get Total Amount | [features-cms-transaction](references/features-cms-transaction.md) |
| OOB | Obtain out-of-band authentication | [features-cms-oob](references/features-cms-oob.md) |
| Accounting | Get Card Spending, Settlement/Spendable Balance, VISA FX Rates | [features-cms-accounting](references/features-cms-accounting.md) |
| 3DS | Enroll, Get Detail, Update, Unenroll 3DS for card number | [features-cms-3ds](references/features-cms-3ds.md) |
| Iframe | PIN Setup/Reset/Change, Card, CVV iframe URLs | [features-cms-iframe](references/features-cms-iframe.md) |
| Pin | PIN Setup, Reset, Change, Reset PIN Retry Counter (server-side) | [features-cms-pin](references/features-cms-pin.md) |
| Visa In-App Provisioning | Apple Pay, Google Pay in-app provisioning | [features-cms-visa-in-app](references/features-cms-visa-in-app.md) |
| Unassigned Card Batch Transfer | Create, Get All, Get Single batch transfer | [features-cms-batch-transfer](references/features-cms-batch-transfer.md) |

### Remote Host & Webhooks

| Topic | Description | Reference |
|-------|-------------|-----------|
| Remote Host Authorization & Webhook | RHA request/response, error codes; Webhook event types, signature, retry | [features-rha-webhook](references/features-rha-webhook.md) |
| Transactions | Transaction types, auth vs webhook-only, balance updates | [features-transactions](references/features-transactions.md) |
| Transaction simulation | Staging-only simulator for testing RHA and webhook | [features-transaction-simulation](references/features-transaction-simulation.md) |
| Instant issuance & OOB | Instant card pool, OOB 3DS flow | [features-instant-issuance-oob](references/features-instant-issuance-oob.md) |

## Best practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Rejection and rate limit | rejection_reason codes, 429 handling and limits | [best-practices-rejection-rate-limit](references/best-practices-rejection-rate-limit.md) |

## API Reference (by endpoint)

Request/response and curl examples for CMS and RHA/Webhook are in the references below. Call patterns (Node SDK / curl): [core-usage-patterns](references/core-usage-patterns.md).

| Module | Content | Reference |
|--------|---------|-----------|
| Remote Host Authorization | Your RHA endpoint: request body, approve/reject response, error codes | [features-rha-webhook](references/features-rha-webhook.md) |
| Webhook Notification | Event types, signature verification, retry policy | [features-rha-webhook](references/features-rha-webhook.md) |
| Issuer Plan | Create, Update, Get Issuer Plan Card List | [features-cms-issuer-plan](references/features-cms-issuer-plan.md) |
| Card Product | Link, Get Card Product List, Create, Get Merchant BINs, Card Art List | [features-cms-card-product](references/features-cms-card-product.md) |
| User | Create, Update, Get User List / Detail / Card List | [features-cms-user](references/features-cms-user.md) |
| Card (lifecycle) | Create User, Create Card, Activate Card | [features-cms-lifecycle](references/features-cms-lifecycle.md) |
| Card (operations) | Get Detail, Update Status, Close, Balance, Config, Printing, Token, Reissue | [features-cms-card](references/features-cms-card.md) |
| Spend Limit | Create, Get, Update, Delete Card Spending Limit | [features-cms-spend-limit](references/features-cms-spend-limit.md) |
| Transaction | Get Card/Issuer Transaction List, Detail, Total Amount | [features-cms-transaction](references/features-cms-transaction.md) |
| OOB | Obtain out-of-band authentication | [features-cms-oob](references/features-cms-oob.md) |
| Accounting | Get Card Spending, Settlement/Spendable Balance, VISA FX Rates | [features-cms-accounting](references/features-cms-accounting.md) |
| 3DS | Enroll, Get Detail, Update, Unenroll 3DS | [features-cms-3ds](references/features-cms-3ds.md) |
| Iframe | PIN Setup/Reset/Change, Card, CVV iframe URLs | [features-cms-iframe](references/features-cms-iframe.md) |
| Pin | PIN Setup, Reset, Change, Reset PIN Retry Counter | [features-cms-pin](references/features-cms-pin.md) |
| Visa In-App Provisioning | Apple Pay, Google Pay provisioning | [features-cms-visa-in-app](references/features-cms-visa-in-app.md) |
| Transaction Simulation | Staging-only simulate transactions | [features-transaction-simulation](references/features-transaction-simulation.md) |
| Unassigned Card Batch Transfer | Create, Get All, Get Single batch | [features-cms-batch-transfer](references/features-cms-batch-transfer.md) |

More detail: [Official API Reference](https://docs.straitsx.com/v1-CARDS/reference).

## External links

- [Card Issuing API docs](https://docs.straitsx.com/v1-CARDS/docs/introduction)
- [API Reference](https://docs.straitsx.com/v1-CARDS/reference/remote-host-authorization)
