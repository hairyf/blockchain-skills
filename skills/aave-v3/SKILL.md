---
name: aave-v3-core
description: Aave Protocol V3 core contracts—Pool (supply, borrow, liquidate, flash loans), data types, addresses provider, eMode and isolation.
metadata:
  author: hairy
  version: "2026.2.9"
  source: Generated from https://github.com/aave/aave-v3-core, scripts at https://github.com/antfu/skills
---

> Skill based on Aave V3 Core (contracts as of 2026-02-09), generated from `sources/aave-v3`. Note: repo is deprecated; latest V3 lives at [aave-dao/aave-v3-origin](https://github.com/aave-dao/aave-v3-origin). This skill still applies to the core interfaces and patterns.

Aave V3 is a decentralized liquidity market: supply assets to earn yield, borrow over- or under-collateralized. Core entry is **IPool** (supply, withdraw, borrow, repay, liquidation, flash loans). Use **IPoolAddressesProvider** to get Pool and oracle/configurator addresses per market. **DataTypes** define reserve and user config bitmaps and structs. **Flash loans** use IFlashLoanReceiver / IFlashLoanSimpleReceiver. **eMode** and **isolation mode** affect LTV and which collateral can back debt.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Pool (IPool) | Supply, withdraw, borrow, repay, liquidation, views | [core-pool](references/core-pool.md) |
| DataTypes | ReserveData, ReserveConfigurationMap, UserConfigurationMap, EModeCategory, InterestRateMode | [core-data-types](references/core-data-types.md) |
| Flash Loans | IFlashLoanReceiver, IFlashLoanSimpleReceiver, flashLoan vs flashLoanSimple | [core-flashloan](references/core-flashloan.md) |
| Addresses Provider | getPool, getMarketId, getAddress, oracle/configurator/ACL | [core-addresses-provider](references/core-addresses-provider.md) |

## Features

### Risk & Modes

| Topic | Description | Reference |
|-------|-------------|-----------|
| EMode & Isolation | eMode categories, setUserEMode; isolation mode and siloed borrowing | [features-emode-isolation](references/features-emode-isolation.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Integration | NPM @aave/core-v3, imports, permit, reading reserve/user data | [best-practices-integration](references/best-practices-integration.md) |
