---
name: aave-v3-integration
description: Integrating with Aave V3—npm package, imports, permit, and reading reserve/user data.
---

# Aave V3 Integration

## NPM and imports

- Install: `npm install @aave/core-v3`.
- Solidity: `import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";` (and same path pattern for other interfaces).
- ABI/artifacts: `require('@aave/core-v3/artifacts/contracts/protocol/pool/Pool.sol/Pool.json')` for ABI and bytecode.

## Getting Pool address

Use the PoolAddressesProvider for the target network (address in Aave docs). Then:

```solidity
address pool = IPoolAddressesProvider(provider).getPool();
IPool(pool).supply(asset, amount, onBehalfOf, referralCode);
```

## Permit (gasless approve)

- **Supply**: `supplyWithPermit(asset, amount, onBehalfOf, referralCode, deadline, permitV, permitR, permitS)`.
- **Repay**: `repayWithPermit(asset, amount, interestRateMode, onBehalfOf, deadline, permitV, permitR, permitS)`.
Asset must implement EIP-2612; use EIP-712 typed data for signing off-chain.

## Reading data

- User: `getUserAccountData(user)` for health factor, LTV, collateral, debt (in base currency).
- Reserve: `getReserveData(asset)` for full state; `getConfiguration(asset)` for config bitmap; `getReservesList()` and `getReserveAddressById(id)` for listing.
- Normalized indices: `getReserveNormalizedIncome(asset)`, `getReserveNormalizedVariableDebt(asset)` for aToken/debt balance math if building off-chain or custom logic.

## Referral and onBehalfOf

- `referralCode`: 0 for no referrer; otherwise use program code.
- `onBehalfOf`: beneficiary of supply (receives aTokens) or of repay (debt reduced); can be same as msg.sender.

## Documentation

- Technical paper: repo `techpaper/Aave_V3_Technical_Paper.pdf`.
- Developer docs: https://docs.aave.com/developers/.

<!--
Source references:
- sources/aave-v3/README.md
- sources/aave-v3/contracts/interfaces/IPool.sol
-->
