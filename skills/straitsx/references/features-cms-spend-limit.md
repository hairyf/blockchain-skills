---
name: straitsx-cms-spend-limit
description: StraitsX CMS Spend Limit — Create, Get, Update, Delete Card Spending Limit; path, body, response, curl.
---

# Spend Limit API

Base path: `/api/v1/issuing_plans/{issuing_plan_opaque_id}/users/{customer_opaque_id}/cards/{contract_opaque_id}/limit`. All requests require `Authorization: Bearer <token>`.

- **velocity_window:** `DAY` | `WEEK` | `MONTH` | `YEAR` | `LIFETIME` | `TRANSACTION` (per-transaction limit). Week/month start at GMT+7 00:00; week start day is from Issuer Plan `is_start_of_week_sunday`.
- **transaction_type:** `PURCHASE` | `ATM_CASH_WITHDRAWAL`. ATM supports only DAY and MONTH velocity and has max limits (see docs).

## Create Card Spending Limit

- **Path:** `POST .../limit`
- **Body (required):** `amount_limit` (number), `currency_code` (ISO 4217, e.g. SGD, USD), `velocity_window`, `transaction_type` (optional, default PURCHASE)
- **Response 200:** `amount_limit`, `currency_code`, `velocity_window`, `transaction_type`, `active`, etc.

## Get Card Spending Limit

- **Path:** `GET .../limit`
- **Response 200:** `limits[]` — each with `transaction_type`, `amount_limit`, `velocity_window`, `currency_code`, `active`

```bash
curl --request GET \
  --url "https://merchant.cop-staging.straitsx.com/api/v1/issuing_plans/{issuing_plan_opaque_id}/users/{customer_opaque_id}/cards/{contract_opaque_id}/limit" \
  --header 'accept: application/json' \
  --header 'authorization: Bearer TOKEN'
```

## Update Card Spending Limit

- **Path:** `PUT .../limit`
- **Body (required):** `amount_limit`, `currency_code`, `velocity_window`, `transaction_type` (same as above)
- **Response 200:** Updated limit object

## Delete Card Spending Limit

- **Path:** `DELETE .../limit`
- **Body (required):** `velocity_window`, `transaction_type` (identifies which limit to remove)
- **Response 200:** Success. Errors if no such limit exists.

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/create-spend-limit
- https://docs.straitsx.com/v1-CARDS/reference/get-spend-limit
- https://docs.straitsx.com/v1-CARDS/reference/update-spend-limit
- https://docs.straitsx.com/v1-CARDS/reference/delete-spend-limit
-->
