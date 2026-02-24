---
name: Mythril concolic execution
description: Concolic execution command to flip specific branches.
---

# Concolic Execution

`myth concolic` runs **concolic execution** to try to flip chosen branches (e.g. to reach a target path). It is separate from the main `analyze` flow.

## When to use

- You have a specific branch or condition you want to make reachable.
- You are debugging or exploring input constraints rather than running the full detector suite.

## Usage

The concolic command has its own parser; see help:

```bash
myth concolic --help
```

Input is typically concrete execution data plus branch targets; the engine attempts to find inputs that flip those branches. This is more specialized than `analyze`; prefer `analyze` for routine security scanning.

<!--
Source references:
- sources/mythril/mythril/interfaces/cli.py (concolic_parser, create_concolic_parser)
- sources/mythril/docs/source/mythril.concolic.rst
-->
