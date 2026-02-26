---
name: straitsx-authentication
description: StraitsX Card Issuing API — Bearer token and how to obtain access token from SSO.
---

# Authentication (CMS)

CMS enforces **HTTP Bearer Token** in the `Authorization` header. StraitsX provides client id and secret via email; use them to obtain an access token before calling any CMS endpoint.

## Token endpoint (Sandbox and Production)

```
POST https://sso.straitsx.com/auth/realms/xfers-internal/protocol/openid-connect/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
client_id=<your_client_id>
client_secret=<your_client_secret>
scope=openid
```

## Example (curl)

```bash
curl --request POST \
  --url https://sso.straitsx.com/auth/realms/xfers-internal/protocol/openid-connect/token \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data grant_type=client_credentials \
  --data client_id=<your_client_id> \
  --data client_secret=<your_client_secret> \
  --data scope=openid
```

Use the returned access token as `Authorization: Bearer <access_token>` on all CMS requests. Do not reuse the same credentials for RHA or webhook (RHA uses a separate API key; webhook uses a signing secret).

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/docs/authentication-method
-->
