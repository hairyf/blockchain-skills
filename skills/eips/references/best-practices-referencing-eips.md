---
name: best-practices-referencing-eips
description: How to reference EIPs and ERCs in text, docs, and code.
metadata:
  author: hairy
  version: "2026.2.25"
  source: Generated from https://github.com/ethereum/EIPs (EIP-1, eipw config)
---

# Referencing EIPs and ERCs

EIP-1 and the eipw linter enforce consistent naming and linking so references are unambiguous and machine-checkable.

## Naming

- **Use the form `EIP-N` or `ERC-N`** — with hyphen, no space (e.g. `EIP-155`, `ERC-20`). Not `EIPN`, `EIP N`, or `eip-20` in prose.
- **ERC vs EIP:** Application-layer standards (tokens, name registries, etc.) are referred to as **ERC-N**; Core, Networking, Interface, and Meta are **EIP-N**.
- **Do not put the reference in backticks** in EIP documents — eipw flags `EIP-N` in backticks; use plain text or a markdown link.

## Links

- **Canonical URL:** `https://eips.ethereum.org/EIPS/eip-N`. Use for citations and external docs.
- **In-repo (EIPs repo):** First mention in an EIP doc should use a relative link, e.g. `[EIP-155](./eip-155.md)` or `[ERC-20](./eip-20.md)`.
- **In code or external docs:** Prefer the canonical URL so readers can resolve the spec regardless of repo layout.

## In code comments and docs

When referring to a behavior specified by an EIP/ERC, cite the number and optionally the URL:

- Good: "Transaction signing follows EIP-155 (chainId in signature)."
- Good: "See https://eips.ethereum.org/EIPS/eip-712 for typed data encoding."
- Avoid: "See eip712" or "Implements EIP 712" (missing hyphen; ambiguous).

<!--
Source references:
- sources/eips/EIPS/eip-1.md (Linking to other EIPs)
- sources/eips/config/eipw.toml (markdown-re-eip-dash, markdown-no-backticks)
-->
