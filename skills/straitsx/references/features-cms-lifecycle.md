---
name: straitsx-cms-lifecycle
description: StraitsX CMS Create User, Create Card, Activate Card — path, body, response, and curl examples.
---

# CMS Lifecycle APIs

Base path: `/api/v1/issuing_plans/{issuing_plan_opaque_id}`. All requests require `Authorization: Bearer <token>`. Staging: `https://merchant.cop-staging.straitsx.com`.

## Create User

- **Path:** `POST .../users`
- **Body:** `customer_name` (string, required). Remote Host also requires: `kyc_full_name`, `date_of_birth` (YYYY/MM/DD), `nationality` (alpha-2). Optional: `email`, `kyc_proof` (object).
- **Response 200:** `user.opaque_id` — this is `customer_opaque_id` for all subsequent calls.

```bash
curl --request POST \
  --url "https://merchant.cop-staging.straitsx.com/api/v1/issuing_plans/{issuing_plan_opaque_id}/users" \
  --header 'accept: application/json' \
  --header 'authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{"customer_name": "John Doe", "kyc_full_name": "John Doe", "date_of_birth": "1990/01/01", "nationality": "SG"}'
```

## Create Card

- **Path:** `POST .../users/{customer_opaque_id}/cards`
- **Body (required):** `card_product_opaque_id`, `cardholder_name`, `cardholder_first_name`, `cardholder_surname`, `contact_number`, `funding_source` (e.g. `remote-host`), `address` (country, region, city, street, house, postal_code).
- **Body (optional):** `cardholder_second_name`, `card_is_primary`, `account_currency` (SGD | USD), `card_art_opaque_id`, `stock_keeping_code` (for physical pool).
- **Query (optional):** `show_encrypted_card_number`, `show_encrypted_cvv` (boolean; PCI DSS).
- **Response 200:** `card.opaque_id` (contract_opaque_id), `truncated_card_number`, `card_type`, `card_status` (INACTIVE), `latest_card_number.opaque_id`, `latest_card_number.expiry_date` (MM/YY). For instant issuance: `remaining_card_in_pool`.

## Activate Card

- **Path:** `POST .../users/{customer_opaque_id}/cards/{contract_opaque_id}/activate`
- **Body (required):** `truncated_card_number`, `expiry_date` (MM/YY; must match Create Card response).
- **Response 200:** `card.status` becomes ACTIVE.

Other CMS endpoints (3DS, PIN iframe, Update Card Status, Close Card, Spend Limit, Card Configuration, Request Card for Printing, etc.) are in the corresponding references: [features-cms-user](features-cms-user.md), [features-cms-spend-limit](features-cms-spend-limit.md), [features-cms-card](features-cms-card.md); call patterns in [core-usage-patterns](core-usage-patterns.md).

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/create-user
- https://docs.straitsx.com/v1-CARDS/reference/create-card
- https://docs.straitsx.com/v1-CARDS/reference/activate-card
-->
