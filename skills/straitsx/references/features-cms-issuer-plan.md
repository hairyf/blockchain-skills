---
name: straitsx-cms-issuer-plan
description: StraitsX CMS Issuer Plan — Create, Update, Get Issuer Plan Card List; path, body, response, and curl examples.
---

# Issuer Plan API

Base URL path prefix: `/api/v1`. All requests require `Authorization: Bearer <token>`. Staging: `https://merchant.cop-staging.straitsx.com`.

## Create Issuer Plan

- **Method/Path:** `POST /api/v1/issuing_plans`
- **Body (required):**
  - `is_start_of_week_sunday` (boolean, required) — Week start: true = Sunday, false = Monday; used for weekly spend limit calculation.
  - `permission_model` (string, required) — One of: `BUSINESS_PREPAID`, `CONSUMER_PREPAID`, `MODEL_A`, `MODEL_B`, `MODEL_C`, `MODEL_D`. Remote Host clients use `BUSINESS_PREPAID`.
  - `name` (string, optional) — Issuer plan name.
- **Response 200:** `is_start_of_week_sunday`, `name`, `opaque_id`, `permission_model`

```bash
curl --request POST \
  --url https://merchant.cop-staging.straitsx.com/api/v1/issuing_plans \
  --header 'accept: application/json' \
  --header 'authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{"is_start_of_week_sunday": true, "permission_model": "BUSINESS_PREPAID"}'
```

## Update Issuer Plan

- **Method/Path:** `PUT /api/v1/issuing_plans/{issuing_plan_opaque_id}`
- **Path params:** `issuing_plan_opaque_id` (required)
- **Body (all optional):** `is_start_of_week_sunday`, `name`, `permission_model` (same as above)
- **Response 200:** Same shape as Create

```bash
curl --request PUT \
  --url "https://merchant.cop-staging.straitsx.com/api/v1/issuing_plans/{issuing_plan_opaque_id}" \
  --header 'accept: application/json' \
  --header 'authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{"name": "new name"}'
```

## Get Issuer Plan Card List

- **Method/Path:** `GET /api/v1/issuing_plans/{issuing_plan_opaque_id}/cards`
- **Path params:** `issuing_plan_opaque_id` (required)
- **Query (optional):** `page[size]` (default 10), `page[number]` (default 1), `sort` (`-createdAt` | `+createdAt`), `status` (ACTIVE, INACTIVE, BLOCKED_BY_FRAUD, etc.), `show_encrypted_card_number`, `show_encrypted_cvv` (boolean), `has_sku` (boolean), `card_product_opaque_id`
- **Response 200:** `page`, `total_data`, `total_pages`, `data[]` (each with `opaque_id`, `truncated_card_number`, `status`, `card_type`, `latest_card_number.expiry_date`, etc.)

```bash
curl --request GET \
  --url "https://merchant.cop-staging.straitsx.com/api/v1/issuing_plans/{issuing_plan_opaque_id}/cards?page[size]=10&page[number]=1&sort=-createdAt" \
  --header 'accept: application/json' \
  --header 'authorization: Bearer TOKEN'
```

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/create-issuer-plan
- https://docs.straitsx.com/v1-CARDS/reference/update-issuer-plan
- https://docs.straitsx.com/v1-CARDS/reference/get-issuer-plan-card-list
-->
