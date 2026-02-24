---
name: Timing games
description: Optimizing block proposals by delaying and repeating getHeader requests to capture better bids.
---

# Timing Games

Timing games optimize block proposal by **when** and **how often** MEV-Boost sends `getHeader` requests to relays. Instead of one request at the start of the slot, MEV-Boost can wait and send multiple requests to capture later, often higher bids before the proposal deadline.

## Enabling timing games

- Timing games are configured **per relay** in the YAML config file.
- You must pass the config file with `-config`; there is no CLI-only way to enable timing games.

```bash
./mev-boost -config config.yaml
# Optional: hot-reload config changes without restart
./mev-boost -config config.yaml -watch-config
```

## Global settings (YAML)

| Key | Default | Description |
|-----|---------|-------------|
| `timeout_get_header_ms` | 950 | Max time (ms) for getHeader requests to relays. |
| `late_in_slot_time_ms` | 2000 | Time into the slot (ms) after which MEV-Boost skips relay requests and forces local block building to avoid missing the slot. |

## Per-relay settings (under `relays[].url`)

| Key | Required | Description |
|-----|----------|-------------|
| `enable_timing_games` | no (default: false) | If true, use timing games for this relay; otherwise single immediate request. |
| `target_first_request_ms` | when timing games enabled | Target time (ms) into the slot when the **first** getHeader is sent. |
| `frequency_get_header_ms` | when timing games enabled | Interval (ms) between **subsequent** getHeader requests to the same relay until the timeout budget is exhausted. |

## Behavior

1. When the consensus client calls getHeader, MEV-Boost computes budget: `min(timeout_get_header_ms, late_in_slot_time_ms - ms_into_slot)`.
2. If timing games are enabled and `target_first_request_ms` is set, MEV-Boost waits until that time into the slot before the first request.
3. Then it sends getHeader requests every `frequency_get_header_ms` until the budget is used.
4. From each relay it keeps the **most recently received** bid; across relays it returns the **highest value** bid.

## Example YAML (excerpt)

```yaml
timeout_get_header_ms: 950
late_in_slot_time_ms: 2000

relays:
  - url: "https://0x...@relay.example.com"
    enable_timing_games: true
    target_first_request_ms: 200
    frequency_get_header_ms: 100
```

**Note:** Intended for advanced users; set parameters with care to avoid missed slots.

<!--
Source references:
- docs/timing-games.md
- config.example.yaml
-->
