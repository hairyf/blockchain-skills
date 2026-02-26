---
name: initOf and contract deployment in Tact
description: initOf, contractAddress, StateInit, and deploying contracts via send/deploy.
---

# initOf and deployment

To deploy a contract you need its **initial code and data** (StateInit). Tact provides **`initOf`** to compute that from a contract type and constructor arguments.

## initOf and contractAddress

```tact
let init: StateInit = initOf SecondContract(arg1, arg2);
let address: Address = contractAddress(init);
```

- **`initOf ContractName(args)`** — Returns `StateInit` (`.code` and `.data` cells) for the contract. Use when the contract has an `init()` or contract parameters; args match that signature.
- **`contractAddress(init)`** — Derives the contract address from a StateInit (deterministic).

## Deploying via send()

```tact
send(SendParameters {
    to: address,
    value: ton("1"),
    mode: SendIgnoreErrors,
    code: init.code,
    data: init.data,
    body: "Hello".asComment(),  // optional
});
```

## Deploying via deploy() (Tact 1.6+)

Cheaper for deployments; uses `DeployParameters` (no separate `to`; address comes from `init`):

```tact
deploy(DeployParameters {
    init: initOf SomeContract(),
    mode: SendIgnoreErrors,
    value: ton("1"),
});
```

## Key points

- Contract parameters (e.g. `contract C(x: Int)`) set initial state at deploy; no `init()` needed and deployment is cheaper.
- Use `initOf` for both lazy init and direct deploy flows; `contractAddress(init)` when you need the address before sending.
- For factory patterns, combine `initOf` with custom code/data or use stdlib `@stdlib/deploy` (Deployable / FactoryDeployable).

<!--
Source references:
- https://docs.tact-lang.org/book/send
- https://docs.tact-lang.org/book/deploy
- https://docs.tact-lang.org/book/expressions (initOf)
- sources/ton-tact/docs/src/content/docs/ref/core-send.mdx
-->
