---
name: straitsx-transactions
description: StraitsX — Transaction types, authorization vs webhook-only flows, and when to adjust balance.
---

# Transaction types and flows

## Transaction types (RHA and webhook)

| Type | Description |
|------|-------------|
| deduction | Purchase; you approve/decline via RHA. Then clearing webhook. |
| oct | Original credit (money to cardholder); approve via RHA. |
| balance_inquiry | ATM/balance check; no money movement. RHA required (high volume). |
| hold | Pre-auth; reserve amount. Then completion to release. |
| completion | Completes a prior hold. |
| refund | Merchant refund after clear; **webhook only** (no RHA). Adjust balance from webhook. |
| reversal | Cancel after auth, before clear; **webhook only** (Visa requires approve). Adjust balance from webhook. |
| debit_verify | Zero-amount card check; **webhook only** (`type=debit_verify`). |

## When only webhook is sent (no RHA)

Reversals and refunds: StraitsX sends only a webhook. Use the webhook to update the cardholder balance. For reversal, if you had approved the original auth, deduct the reversed amount (or reverse the deduction).

## Hold and completion

Approve hold with available/ledger balance; when completion arrives, approve with the completion amount. Clearing webhook follows. Pre-auth can auto-release; you may receive `pre_authorization_release` webhook.

## Amounts

- **Acquirer amount/currency:** From merchant side. **Issuer amount:** Settled with Visa (SGD). **Account amount/currency:** Charged to cardholder (default SGD). Use account amount for balance updates.

<!--
Source references:
- .bonfire/cache/straitsx/transaction-type.md, case-by-case.md
- https://docs.straitsx.com/v1-CARDS/docs/transaction-type
- https://docs.straitsx.com/v1-CARDS/docs/case-by-case
-->
