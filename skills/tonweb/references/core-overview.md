---
name: tonweb-core-overview
description: TonWeb SDK root, installation, HttpProvider, and main blockchain APIs (transactions, balance, sendBoc, call).
---

# TonWeb Overview

TonWeb is the JavaScript SDK for The Open Network (TON). It provides wallet contracts, BOC/Cell serialization, HTTP provider for TonCenter API, and helpers for addresses and amounts.

## Installation

```js
// npm or yarn
const TonWeb = require('tonweb');
// or ESM
import TonWeb from 'tonweb';

const tonweb = new TonWeb();
```

Browser: `<script src="tonweb.js"></script>` then `new window.TonWeb()`.

## Provider (API endpoint)

By default uses mainnet TonCenter. Pass a custom `HttpProvider` for another endpoint or API key:

```js
const TonWeb = require('tonweb');

// Mainnet with API key (higher rate limit)
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', { apiKey: 'YOUR_MAINNET_KEY' }));

// Testnet
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', { apiKey: 'YOUR_TESTNET_KEY' }));
```

Without an API key, TonCenter applies request rate limits.

## Root API surface

- `tonweb.version` — SDK version string.
- `tonweb.utils` — [Address](core-address-utils.md), `toNano`/`fromNano`, hex/bytes/base64, BN, nacl.
- `tonweb.Address` — same as `tonweb.utils.Address`.
- `tonweb.boc` — [Cell and BitString](core-boc.md) (BOC serialization).
- `tonweb.Contract` — [abstract contract base](core-contract.md).
- `tonweb.wallet` — [wallet factory and versions](features-wallet.md).
- `tonweb.getTransactions(address, limit?, lt?, txhash?, to_lt?)` — transaction history.
- `tonweb.getBalance(address)` — balance in nanograms (Promise&lt;string&gt;).
- `tonweb.sendBoc(bytes: Uint8Array)` — send serialized BOC (external message).
- `tonweb.call(address, method, params?)` — invoke contract get-method.

## Typical flow

```js
const tonweb = new TonWeb();
const wallet = tonweb.wallet.create({ publicKey });
const address = await wallet.getAddress();
const seqno = await wallet.methods.seqno().call();
await wallet.deploy(secretKey).send();
await wallet.methods.transfer({
  secretKey,
  toAddress: 'EQDjVXa_...',
  amount: TonWeb.utils.toNano(0.01),
  seqno,
  payload: 'Hello',
  sendMode: 3,
}).send();
const history = await tonweb.getTransactions(address);
const balance = await tonweb.getBalance(address);
```

## Key points

- All amounts in TON are in **nanograms**; use `TonWeb.utils.toNano(amount)` and `fromNano` for display.
- Addresses can be user-friendly (base64) or raw; use `Address` for parsing and `toString(...)` for formatting.
- For custom BOC messages, build `Cell`s and send with `tonweb.sendBoc(cell.toBoc())`.

<!--
Source references:
- https://github.com/toncenter/tonweb
- https://github.com/toncenter/tonweb/blob/master/src/README.md
- https://github.com/toncenter/tonweb/blob/master/README.md
-->
