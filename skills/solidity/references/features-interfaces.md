---
name: solidity-interfaces
description: Interfaces — restrictions, inheritance, enum/struct, ABI alignment.
---

# Interfaces

Interfaces are declared with the `interface` keyword. They cannot have state variables, constructors, or implemented functions. All declared functions must be `external`. They cannot declare modifiers. They can inherit only from other interfaces.

## Restrictions

- No state variables, no constructor, no function bodies.
- No modifiers. All functions are implicitly `virtual`.
- Inheritance only from interfaces (not contracts). Multiple interface inheritance is allowed.

Interfaces are designed to align with the Contract ABI: conversion between ABI and interface should be lossless.

## Types inside interfaces

Interfaces can define structs and enums. Other contracts access them as `InterfaceName.StructName` or `InterfaceName.EnumName`.

## Overriding interface functions

When a contract implements an interface, overriding functions do not require the `override` keyword unless the function comes from multiple bases. To allow further overrides, mark the implementing function `virtual`.

## Example

```solidity
interface Token {
    enum TokenType { Fungible, NonFungible }
    struct Coin { string obverse; string reverse; }
    function transfer(address recipient, uint amount) external;
}

contract MyToken is Token {
    function transfer(address recipient, uint amount) external override {
        // ...
    }
}
```

<!--
Source references:
- https://docs.soliditylang.org/en/latest/contracts.html#interfaces
- https://docs.soliditylang.org/en/latest/contracts/interfaces.html
-->
