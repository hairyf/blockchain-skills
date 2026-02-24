---
name: slither-cli-usage
description: Run Slither on targets, select detectors/printers, filter paths, triage, and config.
---

# Slither CLI Usage

How to run Slither and control what it analyzes and reports. Use this when scripting security checks or integrating into CI.

## Targets

Slither uses [crytic-compile](https://github.com/crytic/crytic-compile/wiki/Configuration) for compilation. Common targets:

```sh
# Foundry/Hardhat project (preferred when project has dependencies)
slither .

# Single Solidity file (no imports or use solc)
slither file.sol

# Verified contract on Etherscan (install solc-select for auto solc version)
slither 0x7F37f78cBD74481E593F9C737776F7113d76B315
```

## Detector selection

All detectors run by default. Narrow or exclude for faster runs or to focus on specific issues.

```sh
# Run only specific detectors
slither . --detect arbitrary-send-erc20,pragma,reentrancy-eth

# Exclude detectors by name
slither . --exclude naming-convention,unused-state,suicidal

# Exclude by severity
slither . --exclude-informational
slither . --exclude-low
```

List detectors: `slither --list-detectors`.

## Printer selection

No printers run by default. Use `--print` for code visualization or export.

```sh
slither . --print inheritance-graph
slither . --print call-graph,cfg,function-summary
```

List printers: `slither --list-printers`.

## Path filtering

Exclude findings that only touch certain paths (dependencies, vendored code). Path can be a directory or filename; supports Python regex.

```sh
# Ignore OpenZeppelin (or similar) in results
slither . --filter-paths "openzeppelin"

# Multiple files
slither . --filter-paths "SafeMath.sol|ConvertLib.sol"
```

## Suppressing findings

- **Inline:** `// slither-disable-next-line DETECTOR_NAME` before the line.
- **Block:** `// slither-disable-start [detector]` … `// slither-disable-end [detector]`.
- **Non-reentrant hint:** `@custom:security non-reentrant` before a variable declaration tells Slither that external calls from that variable are non-reentrant.

## Triage mode

Interactive triage: Slither asks for each finding whether to hide it in future runs. State is saved in `slither.db.json`.

```sh
slither . --triage-mode
```

Delete `slither.db.json` to show hidden results again.

## Configuration file

Options can be set in `slither.config.json` (or `--config-file path`). CLI overrides config.

Supported options include: `detectors_to_run`, `printers_to_run`, `detectors_to_exclude` / `detectors_to_include`, `exclude_dependencies`, `exclude_informational` / `exclude_low` / `exclude_medium` / `exclude_high`, `filter_paths`, `include_paths`, `json`, `sarif`, `fail_on`, etc.

<!--
Source references:
- https://github.com/crytic/slither (README, docs)
- sources/slither/docs/src/Usage.md
-->
