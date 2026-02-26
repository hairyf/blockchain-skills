---
name: tronweb-transaction-builder
description: TransactionBuilder — send TRX/tokens, freeze/unfreeze, trigger and create contracts.
---

# TransactionBuilder

Build and return unsigned transactions for TRX/token transfers, resources, and smart contracts.

## Transfers and tokens

```typescript
const txBuilder = tronWeb.transactionBuilder;

const tx = await txBuilder.sendTrx(to, amount, from?, options?);
const txToken = await txBuilder.sendToken(to, amount, tokenId, from?, options?);
await txBuilder.purchaseToken(issuerAddress, tokenId, amount, buyer?, options?);
```

Options: `permissionId`, and (via helper) custom `ref_block_bytes`, `ref_block_hash`, `expiration`, `timestamp` when building with custom block header.

## Resources (freeze / delegate / withdraw)

```typescript
await txBuilder.freezeBalance(amount?, duration?, resource?, owner?, options?);
await txBuilder.unfreezeBalance(amount?, resource?, owner?, options?);
await txBuilder.freezeBalanceV2(amount?, resource?, owner?, options?);
await txBuilder.unfreezeBalanceV2(amount?, resource?, owner?, options?);
await txBuilder.delegateResource(amount, resource, receiver, owner?, options?);
await txBuilder.undelegateResource(amount, resource, receiver, owner?, options?);
await txBuilder.withdrawExpireUnfreeze(owner?, options?);
await txBuilder.cancelAllUnfreezeV2(owner?, options?);
```

## Smart contract

```typescript
// Create contract (returns unsigned tx; sign + broadcast separately)
const createTx = await txBuilder.createSmartContract(options, issuerAddress?);
// options: abi, bytecode, name, parameters, feeLimit, callValue, originEnergyLimit, userFeePercentage, tokenValue, tokenId

// Trigger (state-changing) — returns transaction wrapper
const triggerTx = await txBuilder.triggerSmartContract(
  contractAddress,
  functionSelector,
  options?,   // { feeLimit, callValue, from?, txLocal?, ... }
  parameters?,
  issuerAddress?
);

// Constant call (read-only, no broadcast)
const result = await txBuilder.triggerConstantContract(
  contractAddress, functionSelector, options?, parameters?, issuerAddress?
);
await txBuilder.triggerConfirmedConstantContract(...);

// Energy estimation
const { energy_required } = await txBuilder.estimateEnergy(
  contractAddress, functionSelector, options?, parameters?, issuerAddress?
);

// Deploy constant contract (estimate energy for deployment)
await txBuilder.deployConstantContract({ input, ownerAddress, tokenId?, tokenValue?, callValue?, confirmed? });
```

## Custom block header

Pass ref block params from `trx.getCurrentRefBlockParams()` into transaction options so the builder uses your chosen block reference and expiration instead of fetching automatically.

## Key Points

- All builder methods return transaction objects (or wrappers); use `tronWeb.trx.sign()` then `tronWeb.trx.sendRawTransaction()` to send.
- `triggerSmartContract` with `options.txLocal: true` uses local execution path.
- Multi-dimension address arrays (e.g. `address[][]`) are supported in contract parameters.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/lib/TransactionBuilder/TransactionBuilder.ts, helper.ts)
- https://tronweb.network/docu/docs/intro/
-->
