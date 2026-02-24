---
name: core-settings
description: ord configuration precedence, config file, and hidden inscriptions.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ordinals/ord (docs/src/guides/settings.md)
---

# ord Settings

Configuration precedence (highest to lowest): **command line** → **environment variables** → **config file** → **defaults**.

## Config file location

- Explicit: `--config <CONFIG_PATH>` (errors if file missing).
- Directory: `--config-dir <DIR>` or `--datadir <DIR>` → looks for `ord.yaml` in that directory (no error if missing).
- Default: if `--config`, `--config-dir`, and `--datadir` are not set, ord loads `ord.yaml` from the default data directory if present.

## Naming

- CLI: `--setting-name`
- Env: `ORD_SETTING_NAME` (e.g. `ORD_DATA_DIR`)
- Config: `setting_name` (snake_case)

## View current config

```bash
ord settings
```

Output is JSON of the resolved configuration.

## Hiding inscription content

Inscription content can be hidden from `ord server` so it is not served. **Only** config file or environment variables (not CLI).

Environment:

```bash
export ORD_HIDDEN='id1i0 id2i0'
```

Config file:

```yaml
hidden:
  - 6fb976ab49dcec017f1e201e84395983204ae1a7c2abf7ced0a85d692e442799i0
  - 703e5f7c49d82aab99e605af306b9a30e991e57d42f982908a962a81ac439832i0
```

Space-separated list of inscription IDs in the env var; YAML list in the file.

<!--
Source references:
- sources/ordinals/docs/src/guides/settings.md
-->
