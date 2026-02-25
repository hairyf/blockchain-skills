---
name: straitsx-cms-batch-transfer
description: StraitsX Unassigned Card Batch Transfer — Create, Get All, Get Single batch transfer for unassigned cards.
---

# Unassigned Card Batch Transfer API

For requesting batches of unassigned (instant-issuance) cards. Base path: `/api/v1/issuing_plans/{issuing_plan_opaque_id}/card_products/{card_product_opaque_id}`. All requests require `Authorization: Bearer <token>`. Batches are sent each **Tuesday 4pm SGT**.

## Create Unassigned Card Batch Transfer

- **Path:** `POST .../unassigned_card_batch_transfers`
- **Body (required):**
  - `requested_quantity` (integer) — Number of unassigned cards (1–1000). Must not exceed merchant daily limit (e.g. 1000/day).
  - `region` (string) — Alpha-2 region code for embossing routing (e.g. HK, SG, ID).
  - `address` (object) — Delivery address for the batch (no special characters <, >, &, etc.; Latin symbols not allowed).
- **Response 200:** `opaque_id`, `requested_quantity`, `embossing_file_name`, `region`. 429 if too many requests.

```bash
curl --request POST \
  --url "https://merchant.cop-staging.straitsx.com/api/v1/issuing_plans/{issuing_plan_opaque_id}/card_products/{card_product_opaque_id}/unassigned_card_batch_transfers" \
  --header 'accept: application/json' \
  --header 'authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{"requested_quantity": 10, "region": "SG", "address": {...}}'
```

## Get All Batch Transfers

- **Path:** `GET .../unassigned_card_batch_transfers` (or issuer-level list endpoint). Query: pagination, sort.
- **Response 200:** List of batch transfers with status and details.

## Get Single Batch Transfer Details

- **Path:** `GET .../unassigned_card_batch_transfers/{batch_opaque_id}` (or similar).
- **Response 200:** Single batch transfer details (opaque_id, requested_quantity, status, embossing_file_name, region, etc.).

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/create-unassigned-card-batch-transfer
- https://docs.straitsx.com/v1-CARDS/reference/get-all-unassigned-card-batch-transfer
- https://docs.straitsx.com/v1-CARDS/reference/get-unassigned-card-batch-transfer-details
-->
