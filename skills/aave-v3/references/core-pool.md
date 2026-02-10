---
name: aave-v3-pool
description: IPool interface—supply, withdraw, borrow, repay, liquidation, and user/reserve data.
---

# Aave V3 Pool (IPool)

Main entry for liquidity: supply/withdraw, borrow/repay, liquidate, flash loans. Get pool and user state via view functions.

## Usage

- **Supply**: `supply(asset, amount, onBehalfOf, referralCode)` or `supplyWithPermit(...)` for gasless approve.
- **Withdraw**: `withdraw(asset, amount, to)`; use `type(uint256).max` to withdraw full aToken balance.
- **Borrow**: `borrow(asset, amount, interestRateMode, referralCode, onBehalfOf)`. `interestRateMode`: 1 = Stable, 2 = Variable.
- **Repay**: `repay(asset, amount, interestRateMode, onBehalfOf)`, or `repayWithPermit(...)`, or `repayWithATokens(asset, amount, interestRateMode)` to repay with aTokens.
- **Collateral**: `setUserUseReserveAsCollateral(asset, useAsCollateral)`.
- **Liquidate**: `liquidationCall(collateralAsset, debtAsset, user, debtToCover, receiveAToken)` when health factor < 1.
- **Rates**: `swapBorrowRateMode(asset, interestRateMode)`; `rebalanceStableBorrowRate(asset, user)` (when conditions allow).

## Key view functions

- `getUserAccountData(user)` → totalCollateralBase, totalDebtBase, availableBorrowsBase, currentLiquidationThreshold, ltv, healthFactor.
- `getReserveData(asset)` → full `ReserveData` (configuration, aToken/stableDebt/variableDebt addresses, rates, liquidity index, etc.).
- `getConfiguration(asset)` → `ReserveConfigurationMap`.
- `getUserConfiguration(user)` → `UserConfigurationMap` (bitmap of collateral/borrow per reserve).
- `getReservesList()` → list of underlying asset addresses; `getReserveAddressById(id)` for id → asset.
- `getReserveNormalizedIncome(asset)`, `getReserveNormalizedVariableDebt(asset)` for index math.

## Constants / fees

- `MAX_STABLE_RATE_BORROW_SIZE_PERCENT()`, `FLASHLOAN_PREMIUM_TOTAL()`, `FLASHLOAN_PREMIUM_TO_PROTOCOL()`, `BRIDGE_PROTOCOL_FEE()`, `MAX_NUMBER_RESERVES()`.

## EMode and isolation

- `setUserEMode(categoryId)`, `getUserEMode(user)`, `getEModeCategoryData(id)`, `configureEModeCategory(id, config)` (config).
- `resetIsolationModeTotalDebt(asset)` when asset has zero debt ceiling.

Pool address: get from `IPoolAddressesProvider(provider).getPool()`.

<!--
Source references:
- sources/aave-v3/contracts/interfaces/IPool.sol
- sources/aave-v3/README.md
-->
