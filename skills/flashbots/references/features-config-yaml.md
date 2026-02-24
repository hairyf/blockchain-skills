---
name: YAML configuration file
description: Config file path, hot reload, and structure for relays and timing games.
---

# YAML Configuration

Advanced options (relay list, timing games, global timeouts) are driven by a YAML config file.

## Usage

```bash
./mev-boost -config config.yaml
# Hot reload: apply config changes without restart
./mev-boost -config config.yaml -watch-config
```

Config is optional. Relays can be supplied only via CLI (`-relay` / `-relays`); if both config and CLI provide relays, they are merged.

## Top-level keys

| Key | Description |
|-----|-------------|
| `timeout_get_header_ms` | Max timeout (ms) for getHeader (default 950). |
| `late_in_slot_time_ms` | Slot time (ms) after which relay requests are skipped (default 2000). |
| `relays` | List of relay entries (see below). |

## Relay entry structure

Each item under `relays` is an object with:

| Key | Description |
|-----|-------------|
| `url` | Relay URL (e.g. `https://0x...@host`). |
| `enable_timing_games` | If true, use timing games for this relay. |
| `target_first_request_ms` | When to send first getHeader (ms into slot). |
| `frequency_get_header_ms` | Interval (ms) between follow-up getHeader requests. |

Example (see `config.example.yaml` in the repo for a full sample):

```yaml
timeout_get_header_ms: 950
late_in_slot_time_ms: 2000

relays:
  - url: "https://0x...@relay1.net"
    enable_timing_games: true
    target_first_request_ms: 200
    frequency_get_header_ms: 100
  - url: "https://0x...@relay2.com"
    enable_timing_games: false
```

## Environment

Config path can be overridden via `CONFIG_FILE` when the CLI reads it from the `-config` flag’s env source.

<!--
Source references:
- config.example.yaml
- docs/timing-games.md
- sources/flashbots/cli/flags.go (relayConfigFlag, watchConfigFlag)
-->
