---
name: Receiving messages in Tact
description: Internal message receivers — receive(), receive(text), receive(String), receive(Message), receive(Slice); order and patterns.
---

# Receiving messages

TON is message-based. Contracts handle **internal messages** (from other contracts or wallets) with **receiver functions**. Receivers cannot be called directly; reuse logic by calling internal functions from receivers.

## Receiver kinds and order

Handling order:

1. **`receive()`** — Empty body.
2. **`receive("exact")`** — Exact text comment.
3. **`receive(str: String)`** — Any text comment.
4. **`receive(msg: MyMessage)`** — Binary message of type `MyMessage`.
5. **`receive(raw: Slice)`** — Unknown binary (fallback).

Example:

```tact
message MyMessage { value: Int; }
contract MyContract {
    receive() { /* ... */ }
    receive("message") { /* ... */ }
    receive(str: String) { /* ... */ }
    receive(msg: MyMessage) { /* ... */ }
    receive(msg: Slice) { /* ... */ }
}
```

## Ignoring message body

Use `_` to discard the value when only the opcode matters:

```tact
message(42) UniverseCalls {}
receive(_: UniverseCalls) { /* got opcode 42 */ }
```

## Other receivers

- **`bounced(msg: bounced<M>)`** — Handles bounced-back outgoing messages; see [Bounced messages](/book/bounced).
- **`external(msg: ExtMsg)`** — External messages (no sender); require explicit `acceptMessage()` and replay protection (e.g. seqno).

## Key points

- One receiver per message shape; use the most specific receiver that matches.
- For external messages always verify sender/signature and use replay protection (seqno or similar).
- Parse and validate in the receiver; prefer binary messages over on-chain string parsing for gas.

<!--
Source references:
- https://docs.tact-lang.org/book/receive
- sources/ton-tact/docs/src/content/docs/book/receive.mdx
- sources/ton-tact/docs/src/content/docs/book/functions.mdx
-->
