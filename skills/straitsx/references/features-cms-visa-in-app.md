---
name: straitsx-cms-visa-in-app
description: StraitsX Visa In-App Provisioning — Apple Pay and Google Pay in-app provisioning endpoints.
---

# Visa In-App Provisioning API

Enables users to add the card to Apple Pay or Google Pay from your app. Base path under `/api/v1/issuing_plans/{issuing_plan_opaque_id}`; all requests require `Authorization: Bearer <token>`.

## Apple Pay In-App Provisioning

- **Path:** `POST` endpoint for Apple Pay provisioning (see reference; typically under users/cards or token resource).
- **Body:** Apple Pay provisioning payload (device data, nonce, etc. as per Visa/Apple docs).
- **Response 200:** Provisioning result; on success the card is added to the user’s Apple Wallet.

## Google Pay In-App Provisioning

- **Path:** `POST` endpoint for Google Pay provisioning.
- **Body:** Google Pay provisioning payload (token requestor, device data, etc. as per Visa/Google docs).
- **Response 200:** Provisioning result; on success the card is added to Google Pay.

Webhook `card_token_provisioned` notifies you when provisioning succeeds; `card_token_provisioning_failed` when it fails.

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/applepay-in-app-provisioning
- https://docs.straitsx.com/v1-CARDS/reference/googlepay-in-app-provisioning
-->
