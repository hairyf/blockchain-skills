---
name: envio-api-tokens
description: Envio API token generation, usage in clients, and security practices.
---

# Envio API Tokens

API tokens authenticate access to HyperSync and HyperRPC. Required from **3 November 2025** (rate limits apply without tokens). Hosted Service indexers do not need a custom token for HyperSync.

## Obtaining a Token

1. Go to https://envio.dev/app/api-tokens
2. Sign in (e.g. GitHub)
3. Create a token and store it securely

## Using in Clients

**Node.js (HyperSync):**

```javascript
const client = new HypersyncClient({
  url: "https://eth.hypersync.xyz",
  apiToken: process.env.ENVIO_API_TOKEN,
});
```

**Python:** Pass `bearer_token=os.environ.get("ENVIO_API_TOKEN")` in `ClientConfig`.  
**Rust:** `api_token: std::env::var("ENVIO_API_TOKEN")` in `ClientConfig`.

**HyperRPC:** Append token to URL path: `https://<network>.rpc.hypersync.xyz/<api-token>`.

**HyperIndex (self-hosted):** Set `ENVIO_API_TOKEN` in the indexer environment (e.g. `.env`); config reads it for HyperSync.

## Security

- Do not commit tokens; use env vars and add `.env` to `.gitignore`.
- Rotate tokens periodically; limit sharing.

## Usage and Credits

Usage (requests and credits) for the current month: https://envio.dev/app/api-tokens. Credits reflect bandwidth, disk reads, and other usage.

<!--
Source references:
- https://docs.envio.dev/docs/HyperSync/api-tokens
-->
