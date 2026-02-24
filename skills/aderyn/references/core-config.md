---
name: core-config
description: aderyn.toml project configuration — root, src, include/exclude paths, detector filter, and env.
metadata:
  author: hairy
---

# Project configuration (aderyn.toml)

Create with `aderyn init`. All paths are relative: `root` is relative to the workspace (directory where the config is or where the tool is run); `src` and path filters are relative to `root`.

## Top-level fields

```toml
version = 1   # Required; only 1 is supported.

# Base path for remappings and compilation (e.g. directory with foundry.toml or hardhat.config).
root = "."

# Source directory for contracts. If omitted, inferred from Foundry ("src/") or Hardhat ("contracts/").
# src = "src/"

# Path fragments to include (partial or full). Omit = all files in source dir.
# include = ["src/counters/", "src/Main.sol"]

# Path fragments to exclude.
# exclude = ["/interfaces/", "src/mocks/"]
```

## Detector filter

```toml
[detectors]
# Run only these detectors (names from `aderyn registry`).
include = ["unused-error", "weak-randomness"]

# Or run all except these.
# exclude = ["costly-loop", "empty-require-revert"]
```

If both `include` and `exclude` are omitted, all detectors run. Use either `include` or `exclude`, not both for the same run.

## Environment

```toml
[env]
FOUNDRY_PROFILE = "icm"
```

Use when different profiles (e.g. in `foundry.toml`) change `src` or remappings. Standard Foundry/DAPP_ env vars apply.

## Key points

- Config is optional: with no `aderyn.toml`, Aderyn uses project root and framework detection.
- Include/exclude: partial match (e.g. `/interfaces/`) or exact path (e.g. `src/Main.sol`).
- Remappings can also come from `remappings.txt` in root or from `foundry.toml` when applicable.

<!--
Source references:
- sources/aderyn/tests/toml/nested_project1/aderyn.toml
- sources/aderyn/tests/detector-include/aderyn.toml
- sources/aderyn/tests/foundry-nft-f23-icm/aderyn.toml
- https://cyfrin.gitbook.io/cyfrin-docs/project-configuration
-->
