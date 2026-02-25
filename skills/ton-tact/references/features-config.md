---
name: features-config
description: tact.config.json — projects (name, path, output), options (debug, external, safety, optimizations), mode.
---

# Configuration

`tact.config.json` configures the Tact compiler per project. Use `$schema` for editor support.

## Projects

Each entry is one Tact file (one project):

```json
{
  "$schema": "https://raw.githubusercontent.com/tact-lang/tact/main/src/config/configSchema.json",
  "projects": [
    {
      "name": "my_contract",
      "path": "./contract.tact",
      "output": "./output",
      "mode": "full",
      "verbose": 1,
      "options": {}
    }
  ]
}
```

- **name:** Prefix for generated files.
- **path:** Path to the single `.tact` file.
- **output:** Directory for generated artifacts (Blueprint overrides).
- **mode:** `"full"` (default), `"fullWithDecompilation"`, `"funcOnly"`, `"checkOnly"`.
- **verbose:** Verbosity level (default 1).

## Options

- **debug:** `true` enables `dump()` and implies nullChecks.
- **external:** `true` enables external message receivers; required for `external("...")` / `external(msg: T)`.
- **ipfsAbiGetter / interfacesGetter:** Generate getters for ABI/interfaces.
- **experimental.inline:** `true` inlines all inlinable functions (larger code, less gas per call).
- **safety.nullChecks:** `false` disables runtime null checks on `!!` (saves gas; use only when safe).
- **optimizations.alwaysSaveContractData:** `true` saves contract data every receiver (extra gas; for debugging/safety).
- **optimizations.internalExternalReceiversOutsideMethodsMap:** `false` keeps receivers in methods map (better explorer compatibility, more gas).
- **enableLazyDeploymentCompletedGetter:** `true` adds `lazy_deployment_completed()` getter when not using contract parameters.

## Key points

- Blueprint uses `wrappers/ContractName.compile.ts` (or `compilables/`) for path/output; config options still apply as defaults.
- External receivers require `options.external: true` or compilation fails.
- Config file can have any name but must be valid JSON matching the schema.

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/book/config.mdx
-->
