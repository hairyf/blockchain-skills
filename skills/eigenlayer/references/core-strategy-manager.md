---
name: StrategyManager and Strategies
description: Deposit shares, StrategyFactory, StrategyBase, and withdrawal flow via DelegationManager.
metadata:
  author: hairy
---

# StrategyManager and Strategies

The **StrategyManager** handles *deposit share* accounting for stakers depositing into whitelisted strategies. It does not handle withdrawals directly—withdrawals are queued and completed through the **DelegationManager**.

## Key Parameters

- `MAX_TOTAL_SHARES = 1e38 - 1` per strategy.
- `MAX_STAKER_STRATEGY_LIST_LENGTH = 32` strategies per staker.
- Slashed shares are sent to `DEFAULT_BURN_ADDRESS`.

## Depositing

```solidity
// Direct deposit: caller gets shares
function depositIntoStrategy(
    IStrategy strategy,
    IERC20 token,
    uint256 amount
) external returns (uint256 depositShares);

// Deposit on behalf of another staker (staker must sign)
function depositIntoStrategyWithSignature(
    IStrategy strategy,
    IERC20 token,
    uint256 amount,
    address staker,
    uint256 expiry,
    bytes memory signature
) external returns (uint256 depositShares);
```

- Requires `strategy` whitelisted and `token` matching strategy’s underlying token.
- Caller must approve StrategyManager for `token`.
- After deposit, DelegationManager updates staker’s delegated shares (if delegated).

## Strategies

- **StrategyFactory.deployNewStrategy(token)**  
  Deploys a **StrategyBase** (beacon proxy) for an ERC20; strategy is auto-whitelisted. One strategy per token; EIGEN/bEIGEN and some LSTs are blacklisted (use EigenStrategy or existing StrategyBaseTVLLimits).
- **StrategyBase**: Standard ERC20 strategy; shares ≈ 1:1 with tokens (strategy defines exchange rate).
- **EigenStrategy**: Used only for EIGEN/bEIGEN.
- **StrategyBaseTVLLimits**: Legacy LST strategies (transparent proxy); same behavior as StrategyBase for deposits/withdrawals.

## Withdrawal Flow (via DelegationManager)

1. Staker calls **DelegationManager.queueWithdrawals** (specifies strategies and share amounts).
2. StrategyManager/DelegationManager reduce staker’s deposit shares and operator shares.
3. After withdrawal delay, staker calls **DelegationManager.completeQueuedWithdrawals** either:
   - as **shares** (re-credit to staker, e.g. to redelegate), or  
   - as **tokens** (StrategyManager withdraws from strategy and sends tokens to recipient).

## Burning slashed shares

When an AVS slashes an operator, AllocationManager instructs DelegationManager to slash; StrategyManager’s `slashShares` is used to burn slashed deposit shares (tokens sent to burn address).

## Usage for agents

- To support a new ERC20: call `StrategyFactory.deployNewStrategy(token)` (if not blacklisted).
- Deposit: `StrategyManager.depositIntoStrategy(strategy, token, amount)` after approval.
- Withdraw: use DelegationManager `queueWithdrawals` and `completeQueuedWithdrawals`; do not withdraw directly from StrategyManager.

<!--
Source references:
- https://github.com/Layr-Labs/eigenlayer-contracts
- sources/eigenlayer/docs/core/StrategyManager.md
-->
