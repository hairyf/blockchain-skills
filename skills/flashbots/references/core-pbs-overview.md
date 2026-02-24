---
name: MEV-Boost PBS overview
description: Proposer-builder separation (PBS) architecture, roles, and block proposal flow for mev-boost.
---

# MEV-Boost and Proposer-Builder Separation

MEV-Boost is middleware that lets validators outsource block building to a competitive builder market. It implements out-of-protocol proposer-builder separation (PBS) for PoS Ethereum.

## Roles

- **Validators / Consensus clients**: Propose blocks; connect to MEV-Boost to receive block headers from relays.
- **MEV-Boost**: Sidecar for the beacon node; queries relays, aggregates bids, returns the best header to the consensus client.
- **Relays**: Aggregate blocks from multiple builders; expose headers and bids to MEV-Boost. One MEV-Boost instance can connect to multiple relays.
- **Builders**: Build full blocks (including MEV); submit blocks and bids to relays.

## Flow

1. Validator registers with relays via MEV-Boost (`registerValidator`).
2. When a slot is assigned, consensus client requests a header from MEV-Boost (`getHeader`).
3. MEV-Boost requests headers from all configured relays and selects the highest bid.
4. Consensus client signs the chosen header and sends it to MEV-Boost (`submitBlindedBlock` / getPayload).
5. MEV-Boost forwards to the relay that provided that bid; relay returns the full payload.
6. Consensus client receives the full block and proposes it.

## When to use

- Use MEV-Boost when you run a PoS Ethereum node (solo or staking provider) and want to receive MEV-boosted blocks from builders instead of building locally.
- One MEV-Boost instance can serve multiple beacon nodes; default listen address is `localhost:18550`.

<!--
Source references:
- https://github.com/flashbots/mev-boost (README.md)
- https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725
-->
