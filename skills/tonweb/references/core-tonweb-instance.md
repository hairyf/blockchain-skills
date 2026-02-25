---
name: tonweb-instance
description: TonWeb root class, constructor, provider, and main RPC-style methods (getTransactions, getBalance, sendBoc, call).
---

# TonWeb Instance

TonWeb is the root class for the TON JavaScript SDK. Construct it with an optional HTTP provider; default is TonCenter mainnet.

## Usage

```js
const TonWeb = require('tonweb');

// Default: mainnet TonCenter (rate-limited without API key)
const tonweb = new TonWeb();

// With custom provider (e.g. testnet + API key)
const tonweb = new TonWeb(
  new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', { apiKey: 'YOUR_KEY' })
);
```

## Main methods (delegate to provider)

- **getTransactions(address, limit?, lt?, txhash?, to_lt?)** — transaction history for an address. `address` is `Address` or string; returns array of tx objects.
- **getBalance(address)** — returns balance in **nanograms** (Promise&lt;string&gt;).
- **sendBoc(bytes)** — send serialized BOC (Uint8Array); use for external messages.
- **call(address, method, params?)** — run get-method on contract. `method` is name or method id; `params` is stack array e.g. `[['num', 3], ['cell', cell], ['slice', slice]]`.

## Attached helpers

- **tonweb.utils** — Address, toNano/fromNano, bytes/hex/base64, BN, nacl.
- **tonweb.boc** — Cell, BitString, BOC (de)serialization.
- **tonweb.wallet** — wallet factory (`tonweb.wallet.create(...)`).
- **tonweb.dns** — DNS resolver (`tonweb.dns.resolve`, `getWalletAddress`, `getSiteAddress`).
- **tonweb.provider** — raw HttpProvider (getAddressInfo, getWalletInfo, getExtendedAddressInfo, etc.).

## Key points

- All amounts from API are in **nanograms**; use `TonWeb.utils.toNano('0.01')` for 0.01 TON.
- For high rate limits use TonCenter with `apiKey` in HttpProvider options.
- Static exports: `TonWeb.version`, `TonWeb.utils`, `TonWeb.Address`, `TonWeb.boc`, `TonWeb.HttpProvider`, `TonWeb.Contract`, `TonWeb.Wallets`, `TonWeb.token.nft`, `TonWeb.token.jetton`, `TonWeb.dns`, `TonWeb.HighloadWallets`, `TonWeb.payments`, `TonWeb.BlockSubscription`, `TonWeb.InMemoryBlockStorage`, `TonWeb.ledger`.

<!--
Source references:
- https://github.com/toncenter/tonweb
- sources/tonweb/README.md
- sources/tonweb/src/index.js
- sources/tonweb/src/README.md
-->
