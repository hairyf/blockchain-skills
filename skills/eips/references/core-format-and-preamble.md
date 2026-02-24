---
name: core-format-and-preamble
description: EIP document structure, front matter headers, and required sections.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ethereum/EIPs (EIP-1, eip-template)
---

# EIP Format and Preamble

EIPs are Markdown with a YAML front matter preamble (RFC 822–style, between `---`).

## Required preamble headers

| Header | Description |
|--------|-------------|
| `eip` | EIP number (assigned by editor for new EIPs). |
| `title` | Short title (≤44 chars), no "standard", no EIP number. |
| `description` | One short sentence (≤140 chars), no "standard", no number. |
| `author` | Names and/or GitHub usernames; at least one with `(@username)`. |
| `status` | Draft \| Review \| Last Call \| Final \| Stagnant \| Withdrawn \| Living. |
| `type` | Standards Track \| Meta \| Informational. |
| `category` | Core \| Networking \| Interface \| ERC (only for Standards Track). |
| `created` | Date assigned (yyyy-mm-dd). |

## Optional headers

- `discussions-to` — URL of discussion (e.g. Ethereum Magicians); no GitHub PRs or ephemeral links.
- `last-call-deadline` — When status is Last Call.
- `requires` — EIP number(s) this EIP depends on.
- `withdrawal-reason` — When status is Withdrawn.

Dates: ISO 8601 (yyyy-mm-dd). List headers (e.g. author) use commas.

## Required sections

- **Abstract** — Short technical summary.
- **Specification** — Syntax and semantics; enough for interoperable implementations. Prefer RFC 2119 key words (MUST, SHOULD, MAY, etc.); if used, cite RFC 2119 and RFC 8174 at the start.
- **Security Considerations** — Mandatory; EIP cannot go Final without sufficient discussion.
- **Copyright** — `Copyright and related rights waived via [CC0](../LICENSE.md).`

Optional: Motivation, Rationale, Backwards Compatibility, Test Cases, Reference Implementation.

## Linking to other EIPs

- First mention: `[EIP-N](./eip-N.md)` or `[ERC-N](./eip-N.md)` (relative path).
- Refer to ERC EIPs as `ERC-N`, others as `EIP-N`.

## Auxiliary files

Put images and extra assets in `assets/eip-N/`; link as `../assets/eip-N/file.png`.

<!--
Source references:
- sources/eips/EIPS/eip-1.md (What belongs in a successful EIP, EIP Header Preamble, Linking to other EIPs, Auxiliary Files)
- sources/eips/eip-template.md
-->
