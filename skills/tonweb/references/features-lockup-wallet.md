---
name: tonweb-features-lockup-wallet
description: TonWeb lockup and vesting wallets — liquid, locked, restricted balances and deploy parameters.
---

# Lockup and Vesting Wallets

Lockup-capable wallets track three balance types: **liquid** (spendable), **locked** (spendable after timelock), and **restricted** (spendable after timelock or to whitelisted addresses). Used for vesting and compliance.

## Balance categories

- **Liquid** — spendable anytime.
- **Locked** — spendable only after per-pool timelock.
- **Restricted** — like locked but can bypass timelock if destination is whitelisted.

Only a designated **funder** (authenticated via `config_public_key`) can add locked/restricted coins with timelocks; arbitrary sends add to liquid.

## Deploy parameters

```js
const LockupWallets = TonWeb.LockupWallets;
// LockupWalletV1, VestingWalletV1

{
  wallet_type: 'lockup-0.1',
  workchain: 0,   // -1 for masterchain (e.g. validators)
  config_pubkey: base64EncodedFunderPubkey,
  allowed_destinations: base64EncodedBocOfWhitelistAddresses
}
```

Whitelist is set at deploy and cannot be changed. Restore = same deploy parameters.

## Usage

Instantiate with the same options as standard wallets (provider + options). Contract get-methods return liquid/locked/restricted; liquid is derived using current node time (e.g. TonCenter server time).

When spending more than liquid (minus fee), the tx can fail if timelock or destination rules are not met; fee may still be charged. UI should warn.

## Key points

- Show three balances in UI: liquid, locked, restricted (sum = total).
- Receiving: normal address; only liquid is topped up by regular transfers. Locked/restricted funding is done by specialized tooling with funder key.
- Verify contract hash and funder key when accepting locked/restricted funds.

<!--
Source references:
- https://github.com/toncenter/tonweb/blob/master/src/contract/lockup/README.md
- https://github.com/toncenter/tonweb/blob/master/src/contract/lockup/LockupWalletV1.js
- https://github.com/toncenter/tonweb/blob/master/src/contract/lockup/VestingWalletV1.js
-->
