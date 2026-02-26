---
name: Anchor Version Manager (AVM)
description: Install and switch between Anchor CLI versions with avm.
---

# Anchor Version Manager (AVM)

Use AVM to install and switch between multiple `anchor` CLI versions (e.g. for verifiable builds or different project requirements).

## Commands

- **`avm install <VERSION_OR_COMMIT>`** – Install a version. Use semver (e.g. `0.32.1`), `latest`, or a commit hash (full or short).
- **`avm list`** – List installed versions.
- **`avm use <version>`** – Set active version (e.g. `avm use 0.32.1` or `avm use latest`).
- **`avm uninstall <version>`** – Remove an installed version.

## Examples

```bash
avm install 0.32.1
avm install latest
avm install 0.30.1-cfe82aa682138f7c6c58bf7a78f48f7d63e9e466
avm use 0.32.1
```

`Anchor.toml` can pin a version via `[toolchain] anchor_version` when using AVM in CI or team workflows.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/references/avm.mdx)
-->
