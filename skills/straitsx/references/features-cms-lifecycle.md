---
name: straitsx-cms-lifecycle
description: StraitsX CMS — Create User, Create Card, Activate Card paths, body, and key responses.
---

# CMS lifecycle APIs (summary)

Base path: `/api/v1/issuing_plans/{issuing_plan_opaque_id}`. All require `Authorization: Bearer <token>`.

## Create User

- **Path:** `POST .../users`
- **Body:** `customer_name` (required). Remote Host: also `kyc_full_name`, `date_of_birth` (YYYY/MM/DD), `nationality` (alpha-2). Optional: `email`, `kyc_proof`.
- **Response:** `user.opaque_id` → use as `customer_opaque_id` everywhere.

## Create Card

- **Path:** `POST .../users/{customer_opaque_id}/cards`
- **Body (required):** `card_product_opaque_id`, `cardholder_name`, `cardholder_first_name`, `cardholder_surname`, `contact_number`, `funding_source`, `address` (country, region, city, street, house, postal_code).
- **Response:** `card.opaque_id` (contract_opaque_id), `truncated_card_number`, `card_type`, `card_status` (INACTIVE), `latest_card_number.opaque_id`, `latest_card_number.expiry_date`. For instant issuance: `remaining_card_in_pool`.

## Activate Card

- **Path:** `POST .../users/{customer_opaque_id}/cards/{contract_opaque_id}/activate`
- **Body:** `truncated_card_number`, `expiry_date` (MM/YY).
- **Response:** `card.status` ACTIVE.

Other CMS endpoints (same path style): enroll 3DS, PIN setup iframe, update card status, close card, create spend limit, update card configuration, request card for printing. See API reference for path and body details.

<!--
Source references:
- .bonfire/cache/straitsx/reference-create-user.md, reference-create-card.md, reference-activate-card.md
- https://docs.straitsx.com/v1-CARDS/reference/create-user
- https://docs.straitsx.com/v1-CARDS/reference/create-card
- https://docs.straitsx.com/v1-CARDS/reference/activate-card
-->
