---
name: straitsx-overview
description: StraitsX Card Issuing API — CMS and RHA overview, hosts, and when to use which API.
---

# StraitsX Card Issuing API overview

StraitsX Card Issuing APIs let you launch and manage a payment card program. The platform is PCI-DSS and PCI-3DS regulated.

## Two main APIs

| API | Purpose |
|-----|--------|
| **Card Management System (CMS)** | Create and manage users, cards, and card lifecycle (create user → create card → activate, 3DS enroll, PIN, status, spend limit, close). REST, JSON body. |
| **Remote Host Authorization (RHA)** | Your endpoint that receives authorization requests and returns approve/decline; plus webhook endpoint for transaction outcomes and other events. |

## CMS hosts

| Environment | Base URL |
|-------------|----------|
| Sandbox | `https://merchant.cop-staging.straitsx.com` |
| Production | `https://merchant.cop.straitsx.com` |

RHA and webhook URLs are **your** endpoints; StraitsX calls you. Use a dedicated API key for RHA (do not reuse webhook signing secret).

## When to use

- **Integrating card issuance**: Use CMS (create user, create card, activate, 3DS, PIN, update status/limits). Use same Bearer token from SSO for all CMS requests.
- **Handling live transactions**: Implement RHA (authorization endpoint) and webhook (notifications). Verify webhook with `X-COP-Signature-256` and respond within 10s to avoid retries.

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/docs/introduction
- https://docs.straitsx.com/v1-CARDS/docs/card-management-system-cms
- https://docs.straitsx.com/v1-CARDS/docs/remote-host-authorization-rha
-->
