---
name: core-comptime
description: Compile-time only functions — address(), cell(), slice(), rawSlice(), ascii(), crc32(), ton().
---

# Compile-time functions

Functions evaluated at build time only; arguments must be constant. Use for embedding addresses, BoC, and literals into the contract.

## Usage

**Address (string to Address):**

```tact
let addr: Address = address("EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N");
```

**Cell / Slice from base64 BoC:**

```tact
let c: Cell = cell("te6cckEBAQEAYgAA...");
let s: Slice = slice("te6cckEBAQEADgAAG...");  // Tact 1.5+
```

**Raw slice from hex (optional bit-padding with trailing `_`):**

```tact
let s: Slice = rawSlice("4a");           // 8 bits
let padded: Slice = rawSlice("4a_");      // trailing zeros + 1 removed; up to 1023 bits (Tact 1.5+)
```

**ASCII string to Int (up to 32 bytes, for opcodes/actions):**

```tact
message(ascii("NstK")) Action { }   // opcode from string
if (msg.action == ascii("start")) { }
```

**CRC-32 checksum (compile-time):**

```tact
let checksum: Int = crc32("000DEADBEEF000");  // Tact 1.5+
```

**Toncoin string to nanoToncoin:**

```tact
let one: Int = ton("1");
let pointOne: Int = ton("0.1");
let nano: Int = ton("0.000000001");
```

## Key points

- All of these are compile-time only; non-constant arguments are not allowed.
- `rawSlice("hex_")` pads: trailing zeros and last 1 bit are removed.
- `ascii` assumes UTF-8; result fits in 256 bits (up to 32 bytes).
- Other APIs (e.g. sha256 with constant string) may also resolve at compile-time when possible.

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/ref/core-comptime.mdx
-->
