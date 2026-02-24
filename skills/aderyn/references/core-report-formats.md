---
name: core-report-formats
description: Aderyn report output — Markdown, JSON, and SARIF structure and usage.
metadata:
  author: hairy
---

# Report formats

Aderyn writes one report per run. Format is chosen by the `-o` filename extension: `.md`, `.json`, or `.sarif`.

## Choosing format

```bash
aderyn -o report.md      # Markdown (default)
aderyn -o report.json    # JSON
aderyn -o report.sarif   # SARIF (CI / IDE integration)
```

## Markdown structure

- **Header**: Tool attribution and disclaimer.
- **Table of contents**: Links to Summary and per-severity sections.
- **Summary**: Files summary (e.g. .sol count, nSLOC), file list, issue counts (High / Low).
- **High Issues** / **Low Issues**: Each issue has a title (e.g. `L-1: Unspecific Solidity Pragma`), description, and `<details>` with instances: file, line, and code snippet.

Use `--no-snippets` (hidden flag) to omit code snippets and reduce report size in large repos.

## JSON and SARIF

- **JSON**: Structured list of issues with severity, title, description, and locations (file, line).
- **SARIF**: Standard format for static analysis; use for GitHub Code Scanning, VS Code, or other SARIF consumers.

## Key points

- Default output path is `report.md`; override with `-o`.
- Severities are **High** and **Low** only.
- Detector names in reports match `aderyn registry` (kebab-case).

<!--
Source references:
- sources/aderyn/reports/detector-include-report.md
- sources/aderyn/aderyn_driver (runner, interface)
- https://github.com/Cyfrin/aderyn
-->
