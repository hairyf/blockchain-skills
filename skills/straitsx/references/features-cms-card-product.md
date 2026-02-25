---
name: straitsx-cms-card-product
description: StraitsX CMS Card Product — Link Issuer Plan with Card Product, Get Card Product List, Create Card Product, Get Merchant BINs, Card Art List.
---

# Card Product API

Base path: `/api/v1/issuing_plans/{issuing_plan_opaque_id}`. All requests require `Authorization: Bearer <token>`.

## Link Issuer Plan with Card Product

- **Path:** `POST .../card_products/{card_product_opaque_id}/link`
- **Purpose:** After linking, the card product can be used for card creation.
- **Response 200:** Success.

## Get Card Product List

- **Path:** `GET .../card_products`
- **Response 200:** `card_products[]` — each with `opaque_id`, `name`, `card_type`. Empty if the issuer plan was created but no card products are linked yet.

```bash
curl --request GET \
  --url "https://merchant.cop-staging.straitsx.com/api/v1/issuing_plans/{issuing_plan_opaque_id}/card_products" \
  --header 'accept: application/json' \
  --header 'authorization: Bearer TOKEN'
```

## Create Card Product

- **Path:** `POST .../card_products` (or as per StraitsX setup; confirm path in dashboard/docs).
- **Body:** Product definition (name, card type, etc.). See official reference for full params.

## Get Merchant BINs List

- **Path:** `GET .../card_products/.../bins` or similar (see API reference). Returns BINs available for the merchant.

## Card Art List

- **Path:** `GET` endpoint for card arts (see API reference). Returns available card art `opaque_id`s for use in Create Card (`card_art_opaque_id`).

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/link-issuer-plan-with-card-product
- https://docs.straitsx.com/v1-CARDS/reference/get-card-product-list
- https://docs.straitsx.com/v1-CARDS/reference/create-card-product
- https://docs.straitsx.com/v1-CARDS/reference/get-merchant-bins-list
- https://docs.straitsx.com/v1-CARDS/reference/card-arts
-->
