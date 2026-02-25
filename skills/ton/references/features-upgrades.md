---
name: ton-upgrades
description: Contract upgrades on TON — setCodePostponed, setData, delayed and hot upgrade patterns.
---

# Contract Upgrades

Contract address is derived from initial code and state. Upgrading allows new code and/or data while keeping the same address (critical for NFTs, vanity addresses, DEXes).

## Primitives (Tolk)

- **`contract.setCodePostponed(code: cell)`**: Schedules code replacement in the **action phase**. New code is active after the current transaction.
- **`contract.setData(data: cell)`**: Replaces persistent storage in the **compute phase** (immediate). New code from setCodePostponed runs only on the next message.

Restrict upgrade messages to an admin (e.g. check `in.senderAddress == storage.adminAddress`). Ensure enough Toncoin for the full transaction (compute + action); otherwise the whole transaction can revert.

## Basic upgrade

Admin sends message with new `code` and/or `data`. Contract: verify admin → if code: `setCodePostponed(code)` → if data: `setData(data)`. Upgrade completes in one transaction; new code applies from the next message.

## Delayed upgrade (production)

Request → wait → approve (or reject). Store upgrade request with timestamp; allow `ApproveUpgrade` only after `timestamp + timeout`. Gives users time to react if admin is compromised.

## Hot upgrade (frequent updates)

When storage changes often (e.g. DEX pool), prepared data in a normal upgrade can be stale when the upgrade runs. Hot upgrade: call `setCodePostponed(newCode)`, then `setTvmRegisterC3(...)` to switch to new code immediately, then call a **migration function** (e.g. `hotUpgradeData`) that reads current storage with the old layout, transforms to the new layout, and calls `setData()`. Migration runs in the same transaction so it sees up-to-date state. Migration function must have a fixed `@method_id` and exist in both old and new code (old can no-op). Test migrations on testnet; failure can brick the contract.

## When to use

- **Basic**: Rare upgrades, predictable state.
- **Delayed**: Production protocols; time for users to exit.
- **Hot**: High-frequency state updates; storage layout changes without losing in-flight updates.

<!--
Source references:
- https://github.com/ton-org/docs (contract-dev/upgrades.mdx)
-->
