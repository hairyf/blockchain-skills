---
name: wormhole-core-governance
description: Governance VAAs, packet structure, and core governance actions
metadata:
  author: hairy
---

# Governance Messaging

Governance decisions are emitted from a designated governance contract and delivered as VAAs. Core and modules (e.g. Token Bridge) accept governance from a hardcoded (emitterChain, emitterAddress) tuple.

## Governance packet structure

All governance VAAs use a common header:

```go
Module  [32]byte   // Left-padded module identifier (e.g. "Core", "TokenBridge")
Action  uint8      // Action ID
Chain   uint16     // Target chain (0 for global, e.g. guardian set)
// Action-specific payload
```

## Core governance actions

**ContractUpgrade** (Action 1): Upgrade implementation on a specific chain.
- `Module` = "Core"
- `Chain` = target chain ID
- `NewContract` = 32-byte new implementation address

**GuardianSetUpgrade** (Action 2): Replace guardian set (chain-independent).
- `Module` = "Core"
- `Chain` = 0
- `NewGuardianSetIndex`, `NewGuardianSetLen`, `NewGuardianSet[]`

Other core actions (e.g. SetMessageFee = 3, TransferFees = 4) follow the same module/action pattern; see whitepapers for exact payloads.

## Token Bridge governance

Token Bridge uses the same governance emitter; module identifier is "TokenBridge" (left-padded). Actions include RegisterChain (register bridge endpoint per chain) and UpgradeContract. Only the governance contract can emit these; endpoints verify emitter before applying.

## Usage

- When integrating a new chain or upgrading contracts, governance VAAs are produced off-chain by the authorized governance process and submitted to the core/bridge on each target chain.
- Do not accept governance VAAs from arbitrary emitters; always verify against the known governance emitter address for the network (mainnet/testnet).

<!--
Source references:
- sources/wormhole/whitepapers/0002_governance_messaging.md
- sources/wormhole/whitepapers/0003_token_bridge.md
- sources/wormhole/whitepapers/0004_message_publishing.md
-->
