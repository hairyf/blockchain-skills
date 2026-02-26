---
name: tonweb-estimate-fee
description: estimateFee and getEstimateFee — simulate send and get fee before sending BOC.
---

# Estimate Fee

Before sending a BOC you can get an estimated fee so the user can confirm or the app can attach enough value.

## Usage

Build the external message (e.g. via `deploy.getQuery()` or `transfer.getQuery()`), serialize to BOC, then call the provider’s fee estimation. Contract helpers do this for you via `.estimateFee()`.

## Contract method: estimateFee()

On any deploy or contract method (e.g. transfer, pay):

```js
const transfer = wallet.methods.transfer({ ... });
const fee = await transfer.estimateFee();
// fee: { gas_fee, forward_fee, ... } (shape depends on API)
```

Use this when you want to show “Network fee: X TON” before calling `.send()`.

## Low-level: getEstimateFee(query)

`provider.getEstimateFee(query)` takes a query object as in [TonCenter API](https://toncenter.com/api/test/v2/#estimateFee): the same structure you would send with sendBoc (e.g. `{ boc: base64 }`). Returns the node’s fee estimate.

Use when you have a raw BOC and want to estimate without going through a contract method.

## Key points

- Estimation uses current chain state; actual fee can differ slightly. Use for UX, not exact accounting.
- If the message would fail (e.g. insufficient balance), the API may still return a fee or an error; handle both.

<!--
Source references:
- sources/tonweb/src/providers/index.js (getEstimateFee)
- sources/tonweb/src/contract (Contract.createMethod, estimateFee)
-->
