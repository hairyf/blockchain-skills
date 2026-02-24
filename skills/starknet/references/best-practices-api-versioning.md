---
name: starknet-api-versioning
description: Starknet API spec release process—Draft, RC, Recommendation, and semver.
---

# API Versioning and Releases

The Starknet node API specification follows a phased release process. Understanding it helps when implementing clients or relying on a specific API version.

## Phases

1. **Draft** — Work in progress. Expect major changes (types, methods added/changed/removed). There should be only one draft at a time (tip of `master`).
2. **Release Candidate (RC)** — Spec is ready to implement or has at least one implementation. Expect minor changes only; no addition/removal of methods. Multiple RCs possible (rc1, rc2, …).
3. **Recommendation** — Agreed, stable version; expected to be implemented and operated by nodes. No suffix in version tag.

## Transitions

- **Draft → RC**: All changes from the previous release discussed, no pending items; no open PRs for major changes.
- **RC → Recommendation**: At least 7 working days since the latest RC; no open discussion points.

## Version Numbering

- [Semantic versioning](https://semver.org): `major.minor.patch`.
- Suffix for RCs: `rc1`, `rc2`, … (e.g. `0.10.0-rc1`).
- No suffix means Recommendation (e.g. `v1.0.0`).

When updating the spec version, the `version` property must be updated in all API specification files and in `package*.json` (e.g. `npm version <VERSION> --no-git-tag-version`).

## Technical Implementation

- Releases are published as GitHub releases on the starknet-specs repo.
- Git tags on `master` denote releases: `v{major}.{minor}.{patch}[-suffix]`.
- All API specification documents share the same release version (single logical document).

## Usage for Agents

- When documenting or implementing the API, refer to a specific spec version (e.g. from `starknet_specVersion` or release tags) to avoid drift from Draft.
- For production clients, prefer a Recommendation or a fixed RC version; handle `starknet_specVersion` in responses to detect node spec version.
- When contributing or reviewing spec changes, respect the phase rules (no major changes after RC).

<!--
Source references:
- https://github.com/starkware-libs/starknet-specs api/release.md
-->
