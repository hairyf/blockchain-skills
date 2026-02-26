---
name: foundry-project-layout
description: Forge project layout — forge init, src, test, script, lib.
---

# Project Layout

Forge expects a standard layout; `forge init` creates it. Agents use this when scaffolding or navigating a Foundry project.

## forge init

```bash
forge init [PATH]
forge init my-project --no-git --empty
```

- Default: creates `src/`, `test/`, `script/`, `lib/`, `foundry.toml`, and example Counter contract + test + script.
- `--empty`: no example files; only dirs and config.
- `--no-git`: skip `git init`.
- `--vscode`: add VS Code settings and `remappings.txt`.
- `--force`: create even if directory is not empty.
- `--template <repo>`: start from a template repo.

## Default structure

```
.
├── foundry.toml
├── src/           # Contract source
├── test/           # Test contracts (*.t.sol)
├── script/         # Deployment scripts (*.s.sol)
└── lib/            # Dependencies (git submodules, forge install)
```

Paths are configurable in `foundry.toml` (`src`, `out`, `libs`, etc.). Tests are any contract in the test dir with `test`-prefixed functions; scripts are contracts with `run()` (or entrypoint specified in `forge script`).

## Key points

- New projects: run `forge init` then `forge install forge-std` if not already present.
- Existing repos: add `foundry.toml` and match `src`/`test`/`script`/`libs` to the repo layout.
- Scripts live in `script/` and are run with `forge script script/Name.s.sol:ContractName`.

<!--
Source references:
- https://getfoundry.sh/reference/forge/forge-init
- https://getfoundry.sh/guides/project-setup/project-layout/
- https://book.getfoundry.sh/reference/forge/forge-init
-->
