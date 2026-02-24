---
name: features-categories
description: EIP types and categories for Standards Track, Meta, and Informational.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ethereum/EIPs (EIP-1)
---

# EIP Types and Categories

## EIP types

- **Standards Track** — Affects implementations or interoperability (protocol, network, interface, or application standards). Has subcategory: Core, Networking, Interface, or ERC.
- **Meta** — Process, tooling, or governance; not protocol code. May require community consensus; users generally cannot ignore them.
- **Informational** — Design notes or guidelines; no consensus; implementers may ignore.

## Standards Track categories

| Category | Examples |
|----------|----------|
| **Core** | Consensus forks, block/transaction validity, miner/node strategy. |
| **Networking** | devp2p, light client, whisper/swarm. |
| **Interface** | Contract ABI, RPC method names, language-level conventions. |
| **ERC** | Token standards (e.g. ERC-20), name registries, URI schemes, wallet formats. |

Core EIPs that touch the EVM should use opcode mnemonics and define them at least once (e.g. `REVERT (0xfe)`).

## Finding EIPs by category

On eips.ethereum.org: Core, Networking, Interface, ERC, Meta, and Informational are listed by category. In the repo, `_config.yml` and the Jekyll site map these to pages (core.html, erc.html, etc.); the source of truth is the `category` (and `type`) in each EIP’s preamble.

<!--
Source references:
- sources/eips/EIPS/eip-1.md (EIP Types, Special requirements for Core EIPs)
- sources/eips/_config.yml
-->
