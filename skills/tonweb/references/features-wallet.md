---
name: tonweb-features-wallet
description: TonWeb wallet contracts — create, deploy, transfer, seqno; Simple/V2/V3/V4 variants.
---

# Wallet Contracts

TonWeb provides wrappers for TON wallet smart contracts (from the [TON repo](https://github.com/ton-blockchain/ton/tree/master/crypto/smartcont)). Default is V3 R1.

## Create wallet interface

By public key (before deploy) or by address (existing wallet):

```js
const nacl = TonWeb.utils.nacl;
const keyPair = nacl.sign.keyPair();

let wallet = tonweb.wallet.create({ publicKey: keyPair.publicKey, wc: 0 });
// or by address only
wallet = tonweb.wallet.create({ address: 'EQDjVXa_oltdBP64Nc__p397xLCvGm2IcZ1ba7anSW0NAkeP' });

const address = await wallet.getAddress();
const seqno = await wallet.methods.seqno().call();
```

## Deploy

```js
const deploy = wallet.deploy(keyPair.secretKey);
await deploy.estimateFee();
await deploy.send();
const deployQuery = await deploy.getQuery();  // Cell
```

## Transfer TON

```js
const transfer = wallet.methods.transfer({
  secretKey: keyPair.secretKey,
  toAddress: 'EQDjVXa_oltdBP64Nc__p397xLCvGm2IcZ1ba7anSW0NAkeP',
  amount: TonWeb.utils.toNano('0.01'),
  seqno: seqno,
  payload: 'Hello',   // optional string or Cell
  sendMode: 3,
});
await transfer.estimateFee();
await transfer.send();
const transferQuery = await transfer.getQuery();
```

## Wallet versions

No single standard; TonWeb supports multiple versions. Default is `v3R1`.

```js
tonweb.wallet.all;
// simpleR1, simpleR2, simpleR3, v2R1, v2R2, v3R1, v3R2, v4R1, v4R2

const simpleWallet = new tonweb.wallet.all.SimpleWalletContractR1(tonweb.provider, { publicKey });
const v4Wallet = new tonweb.wallet.all.WalletV4ContractR1(tonweb.provider, { publicKey });
```

Create non-default version by using the class directly with the same `create()` options (e.g. `{ publicKey, wc: 0 }`).

## Key points

- Always use current `seqno` for transfers; call `wallet.methods.seqno().call()` before each batch.
- Amounts in **nanograms**: use `TonWeb.utils.toNano('0.01')`.
- `sendMode: 3` is commonly used (pay fees separately, ignore errors). Adjust for bounce/attach behavior.

<!--
Source references:
- https://github.com/toncenter/tonweb/blob/master/src/contract/wallet/README.md
- https://github.com/toncenter/tonweb/blob/master/src/contract/wallet/index.js
-->
