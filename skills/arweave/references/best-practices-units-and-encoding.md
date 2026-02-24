---
name: best-practices-units-and-encoding
description: Winston vs AR, base64url for IDs and binary fields, string amounts, Content-Type.
---

# Units and Encoding

Correct handling of units and encoding avoids interoperability and precision bugs.

## Winston and AR

- **1 AR = 1,000,000,000,000 winston.** All on-chain and API amounts (balance, reward, quantity, price) are in **winston**.
- **Use strings for amounts** in JSON. JavaScript and other environments cannot safely represent full winston range as numbers; the API uses decimal strings for `quantity`, `reward`, balance, and price.
- When displaying to users, convert winston to AR by dividing by 1e12; when sending, convert AR to winston and send as string.

## Base64url

- Transaction IDs, block hashes (`indep_hash`), wallet addresses, and binary fields (`owner`, `signature`, `data`) use **base64url** encoding (RFC 4648, URL-safe base64 without padding in URLs).
- Do not use raw base64; ensure no `+`/`/` (use `-`/`_`) and handle padding as per gateway/node expectations.

## Content-Type and Tags

- Path manifest transactions MUST be tagged `Content-Type: application/x.arweave-manifest+json`.
- Other tags are optional and application-defined; use tags for indexing and filtering (e.g. `App-Name`, `Content-Type` for non-manifest data).

## Key Points

- Never send or parse winston as JSON number in agent or client code; use string and a bignum library if doing arithmetic.
- Always use base64url for IDs and binary fields when calling the HTTP API or building POST bodies.
- Tag manifest tx with `Content-Type: application/x.arweave-manifest+json` so gateways recognize path manifests.

<!--
Source references:
- https://github.com/ArweaveTeam/arweave (http_iface_docs.md, doc/path-manifest-schema.md)
-->
