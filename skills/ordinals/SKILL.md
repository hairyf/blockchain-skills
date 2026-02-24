---
name: ordinals
description: ord index, block explorer, wallet, inscriptions, and runes for Bitcoin Ordinals.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ordinals/ord, scripts located at https://github.com/antfu/skills
---

> Skill based on ord (Ordinals) from sources/ordinals (docs/ and repo root), generated 2026-02-24. Docs: `sources/ordinals/docs/src/`, [docs.ordinals.com](https://docs.ordinals.com).

ord is an index, block explorer, and CLI wallet for Bitcoin Ordinals. It tracks sat locations via Bitcoin Core (with `-txindex`), serves inscriptions and explorer UI, and provides wallet subcommands for inscribing and sat-aware sends. It supports inscriptions (digital artifacts on sats), recursion, runes (fungible tokens), and a JSON API.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Ordinal theory | Ordinal numbers, transfer, satpoint, notation, rarity | [core-ordinal-theory](references/core-ordinal-theory.md) |
| Overview | ord index, explorer, wallet; Bitcoin Core, syncing, RPC auth | [core-overview](references/core-overview.md) |
| Settings | Config precedence, ord.yaml, hidden inscriptions | [core-settings](references/core-settings.md) |

## Features

### Inscriptions

| Topic | Description | Reference |
|-------|-------------|-----------|
| Inscriptions | Inscribing, content types, metadata, properties, burning | [features-inscriptions](references/features-inscriptions.md) |
| Recursion | Recursive endpoints, /content/, /r/*, backwards compat | [features-inscriptions-recursion](references/features-inscriptions-recursion.md) |
| Delegate and pointer | Pointer (target sat), delegate (serve another’s content) | [features-inscriptions-delegate-pointer](references/features-inscriptions-delegate-pointer.md) |

### Runes

| Topic | Description | Reference |
|-------|-------------|-----------|
| Runes | Etching, minting, transferring, edicts, cenotaphs | [features-runes](references/features-runes.md) |
| Runestone encoding | OP_RETURN OP_13, LEB128, message format, edict deltas | [features-runes-specification](references/features-runes-specification.md) |

### Wallet and API

| Topic | Description | Reference |
|-------|-------------|-----------|
| Wallet | ord wallet subcommands, Bitcoin Core, batch inscribe | [features-wallet](references/features-wallet.md) |
| JSON API | Accept: application/json, main endpoints, index flags | [features-api](references/features-api.md) |
| Server security | XSS, spoofing, untrusted content, hiding content | [features-server-security](references/features-server-security.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Reindexing | When and how to delete index.redb and reindex | [best-practices-reindexing](references/best-practices-reindexing.md) |
| Batch inscribing | Batch YAML, parent, pointer, collections | [best-practices-batch-inscribing](references/best-practices-batch-inscribing.md) |

## External Links

- [Ordinals docs](https://docs.ordinals.com)
- [ord GitHub](https://github.com/ordinals/ord)
- [Ordinal theory BIP](https://github.com/ordinals/ord/blob/master/bip.mediawiki)
