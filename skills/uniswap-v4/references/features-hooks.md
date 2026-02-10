---
name: uniswap-v4-hooks
description: IHooks lifecycle and address-based hook permission flags in Uniswap v4.
---

# Hooks in Uniswap v4

Pools can attach a **hooks** contract that runs at defined points in the pool lifecycle. Which callbacks run is fixed at pool creation and encoded in the **hooks contract’s deployment address**: the PoolManager reads the least significant bits of that address to decide which hooks to call. The hook contract must be deployed to an address whose low bits match the chosen flags (see the Hooks library in the repo for the bit layout).

## Callbacks (IHooks)

All return `bytes4` selector for validation; some also return deltas or fee overrides.

- **beforeInitialize** / **afterInitialize** — before/after pool state is initialized. After receives `tick`.
- **beforeAddLiquidity** / **afterAddLiquidity** — add liquidity. After receives caller `delta`, `feesAccrued`, and can return a **BalanceDelta** (hook’s own delta in token0/token1).
- **beforeRemoveLiquidity** / **afterRemoveLiquidity** — remove liquidity. Same delta/fees pattern as add.
- **beforeSwap** / **afterSwap** — swap. Before can return **BeforeSwapDelta** and optional **lp fee override** (only when pool has dynamic fee and override bit set). After can return **int128** (hook delta in unspecified currency).
- **beforeDonate** / **afterDonate** — donate.

Which of these are invoked is **immutable per pool**: determined by the hooks address at initialization. The hook logic (e.g. what the hook does in `afterSwap`) can be upgradeable if the hook contract is designed that way, but you cannot add or remove which callbacks are called for an existing pool.

## Practical notes

- Hooks are optional: `hooks` in `PoolKey` can be `address(0)`.
- Only the PoolManager should call hook methods; implement access control accordingly.
- Hook-returned deltas are part of the same unlock settlement: hook owes pool (negative) or pool owes hook (positive), and must be settled by the end of the unlock.

<!--
Source references:
- https://github.com/Uniswap/v4-core
- sources/uniswap-v4/src/interfaces/IHooks.sol
- sources/uniswap-v4/README.md (Architecture – hook callbacks)
-->
