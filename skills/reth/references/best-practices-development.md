---
name: reth-development
description: Build, test, lint, PR workflow for Reth
---

# Development

cargo +nightly fmt --all; cargo +nightly clippy --workspace --all-features; cargo nextest run --workspace; make pr. MSRV 1.88.0. One review (two for large PRs), conventional commits, labels. Comment why; spawn_blocking for CPU work; do not modify vendored libmdbx.
Source: CLAUDE.md, CONTRIBUTING.md
