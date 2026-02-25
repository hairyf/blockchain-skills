---
name: straitsx-cms-transaction
description: StraitsX CMS Transaction — Get Card Transaction List, Get Card/Issuer/Transaction Detail, Get Total Transaction Amount.
---

# Transaction API (CMS)

All paths under `/api/v1/issuing_plans/{issuing_plan_opaque_id}`. All requests require `Authorization: Bearer <token>`. Amounts: `account_amount`/`account_currency` = card currency; `amount`/`currency` = issuer currency (typically SGD); `original_amount`/`original_currency` = acquirer.

## Get Card Transaction List

- **Path:** `GET .../users/{customer_opaque_id}/cards/{contract_opaque_id}/transactions`
- **Query:** `page[size]`, `page[number]`, `sort` (-createdAt | +createdAt), `transaction_type`, `show_final_transactions_only` (see docs), date filters as per reference.
- **Response 200:** Paginated list of transactions for the card.

## Get Card Transaction Detail

- **Path:** `GET .../users/{customer_opaque_id}/cards/{contract_opaque_id}/transactions/{transaction_id}` (or similar).
- **Response 200:** Single transaction details.

## Get Issuer Transaction List

- **Path:** `GET .../transactions` (issuer-level). Query: pagination, sort, filters.
- **Response 200:** Paginated list across the issuer plan.

## Get Transaction Detail

- **Path:** `GET` endpoint for a single transaction by ID (issuer-level).
- **Response 200:** Transaction object (amount, currency, type, status, merchant, etc.).

## Get Total Transaction Amount

- **Path:** `GET` endpoint for total transaction amount (e.g. by card or issuer, with filters).
- **Query:** Often supports date range, transaction_type, etc.
- **Response 200:** Aggregated amount(s).

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/get-card-transaction-list
- https://docs.straitsx.com/v1-CARDS/reference/get-card-transaction-detail
- https://docs.straitsx.com/v1-CARDS/reference/get-issuer-transaction-list
- https://docs.straitsx.com/v1-CARDS/reference/get-transaction-detail
- https://docs.straitsx.com/v1-CARDS/reference/get-total-transaction-amount
-->
