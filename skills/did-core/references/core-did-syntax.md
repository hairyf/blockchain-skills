---
name: DID and DID URL Syntax
description: Formal syntax for DIDs and DID URLs (ABNF), path, query, fragment, and relative DID URLs.
metadata:
  author: hairy
---

# DID and DID URL Syntax

Decentralized Identifiers (DIDs) and DID URLs follow URI-like syntax. Use this when parsing, validating, or constructing DIDs and DID URLs programmatically.

## DID syntax (ABNF)

Generic DID scheme (RFC 3986–compliant):

```abnf
did                = "did:" method-name ":" method-specific-id
method-name        = 1*method-char
method-char        = %x61-7A / DIGIT
method-specific-id = *( *idchar ":" ) 1*idchar
idchar             = ALPHA / DIGIT / "." / "-" / "_" / pct-encoded
pct-encoded        = "%" HEXDIG HEXDIG
```

- **Scheme:** `did:`
- **Method name:** lowercase letters and digits (e.g. `example`, `key`, `ethr`).
- **Method-specific id:** unique per method; colons allowed inside; no `?` or `#` for subject/controller identifiers.

Example: `did:example:123456789abcdefghi`.

## DID URL syntax (ABNF)

DID URL = DID + optional path, query, and fragment:

```abnf
did-url = did path-abempty [ "?" query ] [ "#" fragment ]
```

Path, query, and fragment follow RFC 3986. Semicolon (`;`) is reserved; avoid using it in DID URLs.

## Path, query, fragment

- **DID path:** same as URI path (e.g. `did:example:123456/path`). Semantics are method- or application-specific.
- **DID query:** same as URI query (e.g. `did:example:123456?versionId=1`). No generic normalization; avoid equivalence checks when multiple query parameters exist.
- **DID fragment:** references a resource inside the DID document or an external resource (e.g. `did:example:123#public-key-1`, `did:example:123#service-5`). Fragment semantics should be consistent across representations.

## Relative DID URLs

A **relative DID URL** in a DID document is any URL value that does **not** start with `did:<method-name>:<method-specific-id>`. Resolve it using RFC 3986 Section 5 (Reference Resolution) with the document’s DID as the base URI (scheme `did`, authority `method-name:method-specific-id`).

Use relative URLs to reference verification methods or services without repeating the full DID (saves space and keeps documents stable when the DID is fixed).

```json
{
  "@context": "https://www.w3.org/ns/did/v1.1",
  "id": "did:example:123456789abcdefghi",
  "verificationMethod": [{
    "id": "did:example:123456789abcdefghi#key-1",
    "type": "Multikey",
    "controller": "did:example:123456789abcdefghi",
    "publicKeyMultibase": "z6Mkm..."
  }],
  "authentication": ["#key-1"]
}
```

`#key-1` resolves to `did:example:123456789abcdefghi#key-1`.

## Key points

- Subject and controller identifiers must be DIDs only (no query or fragment).
- Verification method and service `id` values follow DID URL syntax (fragments allowed).
- Method-specific-id may contain colons; meaning is method-specific.
- For long-lived canonical identifiers, avoid query parameters to simplify resolution and reduce attack surface; keep fragment identifiers unique within a DID document.

<!--
Source references:
- https://www.w3.org/TR/did-core/ (DID Syntax, DID URL Syntax, Path, Query, Fragment, Relative DID URLs)
- sources/did-core/index.html
-->
