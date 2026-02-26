---
name: straitsx-cms-accounting
description: StraitsX CMS Accounting — Get Card Spending, Get Settlement Account Balance, Get Spendable Account Balance, Get VISA Currency Exchange Rates.
---

# Accounting API

Base path: `/api/v1/issuing_plans/{issuing_plan_opaque_id}`. All requests require `Authorization: Bearer <token>`.

## Get Card Spending

- **Path:** `GET .../bulk/spendings`
- **Query (required):** `card_opaque_id[]` (array of card opaque IDs), `velocity_window` (DAY | WEEK | MONTH | YEAR | LIFETIME).
- **Response 200:** `data[]` with `card_opaque_id`, `velocity_window`, `amount`, `currency` (ISO 4217). Order of `card_opaque_id` in query is non-deterministic in response.

## Get Settlement Account Balance

- **Path:** `GET` endpoint for settlement account balance (see reference).
- **Response 200:** Settlement balance (currency, amount).

## Get Spendable Account Balance

- **Path:** `GET` endpoint for spendable account balance.
- **Response 200:** Spendable balance available for funding/issuing.

## Get VISA Currency Exchange Rates

- **Path:** `GET` endpoint for VISA FX rates (see reference).
- **Response 200:** Exchange rates used for currency conversion (e.g. for international transactions or USD accounts).

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/get-card-spending
- https://docs.straitsx.com/v1-CARDS/reference/get-settlement-account-balance
- https://docs.straitsx.com/v1-CARDS/reference/get-spendable-account-balance
- https://docs.straitsx.com/v1-CARDS/reference/get-visa-currency-exchange-rates
-->
