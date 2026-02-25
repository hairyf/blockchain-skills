---
name: tonweb-wallet-parsing
description: Parse incoming transfer BOC — parseTransferQuery, parseTransferBody (Wallet V3/V4).
---

# Parsing Wallet Transfer BOC

To interpret an external message or message body as a wallet transfer (e.g. for history or backend processing), use the static parsers on the wallet contract classes.

## parseTransferQuery(cell)

Parses a full external message **Cell** (BOC) into transfer fields. Use when you have the raw message (e.g. from getTransactions or a queue).

```js
const WalletV3 = tonweb.wallet.all.v3R1; // or v4R1, v4R2
const cell = TonWeb.boc.Cell.oneFromBoc(TonWeb.utils.base64ToBytes(boc));
const parsed = WalletV3.parseTransferQuery(cell);
// parsed: { fromAddress, toAddress, value, bounce, seqno, expireAt, payload }
```

Throws if the cell is not a valid V3-style external transfer message (header, stateInit, body).

## parseTransferBody(slice)

Parses only the **signed body** (after header/stateInit). Use when you already have the body cell (e.g. from an internal message).

```js
const bodyCell = TonWeb.boc.Cell.oneFromBoc(bodyBoc);
const slice = bodyCell.beginParse();
const parsed = WalletV3.parseTransferBody(slice);
// parsed: { toAddress, value, bounce, seqno, expireAt, payload }
```

## Which wallet class

- **WalletV3ContractR1**, **WalletV3ContractR2** — same parser (V3 transfer format).
- **WalletV4ContractR1**, **WalletV4ContractR2** — same parser (V3-style body).

```js
const tonweb = new TonWeb();
tonweb.wallet.all.v3R1.parseTransferQuery(cell);
tonweb.wallet.all.v4R1.parseTransferBody(slice);
```

## Key points

- Use `parseTransferQuery` for full external BOC; use `parseTransferBody` when you only have the body (e.g. from internal message body).
- Parsers expect V3 transfer layout (walletId, expireAt, seqno, sendMode 3, order with dest, value, payload). Invalid layout throws.

<!--
Source references:
- sources/tonweb/src/contract/wallet/WalletQueryParser.js
- sources/tonweb/src/contract/wallet/WalletContractV3.js
- sources/tonweb/src/contract/wallet/WalletContractV4.js
- sources/tonweb/src/contract/wallet/WalletContractV4R2.js
-->
