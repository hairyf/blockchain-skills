---
name: subsquid-features-evm-typegen
description: squid-evm-typegen — generate EVM decoding and state-query facades from ABIs.
---

# EVM Typegen (squid-evm-typegen)

`squid-evm-typegen` generates TypeScript facades for decoding EVM logs/transactions and for `eth_call`-style state queries. Use in squids that index EVM data.

## Input: ABI

- **Local JSON:** `npx squid-evm-typegen src/abi abi/erc20.json` or `./abi/*.json`.
- **Etherscan (API key):** `npx squid-evm-typegen --etherscan-api-key <key> src/abi 0xContractAddress`.
- **URL:** `npx squid-evm-typegen src/abi https://example.com/abi.json`.

Use fragment suffix to set output basename: `0xAddress#my-contract-name`. Add `--multicall` to generate Multicall facade for batched state calls. Generated code depends on `@subsquid/evm-abi`.

## Output and usage

Generated modules expose:
- **Event decoding** — e.g. `usdcAbi.events.Transfer.topic`, `usdcAbi.events.Transfer.decode(log)`.
- **Function sighashes and call decoding** — for transactions and direct RPC calls.
- **State query helpers** — for `eth_call` batched via Multicall when using `--multicall`.

In the batch handler, filter by topic then decode:
```ts
if (log.topics[0] === usdcAbi.events.Transfer.topic) {
  const { from, to, value } = usdcAbi.events.Transfer.decode(log)
}
```

Use state queries when you need contract state at a block; batch them (e.g. via generated Multicall) instead of many single RPC calls.

<!--
Source references:
- https://docs.subsquid.io/sdk/resources/tools/typegen/generation
- https://docs.subsquid.io/sdk/resources/tools/typegen/state-queries
- https://docs.subsquid.io/sdk/resources/tools/typegen/decoding
-->
