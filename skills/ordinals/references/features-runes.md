---
name: features-runes
description: Runes protocol—etching, minting, transferring, edicts, and cenotaphs.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ordinals/ord (docs/src/runes.md, runes/specification.md)
---

# Runes

Runes are Bitcoin-native fungible tokens. Messages are **runestones** in transaction outputs (script pubkey: `OP_RETURN OP_13` + data pushes). Each tx has at most one runestone. Runes protocol activates at block 840,000.

## Concepts

- **Rune ID**: `BLOCK:TX` (block height and tx index of the etch tx). Example: `500:20`.
- **Etching**: Creates a rune and sets immutable properties (name, divisibility, symbol, premine, terms).
- **Minting**: When mint terms are open, anyone can mint a fixed amount per mint (subject to cap, height, offset rules).
- **Transfer**: Input runes + premine/mint output runes are allocated to outputs via **edicts** and **pointer**.

## Etching

- **Name**: A–Z, 1–26 letters. Spacers (•) allowed for readability; uniqueness is by letter sequence only.
- **Divisibility**: Decimal places (0 = indivisible).
- **Symbol**: Single Unicode character (e.g. `⧉`, `¤` if unset).
- **Premine**: Optional allocation to etcher at creation.
- **Terms**: Optional open-mint rules: **cap** (total mints), **amount** per mint, **start/end height**, **start/end offset** (relative to etch block).

## Transfer (edicts and pointer)

- **Edicts**: List of `(rune_id, amount, output_index)`. Processed in order; allocate runes to that output. Same rune can appear in multiple edicts.
- **Pointer**: After edicts, remaining unallocated runes go to the first non-OP_RETURN output; pointer can specify another output index.
- **Burning**: Send runes to an OP_RETURN (via edict or pointer) to burn.

## Cenotaphs

Malformed runestones (e.g. non-push opcodes, invalid varints, unknown fields) are **cenotaphs**. Effect: input runes are burned; etched runes in that tx are unmintable; mints in that tx count toward cap but minted runes are burned. Cenotaphs allow protocol upgrades without misleading old clients about rune locations.

## ord usage

- Index runes with ord (index includes runes when built after block 840,000).
- `ord server` and JSON API expose rune balances and rune info.
- Wallet: use ord wallet rune commands for etching, minting, and sending runes (see `ord wallet --help`).

<!--
Source references:
- sources/ordinals/docs/src/runes.md
- sources/ordinals/docs/src/runes/specification.md
-->
