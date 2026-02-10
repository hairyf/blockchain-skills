---
name: uniswap-v4-unlock-callback
description: IUnlockCallback and unlock(data) — the only way to perform pool actions in v4.
---

# Unlock and Unlock Callback

Pool state-changing actions (swap, modifyLiquidity, donate, take, settle, mint, burn) are **only** callable while the PoolManager is unlocked. The manager unlocks by calling back the caller’s `unlockCallback`.

## Interface

```solidity
interface IUnlockCallback {
    function unlockCallback(bytes calldata data) external returns (bytes memory);
}
```

- `unlock(data)`: Only the PoolManager may call `unlockCallback`; it passes the same `data` the caller gave to `unlock`. Return value of `unlock` is the return value of `unlockCallback`.
- **Reverts**: `ManagerLocked()` if a pool action is used without an active unlock; `AlreadyUnlocked()` if `unlock` is called reentrantly; `CurrencyNotSettled()` if any currency delta is non-zero when the callback returns.

## Callable from outside unlock

- `initialize(PoolKey, sqrtPriceX96)` — create a new pool.
- `updateDynamicLPFee(PoolKey, newDynamicLPFee)` — only by the pool’s hook, and only for pools with dynamic fees.

Everything else that moves balances or pool state must run inside `unlockCallback`.

## Security

- At the start of `unlockCallback`, enforce `msg.sender == address(poolManager)` so only the singleton can trigger the callback.
- In the same callback, perform all pool actions and then settle all deltas (take/settle/sync + transfer) so no currency is left unsettled.

<!--
Source references:
- https://github.com/Uniswap/v4-core
- sources/uniswap-v4/src/interfaces/callback/IUnlockCallback.sol
- sources/uniswap-v4/src/interfaces/IPoolManager.sol (unlock, errors)
-->
