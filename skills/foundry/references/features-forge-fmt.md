---
name: foundry-forge-fmt
description: Forge formatter — forge fmt, [fmt] config, --check.
---

# Forge Fmt

Forge includes a Solidity formatter. Use `forge fmt` to normalize style and `--check` in CI to enforce it.

## Usage

```bash
forge fmt
forge fmt --check
forge fmt -w
```

- No flags: format files in place (respects `foundry.toml` `[fmt]`).
- `--check`: exit non-zero if any file would change; use in CI.
- `-w`: watch mode; re-run formatter on file changes.
- `-r`: print formatted output to stdout (raw).

## Config ([fmt] in foundry.toml)

```toml
[fmt]
line_length = 120
tab_width = 4
style = "space"
bracket_spacing = false
int_types = "long"
multiline_func_header = "attributes_first"
quote_style = "double"
number_underscore = "preserve"
```

Common options: `line_length`, `tab_width`, `style` (space vs tab), `quote_style`. Use `int_types = "short"` for `uint`/`int` instead of `uint256`/`int256`.

## Key points

- Run `forge fmt` before commits or in a pre-commit hook; use `forge fmt --check` in CI.
- Formatter applies to Solidity files under the project; paths and excludes follow config.
- Editor integration: point the editor’s Solidity formatter at `forge fmt` or use the Foundry VS Code extension for format-on-save.

<!--
Source references:
- https://getfoundry.sh/config/reference/formatter/
- https://book.getfoundry.sh/reference/cli/forge/fmt
-->
