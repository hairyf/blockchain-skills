---
name: did-core
description: W3C DID Core specification—DID/DID URL syntax, data model, core properties, verification methods, services, representations, and DID methods.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/w3c/did-core, scripts located at https://github.com/antfu/skills
---

> Skill based on W3C DID Core (did-core repo), generated 2026-02-24.

Decentralized Identifiers (DIDs) are URIs that point to DID documents, enabling verifiable, decentralized identity. This skill covers the DID Core data model, syntax, core properties, verification methods, services, serialization (representations), and the requirements for DID methods and resolution.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| DID and DID URL Syntax | ABNF, path, query, fragment, relative URLs | [core-did-syntax](references/core-did-syntax.md) |
| Data Model | Entry types, maps/lists/sets, extensibility | [core-data-model](references/core-data-model.md) |
| DID Document Core Properties | id, controller, alsoKnownAs, verification relationships, services | [core-did-document](references/core-did-document.md) |
| Verification Methods and Services | Verification method and service property structure | [core-verification-and-services](references/core-verification-and-services.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Representations | Production/consumption, JSON, media types | [features-representations](references/features-representations.md) |
| DID Methods and Operations | Method syntax, create/read/update/deactivate, security and privacy | [features-did-methods](references/features-did-methods.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Resolution and Dereferencing | DID resolution, DID URL dereferencing, choosing resolvers | [best-practices-resolution](references/best-practices-resolution.md) |
