---
name: straitsx-cms-3ds
description: StraitsX CMS 3DS — Enroll, Get 3DS Detail, Update 3DS auth method, Unenroll for card number.
---

# 3DS API

Base path: `/api/v1/issuing_plans/{issuing_plan_opaque_id}/users/{customer_opaque_id}/cards/{card_opaque_id}/card_numbers/{card_number_opaque_id}`. All requests require `Authorization: Bearer <token>`. Enroll card numbers for 3DS so that transactions requiring 3DS authentication can be completed.

## Enroll Card Number for 3DS

- **Path:** `POST .../3ds_enrollment`
- **Body (required):**
  - `authentication_method` (string) — `SMS_OTP`, `OOB`, `EMAIL_OTP`.
  - `destination` (string) — Required if `authentication_method` is `SMS_OTP` (phone number). Omit for OOB (uses card-creation phone).
- **Response 200:** `authentication_method`, `status`.

## Get Card Number 3DS Detail

- **Path:** `GET .../3ds_enrollment` (or 3DS detail subresource).
- **Response 200:** 3DS enrollment status and method for the card number.

## Update Card Number 3DS Auth Method

- **Path:** `PUT .../3ds_enrollment` (or update subresource). Body: new `authentication_method`, optional `destination`.

## Unenroll Card Number from 3DS

- **Path:** `DELETE .../3ds_enrollment`. Removes 3DS enrollment for the card number.

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/enroll-3ds
- https://docs.straitsx.com/v1-CARDS/reference/get-3ds-detail
- https://docs.straitsx.com/v1-CARDS/reference/update-3ds
- https://docs.straitsx.com/v1-CARDS/reference/unenroll-3ds
-->
