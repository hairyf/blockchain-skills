---
name: straitsx
description: StraitsX Card Issuing API — CMS (users, cards, lifecycle), Remote Host Authorization, webhooks; use for integrating card issuance and transaction approval.
metadata:
  author: Anthony Fu
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
| Getting started | Flow from user creation to activation and RHA/webhook | [core-getting-started](references/core-getting-started.md) |
| Error responses | Error JSON format and error codes (4xx/5xx) | [core-errors](references/core-errors.md) |
| Pagination & sorting | page[size], page[number], sort query params | [core-pagination-sorting](references/core-pagination-sorting.md) |

## Features

### Card Management (CMS)

| Topic | Description | Reference |
|-------|-------------|-----------|
| Lifecycle APIs | Create User, Create Card, Activate Card paths and body | [features-cms-lifecycle](references/features-cms-lifecycle.md) |

### Remote Host & Webhooks

| Topic | Description | Reference |
|-------|-------------|-----------|
| RHA and Webhook | Authorization endpoint (approve/decline), webhook (events, signature, retry) | [features-rha-webhook](references/features-rha-webhook.md) |
| Transactions | Transaction types, auth vs webhook-only, balance updates | [features-transactions](references/features-transactions.md) |
| Transaction simulation | Staging-only simulator for testing RHA and webhook | [features-transaction-simulation](references/features-transaction-simulation.md) |
| Instant issuance & OOB | Instant card pool, OOB 3DS flow | [features-instant-issuance-oob](references/features-instant-issuance-oob.md) |

## Best practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Rejection and rate limit | rejection_reason codes, 429 handling and limits | [best-practices-rejection-rate-limit](references/best-practices-rejection-rate-limit.md) |

## External links

- [Card Issuing API docs](https://docs.straitsx.com/v1-CARDS/docs/introduction)
- [API Reference](https://docs.straitsx.com/v1-CARDS/reference/remote-host-authorization)
