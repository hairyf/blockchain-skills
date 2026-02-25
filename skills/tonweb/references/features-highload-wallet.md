---
name: tonweb-features-highload-wallet
description: TonWeb highload wallet V3 — batch transfers and HighloadQueryId for unique query IDs.
---

# Highload Wallet

Highload wallet (V3) supports many pending transfers in one contract using a query_id scheme. Use when you need to send a large number of transfers without waiting for each tx to confirm.

## Contract and query ID

```js
const { HighloadWalletContractV3, HighloadQueryId } = TonWeb.HighloadWallets;

const wallet = new HighloadWalletContractV3(tonweb.provider, {
  publicKey: keyPair.publicKey,
  wc: 0,
});
const address = await wallet.getAddress();
```

Each transfer must use a unique subwallet query id. Use `HighloadQueryId` to generate and track them:

```js
const queryId = new HighloadQueryId();
queryId.getQueryId();  // unique for this subwallet slot
```

## Deploy and transfer

Same deploy pattern as standard wallet:

```js
const deploy = wallet.deploy(keyPair.secretKey);
await deploy.send();
```

Transfers use the highload-specific method with query ids so many can be in flight without conflicting.

## Key points

- Highload V3 is for batch/s high throughput; each outgoing message uses a distinct query id from the subwallet.
- Use `TonWeb.HighloadWallets.HighloadQueryId` to generate valid query ids and avoid reuse.
- See wallet contract source and tests for exact method signatures and transfer payload format.

<!--
Source references:
- https://github.com/toncenter/tonweb/blob/master/src/contract/highloadWallet/index.js
- https://github.com/toncenter/tonweb/blob/master/src/contract/highloadWallet/HighloadWalletContractV3.js
- https://github.com/toncenter/tonweb/blob/master/src/contract/highloadWallet/HighloadQueryId.js
-->
