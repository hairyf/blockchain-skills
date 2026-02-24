---
name: cairo-starknet-contracts
description: Starknet contracts—storage, entry points, events, ABI, and calling other contracts.
---

# Starknet Contracts

Starknet contracts are Cairo modules annotated with `#[starknet::contract]`. They have persistent storage, entry points (external, constructor, L1 handler), and can emit events and call other contracts.

## Usage

**Contract and storage:** Define a `Storage` struct; use `::read()` and `::write(value)` for simple storage, `::read(key)` / `::write(key, value)` for maps. Prefer `starknet::storage::Map` over deprecated `LegacyMap`.

```cairo
#[starknet::contract]
mod my_contract {
    struct Storage {
        x: felt252,
        m: LegacyMap::<felt252, u128>,
    }

    #[external(v0)]
    fn foo(value: felt252) -> felt252 {
        let y = x::read() + value;
        m::write(y, 3_u128);
        y
    }
}
```

**Entry points:** `#[external(v0)]` for public/contract calls (first parameter `ref self: ContractState` or `self: @ContractState` for views); `#[constructor]` (single, must be named `constructor`); `#[l1_handler]` for L1 messages. Unannotated functions are private.

**Events:** Define `#[event]` enum with variants deriving `starknet::Event`; emit with `self.emit(Event::Variant(...))`. Use `#[flat]` to merge nested event enums.

**Calling other contracts:** Use the generated interface and dispatchers. Contract dispatcher runs in callee context; library dispatcher runs in caller context. Use `IMyContractDispatcher { contract_address }` or `IMyContractLibraryDispatcher { class_hash }`. For low-level control use `starknet::syscalls::call_contract_syscall` (selector = starknet_keccak of function name).

## Key Points

- Storage types must implement `starknet::Store`; map keys must implement `Hash`.
- Deployment default-initializes storage (zeroes). Constructor is optional.
- ABI describes entry points, types, and events; use `<contract>::__abi` for the generated trait.

<!--
Source references:
- https://github.com/starkware-libs/cairo
- sources/cairo/docs/reference/src/components/cairo/modules/language_constructs/pages/contracts.adoc
-->
