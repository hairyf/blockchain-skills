---
name: Echidna JSON output
description: Campaign and test JSON schema for CI and scripting.
---

# JSON output

Use **`format: "json"** in config to get machine-readable campaign results. Useful for CI, regression checks, and custom reporting.

## Campaign structure

```json
{
  "success": bool,
  "error": "string or null",
  "tests": [ Test ],
  "seed": number,
  "coverage": { ... }
}
```

- **success**: Overall campaign success (e.g. no unresolved failure).
- **error**: Present if a global error occurred.
- **tests**: One entry per property/assertion test.
- **seed**: Random seed used (for reproducibility).
- **coverage**: Coverage-increasing call information (format may vary).

## Test structure

```json
{
  "contract": "string",
  "name": "string",
  "status": "string",
  "error": "string or null",
  "testType": "string",
  "transactions": [ Transaction ] or null
}
```

- **contract**: Contract name.
- **name**: Test name (e.g. invariant or assertion identifier).
- **status**: One of `fuzzing`, `shrinking`, `solved`, `passed`, `error`.
- **testType**: `property` or `assertion`.
- **transactions**: When status is `solved`, the shrinking call sequence that falsifies the test.

## Transaction structure

```json
{
  "contract": "string",
  "function": "string",
  "arguments": [ "string" ] or null,
  "gas": number,
  "gasprice": number
}
```

Use this to replay or minimize the failing scenario.

## CI usage

1. Set `format: "json"` in config.
2. Run echidna and capture stdout to a file or pipe to `jq`.
3. Check `success` and iterate over `tests`; fail the job if any test has `status: "solved"`.
4. Optionally archive `tests[].transactions` for regression or issue reports.

<!--
Source references:
- https://github.com/crytic/echidna (README.md)
- sources/echidna/README.md
-->
