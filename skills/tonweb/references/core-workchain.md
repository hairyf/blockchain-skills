---
name: tonweb-workchain
description: Workchain type and WorkchainId (Master -1, Basic 0) for addresses and contract options.
---

# Workchain

TON has two main workchains: Masterchain (-1) and Basechain (0). TonWeb exposes this via a `Workchain` type and `WorkchainId` enum in TypeScript; in JS use numeric `wc` (e.g. 0 or -1).

## Usage

- **Wallet / contract workchain:** When creating a wallet or contract, pass `wc: 0` (default) or `wc: -1` for masterchain.
- **Address:** `Address` has a `wc` property (number). User wallets are almost always workchain 0.
- **Lockup wallet:** For validator/elector whitelist you may use workchain -1.

```js
const wallet = tonweb.wallet.create({ publicKey, wc: 0 });
const address = await wallet.getAddress();
address.wc; // 0
```

## Key points

- Basechain (0) is where user accounts and most contracts live; masterchain (-1) holds validators and system contracts.
- Ledger AppTon `getAddress` returns basechain address (`0:` + hex). Use workchain when building state init or sending to masterchain contracts.

<!--
Source references:
- sources/tonweb/dist/types/utils/workchain.d.ts
- sources/tonweb/src/contract/lockup/README.md (workchain: -1 for masterchain)
-->
