---
name: anchor-events
description: Emitting events in Anchor — emit!, emit_cpi!, #[event], addEventListener, and event-cpi feature.
---

# Anchor Events

Two ways to emit structured events: program logs (`emit!`) or CPI instruction data (`emit_cpi!`). Logs can be truncated by RPC; for robust indexing consider Geyser (e.g. Triton, Helius).

## emit! (program logs)

1. Define an event struct with `#[event]`.
2. In the instruction, call `emit!(MyEvent { field: value })`.
3. Client: `program.addEventListener("eventName", callback)` before sending the tx; parse logs (Anchor client decodes “Program data:” base64).

```rust
#[event]
pub struct CustomEvent {
    pub message: String,
}
// In handler:
emit!(CustomEvent { message: input });
```

## emit_cpi! (CPI-based)

Event data is encoded in a CPI instruction to the same program, so it’s in transaction data rather than logs.

1. Enable feature: `anchor-lang = { version = "0.32", features = ["event-cpi"] }`.
2. Add `#[event_cpi]` to the `#[derive(Accounts)]` struct for the instruction that emits.
3. In handler: `emit_cpi!(CustomEvent { message: input })`.
4. Client: fetch transaction by signature, read `meta.innerInstructions`, decode the inner instruction data (skip 8-byte discriminator, then decode event).

No direct subscription; decode from full transaction after confirmation.

<!--
Source references:
- docs/content/docs/features/events.mdx
-->
