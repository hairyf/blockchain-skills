---
name: features-inscriptions
description: Inscribing sats with content, content types, metadata, and digital artifacts.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ordinals/ord (docs/src/)
---

# Inscriptions

Inscribing attaches arbitrary content to a satoshi in a transaction that reveals that content on-chain. The content is permanently tied to that sat, creating a Bitcoin-native digital artifact that can be transferred with the sat.

## Creating inscriptions

Use `ord wallet inscribe` to inscribe a file (or stdin) onto sats in the wallet. The transaction has a reveal that contains the inscription; the inscribed sat is sent to the first output of the reveal (or as configured).

```bash
ord wallet inscribe --fee-rate 10 image.png
# Batch: ord wallet inscribe --batch batch.yaml
```

Content type is inferred (e.g. `image/png`) or set via inscription options. Inscription data is in the witness of a taproot output (OP_FALSE OP_IF "ord" ... OP_ENDIF).

## Content types

Common types: `image/*`, `text/plain`, `application/json`, `model/gltf-binary`, `audio/*`, `video/*`, `application/pdf`, etc. Browsers and `ord server` use content type for rendering (e.g. images, HTML, PDF viewer).

## Metadata and properties

- **Metadata** (tag `5`): Optional CBOR in data pushes. Multiple tag-5 pushes are concatenated then decoded. Max 520 bytes per push; split for longer metadata. Rendered as HTML on the inscription page (maps → `<dl>`, arrays → `<ul>`, etc.).
- **Properties** (tag `17`): Structured CBOR with protocol-defined schema (e.g. items, attributes, traits). Must be definite-length. Optional Brotli (tag 19 = "br") for compression.

Use metadata for free-form display; use properties for structured data (e.g. collections, traits).

## Burning

Inscriptions can be burned by sending the sat to an OP_RETURN or otherwise unspendable output. Burned content is no longer considered "live" by the index.

## Practical use

- Inscribe files with `ord wallet inscribe <file>`; use `--destination` for the inscribed sat output.
- For collections, use batch inscribing and the **pointer** to target specific sats; use **parent** to link to a parent inscription.
- Recursive inscriptions can reference other inscriptions' content via `/content/<INSCRIPTION_ID>` in the server (see features-inscriptions-recursion).

<!--
Source references:
- sources/ordinals/docs/src/overview.md
- sources/ordinals/docs/src/inscriptions.md (concepts)
- sources/ordinals/docs/src/inscriptions/metadata.md
- sources/ordinals/docs/src/inscriptions/properties.md
- sources/ordinals/docs/src/inscriptions/burning.md
-->
