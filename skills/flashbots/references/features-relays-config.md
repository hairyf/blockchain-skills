---
name: Relays and CLI configuration
description: Configuring relays, networks, minimum bid, and relay health checks for mev-boost.
---

# Relays and Run Configuration

## Specifying relays

Two equivalent ways to pass relay URLs:

```bash
# Comma-separated list
./mev-boost -relays "https://relay1.example.com,https://relay2.example.com"

# Multiple -relay flags
./mev-boost -relay "https://relay1.example.com" -relay "https://relay2.example.com"
```

Relay URL format is typically `scheme://pubkey@host`. Relays can also be defined in the YAML config file (see features-config-yaml); CLI and config relays are merged.

## Network selection

| Flag | Network |
|------|---------|
| `-mainnet` | Mainnet (default) |
| `-sepolia` | Sepolia |
| `-holesky` | Holesky |
| `-hoodi` | Hoodi |

Example for Sepolia:

```bash
./mev-boost -sepolia -relay-check -relay "https://relay.example.com"
```

## Minimum bid

`-min-bid <eth>`: If no relay returns a bid of at least this value (in ETH), MEV-Boost does not return a bid to the consensus client; the node falls back to local block production.

```bash
./mev-boost -min-bid 0.06 -relay "https://relay.example.com"
```

## Relay health check

`-relay-check`: Check relay status on startup and when the status API is called. Use this to avoid starting with unreachable relays.

```bash
./mev-boost -relay-check -relay "https://relay1.example.com" -relay "https://relay2.example.com"
```

## Request timeouts (CLI / env)

| Flag | Env | Default | Meaning |
|------|-----|---------|---------|
| `-request-timeout-getheader` | `RELAY_TIMEOUT_MS_GETHEADER` | 950 | getHeader timeout (ms) |
| `-request-timeout-getpayload` | `RELAY_TIMEOUT_MS_GETPAYLOAD` | 4000 | getPayload timeout (ms) |
| `-request-timeout-regval` | `RELAY_TIMEOUT_MS_REGVAL` | 3000 | registerValidator timeout (ms) |

## Listen address and metrics

- `-addr`: Listen address for the MEV-Boost server (default `localhost:18550`).
- `-metrics`: Enable Prometheus metrics server (default off).
- `-metrics-addr`: Metrics server address (default `localhost:18551`).

<!--
Source references:
- https://github.com/flashbots/mev-boost (README.md, Usage, mev-boost cli arguments)
- sources/flashbots/cli/flags.go
-->
