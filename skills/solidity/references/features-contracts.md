---
name: solidity-contracts
description: Contracts — creation, visibility, modifiers, functions, events, errors, inheritance, interfaces, libraries, using-for.
---

# Contracts (Details)

Contracts hold persistent state and functions. Calling another contract performs an EVM call and switches context (caller state inaccessible). No cron; something must call the contract.

## Creating Contracts

`new ContractName(args)` — creation via contract type. Get address of created contract. Constructor runs once. Use `salt` for CREATE2: `new ContractName{salt: salt}(args)`.

## Visibility and Getters

- **public:** external interface + automatic getter for state variables
- **external:** only external calls (can be more gas-efficient for large arrays)
- **internal:** contract and derived
- **private:** only current contract (still visible on-chain)

## Function Modifiers

Modifiers wrap function body; `_` is replaced by function body. Apply in declaration: `function f() public view onlyOwner { }`. Overloading not allowed; overriding is.

## Functions

- **view:** no state change; **pure:** no state read/write
- **payable:** can receive ether
- **Overloading:** same name, different parameters
- **Free functions:** defined outside contract; implicit internal; inlined into callers

Parameters and return variables declared like locals; return variables can be assigned and used by name.

## Events and Errors

**Events:** Declare with `event Name(type indexed a, type b);`. Indexed params (up to 3) are searchable. Emit with `emit Name(a, b);`.

**Errors:** `error Name(params);` then `revert Name(args);`. Cheaper than string messages; can encode data for front-end.

## Inheritance

`contract B is A, C { }`. Multiple inheritance; linearization (C3). `super.f()` for overridden function. `virtual`/`override` for overrides. Constructors: pass args up with `A(arg)` in constructor list.

## Abstract Contracts and Interfaces

- **Abstract:** at least one function without body; cannot be instantiated
- **Interface:** no storage, no constructor, no non-external functions; all functions external

## Libraries

No state (or only constant/immutable), no inheritance, no ether balance. Deployed once and linked; `using Lib for Type` attaches library functions to type. `library L { function f(Type x) external { } }` — use `x.f()` or `L.f(x)`.

## Using For

`using Lib for Type;` or `using Lib for *;` — attach library functions to type(s) for the rest of the file.

## Transient Storage

EIP-1153: storage that is cleared at end of transaction. Use for same-transaction context (e.g. reentrancy guards) without persistent storage cost.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/contracts.html
- https://docs.soliditylang.org/en/latest/contracts/creating-contracts.html
- https://docs.soliditylang.org/en/latest/contracts/visibility-and-getters.html
- https://docs.soliditylang.org/en/latest/contracts/functions.html
- https://docs.soliditylang.org/en/latest/contracts/events.html
- https://docs.soliditylang.org/en/latest/contracts/errors.html
- https://docs.soliditylang.org/en/latest/contracts/inheritance.html
- https://docs.soliditylang.org/en/latest/contracts/interfaces.html
- https://docs.soliditylang.org/en/latest/contracts/libraries.html
- https://docs.soliditylang.org/en/latest/contracts/using-for.html
-->
