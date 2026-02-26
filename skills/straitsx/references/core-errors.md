---
name: straitsx-errors
description: StraitsX Card Issuing API — error response format and error codes (4xx/5xx).
---

# Error responses

API errors return JSON with `code` and `message`. In sandbox, a `debug` field may be included for support.

## Response format

```json
{
  "code": "string",
  "message": "string"
}
```

Sandbox only:

```json
{
  "code": "string",
  "message": "string",
  "debug": "string"
}
```

## Usage

- Use `code` for programmatic handling (e.g. retry on 429, show user-friendly text for 400).
- Common patterns: `XFC400*` = 400 Bad Request, `XFC404*` = 404 Not Found, `XFC401001` = Unauthorized, `XFC403001` = Access denied, `XFC429001` = Too many requests, `XFC500001` = Internal server error.
- Insufficient funds: `XFC400039`. Card inactive: `XFC400007`. Invalid PIN / max attempts: `XFC400040`, `XFC400042`. Idempotency: `XFC400065` = Duplicate idempotency key.

## Key codes (subset)

| Code       | HTTP | Meaning |
|-----------|------|--------|
| XFC400001 | 400  | Invalid request |
| XFC400002 | 400  | Invalid parameter field(s) |
| XFC400039 | 400  | Insufficient funds |
| XFC400065 | 400  | Duplicate idempotency key |
| XFC404003 | 404  | Card does not exist |
| XFC404008 | 404  | Customer does not exist |
| XFC401001 | 401  | Unauthorized |
| XFC403001 | 403  | Access denied |
| XFC429001 | 429  | Too many requests |
| XFC500001 | 500  | Internal server error |

Full list is in the docs; always handle 4xx/5xx and map `code` for logging and user feedback.

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/docs/errors
-->
