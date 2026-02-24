---
name: features-detectors
description: Aderyn detector registry, severity (High/Low), and configuring which detectors run via CLI or aderyn.toml.
metadata:
  author: hairy
---

# Detectors

Aderyn ships with many built-in detectors. Each has a **kebab-case** name, a **severity** (High or Low), and optional config via `aderyn.toml` or `--highs-only`.

## Listing detectors

```bash
aderyn registry           # All detectors, grouped by severity
aderyn registry all       # Same
aderyn registry weak-randomness   # Title, severity, description for one detector
```

Use these names in `aderyn.toml` under `[detectors] include` or `exclude`.

## Severity

- **High** — Security-sensitive (e.g. reentrancy, unchecked sends, weak randomness, tx.origin).
- **Low** — Best practices, gas, style (e.g. unused state variable, unspecific pragma, costly loop).

Run only high-severity detectors:

```bash
aderyn --highs-only -o high.md
```

## Config filter

In `aderyn.toml`:

```toml
[detectors]
include = ["unused-error", "weak-randomness", "unspecific-solidity-pragma"]
# or
exclude = ["costly-loop", "empty-require-revert"]
```

- **include**: only listed detectors run.
- **exclude**: all detectors run except listed ones.

## Example detector names (kebab-case)

- High: `weak-randomness`, `unchecked-send`, `tx-origin-used-for-auth`, `selfdestruct`, `unprotected-initializer`, `reentrancy-state-change`, `arbitrary-transfer-from`.
- Low: `unused-state-variable`, `unspecific-solidity-pragma`, `costly-loop`, `empty-require-revert`, `unused-error`, `unused-import`, `state-variable-could-be-immutable`.

Full list: run `aderyn registry`.

## Key points

- Detector IDs are kebab-case; use them exactly in config.
- Custom detectors are supported (see Cyfrin docs); built-in set is fixed per release.
- `--highs-only` is independent of config file; it restricts to High severity only.

<!--
Source references:
- sources/aderyn/aderyn_core/src/detect/detector.rs (IssueDetectorNamePool, severity)
- sources/aderyn/aderyn/src/lib.rs (print_all_detectors_view, print_detail_view)
- https://cyfrin.gitbook.io/cyfrin-docs/project-configuration/list-of-supported-detectors
- https://cyfrin.gitbook.io/cyfrin-docs/aderyn-cli/detectors-quickstart
-->
