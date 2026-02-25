---
name: straitsx-rha-webhook
description: StraitsX RHA — Remote Host Authorization and Webhook Notification implementation for agents.
---

# Remote Host Authorization and Webhook

## Remote Host Authorization (your endpoint)

StraitsX calls **your** `POST /api/v1/authorization` (or your chosen path) with the authorization request. You must respond with approve or reject.

- **Auth:** StraitsX sends `Authorization: Bearer <api_key>`. Use a dedicated API key (not the webhook secret). Reject requests without valid Bearer.
- **Approve (200):** Return `transaction_id` (same as request), `available_balance`, `ledger_balance`, `currency_code`; optional `remarks`.
- **Reject (400):** Return `error_code` (required): `CARD0001` Insufficient Balance, `CARD0002` Duplicate Transaction ID, `CARD0003` Transaction Not Found, `CARD0004` Card Not Found, `CARD0005` Unauthorized, `CARD0006` Card Restrictions, `CARD0000` Internal Server Error. Optional `message`, `description`.

Request body includes `amount`, `currency`, `transaction_type` (deduction, oct, balance_inquiry, hold, completion, refund), `transaction_id`, `card_opaque_id`, `customer_opaque_id`, and optional `metadata`. Balance inquiries are high volume; keep response accurate and fast.

## Webhook Notification (your endpoint)

StraitsX sends **your** webhook with `event_type` and payload. Always verify signature before processing.

- **Verification:** Header `X-COP-Signature-256`: `sha256={hmac of request body with shared secret}`. Reject if invalid.
- **Respond quickly:** 10s timeout; for `event_type=transaction` they retry up to 11 times (1s, 2s, 4s, 8s, then 10m×3, 1h×3, 3h).
- **Event types:** `transaction` (final outcome — revert if you approved but webhook says rejected), `otp_notification`, `card_spend_limit`, `insufficient_balance`, `reconciliation_success`, `reconciliation_manual_adjustment`, `pre_authorization_release`, `card_token_passcode`, `oob_notification`, `settlement_*`, `card_token_*`, `card_delivery`. For `transaction` with `rejected`, use `rejection_reason` for classification.

<!--
Source references:
- .bonfire/cache/straitsx/reference-remote-host-authorization.md, reference-webhook-notification.md
- https://docs.straitsx.com/v1-CARDS/reference/remote-host-authorization
- https://docs.straitsx.com/v1-CARDS/reference/webhook-notification
-->
