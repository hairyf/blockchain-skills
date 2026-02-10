---
name: aave-v3-addresses-provider
description: IPoolAddressesProvider—market id, getPool, getAddress, and core protocol addresses (oracle, configurator, ACL, data provider).
---

# Aave V3 PoolAddressesProvider

Central registry for a market: pool, configurator, oracle, ACL, data provider. Use it to resolve Pool and other contract addresses by market.

## Usage

- **Market id**: `getMarketId() returns (string)`; `setMarketId(newMarketId)` (admin).
- **Pool**: `getPool() returns (address)` — main entry for supply/borrow/flash loan.
- **Generic**: `getAddress(bytes32 id) returns (address)` for any registered id.
- **Setters** (admin): `setPoolImpl`, `setPoolConfiguratorImpl`, `setPriceOracle`, `setACLManager`, `setACLAdmin`, `setPriceOracleSentinel`, `setPoolDataProvider`, `setAddress(id, addr)`, `setAddressAsProxy(id, impl)`.

## Key getters

- `getPool()` — Pool proxy.
- `getPoolConfigurator()` — PoolConfigurator (reserve init, config, rate strategy).
- `getPriceOracle()` — Price oracle for reserves.
- `getACLManager()` / `getACLAdmin()` — Access control.
- `getPriceOracleSentinel()` — L2 sequencer / circuit breaker.
- `getPoolDataProvider()` — AaveProtocolDataProvider (convenience view helpers).

## Integration

Frontend or bot: get provider address for the target network (e.g. from Aave docs or deployment), then `IPoolAddressesProvider(provider).getPool()` to get Pool and call `IPool(pool).supply/borrow/getUserAccountData(...)`.

<!--
Source references:
- sources/aave-v3/contracts/interfaces/IPoolAddressesProvider.sol
-->
