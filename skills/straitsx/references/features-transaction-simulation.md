---
name: straitsx-transaction-simulation
description: StraitsX — Staging-only transaction simulator for testing RHA and webhook integration.
---

# Transaction simulation (staging only)

The **Transaction Simulation API** lets you trigger cardholder-like transactions in **staging only**. Use it to validate RHA and webhook behavior without real card usage.

## Endpoint

- **Path:** `POST /api/v1/issuing_plans/{issuing_plan_opaque_id}/users/{customer_opaque_id}/cards/{contract_opaque_id}/simulate_transactions`
- **Body (required):** `type` (string) — e.g. `ecom_authorization`, `pos_authorization`, `reversal`, `preauthorization_hold`, `preauthorization_completion`, `original_credit_transaction`, `atm_balance_inquiry`, etc.
- **Body (optional):** `issuer_amount` (float), `issuer_currency` (default SGD), `mid` (default 123456789123456), `mcc` (default 5999), `merchant_name` (default SIMULATOR), `merchant_location` (default SINGAPORE), `merchant_country_code` (default SG), `original_transaction_id` (required for reversal, partial_reversal, preauth completion/release).
- **Response 200:** `type`, `transaction_id`, `rrn`, etc. StraitsX then sends RHA request and webhook.

## Flow

1. Create a card in staging.
2. Call the simulate_transactions endpoint with `type`, amount, and optional merchant fields.
3. StraitsX sends an authorization request to your RHA endpoint and then a webhook notification; verify both.

## Simulation types (examples)

| type | Description |
|------|-------------|
| pos_authorization | Physical POS (e.g. restaurant, store). |
| ecom_authorization | Online (e.g. e‑commerce, subscriptions). |
| incremental_authorization | Add amount to a prior auth; include `original_transaction_id`. |
| reversal, partial_reversal | Undo (full or partial) prior auth. |
| atm_cash_withdrawal | ATM cash out. |
| atm_balance_inquiry | ATM balance check. |
| preauthorization_hold | Hold funds (e.g. hotel). |
| preauthorization_release | Release hold. |
| preauthorization_completion | Settle hold (final amount). |
| original_credit_transaction | Credit to card (e.g. payouts). |
| oob_authentication | OOB 3DS. |
| clearing_matched, clearing_offline_refund, clearing_offline_deduction, clearing_partial_adjustment | Clearing flows. |

## Request shape

- **amount**, **currency**: From acquirer perspective; in RHA/webhook they appear as `acquirer_amount`, `acquirer_currency`. Omit `currency` for SGD.
- Optional: `merchant_name`, `merchant_location`, `merchant_country_code`, `mid`, `mcc`, `original_transaction_id` (for incremental/reversal).

Example (e‑commerce, cross‑border):

```json
{
  "type": "ecom_authorization",
  "amount": 10.00,
  "currency": "USD",
  "merchant_name": "Spotify",
  "merchant_location": "STOCKHOLM",
  "merchant_country_code": "SE"
}
```

## Usage

Use simulation to regression-test RHA approve/decline logic and webhook handling (transaction, reconciliation, pre_authorization_release, etc.). Request a Postman collection from your StraitsX representative for full examples.

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/docs/transaction-simulation
- https://docs.straitsx.com/v1-CARDS/reference/simulate-transaction
-->
