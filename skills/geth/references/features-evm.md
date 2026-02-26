---
name: geth-evm
description: EVM tool - stateless t8n/t9n/b11r and bytecode execution for testing and debugging.
---

# EVM Tool

The evm binary provides stateless state-transition and block-assembly utilities plus interactive bytecode execution.

## Subcommands

- t8n - Stateless state transition: alloc + env + txs to post-state, receipts, trace.
- t9n - Transaction validation (intrinsic gas, fee semantics, tx type vs fork).
- b11r - Block builder: header + txs + ommers to sealed block RLP.
- run - Run bytecode (e.g. evm --code 60ff60ff --debug run).

## t8n

evm t8n --input.alloc=alloc.json --input.env=env.json --input.txs=txs.json --state.fork=Berlin --output.result=stdout

Inputs: alloc (pre-state), env (block context), txs (JSON or RLP). Outputs: result, alloc, body. Use --state.fork (e.g. London, Shanghai) and optional --trace.*

## t9n

evm t9n --state.fork London --input.txs signed_txs.rlp

## b11r

evm b11r --input.header header.json --input.txs txs.rlp --seal.ethash --output.block block.json

## Key Points

- t8n exit codes: 2 (EVM), 3 (invalid fork), 4 (BLOCKHASH missing), 10 (JSON), 11 (IO). Test data in cmd/evm/testdata/.

<!-- Source: https://github.com/ethereum/go-ethereum/tree/master/cmd/evm (README.md), https://geth.ethereum.org/docs/ -->
