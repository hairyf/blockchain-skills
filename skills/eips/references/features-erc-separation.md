---
name: features-erc-separation
description: ERCs moved to ethereum/ercs; where to submit new ERCs and how this repo is affected.
metadata:
  author: hairy
  version: "2026.2.25"
  source: Generated from https://github.com/ethereum/EIPs (README)
---

# ERC / EIP Repository Separation

As of a recent [change](https://github.com/ethereum/EIPs/pull/7206), **ERC** (application-layer) standards are maintained in a separate repository.

## Where things live

| Content | Repository | URL |
|--------|------------|-----|
| **EIPs** (Core, Networking, Interface, Meta, Informational) | ethereum/EIPs | https://github.com/ethereum/EIPs |
| **ERCs** (application standards: tokens, registries, etc.) | ethereum/ercs | https://github.com/ethereum/ercs |

## Implications for agents and authors

- **New ERCs or updates to existing ERCs** — Submit to [ethereum/ercs](https://github.com/ethereum/ercs). Do not open ERC PRs against ethereum/EIPs.
- **This repo (EIPs)** — Still contains historical ERC documents and the **EIP process** (EIP-1, template, categories, validation). The status site (eips.ethereum.org) still lists ERCs; the source of truth for *editing* ERCs is ethereum/ercs.
- **Referencing** — When referencing an ERC in an EIP or in code, continue to use the form **ERC-N** and canonical URL `https://eips.ethereum.org/EIPS/eip-N` (or the ercs repo canonical URL if that becomes the official one for ERCs). Check the relevant repo for the latest ERC text.

When helping users "add an ERC" or "propose a new token standard," direct them to ethereum/ercs. When helping with EIP process, format, or non-ERC EIPs, use this repo (ethereum/EIPs).

<!--
Source references:
- sources/eips/README.md (attention notice)
-->
