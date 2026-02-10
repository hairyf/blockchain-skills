---
name: uniswap-v4-types
description: PoolKey, PoolId, Currency, BalanceDelta, and operation params in Uniswap v4.
---

# Core Types and Params

## PoolKey and PoolId

- **PoolKey**: `currency0`, `currency1` (must be sorted: `address(currency0) < address(currency1)`), `fee` (uint24, max 1_000_000; high bit set = dynamic fee and must be 0x800000), `tickSpacing` (int24), `hooks` (IHooks).
- **PoolId**: `bytes32`; computed as `keccak256(abi.encode(poolKey))`. Use `PoolIdLibrary.toId(poolKey)`.

## Currency

- **Currency**: custom type over `address`. `address(0)` is native (ETH). Use `CurrencyLibrary` for transfer, balance, and ERC6909 id conversion (`toId`/`fromId`).

## BalanceDelta

- **BalanceDelta**: packed `(int128 amount0, int128 amount1)` in one int256. Positive = owed to the holder (e.g. caller or hook), negative = owed to the pool. Helpers: `toBalanceDelta(amount0, amount1)`, `BalanceDeltaLibrary.amount0`/`amount1`, `ZERO_DELTA`; operators `+`, `-`, `==`, `!=`.

## Operation params

- **ModifyLiquidityParams**: `tickLower`, `tickUpper` (int24), `liquidityDelta` (int256), `salt` (bytes32 for unique positions in same range).
- **SwapParams**: `zeroForOne` (bool), `amountSpecified` (int256; negative = exact input, positive = exact output), `sqrtPriceLimitX96` (uint160; swap stops at this price).

## Usage

```solidity
PoolKey memory key = PoolKey({
    currency0: Currency.wrap(token0),
    currency1: Currency.wrap(token1),
    fee: 3000,
    tickSpacing: 60,
    hooks: IHooks(address(0))
});
PoolId id = key.toId();

ModifyLiquidityParams memory params = ModifyLiquidityParams({
    tickLower: -60,
    tickUpper: 60,
    liquidityDelta: 1e18,
    salt: bytes32(0)
});

SwapParams memory sp = SwapParams({
    zeroForOne: true,
    amountSpecified: -1e18,  // exact in
    sqrtPriceLimitX96: sqrtPriceLimit
});
```

<!--
Source references:
- https://github.com/Uniswap/v4-core
- sources/uniswap-v4/src/types/PoolKey.sol
- sources/uniswap-v4/src/types/PoolId.sol
- sources/uniswap-v4/src/types/Currency.sol
- sources/uniswap-v4/src/types/BalanceDelta.sol
- sources/uniswap-v4/src/types/PoolOperation.sol
-->
