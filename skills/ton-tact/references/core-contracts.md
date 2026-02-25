---
name: Tact contracts and traits
description: Contract structure, init, traits, receiver/getter functions, interfaces, and contract parameters.
---

# Contracts and traits

Contracts are the main entry point for TON smart contracts. They hold persistent state, `init`, receivers, getters, and internal functions. Traits provide reusable behavior (like abstract classes) and cannot initialize persistent state themselves.

## Structure

- **`self`** — Built-in identifier for contract/trait fields and methods.
- **Traits** — `contract MyContract with Ownable, Stoppable { ... }`. Multiple traits allowed; contract must implement `init()` or use [contract parameters](#contract-parameters) if traits declare state.
- **Supported interfaces** — `@interface("org.ton.ownable")` before contract/trait; enables off-chain introspection via `supported_interfaces` getter (requires `interfacesGetter: true` in config).
- **Contract parameters** (Tact 1.6+) — Initialize state at deploy time without `init()`:

```tact
contract Counter(val: Int as uint32, owner: Address) {
    receive("inc") { /* ... */ }
}
```

- **Persistent state** — Declare as contract fields; initialize in `init()` or via contract parameters.
- **`init()`** — Constructor; runs once after deployment. Not allowed in traits.
- **Getter functions** — `get fun name(): Type { return self.name; }`; callable off-chain.
- **Receiver functions** — `receive()`, `receive("text")`, `receive(msg: MyMessage)`, `receive(s: String)`, `receive(s: Slice)`; see [Receive messages](/book/receive). Order: empty → text → string catch-all → binary message → slice catch-all.
- **Internal functions** — `fun name() { ... }`; only callable from within the contract/trait.

## Virtual and abstract

In traits, functions and constants can be `virtual` or `abstract` and overridden in contracts. Traits can use `with BaseTrait` (required for traits since 1.6.0) to get `self.reply`, `self.forward`, etc.

## Key points

- Use contract parameters when you don’t need one-time on-chain init logic; it’s cheaper than `init()`.
- Standard traits (e.g. `@stdlib/ownable`) declare interfaces; enable `interfacesGetter` so explorers can show supported interfaces.
- `@interface` is a promise only; it does not enforce implementation.

<!--
Source references:
- https://docs.tact-lang.org/book/contracts
- sources/ton-tact/docs/src/content/docs/book/contracts.mdx
-->
