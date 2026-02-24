---
name: features-internal-api
description: Arweave internal API — wallet generation and posting unsigned transactions (internal_api_secret).
---

# Internal HTTP API (Wallet and Unsigned Tx)

**Warning:** Only use when you know what you are doing. Endpoints are available only when `arweave-server` is started with `internal_api_secret` set.

## Authentication

Send header on every request:

```
X-Internal-Api-Secret: <value of internal_api_secret>
```

## Endpoints

### Generate wallet and get access code

```
POST /wallet
X-Internal-Api-Secret: <secret>
```

Response: `{"wallet_access_code":"<base64url>"}`. Use this code to sign and submit transactions via `/unsigned_tx`.

### Post unsigned transaction

```
POST /unsigned_tx
X-Internal-Api-Secret: <secret>
Content-Type: application/json
```

Body (no `owner` or `signature`; server signs with wallet from access code):

```json
{
  "last_tx": "",
  "target": "",
  "quantity": "",
  "data": "",
  "reward": "",
  "wallet_access_code": ""
}
```

Response: `{"id": "<transaction_id>"}` (base64url hash of the signature).

## Usage

1. POST `/wallet` to obtain `wallet_access_code`.
2. Build unsigned tx: `last_tx`, `target`, `quantity`, `data`, `reward` (all as for public API; winston as strings).
3. POST to `/unsigned_tx` with `wallet_access_code`; server signs and broadcasts, returns tx id.

## Key Points

- Do not expose `internal_api_secret` or `wallet_access_code`; treat as sensitive.
- `last_tx` must be the last transaction ID for the wallet that owns the access code.
- Use for server-side signing when the client must not hold the private key.

<!--
Source references:
- https://github.com/ArweaveTeam/arweave (http_post_unsigned_tx_docs.md)
-->
