---
name: solidity-contract-structure
description: Contract structure — state variables, functions, modifiers, events, errors, structs, enums.
---

# Structure of a Contract

Contracts are like classes: state variables (storage or transient), functions, modifiers, events, errors, structs, enums. Contracts can inherit from others. Special kinds: libraries and interfaces.

## State Variables

Stored in contract storage or transient storage (cleaned at end of transaction). See data locations for types.

```solidity
contract SimpleStorage {
    uint storedData; // state variable
}
```

## Functions

Executable units; can be inside contracts or free (outside). Free functions are implicitly internal; code is inlined into callers.

```solidity
contract SimpleAuction {
    function bid() public payable { }
}
function helper(uint x) pure returns (uint) { return x * 2; }
```

## Function Modifiers

Amend function semantics declaratively. No overloading (same name, different params). Can be overridden.

```solidity
modifier onlySeller() {
    require(msg.sender == seller, "Only seller can call this.");
    _;
}
function abort() public view onlySeller { }
```

## Events

EVM logging interface. Emit from within contracts.

```solidity
event HighestBidIncreased(address bidder, uint amount);
emit HighestBidIncreased(msg.sender, msg.value);
```

## Errors

Custom errors with names and data; cheaper than string reverts. Use in revert statements.

```solidity
error NotEnoughFunds(uint requested, uint available);
revert NotEnoughFunds(amount, balance);
```

## Structs and Enums

Structs group variables; enums define a finite set of constants.

```solidity
struct Voter { uint weight; bool voted; address delegate; uint vote; }
enum State { Created, Locked, Inactive }
```

<!--
Source references:
- https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
- https://docs.soliditylang.org/en/latest/contracts.html
-->
