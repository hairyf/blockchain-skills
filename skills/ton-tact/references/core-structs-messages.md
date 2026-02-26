---
name: Structs and messages in Tact
description: Defining structs and messages, instantiation, field punning, toCell/fromCell/fromSlice, and TL-B layout.
---

# Structs and messages

Structs and messages group multiple fields into one type. **Structs** are plain data; **messages** add a 32-bit opcode so contracts can route by message type.

## Structs

```tact
struct Point {
    x: Int as int64;
    y: Int as int64;
}
struct Line { start: Point; end: Point; }
```

- Fields can have defaults: `name: String = "Satoshi";` and optionals: `age: Int?;`.
- No circular types (A with field of type B, B with field of type A).
- Field order defines TL-B layout; no padding.

## Messages

```tact
message Add { point: Point; }
message(0x7362d09c) TokenNotification { forwardPayload: Slice as remaining; }
```

- Opcode is auto-generated or set explicitly with `message(0x....)`.
- Use explicit opcodes when implementing standards (e.g. Jetton) that require fixed opcodes.

## Instantiation

Use braces; trailing commas allowed. Variable names matching field names allow shorthand (field punning):

```tact
StA{ field1: 42, field2: 68 };
PopQuiz{ vogonsCount, nicestNumber };  // field punning
```

## Cell/Slice conversion

- **`.toCell()`** — Serialize struct or message to `Cell`.
- **`.fromCell(c: Cell)`** / **`.fromSlice(s: Slice)`** — Deserialize; layout must match or errors can occur (use try/catch if needed).
- Round-trip: `X.fromCell(inst.toCell())` equals `inst`; for a cell with same TL-B layout, `X.fromCell(c).toCell()` equals `c`.

## Key points

- Prefer structs/messages and `.toCell()`/`.fromCell()` over manual Builder/Slice for consistency and maintainability.
- Important message fields for bounce handling should be first; bounced payload is at most 224 bits (see [bounced messages](/book/bounced)).

<!--
Source references:
- https://docs.tact-lang.org/book/structs-and-messages
- sources/ton-tact/docs/src/content/docs/book/structs-and-messages.mdx
- sources/ton-tact/docs/src/content/docs/zh-cn/ref/core-cells.mdx
-->
