---
name: hyperlane-features-relayer
description: Hyperlane relayer package – relayMessage, daemon config, and metrics.
metadata:
  author: hairy
---

# Hyperlane Relayer

The relayer indexes dispatched messages and delivers them to destination chains. Use when building or operating relayers or when debugging message delivery.

## Library usage (browser-safe)

```typescript
import { HyperlaneRelayer } from '@hyperlane-xyz/relayer';
import { HyperlaneCore } from '@hyperlane-xyz/sdk';

const core = HyperlaneCore.fromAddressesMap(addresses, multiProvider);
const relayer = new HyperlaneRelayer({ core });

// Relay a single message (e.g. from dispatch tx)
await relayer.relayMessage(dispatchTx);

// Or run continuous relaying
relayer.start();
```

## Node.js daemon (with filesystem)

```typescript
import { RelayerService, loadConfig } from '@hyperlane-xyz/relayer/fs';

const relayerConfig = loadConfig('./config.yaml');
const service = await RelayerService.create(multiProvider, registry, {
  enableMetrics: true,
  relayerConfig,
});
await service.start();
```

## CLI

```bash
hyperlane relayer --chains ethereum,arbitrum
```

## Environment and config

| Variable | Description | Required |
|----------|-------------|----------|
| `HYP_KEY` | Private key for signing delivery txs | Yes |
| `RELAYER_CONFIG_FILE` | Path to YAML config | No |
| `RELAYER_CHAINS` | Comma-separated chains | No |
| `RELAYER_CACHE_FILE` | Cache path for persistence | No |
| `LOG_LEVEL` | debug, info, warn, error | No (default: info) |
| `PROMETHEUS_ENABLED` / `PROMETHEUS_PORT` | Metrics | No (default: true, 9090) |

Example YAML:

```yaml
chains: [ethereum, arbitrum, optimism]
whitelist:
  ethereum: ['0x...']
  arbitrum: ['0x...']
retryTimeout: 1000
cacheFile: ./relayer-cache.json
```

## Metrics

Prometheus metrics at `http://localhost:9090/metrics` (configurable): `hyperlane_relayer_messages_total`, `hyperlane_relayer_retries_total`, `hyperlane_relayer_backlog_size`, `hyperlane_relayer_relay_duration_seconds`, etc.

<!--
Source references:
- sources/hyperlane/typescript/relayer/README.md
- sources/hyperlane/AGENTS.md (Rust Agents – relayer)
-->
