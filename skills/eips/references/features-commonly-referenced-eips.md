---
name: features-commonly-referenced-eips
description: Short index of EIPs agents often need when implementing or discussing Ethereum behavior.
metadata:
  author: hairy
  version: "2026.2.25"
  source: Generated from https://github.com/ethereum/EIPs
---

# Commonly Referenced EIPs

When implementing clients, wallets, or dapps, these EIPs are frequently cited. Resolve the spec at `sources/eips/EIPS/eip-N.md` or https://eips.ethereum.org/EIPS/eip-N.

| EIP | Title | One-line summary |
|-----|--------|------------------|
| **EIP-1** | EIP Purpose and Guidelines | Process, format, status, categories; the meta-spec for all EIPs. |
| **EIP-155** | Simple replay attack protection | Transaction signing includes `chainId`; `v = chainId*2+35/36`. Core. |
| **EIP-712** | Typed structured data hashing and signing | `eth_signTypedData_v4`; domain separator + typed struct hash; human-readable signing. Interface. |
| **EIP-1193** | Ethereum Provider JavaScript API | `window.ethereum`-style Provider: `request()`, events (`chainChanged`, `accountsChanged`). Interface. |

**Note:** Many application-level standards (e.g. checksum addresses, signed message format) were numbered as EIPs but are now maintained as ERCs in [ethereum/ercs](https://github.com/ethereum/ercs). For ERC-20, ERC-721, etc., check this repo for historical text or ethereum/ercs for the current source.

<!--
Source references:
- sources/eips/EIPS/eip-1.md
- sources/eips/EIPS/eip-155.md
- sources/eips/EIPS/eip-712.md
- sources/eips/EIPS/eip-1193.md
-->
