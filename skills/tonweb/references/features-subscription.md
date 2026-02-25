---
name: tonweb-subscription
description: SubscriptionContract — recurring payments: pay, getSubscriptionData, beneficiary, period, timeout.
---

# Subscription Contract

TonWeb includes a subscription contract for recurring payments: a user (wallet) pays a beneficiary periodically. Use `TonWeb.SubscriptionContract`.

## Creating a subscription contract

```js
const { SubscriptionContract } = TonWeb;
const subscription = new SubscriptionContract(provider, {
  wc: 0,
  wallet: walletAddress,      // payer
  beneficiary: beneficiaryAddress,
  amount: TonWeb.utils.toNano('1'),  // per period
  period: 86400,              // seconds (e.g. 1 day)
  timeout: 3600,              // max delay for one payment
  startAt: Math.floor(Date.now() / 1000),
  subscriptionId: 1,
  address: undefined          // optional if deploying new
});
```

## Methods

- **methods.pay()** — create external message for the wallet to pay this period. Returns a method (e.g. `.getQuery()`, `.send()`).
- **getSubscriptionData()** — call get-method `get_subscription_data`; returns:
  - `wallet`, `beneficiary` (address strings)
  - `amount` (BN), `period`, `startAt`, `timeout`, `lastPayment`, `lastRequest`, `failedAttempts`, `subscriptionId` (numbers where applicable).

## Destroying a subscription

The contract supports a "self-destruct" body (op `0x64737472`): from wallet or beneficiary. Use `createSelfDestructBody()` for the payload; sending is contract-specific.

## Key points

- The **wallet** (payer) must send TON to the subscription contract with the correct body (e.g. from `createBody()` op `0x706c7567`) to trigger a payment to the beneficiary.
- Use `getSubscriptionData()` to show status (last payment, failed attempts) in UI.
- Contract code is embedded in TonWeb; no need to pass `code` unless customizing.

<!--
Source references:
- sources/tonweb/src/contract/subscription/index.js
- sources/tonweb/src/index.js (TonWeb.SubscriptionContract)
-->
