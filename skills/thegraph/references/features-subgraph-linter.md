---
name: thegraph-features-subgraph-linter
description: Subgraph Linter — static analysis for entity overwrites, null safety, undeclared eth_calls, division guards; CLI and VS Code.
---

# The Graph — Subgraph Linter

Subgraph Linter is a static analysis tool that checks mapping code for patterns that often cause runtime crashes, bad entity state, or poor performance. Run it locally or in CI; use the VS Code extension for inline diagnostics.

## When to use

Run the linter to catch issues before indexing, such as:

- Entities saved with missing required fields
- Entity overwrites (stale instance saved after a helper updated the same entity)
- Optional values force-unwrapped without null checks
- Division by zero (denominator not guarded)
- `@derivedFrom` fields mutated or left inconsistent
- Contract calls (eth_calls) used in handlers but not declared in the manifest `calls:` block

## CLI

Build and run against your manifest:

```bash
cd subgraph-linter && npm install && npm run build
npm run check -- --manifest ../your-subgraph/subgraph.yaml
```

Optional: `--tsconfig ../your-subgraph/tsconfig.json`, `--config ./subgraph-linter.config.json`.

## Configuration

Use `subgraph-linter.config.json` (or `--config`) for:

- **Severity overrides**: Turn specific checks into `error` or `warning` (only `error` fails the run).
- **Suppression**: `allowWarnings` / `allowErrors` to control exit code.

Example:

```json
{
  "severityOverrides": {
    "division-guard": "error",
    "undeclared-eth-call": "warning"
  }
}
```

**Inline suppression**: Add `// [allow(check-id)]` or `// [allow(all)]` on the line to silence a diagnostic when you know the pattern is safe.

## VS Code

The Subgraph Linter extension discovers `subgraph.yaml` (excluding build/dist), runs on save by default, and shows results in the editor and Problems panel.

- **Commands**: "Subgraph Linter: Run Analysis", "Subgraph Linter: Add Call Declaration" (quick fix for undeclared eth_calls).
- **Settings** (prefix `subgraphLinter`): `manifestPaths`, `tsconfigPath`, `configPath`, `runOnSave`.

## Key checks

| Check | Purpose |
|-------|---------|
| entity-overwrite | Stale entity saved after a helper loaded/saved the same entity |
| unexpected-null | Required fields not set before save, or @derivedFrom assigned |
| unchecked-load | Entity.load() used as non-null without handling null |
| division-guard | Division where denominator can be zero |
| derived-field-guard | Base fields updated but derived fields not recomputed before save |
| helper-return-contract | Helper returns entity with unset required fields; call site saves it |
| undeclared-eth-call | Handler (or helper) makes contract call not listed in manifest `calls:` |

## Key points

- Use the linter alongside unit tests; it does not replace runtime or integration tests.
- Declare all eth_calls in the manifest so graph-node can run them in parallel and cache; the linter helps find missing declarations.
- Repo: [graphprotocol/subgraph-linter](https://github.com/graphprotocol/subgraph-linter).

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/guides/subgraph-linter/
- https://github.com/graphprotocol/subgraph-linter
-->
