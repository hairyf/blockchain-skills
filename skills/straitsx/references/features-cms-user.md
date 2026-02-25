---
name: straitsx-cms-user
description: StraitsX CMS User — Create User, Update User, Get User List, Get User Detail, Get User Card List; path, body, response, curl.
---

# User API

Base path: `/api/v1/issuing_plans/{issuing_plan_opaque_id}`. All requests require `Authorization: Bearer <token>`.

## Create User

- **Path:** `POST .../users`
- **Body:** `customer_name` (string, required). Remote Host also requires: `kyc_full_name`, `date_of_birth` (YYYY/MM/DD), `nationality` (alpha-2). Optional: `email`, `kyc_proof` (object).
- **Response 200:** `user.opaque_id` — use as `customer_opaque_id` for all subsequent calls (Create Card, Activate, etc.).

```bash
curl --request POST \
  --url "https://merchant.cop-staging.straitsx.com/api/v1/issuing_plans/{issuing_plan_opaque_id}/users" \
  --header 'accept: application/json' \
  --header 'authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{"customer_name": "John Doe", "kyc_full_name": "John Doe", "date_of_birth": "1990/01/01", "nationality": "SG"}'
```

## Update User

- **Path:** `PUT .../users/{customer_opaque_id}`
- **Body (optional):** `customer_name`, `kyc_full_name`, `date_of_birth`, `nationality`, `email`, `kyc_proof`
- **Response 200:** Updated user object

## Get User List

- **Path:** `GET .../users`
- **Query:** `page[size]`, `page[number]`, `sort` (-createdAt | +createdAt)
- **Response 200:** Paginated user list with `opaque_id` and user fields

## Get User Detail

- **Path:** `GET .../users/{customer_opaque_id}`
- **Response 200:** Single user details

## Get User Card List

- **Path:** `GET .../users/{customer_opaque_id}/cards`
- **Query:** `page[size]`, `page[number]`, `sort`, `status`, `show_encrypted_card_number`, `show_encrypted_cvv`, etc.
- **Response 200:** Paginated list of cards for that user

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/create-user
- https://docs.straitsx.com/v1-CARDS/reference/update-user
- https://docs.straitsx.com/v1-CARDS/reference/get-user-list
- https://docs.straitsx.com/v1-CARDS/reference/get-user-detail
- https://docs.straitsx.com/v1-CARDS/reference/get-user-card-list
-->
