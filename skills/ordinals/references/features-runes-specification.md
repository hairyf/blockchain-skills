---
name: features-runes-specification
description: Runestone encoding—OP_RETURN OP_13, LEB128, message format, edict delta encoding.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ordinals/ord (docs/src/runes/specification.md)
---

# Runes Runestone Encoding

The **normative** specification is the `ord` codebase. This reference summarizes runestone layout and encoding for agents that parse or generate runes.

## Locating and decoding

1. Find first output with script pubkey starting with `OP_RETURN OP_13`.
2. Concatenate all following **data pushes** (opcodes 0–78) into a payload. Any non-push opcode (≥79) → cenotaph.
3. Decode payload as a sequence of **128-bit LEB128** integers. Overflow, >18 bytes per varint, or truncated stream → cenotaph.
4. Parse integer sequence as tag/value pairs into an untyped message; tag 0 starts **edicts**: groups of four integers (rune id block, rune id tx, amount, output). Delta-encode edict rune IDs (see below).

## Message shape

- **Etching**: divisibility, premine, rune (name), spacers, symbol, terms (amount, cap, height start/end, offset start/end).
- **Mint**: rune ID to mint.
- **Pointer**: default output index for remaining runes.
- **Edicts**: after tag 0, quadruples (block_delta, tx_or_tx_delta, amount, output). Edicts must be **sorted by (block, tx)** before encoding.

## Edict delta encoding

Base: block=0, tx=0. For each edict: add block delta to base block; if block delta is 0, next integer is tx **delta**; if block delta > 0, next integer is **absolute** tx index. Then update base to current (block, tx).

Example: edicts (10,5,5,1), (10,5,10,3), (10,7,1,8), (50,1,25,4) → sorted then encoded as block_delta, tx_delta, amount, output: (10,5,5,1), (0,0,10,3), (0,2,1,8), (40,1,25,4).

## Rune names

Names are modified base-26 (A–Z) encoded as 128-bit integer. Spacers do not affect the integer.

## Practical use

- When building runestones, sort edicts by (block, tx) and use delta encoding for rune IDs.
- Use LEB128 for all integer fields. Validate payload size and varint bounds to avoid cenotaphs.
- For authoritative behavior, rely on `ord` (e.g. `ord wallet` for creating txs, index for state).

<!--
Source references:
- sources/ordinals/docs/src/runes/specification.md
-->
