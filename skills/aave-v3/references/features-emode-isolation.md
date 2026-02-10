---
name: aave-v3-emode-isolation
description: EMode categories and isolation mode—higher LTV for same category; siloed and isolation borrowing.
---

# Aave V3 EMode and Isolation Mode

## EMode (Efficiency Mode)

- **Purpose**: Same-category assets (e.g. correlated stablecoins) get a custom LTV and liquidation threshold for higher capital efficiency.
- **Category 0**: Default for volatile assets; no special eMode.
- **User**: `setUserEMode(categoryId)` to opt in; `getUserEMode(user)` to read.
- **Config** (PoolConfigurator): `configureEModeCategory(id, EModeCategory(ltv, liquidationThreshold, liquidationBonus, priceSource, label))`.
- **Read**: `getEModeCategoryData(id)` on Pool.

## Isolation Mode

- **Purpose**: New/capsule assets can be borrowable only in isolation: debt is capped per asset and only specific collateral can back it; avoids contaminating main pool risk.
- **Reserve config**: “Borrowable in isolation” and “debt ceiling” (and optionally “siloed borrowing”) are set in `ReserveConfigurationMap` via PoolConfigurator.
- **Total debt**: `isolationModeTotalDebt` in `ReserveData`; `resetIsolationModeTotalDebt(asset)` when ceiling is 0.
- **Event**: `IsolationModeTotalDebtUpdated(asset, totalDebt)`.

## Siloed Borrowing

- **Reserve config bit**: “Siloed borrowing” — when set, borrowing that asset is restricted (siloed) to reduce risk. Check reserve config or docs for current behavior per market.

## When to use

- **Agents**: When building liquidations or health checks, respect `getUserEMode(user)` and eMode category data (custom LTV/liq threshold). For isolation, consider only allowed collateral and debt ceiling when computing borrow capacity and liquidatability.

<!--
Source references:
- sources/aave-v3/contracts/interfaces/IPool.sol (setUserEMode, getEModeCategoryData, configureEModeCategory, resetIsolationModeTotalDebt)
- sources/aave-v3/contracts/protocol/libraries/types/DataTypes.sol (EModeCategory, isolationModeTotalDebt)
- sources/aave-v3/contracts/protocol/libraries/configuration/ReserveConfiguration.sol (bits)
-->
