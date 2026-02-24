---
name: core-wallets-balances
description: Arweave wallet addresses, balance, last_tx, and transaction lists.
---

# Wallets and Balances

Wallet address is the base64url-encoded SHA256 hash of the raw RSA modulus (public key). Balances and amounts are in **winston** (string in API).

## Usage

**Balance (winston string):**

```
GET /wallet/{wallet_address}/balance
```

**Last transaction ID from wallet:**

```
GET /wallet/{wallet_address}/last_tx
```

**Transaction IDs made by wallet (optional from earliest_tx):**

```
GET /wallet/{wallet_address}/txs
GET /wallet/{wallet_address}/txs/{earliest_tx}
```

**Deposits to wallet (transfer tx IDs; index may be partial per node):**

```
GET /wallet/{wallet_address}/deposits
GET /wallet/{wallet_address}/deposits/{earliest_deposit}
```

## Key Points

- Before posting a new transaction, get `last_tx` for the owner wallet and set it in the transaction body.
- Balance and reward/quantity values are strings to support arbitrary-precision; do not use JSON number for winston.
- Deposits endpoint returns only transfers to the given address; coverage depends on the node.

<!--
Source references:
- https://github.com/ArweaveTeam/arweave (http_iface_docs.md)
-->
