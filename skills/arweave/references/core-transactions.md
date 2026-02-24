---
name: core-transactions
description: Arweave transaction structure — id, owner, target, quantity, data, reward, signature, tags.
---

# Arweave Transactions

Transactions are the unit of data and value transfer. IDs and hashes are base64url-encoded.

## Transaction Fields

| Field       | Description |
|------------|-------------|
| `id`       | Transaction UID (hash of signature). |
| `last_tx`  | Last transaction ID from the same wallet; empty for first tx. |
| `owner`    | Public key of the transaction owner. |
| `tags`     | Indexable key-value category identifiers. |
| `target`   | Recipient wallet address (base64url SHA256 of recipient's public key). Empty for data-only tx. |
| `quantity` | Amount in winston (string). Empty or "0" for data tx. |
| `data`     | Payload (base64url). Empty for pure transfer tx. |
| `reward`   | Miner reward in winston (string). |
| `signature`| Transaction signature. |

## Usage

**Get full transaction:**

```
GET /tx/{transaction_id}
```

**Get single field:** `id`, `last_tx`, `owner`, `target`, `quantity`, `data`, `reward`, `signature`

```
GET /tx/{transaction_id}/{field}
```

**Get decoded data as HTML (e.g. archived page):**

```
GET /tx/{transaction_id}/data.html
```

**Get confirmation status:**

```
GET /tx/{transaction_id}/status
```

Response example: `{"block_indep_hash":"...","block_height":10,"number_of_confirmations":3}`

**Post signed transaction:**

```
POST /tx
Content-Type: application/json
Body: { "last_tx", "owner", "target", "quantity", "data", "reward", "signature" }
```

All winston fields (`quantity`, `reward`) must be decimal strings for interoperability.

## Key Points

- Wallet address = base64url SHA256 of the raw RSA modulus (public key).
- Always fetch `last_tx` for a wallet before submitting a new tx from that wallet.
- Use `/price/{byte_size}` to estimate reward (byte_size = 0 for transfer-only).

<!--
Source references:
- https://github.com/ArweaveTeam/arweave (http_iface_docs.md)
-->
