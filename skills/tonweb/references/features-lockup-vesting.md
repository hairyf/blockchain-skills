---
name: tonweb-lockup-vesting
description: VestingWalletV1 — vesting schedule, getLockedAmount, getVestingData, whitelist, createInternalTransfer.
---

# Vesting Wallet (VestingWalletV1)

TonWeb includes a vesting wallet contract: coins unlock over time (vesting schedule). Access via `tonweb.lockupWallet.VestingWalletV1` or `tonweb.lockupWallet.all['vesting-1']`.

## Creating

```js
const VestingWalletV1 = tonweb.lockupWallet.all['vesting-1'];
const vesting = new VestingWalletV1(provider, {
  wc: 0,
  publicKey,
  walletId: 0x10C + 0,  // WALLET_ID_BASE + wc
  vestingStartTime: startUnix,
  vestingTotalDuration: 86400 * 365,  // seconds
  unlockPeriod: 86400 * 30,
  cliffDuration: 86400 * 90,
  vestingTotalAmount: TonWeb.utils.toNano('1000'),
  vestingSenderAddress: senderAddress,
  ownerAddress: ownerAddress,
});
```

Deploy with `vesting.deploy(secretKey)` then only the vesting sender can fund it; the owner can transfer when unlocked.

## Get-methods

- **getPublicKey()** — owner public key.
- **getWalletId()** — subwallet id.
- **getLockedAmount(time)** — locked amount at given unix time (param: `[['num', time]]`).
- **getVestingData()** — full vesting config: vestingStartTime, vestingTotalDuration, unlockPeriod, cliffDuration, vestingTotalAmount, vestingSenderAddress, ownerAddress, whitelistCell.
- **getWhitelist()** — list of whitelisted destination addresses (for restricted transfers).

## Sending (owner)

Use **createInternalTransfer(params)** to build an internal message body for transfer: `{ address, amount, payload?, sendMode?, queryId? }`. Send from the wallet via standard transfer with this body (op `0xa7733acd`). Whitelist can restrict destinations.

## Whitelist

- **createAddWhitelistBody({ addresses, queryId? })** — body to add addresses to the whitelist (op `0x7258a69b`). Send from an authorized account.

## Key points

- Different from LockupWalletV1 (liquid/locked/restricted with timelock and funder). VestingWalletV1 is time-based unlock with optional whitelist.
- vestingTotalDuration must be divisible by unlockPeriod; cliffDuration by unlockPeriod. Total amount is unlocked in steps over vestingTotalDuration.

<!--
Source references:
- sources/tonweb/src/contract/lockup/VestingWalletV1.js
- sources/tonweb/src/contract/lockup/index.js
-->
