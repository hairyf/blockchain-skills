---
name: bitcoin-rust-dependencies
description: Policy on adding dependencies—requirements and what to avoid.
---

# Dependency Policy

The project is averse to new dependencies; a strong case is required. When adding functionality, prefer implementing in-tree unless a dependency clearly wins on the criteria below.

## Requirements for new dependencies

- Maintainers are reputable and write idiomatic Rust.
- Quick response to bug reports and constructive response to code-quality PRs.
- Idiomatic, well-documented API; stable or close to stable.
- **Conservative MSRV**—hard requirement for mandatory dependencies.
- Reasonable performance and test coverage; CI, clippy, fuzzing (and miri where applicable).
- No reckless `unsafe`: no large or complex unsafe chunks; no safe-looking functions that can cause UB depending on arguments; prefer safe code when equally fast; safe abstractions where needed.

These apply recursively: the full dependency tree should not pull in significantly more code than needed for the feature.

## Reckless unsafe (reject)

- Large or complicated unsafe blocks (e.g. whole module).
- (Private) functions that can cause UB depending on arguments but are not marked `unsafe`.
- Code that could be written without `unsafe` with similar performance.
- Missing safe wrappers around unsafe operations.

## In practice

Dependencies that fail the above are rejected. After that, discussion centers on: benefit vs niche, past MSRV disagreements, and whether to rely on external unsafe (e.g. `ArrayVec`) vs in-tree code.

When suggesting or adding a dependency in the rust-bitcoin ecosystem, check MSRV and the dependency tree; prefer minimal, stable, well-maintained crates.

<!--
Source references:
- sources/bitcoin-rust/docs/dependencies.md
-->
