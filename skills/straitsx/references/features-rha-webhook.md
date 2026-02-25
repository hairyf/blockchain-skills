---
name: straitsx-rha-webhook
description: StraitsX Remote Host Authorization and Webhook Notification — request/response schemas, error codes, event types, signature verification, retry policy.
---

# Remote Host Authorization and Webhook Notification

## Remote Host Authorization (your endpoint)

StraitsX **calls your** endpoint (e.g. `POST https://your-url.com/api/v1/authorization`) with the authorization request. You must respond with approve (200) or reject (400).

### Authentication

- StraitsX sends `Authorization: Bearer <apiKey>`. Use a **dedicated** API key (do not reuse the webhook signing secret). Reject any request without a valid Bearer token.
- Balance inquiries hit this endpoint at high volume; keep responses accurate and fast.

### Request body (from StraitsX)

| Field | Type | Description |
|-------|------|-------------|
| `amount` | string | Transaction amount; `0` for `balance_inquiry`. |
| `currency` | string | ISO 4217 (e.g. SGD, IDR). Omitted for balance_inquiry. |
| `transaction_type` | string | `deduction`, `oct`, `balance_inquiry`, `hold`, `completion`, `refund`. |
| `transaction_id` | string | Unique ID; echo back in approval response. |
| `card_opaque_id` | string | Card Opaque ID. |
| `customer_opaque_id` | string | User Opaque ID. |
| `metadata` | object | Optional ISO8583-derived data (e.g. `recommended_hold_amount` for hold, `completion_amount`, `payment_token_type`). |

### Approve (200)

Return JSON with a `balances` object:

- `currency_code` (string, required) — ISO 4217.
- `ledger_balance` (string, required) — Total balance including pending.
- `available_balance` (string, required) — Spendable balance.
- `transaction_id` (string, required) — Same as in the request.
- `remarks` (string, optional).

### Reject (400)

Return JSON with:

- `error_code` (required): `CARD0000` Internal Server Error, `CARD0001` Insufficient Balance, `CARD0002` Duplicate Transaction ID, `CARD0003` Transaction Not Found, `CARD0004` Card Not Found, `CARD0005` Unauthorized, `CARD0006` Card Restrictions.
- `message`, `description` (optional).

---

## Webhook Notification (your endpoint)

StraitsX **POSTs** to your webhook URL (e.g. `https://your-url.com/api/v1/webhook`) with event payloads. **Always verify the signature** before processing.

### Signature verification

- Header: `X-COP-Signature-256: sha256={HMAC of raw request body with shared secret}`.
- Reject the request if the signature is invalid or missing.

### Timeout and retry (event_type=transaction)

- **Timeout:** 10 seconds per attempt. If you do not respond within 10s, the attempt is treated as failed.
- **Retries:** Up to 11 attempts with delays: 1s, 2s, 4s, 8s, then 10m×3, 1h×3, 3h.

### Event types

| event_type | Description |
|------------|-------------|
| `transaction` | Final outcome. If you approved but webhook says rejected, revert the transaction. Use `rejection_reason` when `rejected`. |
| `otp_notification` | User requested OTP; relay to your user. |
| `card_spend_limit` | User reached card spending limit. |
| `insufficient_balance` | Transaction failed due to insufficient balance. |
| `reconciliation_success` | List of transactions matched between clearing file and live records. |
| `reconciliation_manual_adjustment` | Discrepancy; adjust (deduct/refund) per recommended action. |
| `pre_authorization_release` | Hold on preauth amount released. |
| `card_token_passcode` | Passcode for card token authentication. |
| `card_delivery` | Card delivery status. |
| `oob_notification` | Out-of-band auth requested; use with Obtain OOB API. |
| `card_token_provisioned` | Token provisioned successfully. |
| `card_token_provisioning_failed` | Token provisioning failed. |
| `card_token_status_changed` | Token status changed (e.g. ACTIVE, SUSPENDED, DEACTIVATED). |
| `settlement_account_topup` | Settlement account top-up success. |
| `settlement_summary` | Daily settlement summary. |
| `settlement_offset` | Settlement offset (credits/debits). |

For `transaction`, `transaction_type` values include: `deduction`, `oct`, `balance_inquiry`, `hold`, `completion`, `reversal`, `partial_reversal`, `debit_verify`. Respond with 2xx quickly so StraitsX does not retry unnecessarily.

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/remote-host-authorization
- https://docs.straitsx.com/v1-CARDS/reference/webhook-notification
-->
