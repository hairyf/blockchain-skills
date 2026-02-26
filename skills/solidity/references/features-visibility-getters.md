---
name: solidity-visibility-getters
description: Visibility — external/public/internal/private; getter generation for public state.
---

# Visibility and Getters

## Function visibility

- **external:** Part of contract interface; callable via message. Cannot be called internally as `f()` — use `this.f()`. Can be more gas-efficient for large calldata (arguments not copied to memory).
- **public:** Callable internally and externally. Generates an external entry in the ABI.
- **internal:** Contract and derived contracts only; not in ABI. Can take internal types (e.g. storage refs, mappings).
- **private:** Like internal but not visible in derived contracts.

State variables: **public** (getter generated), **internal** (default), **private** (not in derived). Private/internal only hide from other contracts; data is still on-chain.

## Getter functions

For **public** state variables the compiler generates getters:

- Name = variable name, no arguments (except for mappings/arrays below). External visibility.
- Internally, `x` reads storage; `this.x()` calls the getter.
- **Arrays:** getter takes index and returns one element (e.g. `myArray(i)`). No getter that returns the whole array; add a function if needed.
- **Mappings:** getter takes key(s) and returns value. Nested mappings: one argument per key.
- **Structs in mappings:** getter returns only types that can be selected (value types, `bytes`, etc.); mappings and dynamic arrays inside the struct are omitted from the getter signature.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/contracts.html#visibility-and-getters
- https://docs.soliditylang.org/en/latest/contracts/visibility-and-getters.html
-->
