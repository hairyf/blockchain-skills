---
name: straitsx-cms-iframe
description: StraitsX CMS Iframe URLs — PIN Setup/Reset/Change, Card Iframe, CVV Iframe (preview and details).
---

# Iframe API (URLs for embedding)

All paths under `/api/v1/issuing_plans/{issuing_plan_opaque_id}/users/{customer_opaque_id}/cards/{contract_opaque_id}`. All requests require `Authorization: Bearer <token>`. These endpoints return **iframe URLs** to embed in your web or mobile app. You must provide a template for the PIN flow appearance before using PIN iframes.

## PIN Setup Iframe URL

- **Path:** `GET .../iframe/pin_setup`
- **Response 200:** URL to embed for PIN setup.

## PIN Reset Iframe URL

- **Path:** `GET .../iframe/pin_reset` (or similar).
- **Response 200:** URL for PIN reset flow.

## PIN Change Iframe URL

- **Path:** `GET .../iframe/pin_change` (or similar).
- **Response 200:** URL for PIN change flow.

## Card Iframe URL

- **Path:** `GET` endpoint for card iframe (display card details in iframe).
- **Response 200:** Embeddable card iframe URL.

## CVV Iframe — Card Preview

- **Path:** `GET` endpoint for CVV iframe (preview). Use for showing CVV in a secure iframe.
- **Response 200:** CVV preview iframe URL.

## CVV Iframe — Card Details

- **Path:** `GET` endpoint for CVV iframe (full details). PCI DSS considerations apply; see docs.
- **Response 200:** CVV details iframe URL.

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/pin-setup-iframe
- https://docs.straitsx.com/v1-CARDS/reference/pin-reset-iframe
- https://docs.straitsx.com/v1-CARDS/reference/pin-change-iframe
- https://docs.straitsx.com/v1-CARDS/reference/card-iframe
- https://docs.straitsx.com/v1-CARDS/reference/cvv-iframe-preview
- https://docs.straitsx.com/v1-CARDS/reference/cvv-iframe
-->
