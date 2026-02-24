---
name: features-inscriptions-delegate-pointer
description: Inscription pointer (target sat in tx) and delegate (serve another inscription's content).
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ordinals/ord (docs/src/inscriptions/)
---

# Pointer and Delegate

## Pointer (tag 2)

By default the inscription is on the **first sat** of the inscribe transaction's output(s). To target another sat, use the **pointer**: a zero-based index into the **total sats** of the transaction outputs. Tag `2`, value = little-endian integer (trailing zeroes omitted).

- If pointer ≥ total sats in outputs, it is ignored and the inscription is made on the first sat as usual.
- Use pointer to create **multiple inscriptions in one transaction**, each on a different sat.

Example (pointer 255): include `OP_PUSH 2` and `OP_PUSH 0xff`. For 256: `OP_PUSH 0x0001` (little-endian).

Used with batch inscribing: parent can be set so multiple children share the same parent; pointer assigns each inscription to a different sat.

## Delegate (tag 11)

An inscription can **delegate** to another inscription. Requests for the delegating inscription's content return the **delegate's** content, content type, and encoding instead. Used to cheaply create many "copies" that point at one on-chain content.

- Tag `11`, value = serialized inscription ID: 32-byte TXID (bitcoin txid byte order, i.e. reversed from hex display) + 4-byte little-endian index, trailing zeroes omitted.
- Delegate inscription D may be inscribed **after** I; until D exists, content of I returns 404.

Example (delegate to `000102...1fi0`): in I's envelope, `OP_PUSH 11` and `OP_PUSH <32-byte txid + 4-byte index>` (binary). Note: hex display of txid is reversed from serialized bytes.

## Practical use

- **Pointer**: Batch inscribe N items in one tx; set pointer 0, 1, 2, ... (or offsets) so each inscription lands on a distinct sat. Use with `ord wallet batch` and batch YAML.
- **Delegate**: Inscribe one large asset (image, HTML); inscribe many small inscriptions that delegate to it so they all display the same content without duplicating data.

<!--
Source references:
- sources/ordinals/docs/src/inscriptions/pointer.md
- sources/ordinals/docs/src/inscriptions/delegate.md
- sources/ordinals/docs/src/guides/batch-inscribing.md
-->
