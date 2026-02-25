---
name: tronweb-errors-typing
description: Error handling and TypeScript contract typing in TronWeb.
---

# Errors and Typing

## Errors

TronWeb v6+ throws `Error` instances only. Always use `e.message` to read error text (e.g. in catch blocks or logs). Do not rely on thrown strings.

```typescript
try {
  await tronWeb.trx.sendRawTransaction(signed);
} catch (e) {
  console.error((e as Error).message);
}
```

## Contract TypeScript inference

For accurate method types from ABI, pass the ABI so TypeScript can infer it:

```typescript
const abi = [/* ... */] as const;
const contract = tronWeb.contract(abi, address);
const result = await contract.methods.balanceOf(addr).call();
// result typed from ABI
```

Or pass the ABI object directly into `tronWeb.contract()`. Avoid passing a loosely typed `any` ABI if you want inference.

## Key Points

- Parameter order and types for Trx and TransactionBuilder are strictly validated; wrong types throw.
- `contract.new()` returns a new contract instance using the ABI from the options parameter, not the chain-stored ABI.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (CHANGELOG 6.0.0, 6.0.4)
- https://tronweb.network/docu/docs/intro/
-->
