---
name: straitsx-cms-oob
description: StraitsX OOB — Obtain out-of-band authentication; path, body, response for 3DS OOB flow.
---

# OOB (Out-of-Band Authentication) API

Used to complete out-of-band authentication (e.g. after user completes 3DS challenge). You receive `transaction_id` and `authentication_id` from the `oob_notification` webhook; call this API to submit the result.

## Obtain OOB

- **Path:** `POST /api/v1/issuing_plans/{issuing_plan_opaque_id}/oob/obtain`
- **Body (required):**
  - `transaction_id` (string) — From webhook.
  - `authentication_id` (string) — From webhook.
  - `authentication_result` (string) — `OK`, `FAILED`, `FAILED_ATTEMPT`, `NOT_FINISHED`, `ERROR`.
  - `authentication_method` (string) — `BIOMETRICS`, `LOGIN`, `OTHER`.
- **Body (optional):** `result_reason`, `entered_password`.
- **Response 200:** Success (empty or confirmation object).

```bash
curl --request POST \
  --url "https://merchant.cop-staging.straitsx.com/api/v1/issuing_plans/{issuing_plan_opaque_id}/oob/obtain" \
  --header 'accept: application/json' \
  --header 'authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{"transaction_id":"...","authentication_id":"...","authentication_result":"OK","authentication_method":"BIOMETRICS"}'
```

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/obtain-oob
-->
