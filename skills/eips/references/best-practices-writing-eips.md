---
name: best-practices-writing-eips
description: Style, external links, tooling, and quality rules when authoring EIPs.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ethereum/EIPs (EIP-1, EIP-5757, README)
---

# Writing EIPs — Best Practices

## Style

- **Title/description:** Do not include the word "standard" or the EIP number.
- **One proposal per EIP;** keep scope focused.
- **RFC 2119:** Use MUST, SHOULD, MAY etc. in Specification and cite RFC 2119/RFC 8174.
- **Security Considerations:** Required; must be sufficient for reviewers before Final.

## External links

By default, **do not link to external resources**; they can disappear or change. [EIP-5757](https://eips.ethereum.org/EIPS/eip-5757) defines allowed origins and the approval process. Permitted origins (listed in EIP-1) must: uniquely identify a revision, have a history of availability, and not charge for access. Links must use the exact format and anchoring (e.g. commit hash, version, date) specified in EIP-1 for that origin (execution-specs, consensus-specs, devp2p, RFCs, W3C, etc.).

## Tooling

- Use **`eip-template.md`** as the starting point; delete template comments before submitting.
- New EIP filename before merge: `eip-draft_short_title.md`; editor assigns number.
- Run **eipw** before opening a PR: `eipw --config ./config/eipw.toml <file-or-dir>` (from repo root).
- Put images and large assets in **`assets/eip-N/`** and link relatively.

## Copyright and discussions

- **Copyright:** All EIPs must be CC0: `Copyright and related rights waived via [CC0](../LICENSE.md).`
- **Discussion:** Use `discussions-to` to point to a stable URL (Ethereum Magicians preferred); not GitHub PRs or ephemeral links.

<!--
Source references:
- sources/eips/EIPS/eip-1.md (Style Guide, Linking to External Resources)
- sources/eips/EIPS/eip-5757.md
- sources/eips/README.md
- sources/eips/eip-template.md
-->
