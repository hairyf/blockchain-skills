---
name: core-editors-and-validation
description: EIP Editors (EIP-5069), their role and limits; eipw and CI validation.
metadata:
  author: hairy
  version: "2026.2.25"
  source: Generated from https://github.com/ethereum/EIPs (EIP-5069, config/eipw.toml, README)
---

# EIP Editors and Validation

## EIP Editors (EIP-5069)

Editors maintain the EIP repository: they publish proposals, facilitate discussion, and uphold minimal quality. They do **not** decide technical winners, assert correctness, manage implementations, or provide legal advice.

- **Structure:** EIP Editors plus one **Keeper of Consensus** (elected by editors). Keeper determines when rough consensus is reached and when to re-open settled matters.
- **Formal decisions** (add/remove editors, elect Keeper, controversial changes): call for input, quorum within 30 days, then rough consensus (Keeper decides). No veto except for add/remove-editor votes.
- **Adding an editor:** Quorum + candidate consent + no objection. **Removing:** Quorum + no objection from others.

## Validation (eipw and CI)

PRs must pass automated checks before merge:

- **eip-review-bot** — Determines when PRs can be auto-merged.
- **eipw** — Enforces EIP-1 rules (preamble, sections, links, naming). Config: `config/eipw.toml`.
- **Markdownlint, CodeSpell, HTMLProofer** — Style, spelling, broken links.

### Running eipw locally

```bash
cargo install eipw
eipw --config ./config/eipw.toml <file-or-directory>
```

### What eipw enforces (summary)

- **Preamble:** Required headers (`eip`, `title`, `description`, `author`, `discussions-to`, `status`, `type`, `created`), order, allowed values for `status`/`type`/`category`, length limits (e.g. title ≤44 chars, description ≤140), `discussions-to` must be ethereum-magicians.org, `last-call-deadline` when status is Last Call, `withdrawal-reason` when Withdrawn.
- **References:** EIPs/ERCs referenced as `EIP-N` / `ERC-N` (not EIPN, not in backticks); references must point to existing `eip-N.md` files; `requires` dependencies must have valid status flow.
- **Sections:** Required sections present and in order: Abstract, Specification, Rationale, Security Considerations, Copyright (and optionally Motivation, Backwards Compatibility, Test Cases, Reference Implementation).
- **Links:** Relative links preferred; external links only to approved origins (see EIP-1 / EIP-5757).

When authoring or reviewing an EIP, run eipw before opening a PR to avoid CI failures.

<!--
Source references:
- sources/eips/EIPS/eip-5069.md
- sources/eips/config/eipw.toml
- sources/eips/README.md (Validation and Automerging)
-->
