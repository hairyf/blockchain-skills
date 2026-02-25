---
name: solidity-inheritance
description: Inheritance — virtual/override, super, C3 linearization, base constructors.
---

# Inheritance

Contracts use `contract B is A, C { }`. A single deployed contract contains code from all bases; internal calls to base functions use JUMP. State variable shadowing is an error.

## Virtual and override

- Base functions that can be overridden must be marked `virtual`. Overriding functions use `override`. For multiple bases defining the same function, list them: `override(Base1, Base2)`.
- Visibility: overriding can change `external` to `public` only. Mutability can be made stricter: `nonpayable` → `view` or `pure`, `view` → `pure`. `payable` cannot be changed.
- Private functions cannot be `virtual`. Interface functions are implicitly `virtual`; overriding them does not require `override` (except when defined in multiple bases).
- Public state variables can override external functions if the getter matches; state variables cannot be overridden.

## Super and qualified calls

- `super.f()` calls the next base in the linearized hierarchy (not “parent” in the literal sense). Use when you want the chain of overrides (e.g. Final → Base2 → Base1 → Base).
- `ContractName.f()` calls a specific contract’s implementation. Use when you want to skip part of the chain.

## C3 linearization

Base order matters. List bases from “most base-like” to “most derived”. The linearization fixes a unique order for constructor execution and `super` resolution. Conflicting orders (e.g. `C is A, X` when `A is X`) can make linearization impossible and cause a compile error.

## Constructors

- Single optional constructor per contract with the `constructor` keyword. No overloading.
- Base constructors run in linearized order. Pass arguments in the inheritance list: `is Base(7)` or in the derived constructor: `Base(y * y)` in the modifier position. Must provide args for all bases or mark the contract abstract.
- Abstract contracts can have constructors with internal-only parameters (e.g. storage pointers); concrete derived contracts must supply them.

## Modifier overriding

Modifiers can be `virtual` and `override`; this is deprecated and scheduled for removal.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/contracts.html#inheritance
- https://docs.soliditylang.org/en/latest/contracts/inheritance.html
-->
