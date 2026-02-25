---
name: tonweb-http-provider
description: HttpProvider for TonCenter-compatible API: host, apiKey, getAddressInfo, getWalletInfo, getTransactions, sendBoc, call/call2.
---

# HttpProvider

`TonWeb.HttpProvider` talks to a TonCenter-compatible JSON-RPC API. Used by default when you `new TonWeb()`.

## Constructor

```js
const provider = new TonWeb.HttpProvider(
  'https://toncenter.com/api/v2/jsonRPC',
  { apiKey: 'YOUR_MAINNET_KEY' }
);
// Testnet:
// 'https://testnet.toncenter.com/api/v2/jsonRPC', { apiKey: 'YOUR_TESTNET_KEY' }
```

## Account and wallet

- **getAddressInfo(address)** — balance, code, data, last_transaction_id.
- **getExtendedAddressInfo(address)** — parsed state for known contract types (fewer wallet types).
- **getWalletInfo(address)** — recommended for wallets: simple, standard, v3.

## Transactions and balance

- **getTransactions(address, limit?, lt?, hash?, to_lt?, archival?)** — tx list. `hash` in hex; use with `lt` for pagination.
- **getBalance(address)** — balance in nanograms (string).

## Sending and get-methods

- **sendBoc(base64)** — send serialized BOC (base64 string).
- **call(address, method, params?)** — run get-method; returns raw API result (stack in API format).
- **call2(address, method, params?)** — same but returns parsed stack (e.g. BN, Cell, Slice) via HttpProviderUtils.

## Block/config (low-level)

- **getConfigParam(configParamId)** — returns config cell (e.g. for DNS root).
- **getMasterchainInfo()**, **getBlockShards(seqno)**, **getBlockTransactions(...)**, **getBlockHeader(...)**, **getMasterchainBlockHeader(seqno)**.

## Key points

- Set **apiKey** to avoid strict rate limits on TonCenter.
- Addresses passed as **string** (user-friendly or raw).
- For parsed get-method results use **call2**; for raw stack use **call**.

<!--
Source references:
- sources/tonweb/src/providers/README.md
- sources/tonweb/src/providers/index.js
- sources/tonweb/src/index.js
-->
