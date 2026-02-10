---
name: aave-v3-data-types
description: DataTypes library—ReserveData, ReserveConfigurationMap, UserConfigurationMap, EModeCategory, InterestRateMode.
---

# Aave V3 DataTypes

Core structs and enums used across Pool, Configurator, and libraries. Import: `import {DataTypes} from "@aave/core-v3/contracts/protocol/libraries/types/DataTypes.sol";`

## ReserveData

Per-reserve state: `configuration` (ReserveConfigurationMap), `liquidityIndex`, `currentLiquidityRate`, `variableBorrowIndex`, `currentVariableBorrowRate`, `currentStableBorrowRate`, `lastUpdateTimestamp`, `id`, `aTokenAddress`, `stableDebtTokenAddress`, `variableDebtTokenAddress`, `interestRateStrategyAddress`, `accruedToTreasury`, `unbacked`, `isolationModeTotalDebt`.

## ReserveConfigurationMap

Single `uint256 data` bitmap. Bits (see ReserveConfiguration.sol): LTV (0–15), liquidation threshold (16–31), liquidation bonus (32–47), decimals (48–55), active/frozen/borrowing/stable borrowing/paused (56–60), borrowable in isolation, siloed borrowing, flashloan (61–63), reserve factor (64–79), borrow cap (80–115), supply cap (116–151), liquidation protocol fee (152–167), eMode category (168–175), unbacked mint cap (176–211), debt ceiling isolation (212–251). Use `ReserveConfiguration` library getters/setters when working in protocol code; for read-only use `pool.getConfiguration(asset)`.

## UserConfigurationMap

`uint256 data`: bitmap of user collateral/borrow per asset (pairs of bits per reserve). Use `UserConfiguration` library to decode; or use `getUserAccountData(user)` for aggregated metrics.

## EModeCategory

`ltv`, `liquidationThreshold`, `liquidationBonus`, `priceSource`, `label`. Category 0 = default (volatile). eMode allows higher LTV for same-category assets.

## InterestRateMode

Enum: `NONE` (0), `STABLE` (1), `VARIABLE` (2). Used in borrow/repay and flash loan modes (0 = no debt, 1/2 = open stable/variable debt if not repaid).

## Other structs

Internal/params structs: `ReserveCache`, `ExecuteLiquidationCallParams`, `ExecuteSupplyParams`, `ExecuteBorrowParams`, `ExecuteRepayParams`, `ExecuteWithdrawParams`, `FlashloanParams`, `FlashloanSimpleParams`, `ValidateBorrowParams`, `CalculateInterestRatesParams`, `InitReserveParams`, etc. Used by Pool logic libraries, not typically needed for integration.

<!--
Source references:
- sources/aave-v3/contracts/protocol/libraries/types/DataTypes.sol
- sources/aave-v3/contracts/protocol/libraries/configuration/ReserveConfiguration.sol
-->
