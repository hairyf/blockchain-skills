---
name: getblock-authentication
description: GetBlock access token authentication — URL-embedded token, no headers; roll or delete from dashboard if compromised.
---

# GetBlock Authentication

Authentication is done via an **access token embedded in the endpoint URL**. Tokens are not sent in headers.

## Endpoint format

```text
https://go.getblock.io/<ACCESS_TOKEN>/
```

Region-specific hosts: `go.getblock.io` (EU/Frankfurt), `go.getblock.us` (New York), `go.getblock.asia` (Singapore). The token in the path authenticates the request; the client does not specify chain in the URL.

## Making a request

Use the full endpoint URL (including token) as the request target. Example — fetch latest Ethereum block number:

```bash
curl --location --request POST 'https://go.getblock.io/<ACCESS_TOKEN>/' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "jsonrpc": "2.0",
    "method": "eth_blockNumber",
    "params": [],
    "id": "getblock.io"
  }'
```

## Security

- Store access tokens securely; avoid exposing them in repos or logs.
- If a token is compromised: Dashboard → locate the endpoint → three-dot menu → **roll** (regenerate) or **delete** the token. Rolling does not disrupt other endpoints.

<!--
Source references:
- https://github.com/GetBlock-io/getblock-docs
- getting-started/authentication-with-access-tokens.md
-->
