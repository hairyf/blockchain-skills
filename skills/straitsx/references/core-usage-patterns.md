---
name: straitsx-usage-patterns
description: StraitsX Card Issuing API — Call patterns: Node SDK (api install), Shell (curl), Base URL and auth.
---

# Usage patterns (Node / Shell)

You can call the StraitsX Card Issuing CMS API in two common ways: **Node.js SDK** (via Readme API install) and **Shell (curl)**. Both use the same REST endpoints and Bearer auth; choose based on app integration vs. ad-hoc or script use.

## Base URL and auth

- **Staging:** `https://merchant.cop-staging.straitsx.com`
- **Production:** Use the URL provided by StraitsX (typically `https://merchant.*.straitsx.com`)
- **Path prefix:** `/api/v1/` (e.g. Create Issuer Plan is `/api/v1/issuing_plans`; most other CMS paths are `/api/v1/issuing_plans/{issuing_plan_opaque_id}/...`)
- **Auth:** All CMS requests must send `Authorization: Bearer <TOKEN>` in the header. Obtain TOKEN via SSO client_credentials; see [core-authentication](core-authentication.md).

---

## Option 1: Node.js SDK (api install)

Install the official SDK via [Readme API](https://readme.com/); then call `@api/straitsx` in code. Method names map to the API (e.g. `createIssuerPlan` → POST Create Issuer Plan).

### Install

```bash
npx api install "@straitsx/v1-CARDS#3dwuze2vmets10z5"
```

This adds the `@api/straitsx` dependency and types; no need to build HTTP requests by hand.

### Auth and example (Create Issuer Plan)

```javascript
import straitsx from '@api/straitsx';

straitsx.auth('TOKEN');

straitsx
  .createIssuerPlan({
    is_start_of_week_sunday: true,
    permission_model: 'BUSINESS_PREPAID',
  })
  .then(({ data }) => console.log(data))
  .catch((err) => console.error(err));
```

- Other CMS calls: call `straitsx.auth('TOKEN')` once, then the corresponding method (e.g. `createUser`, `createCard`, `activateCard`). Method arguments match the API body/query.
- Responses are typically `{ data }`; errors via Promise rejection / `catch`.

---

## Option 2: Shell (curl)

Call REST endpoints directly for scripts, CI, or manual checks. Build URL, headers, and body yourself.

### Create Issuer Plan example

```bash
curl --request POST \
     --url https://merchant.cop-staging.straitsx.com/api/v1/issuing_plans \
     --header 'accept: application/json' \
     --header 'authorization: Bearer TOKEN' \
     --header 'content-type: application/json' \
     --data '
{
  "is_start_of_week_sunday": true,
  "permission_model": "BUSINESS_PREPAID"
}
'
```

- Replace `TOKEN` with the access token from SSO.
- In production, replace `merchant.cop-staging.straitsx.com` with your Merchant API host.

### Other CMS endpoints (generic)

- **POST:** `--request POST --url <BASE_URL>/api/v1/... --header 'authorization: Bearer TOKEN' --header 'content-type: application/json' --data '<JSON>'`
- **GET:** `--request GET --url '<BASE_URL>/api/v1/...?query=params' --header 'authorization: Bearer TOKEN'`
- **PUT/DELETE:** Same as POST with the appropriate `--request` and optional `--data`. Paths and body are in this skill’s feature references (e.g. [features-cms-issuer-plan](features-cms-issuer-plan.md), [features-cms-lifecycle](features-cms-lifecycle.md)) or the [official API Reference](https://docs.straitsx.com/v1-CARDS/reference).

---

## Summary

| Aspect | Node SDK (api install) | Shell (curl) |
|--------|-------------------------|---------------|
| Install | `npx api install "@straitsx/v1-CARDS#..."` | None (need curl) |
| Auth | `straitsx.auth('TOKEN')` | `--header 'authorization: Bearer TOKEN'` |
| Call | `straitsx.createIssuerPlan({...})` etc. | `curl --request POST --url ... --data '...'` |
| Use case | App integration, scripts, types | One-off debugging, CI, ops |

Request and response bodies are the same for both; you can align curl examples in the references with SDK calls.

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/reference/create-issuer-plan
-->
