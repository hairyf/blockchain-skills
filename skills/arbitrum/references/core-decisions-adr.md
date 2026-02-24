---
name: arbitrum-decisions-adr
description: How Nitro records architectural and code decisions using MADR-style ADRs.
metadata:
  author: hairy
---

# Architectural Decision Records (ADRs)

Nitro records architectural and code decisions in **Markdown Architectural Decision Records** under `docs/decisions/`. Format and templates follow [MADR](https://adr.github.io/madr/) 4.0.0.

## Format

Each ADR is a markdown file. Optional frontmatter can set `status`, `date`, `decision-makers`. Core sections:

- **Context and Problem Statement** – What is being decided and why.
- **Considered Options** – Bullet list of alternatives.
- **Decision Outcome** – Chosen option and short justification.
- **Consequences** (optional) – Good/bad effects.

Templates in `docs/decisions/`:

- `adr-template.md` – Full sections with explanations.
- `adr-template-minimal.md` – Mandatory sections only (with optional Consequences).
- `adr-template-bare.md` / `adr-template-bare-minimal.md` – Same structure, empty (no explanations).

## Usage

When adding a new ADR:

1. Copy one of the templates (e.g. `adr-template-minimal.md`).
2. Replace the placeholder title and fill Context, Options, Decision Outcome (and optionally Consequences).
3. Save under `docs/decisions/` with a numeric prefix (e.g. `0003-my-decision.md`).

## Key points

- MADR 4.0.0 is the chosen format; templates live in `docs/decisions/`.
- Use ADRs for architecture, code, or process decisions so intent is explicit and reviewable later.

<!--
Source references:
- https://github.com/OffchainLabs/nitro (docs/decisions/README.md, docs/decisions/0000-use-markdown-architectural-decision-records.md)
- https://adr.github.io/madr/
-->
