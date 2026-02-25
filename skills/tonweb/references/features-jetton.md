---
name: tonweb-features-jetton
description: TonWeb JETTON (fungible token) — JettonMinter, JettonWallet; mint, transfer, burn.
---

# JETTON (Fungible Tokens)

JETTON is the TON standard for fungible tokens. TonWeb provides `JettonMinter` (token root) and `JettonWallet` (user balance).

## JettonMinter

Root contract: supply, admin, metadata.

```js
const { JettonMinter } = TonWeb.token.jetton;  // or TonWeb.token.ft

const minter = new JettonMinter(tonweb.provider, {
  adminAddress: adminAddress,
  jettonContentUri: 'https://...',
  jettonWalletCodeHex: '...',  // optional, has default
});
const minterAddress = await minter.getAddress();
```

Mint (admin only): `createMintBody({ jettonAmount, destination, amount, queryId })`.  
Admin: `createChangeAdminBody({ newAdminAddress })`, `createEditContentBody({ jettonContentUri })`.

## JettonWallet

User’s token wallet; create by address (e.g. from get-method `get_wallet_address`).

```js
const { JettonWallet } = TonWeb.token.jetton;
const jettonWallet = new JettonWallet(tonweb.provider, { address: walletAddress });
const data = await jettonWallet.getData();
// data: { balance, ownerAddress, jettonMinterAddress, jettonWalletCode }
```

Transfer and burn:

```js
const transferBody = await jettonWallet.createTransferBody({
  jettonAmount: amount,
  toAddress: recipientAddress,
  responseAddress: myAddress,
  forwardAmount: TonWeb.utils.toNano(0),
  forwardPayload: undefined,
});
const burnBody = await jettonWallet.createBurnBody({
  jettonAmount: amount,
  responseAddress: myAddress,
});
```

Send as internal message to the JettonWallet contract with enough TON for fees.

## Key points

- Balance and amounts are in token base units (minter-defined decimals).
- Transfers go to the recipient’s JettonWallet (compute address from minter + owner if needed).
- Mint is only from minter contract; transfer/burn from user’s JettonWallet.

<!--
Source references:
- https://github.com/toncenter/tonweb/blob/master/src/contract/token/ft/JettonMinter.js
- https://github.com/toncenter/tonweb/blob/master/src/contract/token/ft/JettonWallet.js
- https://github.com/toncenter/tonweb/blob/master/src/contract/token/ft/index.js
-->
