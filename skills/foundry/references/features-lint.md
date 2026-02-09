---
name: foundry-lint
description: forge-lint — Solidity linter, early/late passes, adding lint rules, testing.
---

# Foundry Linter (forge lint)

Solidity linter for potential errors, vulnerabilities, gas optimizations, and style. Two-pass: AST (early) and HIR (late).

## Architecture

1. **Parsing** — Solidity → AST via `solar`.
2. **HIR** — AST lowered to HIR with types and semantics.
3. **Early lint passes** — `EarlyLintVisitor` runs `EarlyLintPass` on the AST (syntax, naming, simple patterns).
4. **Late lint passes** — `LateLintVisitor` runs `LateLintPass` on the HIR (semantic, cross-reference, type-aware).
5. **Diagnostics** — Lint context emits warnings/notes; optional `Suggestion` for fixes (machine-applicable or example).

Key types: `Linter`, `SolidityLinter`, `Lint` / `SolLint`, `EarlyLintPass`, `LateLintPass`, `LintContext`, `Suggestion`.

## Adding a lint rule

1. Add test Solidity in `crates/lint/testdata/<RuleName>.sol` (and `auxiliary/` for imports). Use `solar -Zdump=ast` or `-Zdump=hir` to inspect patterns.
2. Declare metadata with `declare_forge_lint!(ID, Severity, "kebab-id", "description");`.
3. Register in `mod.rs`: `register_lints!((PassStruct, early|late, (LINT_ID)));`.
4. Implement `EarlyLintPass` or `LateLintPass` on the pass struct. Use `cx.emit_with_suggestion` for fixes; set `Applicability` (e.g. `MachineApplicable`, `MaybeIncorrect`).
5. Add tests: annotate expected diagnostics with `//~WARN: message` or `//~NOTE: message`; run `cargo bless-lints` to refresh `.stderr`; run `cargo test -p forge --test ui` (or nextest) to verify.

## Choosing early vs late

- **Early:** syntax-only, naming, formatting, no type info. Use when the rule can be decided from the AST.
- **Late:** needs types, cross-references, or semantic checks; use to avoid false positives.

## Key Points

- One pass struct can handle multiple lints; register all in `register_lints!`.
- Suggestions integrate with solar's diagnostics and applicability levels.
- UI tests compare linter output to blessed `.stderr` files.

<!--
Source references:
- https://github.com/foundry-rs/foundry/blob/master/docs/dev/lintrules.md
- https://github.com/foundry-rs/foundry/blob/master/crates/lint/README.md
-->
