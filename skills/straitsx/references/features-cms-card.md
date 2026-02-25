---
name: straitsx-cms-card
description: StraitsX CMS Card operations — Get Card Detail, Update Card Status, Close Card, Get Balance/Configuration, Update Config, Request Printing, Token list/status, Reissue.
---

# Card API (operations after create/activate)

Base path: `/api/v1/issuing_plans/{issuing_plan_opaque_id}/users/{customer_opaque_id}/cards/{contract_opaque_id}`. All requests require `Authorization: Bearer <token>`.

## Get Card Detail

- **Path:** `GET .../cards/{contract_opaque_id}` (under user path).
- **Response 200:** Card object (opaque_id, truncated_card_number, status, card_type, latest_card_number, etc.).

## Update Card Status

- **Path:** `PUT .../cards/{contract_opaque_id}` (or status subpath; see reference). Body typically includes `status` (e.g. SUSPENDED, ACTIVE). Some statuses (e.g. PERM_BLOCK) are permanent.

## Close Card

- **Path:** `DELETE .../cards/{contract_opaque_id}`. Permanently closes the card.

## Get Card Balance

- **Path:** `GET .../cards/{contract_opaque_id}/balance`.
- **Response 200:** Balance information (e.g. available, ledger) in account currency.

## Get Card Configuration

- **Path:** `GET .../cards/{contract_opaque_id}/configuration`.
- **Response 200:** Card configuration (e.g. limits, settings).

## Update Card Configuration

- **Path:** `PUT .../cards/{contract_opaque_id}/configuration`. Body: configuration fields to update.

## Request Card for Printing

- **Path:** `POST .../cards/{contract_opaque_id}/request_printing` (or similar). Triggers physical card production.

## Update Card Printing Delivery Address

- **Path:** `PUT` endpoint for delivery address. Body: address fields.

## Update Card Phone Number

- **Path:** `PUT` endpoint for card phone number. Body: contact number.

## Card Token

- **Get Token List:** `GET .../cards/{contract_opaque_id}/tokens` (or token subresource). Returns tokens (e.g. Apple Pay, Google Pay) for the card.
- **Update Card Token Status:** `PUT` to suspend/activate/deactivate a token.
- **Update Card Art:** `PUT` to change card art for a token.
- **Call Center Activation:** `PUT` for call-center activation flow.

## Reissue Card

- **Path:** `PUT .../cards/{contract_opaque_id}/reissue` (or similar). Issues a replacement card (e.g. lost/stolen); may require reason/address.

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/get-card-detail
- https://docs.straitsx.com/v1-CARDS/reference/update-card-status
- https://docs.straitsx.com/v1-CARDS/reference/close-card
- https://docs.straitsx.com/v1-CARDS/reference/get-card-balance
- https://docs.straitsx.com/v1-CARDS/reference/get-card-configuration
- https://docs.straitsx.com/v1-CARDS/reference/update-card-configuration
- https://docs.straitsx.com/v1-CARDS/reference/request-card-for-printing
- https://docs.straitsx.com/v1-CARDS/reference/update-card-printing-delivery-address
- https://docs.straitsx.com/v1-CARDS/reference/update-card-phone-number-1
- https://docs.straitsx.com/v1-CARDS/reference/get-token-list
- https://docs.straitsx.com/v1-CARDS/reference/update-card-token-status
- https://docs.straitsx.com/v1-CARDS/reference/update-card-art
- https://docs.straitsx.com/v1-CARDS/reference/reissue-card
-->
