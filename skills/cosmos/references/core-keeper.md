---
name: cosmos-keeper
description: Keeper type, store access, inter-module access, and method patterns.
---

# Keepers

A **keeper** is the gatekeeper of a module's store(s). It holds the store key(s) and defines the only way to read/write that subset of state. This supports the object-capabilities model: access is by holding a reference to the keeper, not by permission lists.

## Type Definition

Typically in `x/{module}/keeper/keeper.go`:

```go
type Keeper struct {
    // External keepers (interfaces from expected_keepers.go)
    // storeKey(s)
    // codec (BinaryCodec/JSONCodec/Codec)
    // authority (module or account that can change params)
}
```

- **External keepers**: Other modules' keepers required by this module, declared as interfaces in `expected_keepers.go`.
- **storeKey**: Grants access to the module's KVStore(s) in the multistore. Never expose to other modules.
- **codec**: For marshalling/unmarshalling state (stores persist `[]byte`).
- **authority**: Account or module allowed to change module parameters (replaces deprecated params module).

`NewKeeper` is called from the app constructor; pass store keys, codec, and any required keeper references in dependency order.

## Methods

Keepers expose getters and setters. Validation should be done in the Msg server; keeper methods stay simple.

- **Getter**: Get store from `ctx` with `storeKey`, optionally use `prefix.Store` for a key subset, `Get(key)`, unmarshal with codec, return.
- **Setter**: Get store, marshal value, `Set(key, value)`.
- Use `Iterator(start, end)` for range iteration (e.g. accounts, balances).

Only the keeper should hold the key to its store(s). To let another module access your state, pass it a reference to your keeper so it uses your exported methods.

<!--
Source references:
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/build/building-modules/06-keeper.md
-->
