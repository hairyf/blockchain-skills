---
name: Mythril analyze command
description: Run Mythril security analysis on Solidity files, bytecode, or on-chain contracts.
---

# Analyze Command

`myth analyze` (alias `myth a`) runs symbolic execution and detection modules on EVM bytecode. It is the primary way to run a security scan.

## Basic usage

```bash
# Solidity file (compiles with solc, analyzes all contracts or the specified one)
myth analyze contract.sol
myth analyze contract.sol:ContractName

# Bytecode (creation bytecode by default)
myth analyze -c "0x6060604052..."
myth analyze -f bytecode.txt

# Runtime bytecode only (use with -c or -f)
myth analyze --bin-runtime -f runtime.txt

# On-chain contract (needs RPC)
myth analyze -a 0x...
myth analyze --rpc https://eth-mainnet.g.alchemy.com/v2/KEY -a 0x...
```

## Key options

| Option | Purpose |
|--------|---------|
| `-t N`, `--transaction-count N` | Max number of transactions to explore (default 2). |
| `--execution-timeout N` | Seconds for symbolic execution (default 3600). |
| `--solver-timeout N` | Solver timeout in milliseconds (default 25000). |
| `-m MODULES`, `--modules MODULES` | Comma-separated detection modules to run (e.g. `Suicide,IntegerArithmetics`). Omit to run all. |
| `-o text|markdown|json|jsonv2` | Output format (default `text`). |
| `--no-onchain-data` | Do not fetch code/balance from chain (use with `-c`/`-f`). |
| `--solv VERSION` | Solc version for compiling `.sol` (e.g. `0.8.20`). |

## Example with transaction bound and JSON

```bash
myth analyze contract.sol -t 3 --execution-timeout 300 -o jsonv2
```

## Docker

When using the official image, mount the project and pass paths inside the container:

```bash
docker run -v $(pwd):/tmp mythril/myth analyze /tmp/contract.sol -t 2
```

<!--
Source references:
- sources/mythril/README.md
- sources/mythril/docs/source/installation.rst
- sources/mythril/mythril/interfaces/cli.py
-->
