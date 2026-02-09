---
name: viem-best-practices
description: Simulate before write, typed error handling, and RPC/security practices in viem.
---

# Best Practices: Contract Writes & Error Handling

## Simulate before write

`writeContract` sends a transaction and does not validate success. Always use **simulateContract** first, then pass the returned `request` to **writeContract** so parameters match and revert reasons are caught before broadcast.

```ts
const { request } = await publicClient.simulateContract({
  account,
  address,
  abi,
  functionName: 'transfer',
  args: [to, amount],
})
await walletClient.writeContract(request)
```

## Typed error handling

Actions export an error type `<ActionName>ErrorType`. Cast in `catch` to narrow and handle by `error.name` (e.g. `InternalRpcError`, `HttpRequestError`, `ContractFunctionRevertedError`).

```ts
import type { GetBlockNumberErrorType } from 'viem'
try {
  const blockNumber = await client.getBlockNumber()
} catch (e) {
  const err = e as GetBlockNumberErrorType
  if (err.name === 'HttpRequestError') {
    // err.status, err.headers
  }
  if (err.name === 'ContractFunctionRevertedError') {
    // err.data (revert info)
  }
}
```

## RPC and security

- Use a dedicated RPC URL with `http(url)`; avoid relying on public fallback to prevent rate limits.
- Enable `batch: { multicall: true }` on Public Client when doing many reads to reduce RPC/compute usage.
- Never commit private keys; use env vars and local accounts only in scripts/tests. In browsers use `custom(provider)` (JSON-RPC account).

## Key points

- Pair **simulateContract** with **writeContract** for every write when possible.
- Use `<Action>ErrorType` in catch and branch on `error.name` for handling.
- Use authenticated RPC and multicall batching in production; keep keys out of source.

<!--
Source references:
- https://viem.sh/docs/contract/writeContract
- https://viem.sh/docs/error-handling
-->
