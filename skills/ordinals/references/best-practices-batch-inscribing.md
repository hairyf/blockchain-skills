---
name: best-practices-batch-inscribing
description: Batch inscribing multiple inscriptions and sharing a parent via batch YAML.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ordinals/ord (docs/src/guides/batch-inscribing.md, inscriptions/pointer.md)
---

# Batch Inscribing

Create **multiple inscriptions in one go** with a single command. Use a **batch file** (YAML) and the **pointer** so each inscription is on a different sat; optional **parent** links all to one parent inscription (e.g. for collections).

## Command

```bash
ord wallet batch --fee-rate 21 --batch batch.yaml
```

Adjust `--fee-rate` and add other wallet/inscribe options as needed.

## Batch file (batch.yaml)

The batch file lists entries (files and optional metadata). Each entry can specify:

- **File** (or content) to inscribe.
- **Parent** inscription ID so all batch children share the same parent.
- **Pointer** (or rely on default ordering) so each inscription lands on a distinct sat in the reveal tx.

Example structure (see repo `batch.yaml` for full include):

```yaml
# Multiple items; parent and pointer set so each is a child of one parent
# and on a different sat in the batch tx
```

When parent is set, the **reveal** transaction that creates the batch inscriptions can include that parent; pointer values assign each inscription to a different sat, avoiding collisions.

## When to use

- **Collections**: One parent inscription; many child inscriptions (e.g. 100 items) in one batch, same parent, pointers 0..99 (or equivalent).
- **Efficiency**: One transaction fee for many inscriptions instead of one tx per inscription.
- **Atomicity**: All inscriptions in the batch confirm together or not at all.

Ensure the wallet has enough cardinal sats for fees and enough UTXOs for the batch size; use `ord wallet balance` and plan fee rate.

<!--
Source references:
- sources/ordinals/docs/src/guides/batch-inscribing.md
- sources/ordinals/docs/src/inscriptions/pointer.md
-->
