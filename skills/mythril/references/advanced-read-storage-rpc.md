---
name: Mythril read-storage and RPC
description: Reading storage slots via RPC and RPC configuration for analyze/disassemble.
---

# Read-Storage and RPC

## read-storage command

Retrieves storage slots from a contract at a given address via RPC:

```bash
myth read-storage INDEX,NUM_SLOTS,[array] ADDRESS
myth read-storage mapping,INDEX,[KEY1,KEY2,...] ADDRESS
```

Examples:

```bash
# Read 5 slots starting at index 0
myth read-storage 0,5 0xContractAddress

# Mapping at index 2 with key 0x...
myth read-storage mapping,2,[0x123...] 0xContractAddress
```

Requires RPC (e.g. `--rpc https://...` or default Infura if `--infura-id` is set).

## RPC configuration

Used by `analyze`, `disassemble`, and `read-storage` when an address or on-chain data is needed:

| Option | Description |
|--------|-------------|
| `--rpc HOST:PORT` | Custom RPC URL or alias (e.g. `ganache`, `infura-mainnet`). Default: `infura-mainnet`. |
| `--rpctls true` | Use TLS for RPC. |
| `--infura-id ID` | Infura project ID for default Infura RPC. |

Config file can also set API keys (e.g. Infura); see Mythril docs for config path and format.

## Utility commands

- **func-to-hash** `SIGNATURE`: Returns the 4-byte selector for a function signature (e.g. `transfer(address,uint256)`).
- **hash-to-address** `HASH`: Converts hashes to Ethereum address (utility for debugging).

<!--
Source references:
- sources/mythril/mythril/interfaces/cli.py (create_read_storage_parser, get_rpc_parser)
- sources/mythril/docs/source/installation.rst
-->
