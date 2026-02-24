---
name: core-ordinal-theory
description: Ordinal numbers, transfer algorithm, satpoint, and notation for sats.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ordinals/ord (docs/, bip.mediawiki)
---

# Ordinal Theory

Ordinals are a numbering scheme for satoshis: each sat is assigned a serial number in the order it was mined. Numbers transfer from transaction inputs to outputs in **first-in-first-out** order according to input/output order and sizes. No separate token or protocol change is required; it works on Bitcoin as-is.

## Key concepts

- **Ordinal number**: Serial number of a sat (e.g. integer `2099994106992659`).
- **Satpoint**: Location of a sat in an output: `TXID:OUTPUT_INDEX:OFFSET`. Example: `680df1e4...d22:0:6` is offset 6 in the first output of that tx.
- **Transfer**: In a block, coinbase creates new sats; for other txs, input ordinals are concatenated and assigned to outputs in order. Unassigned ordinals from fee-paying txs go to the coinbase.

## Notation

| Notation | Example | Meaning |
|----------|---------|---------|
| Integer | `2099994106992659` | Ordinal number |
| Decimal | `3891094.16797` | Block height and offset in block |
| Degree | `3°111094′214″16797‴` | Cycle, block-in-epoch, block-in-period, sat-in-block (for rarity) |
| Percentile | `99.99971949060254%` | Position in Bitcoin supply |
| Name | `satoshi` | Base-26 encoding (a–z) |

## Rarity (degree notation)

Rarity is derived from periodic Bitcoin events:

- **common**: Not first sat of block
- **uncommon**: First sat of each block
- **rare**: First sat of each difficulty adjustment (2016 blocks)
- **epic**: First sat of each halving (210,000 blocks)
- **legendary**: First sat of each cycle (6 halvings)
- **mythic**: First sat of genesis block

Degree format `A°B′C″D‴` maps to cycle, block-in-period, block-in-epoch, sat-in-block. When block offset is zero it may be omitted.

## Usage for agents

- Use **integer** or **satpoint** when referring to a specific sat in code or APIs.
- Use **degree** when displaying or filtering by rarity.
- Transfer logic: ordinals in inputs are spent in order; outputs receive ordinals in order. Splits/merges require care for dust limits (see BIP).

<!--
Source references:
- https://github.com/ordinals/ord/blob/master/bip.mediawiki
- sources/ordinals/docs/src/overview.md
-->
