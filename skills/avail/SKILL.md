---
name: avail
description: Avail Node—run chains, Kate RPC for data availability, block authoring, and runtime APIs for DA tooling.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/availproject/avail, scripts at https://github.com/antfu/skills
---

> Skill based on Avail Node (availproject/avail), generated from `sources/avail`. Doc path: `sources/avail/README.md`, `sources/avail/client/basic-authorship/README.md`, `sources/avail/e2e/README.md`, and node/rpc/runtime source (cli, command, kate-rpc, apis).

Avail is a data-availability layer. The Avail Node is the official Substrate-based client. It supports multiple chains (dev, turing, mainnet), Kate RPC for DA queries (rows, proofs, block length, per-tx data proof), and optional custom block authoring via the basic-authorship client. Use this skill to run nodes, script Kate RPC, integrate with light clients or explorers, and reason about runtime APIs.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Node and chains | Run node, chain IDs (dev, turing, mainnet), Docker, custom chain spec | [core-node-and-chains](references/core-node-and-chains.md) |
| Kate RPC | Enable Kate RPC, methods (queryRows, queryProof, queryMultiProof, blockLength, queryDataProof), limits | [core-kate-rpc](references/core-kate-rpc.md) |

## Features

### Block authoring and runtime

| Topic | Description | Reference |
|-------|-------------|-----------|
| Block authoring | ProposerFactory and Proposer for custom block production (basic-authorship) | [features-block-authoring](references/features-block-authoring.md) |
| Runtime APIs | DataAvailApi, KateApi, ExtensionBuilder for DA and header extension | [features-runtime-apis](references/features-runtime-apis.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Node security | Binary verification, safe RPC usage, when to use unsafe/Kate flags | [best-practices-node-security](references/best-practices-node-security.md) |
