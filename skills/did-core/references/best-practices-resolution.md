---
name: DID Resolution and Dereferencing
description: DID resolution, DID URL dereferencing, and choosing DID resolvers.
metadata:
  author: hairy
---

# DID Resolution and DID URL Dereferencing

**DID resolution** turns a DID and resolution options into a DID document (plus metadata). **DID URL dereferencing** turns a DID URL and options into a resource (e.g. the document, a fragment, or an external resource). Use this when implementing or choosing resolvers and when dereferencing DID URLs to keys or services.

## DID resolution

- **Input:** DID + resolution options (e.g. version, accept).
- **Output:** DID document in a conforming representation + metadata (e.g. resolution metadata, document metadata).
- **Process:** Defined in the DID Resolution specification; the resolver uses the **Read** operation of the applicable DID method and verifies authenticity of the response.

Implementations need a resolver (or resolver driver) for each DID method they support. Universal resolvers may delegate to method-specific drivers.

## DID URL dereferencing

- **Input:** DID URL + dereference options.
- **Output:** A **resource**—e.g. the full DID document, a secondary resource (e.g. verification method) identified by the fragment, or an external resource.
- **Process:** Resolution is used to obtain the DID document for the DID in the DID URL; then the dereferencer applies fragment/path/query semantics to return the appropriate resource. Details are in the DID Resolution spec.

Example: `did:example:123#keys-1` → resolve `did:example:123` → return the verification method with `id` equal to that DID URL (or fragment `keys-1` within the document).

## Choosing DID resolvers

When selecting or recommending a DID resolver:

- Prefer resolvers that follow the DID Resolution specification and return conforming DID documents and metadata.
- Consider **trust**: resolution may involve networks (e.g. DLT) or third-party endpoints; ensure the resolver’s trust model and integrity guarantees match the use case.
- Consider **privacy**: resolution can leak which DIDs an application is interested in; use privacy-preserving or local resolution where required.
- For production, prefer resolvers that support the DID methods you use and that document security, availability, and update behavior.

## Key points

- Resolution returns a DID document (and metadata); dereferencing returns a resource that may be the document, a part of it, or an external resource.
- Fragment semantics should be consistent across representations so that the same DID URL yields the same logical resource regardless of representation (e.g. JSON vs CBOR).
- DID method specs define how resolution (Read) works for that method; use method-specific drivers or universal resolvers that integrate them.

<!--
Source references:
- https://www.w3.org/TR/did-core/#terminology (DID resolution, DID URL dereferencing)
- https://www.w3.org/TR/did-core/#choosing-did-resolvers
- https://www.w3.org/TR/did-resolution/
- sources/did-core/index.html
-->
