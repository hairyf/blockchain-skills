---
name: straitsx-getting-started
description: StraitsX Card Issuing — end-to-end flow from setup to card activation and transaction testing.
---

# Getting started flow

## Prerequisites (from StraitsX)

- Authentication method (client id/secret for token).
- Issuer group, issuer plan, and card product. Use `issuing_plan_opaque_id` in path for all CMS requests; use `card_product_opaque_id` when creating cards.

## Typical flow

1. **Create user** — `POST .../issuing_plans/{issuing_plan_opaque_id}/users`. Response gives `user.opaque_id` → use as `customer_opaque_id`.
2. **Create card** — `POST .../users/{customer_opaque_id}/cards` with card product, cardholder name parts, contact, funding_source (e.g. `remote-host`), address. Response gives `card.opaque_id` (contract_opaque_id), `latest_card_number.opaque_id`, truncated number, expiry.
3. **Activate card** — After eligibility (e.g. one day for physical, or immediately for instant issuance), `POST .../cards/{contract_opaque_id}/activate` with `truncated_card_number` and `expiry_date` (MM/YY).
4. **Enroll 3DS** (recommended for e-commerce) — Enroll 3DS endpoint with authentication_method and destination (e.g. SMS_OTP).
5. **Set PIN** — Use PIN setup iframe API.
6. **Expose RHA + webhook** — Implement remote host authorization endpoint and webhook endpoint; share URL and (for webhook) signing secret with StraitsX. Then test in sandbox.

Later: update card status, close card, set spend limit, update card configuration via respective CMS APIs.

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/docs/getting-started
-->
