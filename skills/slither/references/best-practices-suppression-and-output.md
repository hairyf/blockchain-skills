---
name: slither-suppression-and-output
description: Suppress findings, triage, config file, and JSON/SARIF/checklist output for CI.
---

# Suppression and Output for CI

Control what Slither reports and how, so agents and CI can consume results without noise.

## Suppressing findings

- **Single line:** `// slither-disable-next-line DETECTOR_NAME` (e.g. `reentrancy-eth`).
- **Block:** `// slither-disable-start [detector]` … `// slither-disable-end [detector]`.
- **Custom hint:** `@custom:security non-reentrant` before a variable tells Slither that external calls from that variable are non-reentrant (reduces false positives).
- **Triage:** run with `--triage-mode`; choices are stored in `slither.db.json`. Remove that file to reset.

Prefer inline suppression only where the finding is reviewed and accepted; use triage for one-off runs.

## JSON and SARIF

Machine-readable output for CI and tooling:

```sh
slither . --json output.json
slither . --sarif output.sarif
```

JSON top-level: `success`, `error`, `results`. `results.detectors` is an array of findings; each has `check`, `impact`, `confidence`, `description`, `elements` (with `type`, `name`, `source_mapping`). Use for parsing and dashboards.

## Checklist and Markdown

Human-oriented reports:

```sh
slither . --checklist
slither . --checklist --markdown-root https://github.com/ORG/REPO/blob/COMMIT/
```

`--markdown-root` makes links point at the repo for source highlighting.

## Config file

Use `slither.config.json` (or `--config-file`) to set defaults: `detectors_to_run`, `detectors_to_exclude`, `printers_to_run`, `filter_paths`, `exclude_informational`, `exclude_low`, etc. CLI flags override config. Helps standardize runs across dev and CI.

<!--
Source references:
- sources/slither/docs/src/Usage.md
- sources/slither/docs/src/api/JSON-output.md
- sources/slither/README.md
-->
