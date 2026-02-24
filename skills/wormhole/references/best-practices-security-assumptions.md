---
name: wormhole-best-practices-security-assumptions
description: Security assumptions for gossip, finality, guardians, and dependencies
metadata:
  author: hairy
---

# Security Assumptions

When integrating or operating Wormhole, rely on these documented assumptions.

## Gossip and availability

- Gossip (libp2p) is for **availability only**, not security. Compromise could cause DoS or message loss, not forgery.
- Observations may be retried (e.g. Solana polling, future chain replay); VAA body hash is deterministic and idempotent. Re-observation is safe.
- Prolonged outages can lead to dropped observations on non-Solana chains until chain replay exists.

## Chain finality

- Guardians observe **external** events; they do not initiate them. Security depends on connected chains’ finality and consensus.
- Assumptions: transactions become final and are not rolled back; no double execution; account/state persistence; no equivocation at a given height.

## Spam and fees

- Chains are assumed to use fees (or similar) to limit spam; Wormhole’s capacity is assumed greater than the sum of connected chains. Extreme fee-paying attacks are out of scope for the current threat model.

## Guardian incentives

- Wormhole is a decentralized PoA bridge. Security relies on a carefully chosen guardian set with aligned incentives (reputation, ecosystem). No staking/slashing in the current design.

## Host and keys

- Guardian nodes assume uncompromised hosts. A supermajority compromise can produce arbitrary VAAs; a superminority can cause temporary consensus loss. HSMs do not remove the risk of a compromised host using the HSM as a signing oracle; they only complicate theft.

## Third-party code

- Dependencies are minimized and pinned (e.g. go.sum). Cryptography uses Go stdlib and go-ethereum. Assume no backdoors in third-party libraries.

## Solana contracts

- Solana programs use unsafe blocks for (de)serialization under instruction limits. Invalid or out-of-bounds access is assumed to crash the VM and halt execution safely.

When building on Wormhole, verify VAAs on-chain via the official core/bridge; do not trust payload or emitter without contract-level checks.

<!--
Source references:
- sources/wormhole/docs/assumptions.md
- sources/wormhole/whitepapers/0001_generic_message_passing.md (Security Considerations)
-->
