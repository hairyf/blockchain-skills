---
name: uniswap-v4-architecture
description: Uniswap v4 core singleton design, unlock/callback flow, and delta settlement.
---

# Uniswap v4 Core Architecture

v4-core uses a **singleton** design: all pool state lives in a single `PoolManager.sol`. Pool actions (swap, modifyLiquidity, donate, etc.) are only allowed inside an **unlock**; the caller must implement `IUnlockCallback.unlockCallback` and settle net balances before the unlock ends.

## Unlock flow

1. Caller calls `poolManager.unlock(data)`.
2. PoolManager calls back `IUnlockCallback(msg.sender).unlockCallback(data)`.
3. Inside the callback, the caller may call `swap`, `modifyLiquidity`, `donate`, `take`, `settle`, `mint`, `burn` on the PoolManager.
4. During the unlock, only **net deltas** are tracked (owed to user = positive, owed to pool = negative).
5. When the callback returns, **all currency deltas must net to zero**; otherwise the manager reverts with `CurrencyNotSettled()`.

So: any positive delta (user is owed) must be matched by `take`; any negative delta (user owes) must be matched by `settle`/`settleFor` or by sending tokens and calling `sync` before settle. Pool **initialization** can be done outside an unlock.

## Key points

- **Single entry**: All state-changing pool actions go through `unlock` → `unlockCallback`. This gives one reentrancy boundary and lets callers batch many actions in one unlock.
- **Delta semantics**: `BalanceDelta` is (amount0, amount1) as int128s; positive = owed to caller, negative = owed to pool. Sum over an unlock must be zero per currency.
- **No direct transfers**: You don’t transfer tokens to the pool before a swap. You perform the swap (which updates deltas), then `take`/`settle`/`mint`/`burn` to clear them.
- **ERC20**: Call `sync(currency)` before sending ERC20s to the manager so it can compute deltas; native currency can be settled via `settle()` with `msg.value`.

## Usage

```solidity
import {IPoolManager} from 'v4-core/src/interfaces/IPoolManager.sol';
import {IUnlockCallback} from 'v4-core/src/interfaces/callback/IUnlockCallback.sol';

contract MyRouter is IUnlockCallback {
    IPoolManager public poolManager;

    function swapAndSettle(PoolKey memory key, SwapParams memory params, bytes calldata hookData) external {
        poolManager.unlock(abi.encode(key, params, hookData));
    }

    function unlockCallback(bytes calldata data) external override returns (bytes memory) {
        if (msg.sender != address(poolManager)) revert Unauthorized();
        (PoolKey memory key, SwapParams memory params, bytes calldata hookData) = abi.decode(data, (PoolKey, SwapParams, bytes));
        BalanceDelta delta = poolManager.swap(key, params, hookData);
        // Settle: pay negative deltas (e.g. transfer in), take positive (withdraw).
        _settleDelta(delta);
        return "";
    }
}
```

<!--
Source references:
- https://github.com/Uniswap/v4-core (README.md – Architecture)
- sources/uniswap-v4/README.md
-->
