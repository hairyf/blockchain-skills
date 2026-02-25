---
name: straitsx-instant-oob
description: StraitsX — Instant card issuance and OOB (out-of-band) 3DS flow.
---

# Instant issuance and OOB 3DS

## Instant Card Issuance

StraitsX provides a dedicated **product opaque ID** for instant issuance. Use it in Create Card to issue cards that can be activated and used immediately (no `card_activation_ready` / `iframe_ready` webhook delay).

- Response includes `remaining_card_in_pool`. If pool is empty, Create Card returns `XFC400068 card pool is empty` (400). StraitsX manages the pool; monitor remaining count.
- Card status flow is the same (INACTIVE → activate via API).

## OOB (Out-of-Band) 3DS

For 3DS, user can approve via app (e.g. biometrics) instead of OTP on 3DS page. Flow: user checks out → 3DS starts → ACS shows “approve in app” → StraitsX sends `oob_notification` webhook → your app prompts user → your app calls **Obtain OOB** API with result (approved/rejected) → user clicks Finish on 3DS page. Use `transaction_id` and `authentication_id` from webhook to call Obtain OOB. For adding card, `acquirer_amount` is zero.

<!--
Source references:
- .bonfire/cache/straitsx/instant-card-issuance.md, oob-flow.md
- https://docs.straitsx.com/v1-CARDS/docs/instant-card-issuance
- https://docs.straitsx.com/v1-CARDS/docs/oob-flow
-->
