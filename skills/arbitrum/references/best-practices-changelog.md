---
name: arbitrum-changelog-fragments
description: Changelog fragment format and conventions for Nitro PRs.
metadata:
  author: hairy
---

# Changelog Fragments

Nitro uses **changelog fragments** in the `changelog/` directory for release notes. Each PR that is release-note-worthy should add one new markdown file there; format follows [Keep a Changelog](https://keepachangelog.com/).

## Structure

Use standard section headers. Common ones:

- `### Added`
- `### Changed`
- `### Deprecated`
- `### Removed`
- `### Fixed`
- `### Security`
- `### Configuration` – For new or changed config flags/options.
- `### Ignored` – For changes that should not appear in release notes (e.g. CI-only); the fragment is still required but content is not published.

## Example (configuration change)

```markdown
### Changed
- Replace static batch poster compression with backlog-based compression levels

### Deprecated
- Deprecate `--node.batch-poster.compression-level` in favor of `--node.batch-poster.compression-levels`

### Added
- New `--node.batch-poster.compression-levels` flag (JSON array of backlog/threshold configs)

### Configuration
- `--node.batch-poster.compression-levels`: JSON array of objects with `backlog`, `level`, `recompression-level`.
- Example: `[ { "backlog": 0, "level": 3, "recompression-level": 5 }, { "backlog": 10, "level": 5, "recompression-level": 7 } ]`
- Validation: `backlog` strictly ascending; levels non-increasing across entries; `recompression-level >= level`; levels in 0–11.
```

## Usage

1. Add a new file under `changelog/` (e.g. `yourname-brief-description.md`).
2. Use the section headers above; one file per logical change.
3. For non–release-note changes, use the `### Ignored` section so the fragment exists but is skipped in notes.

## Key points

- One fragment per PR; filename and content follow Keep a Changelog.
- Use `### Configuration` when adding or changing flags/config; include examples and validation rules when relevant.
- Use `### Ignored` for CI or internal-only changes.

<!--
Source references:
- https://github.com/OffchainLabs/nitro (CONTRIBUTING.md, changelog/*.md)
- https://keepachangelog.com/
-->
