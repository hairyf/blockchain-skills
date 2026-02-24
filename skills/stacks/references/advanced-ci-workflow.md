---
name: stacks-ci-workflow
description: Stacks CI — tests, partitions, release builds, Docker images, and adding new tests.
---

# CI Workflow

Releases are built via the **CI** GitHub Actions workflow (`.github/workflows/ci.yml`): format check, integration and unit tests, binary archives with checksums, and Docker image publish.

## Triggers and artifacts

- **Push to branch (no tag):** No workflow by default; PR open/reopen/sync produces amd64 Docker image `stacks-core:<branch-name>` and `stacks-core:<pr-number>`.
- **Run on release branch** `release/X.Y.Z.A.n`: GitHub Release with binary archives (multi-arch), checksum file, tag `X.Y.Z.A.n`, Docker tags `stacks-core:latest`, `stacks-core:X.Y.Z.A.n`, `-debian`/`-alpine` variants.

Caching uses commit SHA; [Nextest](https://nexte.st/) runs tests from cached build archives with partitioning for speed.

## Test organization

Tests are split into workflows (e.g. Stacks Core Tests, Bitcoin Tests, Atlas, Epoch, P2P, Slow Tests). Matrix is used for a fixed set of jobs; nextest partitioning for large sets (e.g. unit tests). Slow tests (>10 min or flaky) go in Slow Tests workflow.

**Adding a test:** Add the test name to the appropriate workflow matrix (e.g. in `atlas-tests.yml`: `matrix.test-name`). New workflows can be added per test type.

## Standalone and check-jobs-status

[Standalone Tests](.github/workflows/standalone-tests.yml) is manually triggered; you select which test set runs (e.g. Epoch Tests, Release Tests). To require multiple jobs (e.g. all unit-test partitions + other jobs) in a ruleset, use the [check-jobs-status](https://github.com/stacks-network/actions/tree/main/check-jobs-status) action in a separate job that depends on those jobs and add that job as required.

<!--
Source references:
- sources/stacks/docs/ci-workflow.md
- https://github.com/stacks-network/stacks-blockchain
- https://github.com/stacks-network/actions
-->
