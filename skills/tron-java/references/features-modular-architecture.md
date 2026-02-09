---
name: java-tron modular architecture
description: Six modules (framework, protocol, common, chainbase, consensus, actuator) and their interfaces.
---

# java-tron Modular Architecture

Modularization lets developers build app-specific chains: pluggable consensus, custom actuators, replaceable storage. Six modules:

| Module | Role |
|--------|------|
| **framework** | Core; initializes and wires all modules; gateway to the chain. |
| **protocol** | Binary protocol: node-to-node and public API; defines transactions, blocks, contracts (protos). |
| **common** | Shared utilities and components. |
| **chainbase** | Storage with rollback support (fork/switch chain). Interface: rollback, checkpoints. Default impls: LevelDB, RocksDB. Key: `RevokingDatabase` (container), `TronStoreWithRevoking` (rollback-capable store). |
| **consensus** | Pluggable consensus. `ConsensusInterface`: `start`, `stop`, `receiveBlock`, `validBlock`, `applyBlock`. Enables DPoS, PBFT, hybrid, etc. |
| **actuator** | Transaction executors (one per contract type). `Actuator` interface: `execute`, `validate`, `getOwnerAddress`, `calcFee`. Custom business logic without VM-only contracts. |

## Key Interfaces

**ConsensusInterface:** start, stop, receiveBlock, validBlock, applyBlock.

**Actuator:** execute(Object resultCapsule), validate(), getOwnerAddress(), calcFee().

**Chainbase:** Databases implement rollback and checkpoint; any implementation of the interface can be used as storage.

## When to Use

- **Custom chain:** Swap consensus or storage via config / implementations.
- **Custom transaction type:** Add a new contract (proto), implement an Actuator, register in protocol and API layer.

<!--
Source references:
- https://github.com/tronprotocol/java-tron (docs/modular-introduction-en.md)
-->
