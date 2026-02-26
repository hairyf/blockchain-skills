---
name: geth-rlpdump
description: rlpdump - decode RLP-encoded dumps to a readable hierarchical format.
---

# rlpdump

rlpdump converts binary RLP dumps into a human-readable hierarchical representation. Use to inspect raw Ethereum data or output from evm t8n --output.body.

## Usage

rlpdump --hex CE0183FFFFFFC4C304050583616263

--hex for hex input. Omit for stdin raw bytes. Output is nested RLP decoding.

## Key Points

- RLP is used network- and consensus-side in Ethereum. Often used with evm (e.g. evm t8n --output.body=file.rlp then rlpdump).

<!-- Source: https://github.com/ethereum/go-ethereum (README.md), https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/ -->
