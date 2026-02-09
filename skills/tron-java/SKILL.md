---
name: tron-java
description: Agent skill for java-tron — TRON Protocol Java implementation (FullNode, build, run, APIs, modular architecture, custom actuators).
metadata:
  author: hairy
  version: "2026.2.9"
  source: Generated from https://github.com/tronprotocol/java-tron, scripts located at https://github.com/antfu/skills
---

> Skill based on java-tron (TRON Protocol Java implementation), generated 2026-02-09.

java-tron is the Java node for the TRON blockchain: high-throughput, DPoS, EVM-compatible TVM. This skill covers building/running FullNode and SR, HTTP/gRPC/JSON-RPC APIs, modular architecture (framework, protocol, common, chainbase, consensus, actuator), and implementing custom transaction types via actuators.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Overview | What java-tron is, artifacts (FullNode.jar, Toolkit.jar), networks (Mainnet, Nile, Shasta, private) | [core-overview](references/core-overview.md) |
| Build and Run | Build from source (Gradle), run FullNode/SR, config, hardware requirements, dependency (JitPack/Maven) | [core-build-run](references/core-build-run.md) |
| APIs | HTTP, gRPC, JSON-RPC configuration and ports | [core-apis](references/core-apis.md) |

## Features

### Modularization

| Topic | Description | Reference |
|-------|-------------|-----------|
| Modular Architecture | Six modules (framework, protocol, common, chainbase, consensus, actuator) and key interfaces | [features-modular-architecture](references/features-modular-architecture.md) |
| Modular Deployment | Distribution script launch, JVM options | [features-modular-deployment](references/features-modular-deployment.md) |
| Custom Actuator | Add new contract type: proto, ContractType, Actuator impl, WalletApi | [features-custom-actuator](references/features-custom-actuator.md) |
