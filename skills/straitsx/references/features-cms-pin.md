---
name: straitsx-cms-pin
description: StraitsX CMS Pin — PIN Setup, PIN Reset, PIN Change, Reset PIN Retry Counter (server-side; alternative to iframe).
---

# Pin API (server-side)

Base path: `/api/v1/issuing_plans/{issuing_plan_opaque_id}/users/{customer_opaque_id}/cards/{contract_opaque_id}`. All requests require `Authorization: Bearer <token>`. For PCI DSS, PIN setup with encrypted PIN typically requires certification; otherwise use the iframe URLs (see [features-cms-iframe](features-cms-iframe.md)).

## PIN Setup

- **Path:** `POST .../pin/setup`
- **Body:** Encrypted PIN value (format as per StraitsX/PCI DSS docs).
- **Response 200:** Success. Use only if PCI DSS certified; else use PIN Setup Iframe.

## PIN Reset

- **Path:** `PUT .../pin/reset` (or similar). Body: parameters required for reset (e.g. new encrypted PIN, verification).
- **Response 200:** Success.

## PIN Change

- **Path:** `PUT .../pin/change`. Body: current and new PIN (encrypted as required).
- **Response 200:** Success.

## Reset PIN Retry Counter

- **Path:** `PUT` endpoint for resetting the PIN retry counter (e.g. after too many failed attempts). Unlocks PIN attempts for the card.
- **Response 200:** Success.

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/pin-setup
- https://docs.straitsx.com/v1-CARDS/reference/pin-reset
- https://docs.straitsx.com/v1-CARDS/reference/pin-change
- https://docs.straitsx.com/v1-CARDS/reference/reset-pin-retry-counter
-->
