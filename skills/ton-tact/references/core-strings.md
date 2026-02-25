---
name: core-strings
description: Strings and StringBuilder — beginString, beginComment, beginTailString, append, concat, toCell, toSlice; String hashData, asSlice, asComment, fromBase64; Int toFloatString, toCoinsString.
---

# Strings and StringBuilders

Immutable strings, StringBuilder for concatenation, and conversions to/from cells/slices. Prefer off-chain string manipulation; on-chain strings are slices and costly.

## Usage

**StringBuilder:**

```tact
let sb: StringBuilder = beginString();
sb.append("a").append("b");
let s: String = sb.toString();
let cell: Cell = sb.toCell();
let slice: Slice = sb.toSlice();
```

**Comment/tail format (NFT/Jetton etc.):**

```tact
let comment: StringBuilder = beginComment();   // 4 null bytes prefix
let tail: StringBuilder = beginTailString();   // 1 null byte prefix
```

**String extensions:**

```tact
let h: Int = "text".hashData();        // SHA-256 of data, up to 127 bytes (gas-efficient)
let sl: Slice = str.asSlice();
let cell: Cell = str.asComment();     // 4-byte prefix (500+ gas)
let decoded: Slice = str.fromBase64(); // exit 134 if invalid Base64
```

**Int to string:**

```tact
let s: String = (42).toString();
let floatStr: String = (42).toFloatString(9);  // "0.000000042"; digits in 0..78
let coinsStr: String = nanotons.toCoinsString(); // alias toFloatString(9)
```

## Key points

- `beginStringFromBuilder(b)` creates a new StringBuilder from an existing one.
- Many string/cell conversions are 500+ gas; minimize on-chain string work.
- `String.hashData()` only hashes first 127 bytes; longer strings can collide.
- Use binary message structs in production instead of text receivers (see best-practices-gas).

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/ref/core-strings.mdx
-->
