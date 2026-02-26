---
name: straitsx-rejection-rate-limit
description: StraitsX — Transaction rejection reasons and API rate limits for robust integration.
---

# Rejection reasons and rate limits

## Transaction rejection_reason (webhook)

When webhook `event_type=transaction` and `transaction_status=rejected`, use `rejection_reason` for classification. Key codes:

- **Balance/limits:** `INSUFFICIENT_BALANCE`, `INSUFFICIENT_SPENDABLE_BALANCE`, `CARD_LIMIT_EXCEEDED`, `VIAA_LIMIT_EXCEEDED`
- **Card/contract:** `ACCOUNT_NOT_FOUND`, `CARD_IS_NOT_PRESENT`, `CARD_TOKEN_NOT_PRESENT`, `CONTRACT_NOT_PRESENT`, `CARD_IS_INACTIVE`, `CARD_IS_LOST`, `CARD_IS_STOLEN`, `CARD_IS_SUSPENDED`, `CARD_IS_BLOCKED_BY_FRAUD`, `CARD_IS_PERM_BLOCK`, `CARD_IS_INVALID`, `CARD_TOKEN_SUSPENDED`, `CARD_TOKEN_INACTIVE`, `CARD_TOKEN_DEACTIVATED`, `CARD_TOKEN_HAS_EXPIRED`
- **Restrictions:** `CARD_RESTRICTIONS`, `TRANSACTION_NOT_PERMITTED`, `FRAUD_NOT_PERMITTED_TO_TERMINAL`
- **Idempotency/duplicates:** `DUPLICATE_TRANSACTION`, `ORIGINAL_TRANSACTION_NOT_FOUND`
- **System:** `CBS_IS_NOT_AVAILABLE`, `ERRORS_IN_SOFTWARE`
- **Validation:** `CVV2_VALIDATION_FAILED`, `CAVV_VALIDATION_FAILED`, `TRACK_2_VALIDATION_FAILED`, `CRYPTOGRAM_VALIDATION_FAILED`, `PIN_VALIDATION_FAILED`, `TOO_MANY_CONSECUTIVE_PIN_FAILURES`, `PIN_NOT_CONFIGURED`
- **Other:** `UNKNOWN`

Use these to map to user-facing messages or internal handling. When card not found, `acquirer_currency`, `card_opaque_id`, `cbs_transaction_id`, `currency` may be `""` and amounts `"0.00"`.

## CMS rate limits

- **429 response:** `code: "XFC429001"`, `message: "Too many requests"`. Implement retry with exponential backoff and jitter.
- **Production:** Default 1000 RPM; Get Card Transaction List / Get Transaction Detail 500 RPM (Transaction Detail has 2500 burst). Create Unassigned Card Batch Transfer: 1 per 30 minutes.
- **Sandbox:** Default 500 RPM; Create Unassigned Card Batch Transfer: 1 per 15 minutes.

<!--
Source references:
- .bonfire/cache/straitsx/transaction-rejection-reasons.md, rate-limit.md
- https://docs.straitsx.com/v1-CARDS/docs/transaction-rejection-reasons
- https://docs.straitsx.com/v1-CARDS/docs/rate-limit
-->
