---
name: Message mode in Tact
description: SendParameters mode — base modes and optional flags (SendRemainingValue, SendIgnoreErrors, etc.).
---

# Message mode

The `mode` field of `SendParameters` (and similar structs) is an `Int` built from one **base mode** and optional **flags**, combined with bitwise OR `|`.

## Base modes

| Value | Constant | Description |
|------:|----------|-------------|
| 0     | `SendDefaultMode` (1.6+) | Default. |
| 64    | `SendRemainingValue` | Carry all remaining value of the **inbound** message (not reduced by earlier sends in the same tx). |
| 128   | `SendRemainingBalance` | Use **entire contract balance** (dangerous: can drain the contract). |
| 1024  | `SendOnlyEstimateFee` (1.5+) | Don’t send; only estimate forward fees. |

## Optional flags

| Value | Constant | Description |
|------:|----------|-------------|
| +1    | `SendPayFwdFeesSeparately` | Pay forward fees separately; message with `value: 0` carries no TON and cannot bounce. |
| +2    | `SendIgnoreErrors` | Do not abort on errors during action phase for this message. |
| +16   | `SendBounceIfActionFail` | Bounce transaction on action-phase errors (no effect if SendIgnoreErrors is set). |
| +32   | `SendDestroyIfZero` | Destroy contract if balance is zero after send (often used with 128). |

## Examples

```tact
mode: SendIgnoreErrors
mode: SendRemainingValue | SendIgnoreErrors
mode: SendRemainingBalance | SendDestroyIfZero
```

Use **one** base mode; combine with any set of flags. Prefer `|` for combining; avoid using `+` for mode composition.

## Functions with fixed mode

- `emit()` — uses 0 (SendDefaultMode).
- `self.reply`, `self.notify`, `self.forward` — use SendRemainingValue (or SendRemainingBalance if `self.storageReserve` > 0).

## Key points

- SendRemainingValue is based on inbound message value; SendRemainingBalance is current balance — use the latter with care.
- SendIgnoreErrors prevents a failed send from aborting the transaction; later sends still execute.
- SendPayFwdFeesSeparately with value 0 means the message cannot bounce (no funds to return).

<!--
Source references:
- https://docs.tact-lang.org/book/message-mode
- sources/ton-tact/docs/src/content/docs/book/message-mode.mdx
-->
