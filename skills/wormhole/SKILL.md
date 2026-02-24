---
name: wormhole
description: Cross-chain messaging and Token Bridge integration with Wormhole (VAAs, guardians, governance, CCQ)
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/wormhole-foundation/wormhole, scripts located at https://github.com/antfu/skills
---

> Skill is based on Wormhole (reference implementation) at commit 612caaa, generated 2026-02-24.

Wormhole is a generic cross-chain messaging protocol: guardians observe finalized messages on connected chains, reach consensus, and produce Signed VAAs. Applications (Token Bridge, NFT Bridge, oracles) sit on top; the core does not hold assets or deliver messages. Use this skill to integrate contracts with the core bridge and Token Bridge, operate or reason about guardian nodes, and use Cross Chain Queries (CCQ).

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Overview | Protocol model, VAA, core vs apps, flow | [core-overview](references/core-overview.md) |
| VAA and Messaging | VAA structure, postMessage, consistency levels | [core-vaa-and-messaging](references/core-vaa-and-messaging.md) |
| Governance | Governance packet, ContractUpgrade, GuardianSetUpgrade | [core-governance](references/core-governance.md) |
| Token Bridge | Payloads, attestToken, transfer, completeTransfer, createWrapped | [core-token-bridge](references/core-token-bridge.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Guardian Node | Components, observation lifecycle, reobservation, config | [features-guardian-node](references/features-guardian-node.md) |
| Governor and Notary | Chain limits, release/drop VAA, delay/blackhole | [features-governor-and-notary](references/features-governor-and-notary.md) |
| Queries (CCQ) | Cross Chain Queries, proxy server, permissions, call types | [features-queries-ccq](references/features-queries-ccq.md) |
| Transfer Verifier | Guardian transfer verification, enabled chains | [features-transfer-verifier](references/features-transfer-verifier.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Security Assumptions | Gossip, finality, guardians, keys, dependencies | [best-practices-security-assumptions](references/best-practices-security-assumptions.md) |
| Contract Integration | Emitter filtering, replay, redeem timing, repairVaa | [best-practices-contract-integration](references/best-practices-contract-integration.md) |
