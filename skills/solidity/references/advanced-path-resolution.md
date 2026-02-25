---
name: solidity-path-resolution
description: Import path resolution — VFS, source unit names, base path, include paths, remapping.
---

# Import Path Resolution

The compiler uses a virtual filesystem (VFS): each source has a unique *source unit name*. Import paths in code are resolved to source unit names; the Host Filesystem Loader (or custom import callback) then loads content.

## Direct vs relative imports

- **Direct:** path does not start with `./` or `../`. After remapping, the path becomes the source unit name. Example: `import "lib/util.sol";` → `lib/util.sol`.
- **Relative:** starts with `./` or `../`. Resolved relative to the importing file’s source unit name. Example: from `contracts/contract.sol`, `import "./math.sol";` → `contracts/math.sol`.

Use forward slashes for portability. Relative imports with leading `..` are not recommended; prefer direct imports with base/include paths.

## Base path and include paths

- **Base path** (`--base-path`): prepended to source unit names by the Host Filesystem Loader. Set to project root so relative lookups are stable.
- **Include paths** (`--include-path`): additional directories to search; require non-empty base path. Use for dependencies (e.g. `node_modules/`).

Example:

```bash
solc contract.sol --base-path . --include-path node_modules/
```

Then `import "@openzeppelin/contracts/utils/Strings.sol";` is resolved under base path or include paths.

## Import remapping

Remapping changes the translation from import path to source unit name: `context:prefix=target`. Omit context for global remapping.

- **prefix** must match the start of the resolved source unit name; **target** replaces it.
- Only one remapping applies per import (longest context, then longest prefix).
- Remapping does not apply to paths given on the command line or in Standard JSON `sources` keys.
- Remapping info is stored in metadata; avoid local paths in targets for reproducible builds. Prefer include paths when possible.

Example:

```bash
solc github.com/ethereum/dapp-bin/=dapp-bin/ --base-path /project source.sol
```

## Allowed paths

Host Filesystem Loader only loads from certain directories (input file dirs, remapping targets, base path, include paths). Add more with `--allow-paths` (comma-separated). Required when sources live outside those locations. Case-sensitive; symlinks are not followed beyond allowed dirs.

## Standard JSON

With Standard JSON, `sources` keys are the initial source unit names; content is in `content` or loaded via `urls` and an import callback. No filesystem lookup unless callback is used.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/path-resolution.html
-->
