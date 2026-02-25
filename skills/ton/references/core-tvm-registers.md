---
name: ton-tvm-registers
description: TVM registers c0–c7 — return continuations, storage, actions, environment.
---

# TVM Registers

TVM registers hold control flow, durable state, and environment. Only **c4** and **c5** persist after a successful run; the rest are transient.

## Summary

| Register | Purpose | Persistent |
|----------|---------|------------|
| c0 | Return continuation (normal exit 0) | No |
| c1 | Alternative return (exit 1) | No |
| c2 | Exception handler | No |
| c3 | Function selector (current code / method dispatch) | No |
| c4 | Account storage (contract data) | Yes |
| c5 | Outbound actions (messages, set_code, reserve, library) | Yes (action phase consumes it) |
| c7 | Environment tuple (block time, balance, config, etc.) | No |

## c4 — persistent storage

Root cell of account data. Read with `GETDATA`; write with `SETDATA`. When the transaction succeeds, the final c4 value becomes the new account state. High-level: Tolk/FunC storage maps to c4.

## c5 — action list

Accumulator of actions for the action phase. Structure: linked list of `OutAction` cells. Actions include: `action_send_msg`, `action_set_code`, `action_reserve_currency`, `action_change_library`. New actions are prepended (previous = first ref of next). Empty cell starts the list.

## c7 — environment

Tuple: index 0 = SmartContractInfo (tag `0x076ef1ea`), indices 1–255 = globals. Environment slice gives: actions count, messages sent, **NOW** (unix time), **BLOCKLT**, **LTIME**, **RANDSEED** (`sha256(block_rand_seed . account_address)`), **BALANCE**, **MYADDR**, **CONFIGROOT**, **MYCODE**, **INCOMINGVALUE**, **STORAGEFEES**, **DUEPAYMENT**, **INMSGPARAMS** (bounce, src_addr, value, etc.). Use GETGLOB/SETGLOB for globals; use TVM instructions (e.g. NOW, BALANCE) for common fields.

## c3 — function selector

Holds the current code (root cell). Used by CALLDICT for method-id dispatch. Hot upgrades can replace c3 in the same transaction via `setTvmRegisterC3()` so a migration runs with new code before `setCodePostponed` is applied.

## Key points

- Durable effects: c4 (new state), c5 (actions). c0–c3, c7 are per-transaction.
- For debugging/emulation: inspect c4 for storage, c5 for outbound messages, c7 for balance/time/sender.

<!--
Source references:
- https://github.com/ton-org/docs (tvm/registers.mdx)
-->
