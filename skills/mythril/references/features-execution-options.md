---
name: Mythril execution and strategy options
description: Symbolic execution strategy, timeouts, depth, and tuning flags.
---

# Execution and Strategy Options

These options control how Mythril explores the state space during `analyze`.

## Transaction and time bounds

| Option | Default | Description |
|--------|--------|-------------|
| `-t N`, `--transaction-count N` | 2 | Max number of transactions to explore. |
| `--execution-timeout N` | 3600 | Max seconds for symbolic execution. |
| `--solver-timeout N` | 25000 | Solver timeout in milliseconds per query. |
| `--create-timeout N` | 30 | Seconds for initial contract creation. |

Example: quick run with 3 transactions and 5-minute cap:

```bash
myth analyze contract.sol -t 3 --execution-timeout 300
```

## Strategy

| Option | Description |
|--------|-------------|
| `--strategy dfs` | Depth-first search. |
| `--strategy bfs` | Breadth-first (default). |
| `--strategy naive-random` | Naive random. |
| `--strategy weighted-random` | Weighted random. |
| `--strategy pending` | Pending-queue strategy. |

```bash
myth analyze contract.sol --strategy dfs -t 4
```

## Depth and loops

| Option | Default | Description |
|--------|--------|-------------|
| `--max-depth N` | 128 | Max recursion depth for symbolic execution. |
| `--call-depth-limit N` | 3 | Max call depth. |
| `-b N`, `--loop-bound N` | 3 | Bound loop iterations. |

## Transaction sequences (advanced)

`--transaction-sequences` constrains which function hashes can be called in each transaction:

```bash
# Example: first tx func_hash1 or func_hash2, second tx func_hash2 or func_hash3
myth analyze contract.sol --transaction-sequences "[[0x123...,0x456...],[0x456...,0x789...]]" -t 2
```

Use `-1` for fallback, `-2` for receive. When using this, it is often advised to set `--disable-dependency-pruning`.

## Beam search

```bash
myth analyze contract.sol --beam-search 10
```

Runs beam search with the given width instead of full strategy.

## Pruning and solvers

| Option | Description |
|--------|-------------|
| `--pruning-factor F` | Check reachability at rate F (0–1). 1 = every execution. |
| `--disable-dependency-pruning` | Turn off dependency-based pruning. |
| `--disable-coverage-strategy` | Disable coverage-based search. |
| `--disable-mutation-pruner` | Disable mutation pruner. |
| `--enable-state-merging` | Enable state merging. |
| `--enable-summaries` | Use symbolic summaries. |
| `--parallel-solving` | Solve Z3 queries in parallel. |
| `--unconstrained-storage` | Default storage is symbolic; disables on-chain storage loading. |

## Addresses for analysis

| Option | Description |
|--------|-------------|
| `--attacker-address 0x...` | Attacker address used in analysis. |
| `--creator-address 0x...` | Creator address used in analysis. |

<!--
Source references:
- sources/mythril/mythril/interfaces/cli.py (add_analysis_args)
- sources/mythril/README.md
-->
