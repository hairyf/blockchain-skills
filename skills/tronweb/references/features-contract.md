---
name: tronweb-contract
description: Contract module — ABI binding, call/send, decodeInput, new/at.
---

# Contract Module

Create contract instances from ABI (and optional address), call view methods, send transactions, decode input, deploy, or attach to an existing contract.

## Create instance

```typescript
const contract = tronWeb.contract(abi, address?);
// address omitted → undeployed instance for contract.new()
```

## Call and send

```typescript
// View (constant) call
const result = await contract.methods.methodName(...args).call(options?);
// options: feeLimit, callValue, tokenValue, tokenId, from

// State-changing send
const tx = await contract.methods.methodName(...args).send(options?, privateKey?);
// options: from, feeLimit, callValue, shouldPollResponse, pollTimes, rawResponse, keepTxID
```

Methods are also callable by function selector or full signature. Overloaded functions are supported.

## Decode input

```typescript
const { name, params } = contract.decodeInput(data);
// data = 8-char selector + hex-encoded params
```

## Deploy and attach

```typescript
// Deploy: options must include abi, bytecode, and constructor parameters
const newInstance = await contract.new(options, privateKey?);
// Returns new contract instance with ABI from options (not from chain).

await contract.at(contractAddress);
// Fetches contract from chain, sets address/bytecode/abi, returns this.
```

## Key Points

- For TypeScript inference, pass ABI with `as const` or inline; then `contract.methods` and call/send return types are inferred.
- `contract.new()` in v6 returns a new instance using the ABI from options; it no longer mutates the current instance or relies on chain ABI for the returned instance.
- Export types: `GetEventResultOptions`, `EventResponse` from the package for event result typing.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/lib/contract/index.ts, method.ts, tronweb.ts)
- https://tronweb.network/docu/docs/intro/
-->
