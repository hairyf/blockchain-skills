---
name: axelar-best-practices-rate-limits-and-fees
description: Rate limits, transfer fees, and chain maintainer responsibilities
metadata:
  author: hairy
---

# Rate Limits and Fees

When building or operating on Axelar, respect **transfer rate limits** and **fee configuration** to avoid failed transfers and ensure correct economics.

## Transfer rate limits

- **Per (chain, asset)**: A **limit** (amount) and a **window** (duration). Transfers that would exceed the limit in the window are rejected or deferred.
- **Query**: `axelard query nexus transfer-rate-limit [chain] [asset]`.
- **Set**: Only chain maintainers (or governance) can set; `axelard tx nexus set-transfer-rate-limit [chain] [limit] [window] --from $KEY -y`.
- **Best practice**: Before large transfers or integrations, query the current rate limit and plan batching or timing so stays within the window.

## Transfer fees

- **Fee info** per (chain, asset): fee rate, min fee, max fee. Applied to cross-chain transfers.
- **Query**: `axelard query nexus fee-info [chain] [asset]` and `axelard query nexus transfer-fee [src] [dst] [amount]`.
- **Register/update**: `axelard tx nexus register-asset-fee [chain] [asset] [fee-rate] [min-fee] [max-fee]` (governance/maintainer).
- **Best practice**: Always query `transfer-fee` for the path and amount before sending; ensure user pays at least that fee (or that the app subsidizes it).

## Chain maintainers

- **Chain maintainers** are validators registered for a chain. They can set rate limits and perform routing/retries.
- **Query**: `axelard query nexus chain-maintainers [chain]`.
- **Register/deregister**: `axelard tx nexus register-chain-maintainer [chain]...`, `axelard tx nexus deregister-chain-maintainer [chain]...` (validator key).
- **Best practice**: Operators should only register for chains they can maintain (monitoring, retries, rate limit tuning).

## Insufficient amount and failed transfers

- Transfers can be in state **InsufficientAmount** or **Failed**. Query `axelard query nexus transfers-for-chain [chain] insufficient_amount` or `archived` to inspect.
- **Retry**: IBC retries via `axelard tx axelarnet retry-ibc-transfer [transfer-id]`; EVM via `axelard tx evm retry-event [chain] [event-id]`.
- **Best practice**: Monitor pending and failed transfers; surface errors to users and retry when appropriate.

## EVM gas and confirmation height

- Each EVM chain has a **confirmation height**. Events are only processed after that many confirmations.
- **Query**: `axelard query evm confirmation-height [chain]`.
- **Best practice**: When estimating time-to-finality for EVM flows, account for confirmation height and destination chain block time.

<!--
Source references:
- https://github.com/axelarnetwork/axelar-core (x/nexus, x/evm, docs/cli)
- proto/axelar/nexus (RateLimit, FeeInfo, TransferFee)
-->
