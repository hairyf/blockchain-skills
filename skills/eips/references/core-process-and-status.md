---
name: core-process-and-status
description: EIP lifecycle, statuses, shepherding, and editor role.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ethereum/EIPs (EIP-1)
---

# EIP Process and Status

EIPs follow a defined lifecycle. Status is in the preamble `status` header.

## Status flow

1. **Idea** — Pre-draft; not in the repo.
2. **Draft** — First tracked stage; merged when properly formatted.
3. **Review** — Author marks ready for peer review.
4. **Last Call** — Final review window; PR sets `last-call-deadline` (e.g. 14 days). Normative changes revert to Review.
5. **Final** — Final standard; only errata and non-normative clarifications afterward. PR to Final should only update status.
6. **Stagnant** — Draft/Review/Last Call inactive ≥6 months; can be moved back to Draft or earlier.
7. **Withdrawn** — Author withdrew; final, cannot resurrect same number.
8. **Living** — Intentionally updated (e.g. EIP-1).

## Shepherding

- **Author/champion:** Write EIP, drive discussion, build consensus.
- **EIP Editors:** Assign numbers, merge when ready, enforce format/grammar; they do not judge technical merit.
- **Core EIPs:** Need client implementations for Final; typically presented on [AllCoreDevs](https://github.com/ethereum/pm) calls. Rough consensus required.
- **Discussion:** Vet ideas on [Ethereum Magicians](https://ethereum-magicians.org/) or [Ethereum Research](https://ethresear.ch/) before writing; use `discussions-to` in preamble.

## Validation

- PRs must pass CI (eip-review-bot, eipw, markdownlint, spelling, link checks).
- Run locally: `cargo install eipw` then `eipw --config ./config/eipw.toml <file-or-dir>`.

<!--
Source references:
- sources/eips/EIPS/eip-1.md (EIP Work Flow, EIP Process)
- sources/eips/README.md (Validation and Automerging)
-->
