---
name: Bounced messages in Tact
description: bounced<T> receiver, 224-bit payload limit, fallback bounced(Slice), and gas behavior for unrecognized bounces.
---

# Bounced messages

When a message is sent with **`bounce: true`** and the recipient fails to process it, the message **bounces back** to the sender. Use **`bounced`** receivers to handle these and revert or adjust state (e.g. restore balance).

## Bounced receiver and payload limit

- Bounced message body: at most **256 bits** total; first 32 bits are opcode, so at most **224 bits** of payload.
- Use **`bounced<M>`** so Tact enforces that only fields fitting within the limit are accessible:

```tact
bounced(msg: bounced<TokenBurnNotification>) {
    self.balance = self.balance + msg.amount;  // only if amount fits in 224 bits
}
```

- Put important fields **first** in the message; fields that don’t fit (or fit only partially) are not available in `bounced<M>`.
- **`bounced<M>`** inner type cannot be optional (`bounced<M?>` is invalid).

## Fallback bounced receiver

For messages that exceed the safe layout, use a fallback that receives the raw body as **`Slice`**:

```tact
bounced(rawMsg: Slice) {
    let opcode = rawMsg.loadUint(32);
    // handle truncated data with care
}
```

## Unrecognized bounces

If there is no matching `bounced` receiver (and no fallback), unrecognized bounced messages are **ignored**: they do not cause a non-zero exit code. Value is still credited and fees paid. This matches common TON patterns.

## Key points

- Design messages so critical bounce-handling fields fit in the first 224 bits if you use `bounced<M>`.
- Prefer `bounced<M>` when the layout fits; use `bounced(rawMsg: Slice)` only when you need to read truncated data.
- Bouncing incurs forward fees; messages sent with `value: 0` and `SendPayFwdFeesSeparately` cannot bounce (no funds to return).

<!--
Source references:
- https://docs.tact-lang.org/book/bounced
- sources/ton-tact/docs/src/content/docs/book/bounced.mdx
-->
