---
name: Sending messages in Tact
description: send(), SendParameters, reply, forward, notify, cashback, deploy(), message(), emit(), and outbound message processing.
---

# Sending messages

Messages are queued during the **compute phase** and actually sent in the **action phase**. Failures in the action phase do not revert the transaction; use `SendIgnoreErrors` to continue on send failure.

## SendParameters

Used with `send(SendParameters { ... })`:

| Field    | Type     | Description |
|----------|----------|-------------|
| `to`     | Address  | Recipient. |
| `value`  | Int      | nanoTON to send. |
| `bounce` | Bool     | Default true; message bounces back on recipient failure. |
| `mode`   | Int      | Base mode + optional flags (see [Message mode](/book/message-mode)). |
| `body`   | Cell?    | Message body. |
| `code`   | Cell?    | Contract code (deploy). |
| `data`   | Cell?    | Initial data (deploy). |

## Common sending patterns

- **Reply (bounceable):** `self.reply("Hi".asComment());` — same as `self.forward(sender(), body, true, null)`.
- **Notify (non-bounceable):** `self.notify("Hi".asComment());` — same as `self.forward(sender(), body, false, null)`.
- **Generic send:** `send(SendParameters { to, value, mode: SendIgnoreErrors, body: MyMsg{}.toCell() });`
- **Deploy:** Set `code` and `data` from `initOf Contract(args)`; get address with `contractAddress(init)`.
- **Cashback (Tact 1.6.1+):** `cashback(sender());` — most gas-efficient way to send remaining value to an address (SendRemainingValue | SendIgnoreErrors). No effect if other message-sending functions were already used in the same receiver.
- **Cheaper non-deploy messages (1.6+):** `message(MessageParameters { ... });` — like SendParameters but without `code`/`data`.
- **Deploy (1.6+):** `deploy(DeployParameters { init: initOf C(), value, mode, ... });` — cheaper than `send()` for deployment.
- **Logging:** `emit(body);` — no recipient; for off-chain analysis. Mode is 0.

## Advanced

- **sendRawMessage(msg: Cell, mode: Int)** — Send a raw message cell (1.6.6+).
- **self.forward(to, body, bounce, init)** — Queues message; respects `self.storageReserve` when using remaining balance.

## Key points

- Outbound messages are evaluated and queued in order during compute; actual sends happen in action phase. If balance is insufficient for a later message, that send can fail without reverting (use SendIgnoreErrors to ignore).
- Prefer `cashback(sender())` when returning excess value; prefer `message()` / `deploy()` over `send()` when not needing code/data for gas savings.
- For deploy, use `initOf Contract(args)` to get `StateInit` (code + data) and `contractAddress(init)` for the address.

<!--
Source references:
- https://docs.tact-lang.org/book/send
- https://docs.tact-lang.org/ref/core-send
- sources/ton-tact/docs/src/content/docs/ref/core-send.mdx
- sources/ton-tact/docs/src/content/docs/ref/core-base.mdx
-->
