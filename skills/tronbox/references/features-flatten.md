---
name: TronBox flatten
description: Flatten contract sources and dependencies to a single file for verification or auditing.
---

# TronBox Flatten

The flatten command concatenates one or more Solidity files and their dependencies (following `import` statements) into a single output, with imports removed. Order is topological by dependency; cycles in the dependency graph cause an error.

## Command

```bash
tronbox flatten <files...>
```

- **files** – One or more contract source paths (e.g. `contracts/Foo.sol`). Required; no config file is required for flatten (Config.detect is called with `{}`).
- Output is written to **stdout**. Redirect to a file for verification: `tronbox flatten contracts/Foo.sol > Flattened.sol`.

## Behavior

- Resolves imports using the same resolver as compile (contracts dir, node_modules, etc.).
- Special case: `tronbox/console.sol` is resolved from the TronBox package.
- Each included file is printed as `// File: <path>` followed by the file content with import lines stripped.
- Relative imports are resolved from the importing file’s directory; the dependency graph is built via `@solidity-parser/parser` and sorted with `tsort`. Duplicates are omitted.

## Errors

- Missing or unreadable file: “File X doesn't exist or is not a readable file.”
- Parse error: “Could not parse X for extracting its imports.”
- Cycle: “There is a cycle in the dependency graph…” with listed files.

## Usage for agents

- Use for block explorer contract verification (paste a single file) or for auditing.
- Always redirect stdout when saving: `tronbox flatten contracts/MyContract.sol > MyContract_flat.sol`.
- Flatten does not use `--evm` or network config; it only needs the project’s contract and import layout.

<!--
Source references:
- sources/tronbox/src/lib/commands/flatten.js
- sources/tronbox/src/components/Flatten/index.js
-->
