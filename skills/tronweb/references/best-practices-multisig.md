---
name: tronweb-multisig
description: Multi-signature flows — getSignWeight, getApprovedList, multiSign, permissionId.
---

# Multi-signature

TRON supports multi-sig accounts via permissions. Use `getSignWeight`, `getApprovedList`, and `multiSign` to build or complete multi-sig transactions.

## Check sign weight and approved list

Before signing, check whether the transaction is valid for the permission and who has already signed:

```typescript
const weight = await tronWeb.trx.getSignWeight(transaction, permissionId?);
// weight.result.code === 'PERMISSION_ERROR' → error message in weight.result.message
// weight.permission.keys, weight.approved_list, weight.transaction

const { approved_list } = await tronWeb.trx.getApprovedList(transaction);
// approved_list: hex addresses that have signed
```

## Sign with a permission

Use `multiSign(transaction, privateKey?, permissionId?)` to add the signature for the given permission. If the transaction does not yet have `Permission_id` and you pass `permissionId > 0`, TronWeb will set it and may replace the transaction with the server-returned version (from getSignWeight) before signing.

```typescript
const signed = await tronWeb.trx.multiSign(tx, privateKey, permissionId);
// Then broadcast: tronWeb.trx.sendRawTransaction(signed)
```

Rules:

- The private key must belong to a key in the permission (getSignWeight checks this).
- If the key has already signed (in approved_list), multiSign throws.
- For owner permission or when the tx already has Permission_id, signing proceeds directly.

## Flow

1. Build the transaction (e.g. via transactionBuilder or contract.methods.send).
2. Call getSignWeight(tx, permissionId) to validate and optionally get an updated tx.
3. Optionally call getApprovedList(tx) to show who has signed.
4. Each signer calls multiSign(tx, theirPrivateKey, permissionId).
5. When the permission threshold is met, broadcast the final signed tx with sendRawTransaction.

## Key points

- permissionId identifies which permission (e.g. owner vs active) is used; 0 is owner.
- getSignWeight can return a modified transaction (e.g. with Permission_id set); use that for subsequent multiSign if returned.
- Always handle PERMISSION_ERROR and "already sign" errors in UI or agents.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/lib/trx.ts)
-->