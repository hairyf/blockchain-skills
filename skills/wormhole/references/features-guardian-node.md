---
name: wormhole-features-guardian-node
description: Guardian node components, observation lifecycle, reobservation, and config
metadata:
  author: hairy
---

# Guardian Node

The guardian node observes connected chains, aggregates observations until quorum, and publishes signed VAAs. Used when operating or integrating with guardian infrastructure.

## Components

- **Watchers**: One per chain (EVM, Solana, Cosmwasm, Sui, Aptos, Algorand, Near, IBC). Subscribe or poll for core contract events and post observations to the processor. Handle reobservation requests.
- **Processor**: Aggregates observations from watchers and gossip, runs governor and accountant checks, signs when quorum is reached, batches and publishes signed VAAs to P2P.
- **Governor**: Optional; enforces per-chain daily and per-transfer limits; can delay or drop VAAs (see governor/notary docs).
- **Accountant**: Interfaces with accountant contracts on Gateway (wormchain) for token bridge and NTT notional limits.
- **Query (CCQ)**: Processes Cross Chain Query requests on a separate P2P topic; forwards to watchers and publishes responses.

## Observation lifecycle

1. Watcher sees core contract message; waits for requested consistency level.
2. Observation sent to processor; governor/accountant may delay.
3. Processor signs and batches; batches published to P2P.
4. Other guardians receive; each aggregates until quorum and has observed locally.
5. At quorum, VAA is generated and published as signed VAA.

## Reobservation

Reobservation can be requested by: admin command, gossip from another guardian, or internally (processor/accountant). Request is (chainId, txId). Watcher fetches tx and reposts observation; throttling applies to avoid repeated requests for the same tx.

## Configuration

Config: file (YAML preferred), env vars (`GUARDIAND_*`), or CLI flags (highest precedence). Example: `ethRPC`, `solanaRPC`, `solanaContract`, `ethContract`, etc. For public RPC: `--publicWeb`, optional `--tlsHostname` and `--tlsProdEnv`. Guardian key: `guardiand keygen` or `guardianSignerUri` for custom signer (e.g. KMS). Build: `make node` → `build/guardiand`.

## Monitoring

Use `/readyz` for startup readiness and `/metrics` (Prometheus) for alerting; do not rely on log parsing. Ports: 8999/udp P2P, 8996/udp CCQ; public API if `--publicWeb` is set.

<!--
Source references:
- sources/wormhole/docs/guardian.md
- sources/wormhole/docs/operations.md
-->
