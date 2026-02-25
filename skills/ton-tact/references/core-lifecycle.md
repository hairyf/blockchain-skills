---
name: core-lifecycle
description: Message lifecycle — receive phase (balance, storage), compute phase (actions), action phase (no revert).
---

# Message lifecycle

Stages of processing an incoming message: receive phase, compute phase, action phase.

## Receive phase

- **Message value added to contract balance** — this value is the effective gas budget for the transaction (capped by chain limit, e.g. 1M gas ≈ 0.4 TON basechain). Zero value aborts.
- **Storage fee deducted** — small nanotons subtracted; balance changes are not fully predictable.
- **Deploy if needed** — if contract not deployed and message carries StateInit, deployment runs; otherwise skipped.

## Compute phase

- Contract code runs and produces an **action list** or an exception.
- Supported actions: **send message** and **reserve** (e.g. `nativeReserve`).
- Send can use fixed value or remaining value; `SendIgnoreErrors` skips send failures and continues.
- Value for a send is taken from the incoming message value first, then from contract balance if needed.

## Action phase

- Actions are executed in order.
- **Exceptions during action phase do not revert the transaction.** State changes (e.g. balance updates) from earlier actions are kept even if a later action fails. Design flows so that partial execution is safe or use modes (e.g. `SendIgnoreErrors`) intentionally.

## Key points

- Receive phase: balance += message value, then storage deduction; then deploy if init present.
- Compute phase: build action list; exit code 0/1 = success, else bounce/revert.
- Action phase: run actions sequentially; failures do not roll back earlier actions.

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/book/lifecycle.mdx
-->
