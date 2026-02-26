---
name: tonweb-features-payments
description: TonWeb payment channels — PaymentChannel, createChannel, cooperative and uncooperative close.
---

# Payment Channels

Off-chain payment channels between two parties; settle on-chain. Use `tonweb.payments.createChannel()` or `PaymentChannel` with a provider.

## Create channel

```js
const channel = tonweb.payments.createChannel({
  isA: true,
  channelId: new BN('...'),
  myKeyPair: nacl.sign.keyPair(),
  hisPublicKey: otherPartyPublicKey,
  initBalanceA: TonWeb.utils.toNano(10),
  initBalanceB: TonWeb.utils.toNano(5),
  addressA: myWalletAddress,
  addressB: otherWalletAddress,
  closingConfig: {
    quarantineDuration: 0,
    misbehaviorFine: 0,
    conditionalCloseDuration: 0,
  },
  excessFee: TonWeb.utils.toNano(0),
});
```

Options include `isA` (which side), key pairs, initial balances, addresses, closing parameters, and excess fee.

## Channel operations

PaymentChannel implements: init (top-up), cooperative commit/close, uncooperative close (challenge, settle conditionals, finish). Use the channel’s methods to build messages for:

- Init / top-up balance
- Cooperative commit (new state)
- Cooperative close (final balance split)
- Start uncooperative close, challenge quarantined state, settle conditionals, finish close

Build and send the appropriate message cells (signed as per contract) for each step.

## Key points

- Both parties sign state updates; contract stores signed semi-channel state.
- Use `PaymentChannel` from `tonweb.payments.PaymentChannel` or `tonweb.payments.createChannel()`; same provider/options pattern as other contracts.
- Closing config (quarantine, fines, conditional duration) is set at deploy and affects dispute flow.

<!--
Source references:
- https://github.com/toncenter/tonweb/blob/master/src/contract/payments/index.js
- https://github.com/toncenter/tonweb/blob/master/src/contract/payments/PaymentChannel.js
- https://github.com/toncenter/tonweb/blob/master/src/contract/payments/PaymentUtils.js
-->
