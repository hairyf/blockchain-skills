---
name: aave-v3-flashloan
description: Flash loans—IFlashLoanReceiver, IFlashLoanSimpleReceiver, flashLoan vs flashLoanSimple, executeOperation callback.
---

# Aave V3 Flash Loans

Uncollateralized borrow within one transaction; debt + premium must be repaid by end of callback.

## Two entry points on IPool

1. **flashLoan** (batch): `flashLoan(receiverAddress, assets[], amounts[], interestRateModes[], onBehalfOf, params, referralCode)`. `interestRateModes`: 0 = no debt if not repaid (revert), 1 = open stable debt, 2 = open variable debt for `onBehalfOf`.
2. **flashLoanSimple** (single asset): `flashLoanSimple(receiverAddress, asset, amount, params, referralCode)`. No debt opened; must repay amount + premium or tx reverts.

## Receiver interfaces

- **IFlashLoanReceiver** (batch): implement `executeOperation(assets[], amounts[], premiums[], initiator, params) returns (bool)`. Also expose `ADDRESSES_PROVIDER()` and `POOL()`.
- **IFlashLoanSimpleReceiver** (single): implement `executeOperation(asset, amount, premium, initiator, params) returns (bool)`; same `ADDRESSES_PROVIDER()` and `POOL()`.

## Flow

1. User/protocol calls `pool.flashLoan` or `pool.flashLoanSimple` with receiver contract address.
2. Pool transfers assets to receiver, then calls receiver’s `executeOperation`.
3. In `executeOperation`, use the funds (arbitrage, liquidate, repay other debt, etc.), then approve Pool for `amount + premium` (per asset) and return `true`.
4. Pool pulls the approved amounts; if any shortfall or `false`, entire tx reverts.

## Security

- Receiver must repay exactly amount + premium (and have approved Pool) before returning from `executeOperation`. See Aave developer docs for reentrancy and validation patterns.
- Prefer `flashLoanSimple` when only one asset is needed; no risk of opening unintended debt.

## Base contracts

Inherit `FlashLoanReceiverBase` or `FlashLoanSimpleReceiverBase` from `contracts/flashloan/base/` for a pre-wired POOL and ADDRESSES_PROVIDER.

<!--
Source references:
- sources/aave-v3/contracts/interfaces/IPool.sol (flashLoan, flashLoanSimple)
- sources/aave-v3/contracts/flashloan/interfaces/IFlashLoanReceiver.sol
- sources/aave-v3/contracts/flashloan/interfaces/IFlashLoanSimpleReceiver.sol
- sources/aave-v3/README.md
-->
