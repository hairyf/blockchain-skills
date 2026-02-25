---
name: foundry-cast
description: Cast CLI — call, send, ABI encode/decode, chain queries.
---

# Cast

Cast is the Swiss-army CLI for talking to the EVM: read contract state, send transactions, and query chain data. Use it in scripts or when debugging.

## Read (call)

```bash
cast call <CONTRACT> <SIG> [ARGS...] --rpc-url <RPC>
# Example: view function
cast call 0x... "balanceOf(address)(uint256)" 0x... --rpc-url $RPC
```

Use for `view`/`pure` calls; no transaction is sent.

## Send transaction

```bash
cast send <CONTRACT> <SIG> [ARGS...] --rpc-url <RPC> --private-key <KEY>
# Or from env
cast send 0x... "transfer(address,uint256)" 0x... 1e18 --private-key $PK
```

Signs and broadcasts a transaction. Use `--value` for ETH, `--gas-limit` if needed.

## ABI encoding / decoding

```bash
cast abi-encode "f(address,uint256)" 0x... 100
cast abi-decode "f(address,uint256)" <HEX>
cast calldata "transfer(address,uint256)" 0x... 1e18
```

Useful for building calldata or inspecting revert data.

## Chain and account queries

```bash
cast block-number --rpc-url $RPC
cast balance <ADDRESS> --rpc-url $RPC
cast nonce <ADDRESS> --rpc-url $RPC
cast gas-price --rpc-url $RPC
```

## Key points

- Always pass `--rpc-url` (or set `ETH_RPC_URL`) for chain state.
- For private key, use `--private-key` or `CAST_PRIVATE_KEY`; avoid committing keys.
- Use `cast call` for reads; `cast send` for state-changing txs.
- ABI helpers use Solidity-style function signatures.

<!--
Source references:
- https://book.getfoundry.sh/reference/cast/
- https://getfoundry.sh/cast/
-->
