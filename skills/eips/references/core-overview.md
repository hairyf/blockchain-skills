---
name: core-overview
description: EIP repository structure, categories, and where to find specifications.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ethereum/EIPs (README, EIP-1)
---

# EIPs Overview

Ethereum Improvement Proposals (EIPs) are design documents that specify features or conventions for Ethereum. The [EIPs repository](https://github.com/ethereum/EIPs) holds the canonical source; [EIP-1](https://eips.ethereum.org/EIPS/eip-1) governs the process.

## Repository layout

- **`EIPS/`** — Individual EIP documents: `eip-N.md` (e.g. `EIPS/eip-1.md`, `EIPS/eip-20.md`).
- **`eip-template.md`** — Template for new EIPs.
- **`README.md`** — Repo overview, categories, validation tooling.
- **`assets/eip-N/`** — Auxiliary files (images, test data) for EIP number N.

Canonical URLs: `https://eips.ethereum.org/EIPS/eip-N`. Consider anything not on eips.ethereum.org a working draft; "Draft", "Review", and "Last Call" are incomplete and may change.

## Categories

| Category | Scope |
|----------|--------|
| **Core** | Consensus/protocol changes (forks). |
| **Networking** | Peer-to-peer (e.g. devp2p). |
| **Interface** | Client interfaces, ABIs, naming. |
| **ERC** | Application-layer standards (tokens, registries, etc.). |
| **Meta** | Process, tooling, guidelines (e.g. EIP-1). |
| **Informational** | Design notes; no consensus required. |

**Note:** New ERCs and updates are maintained in [ethereum/ercs](https://github.com/ethereum/ercs). This repo still lists historical ERCs and the EIP process.

## Usage for agents

- **Look up a spec:** Resolve `sources/eips/EIPS/eip-{N}.md` or fetch from eips.ethereum.org.
- **Cite:** Use canonical URL, e.g. `https://eips.ethereum.org/EIPS/eip-1`.
- **Naming:** Refer to ERC EIPs as `ERC-N` (e.g. ERC-20); others as `EIP-N`.

<!--
Source references:
- sources/eips/README.md
- sources/eips/EIPS/eip-1.md
-->
