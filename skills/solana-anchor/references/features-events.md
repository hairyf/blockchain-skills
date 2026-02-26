---
name: Events
description: Emitting events with emit! and emit_cpi!, and subscribing on the client.
---

# Events

Anchor provides two ways to emit events:

1. **`emit!(Event { ... })`** – Writes to program logs (base64-encoded). Simple; logs may be truncated by some RPC providers.
2. **`emit_cpi!(Event { ... })`** – Emits via a self-CPI; event data is in the inner instruction. Avoids log truncation but costs more CUs. Requires `event-cpi` feature and `#[event_cpi]` on the instruction’s Accounts struct.

## emit! (program logs)

```rust
#[event]
pub struct CustomEvent {
    pub message: String,
}

pub fn emit_event(_ctx: Context<EmitEvent>, input: String) -> Result<()> {
    emit!(CustomEvent { message: input });
    Ok(())
}
```

Client: subscribe with `program.addEventListener("customEvent", (event) => { ... })`, then `program.removeEventListener(listenerId)`. Ensure the RPC does not truncate logs.

## emit_cpi!

- In `Cargo.toml`: `anchor-lang = { version = "0.32", features = ["event-cpi"] }`.
- Add `#[event_cpi]` to the Accounts struct for the instruction that calls `emit_cpi!`.
- Client: fetch the transaction and decode the event from the inner CPI instruction data (first 8 bytes = discriminator, then event data). No direct subscription.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/features/events.mdx)
-->
