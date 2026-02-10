---
name: uniswap-v4-pool-actions
description: IPoolManager pool actions — initialize, swap, modifyLiquidity, donate, take, settle, sync, mint, burn, clear.
---

# Pool Manager Actions

All actions below (except `initialize` and `updateDynamicLPFee`) must be called from within `unlockCallback`.

## Initialize

- `initialize(PoolKey key, uint160 sqrtPriceX96) → int24 tick`  
  Creates the pool state. Can be called **outside** unlock. Enforces `currency0 < currency1`, `tickSpacing > 0` and ≤ `type(int16).max`, and fee rules. Emits `Initialize`.

## Swap and liquidity

- **swap**(`key`, `SwapParams params`, `hookData`) → `BalanceDelta swapDelta`  
  Executes a swap. `params`: `zeroForOne`, `amountSpecified` (negative = exact in, positive = exact out), `sqrtPriceLimitX96`. Returns the caller’s balance delta. Fee is capped; 100% fee would make exact-out impossible.

- **modifyLiquidity**(`key`, `ModifyLiquidityParams params`, `hookData`) → `(BalanceDelta callerDelta, BalanceDelta feesAccrued)`  
  Adds or removes liquidity in the given tick range. Use `liquidityDelta == 0` to “poke” (update position without changing size). `feesAccrued` is informational and can be gamed (e.g. self-donate).

- **donate**(`key`, `amount0`, `amount1`, `hookData`)  
  Donates to in-range LPs at the pool’s current tick. Can be front-run with just-in-time liquidity.

## Settlement (clearing deltas)

- **sync**(`Currency currency`)  
  Checkpoints the manager’s current balance for `currency`. **Must** be called before sending ERC20 to the manager when you intend to settle that currency; optional for native (zero address).

- **take**(`currency`, `to`, `amount`)  
  Sends `amount` of `currency` from the manager to `to`, decreasing the caller’s positive delta. Reverts if not enough balance. Can be used for flash loans (take → use → settle).

- **settle**() **payable** → `uint256 paid`  
  Pays the manager: for native currency, use `msg.value`; for ERC20, transfer tokens to the manager first (after `sync`), then call `settle()`. Credits the caller’s negative delta.

- **settleFor**(`recipient`) **payable** → `uint256 paid`  
  Same as `settle` but credits `recipient`’s delta.

- **mint**(`to`, `id`, `amount`)  
  Moves `amount` of currency (id = uint160 currency address) from manager balance into ERC6909 balance of `to`; use to settle by minting LP or hook tokens.

- **burn**(`from`, `id`, `amount`)  
  Burns ERC6909 and increases manager’s balance; use to pay in by burning.

- **clear**(`currency`, `amount`)  
  Zeros a **positive** manager balance without transferring; tokens are locked forever. Amount must equal the exact positive balance. For dust only.

## Errors (selection)

- `CurrencyNotSettled`, `PoolNotInitialized`, `AlreadyUnlocked`, `ManagerLocked`
- `CurrenciesOutOfOrderOrEqual`, `TickSpacingTooSmall` / `TickSpacingTooLarge`
- `SwapAmountCannotBeZero`, `NonzeroNativeValue`, `MustClearExactPositiveDelta`

<!--
Source references:
- https://github.com/Uniswap/v4-core
- sources/uniswap-v4/src/interfaces/IPoolManager.sol
- sources/uniswap-v4/README.md
-->
