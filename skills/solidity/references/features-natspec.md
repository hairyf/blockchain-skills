---
name: solidity-natspec
description: NatSpec format — tags, userdoc/devdoc output, inheritance, custom tags.
---

# NatSpec Format

Ethereum Natural Language Specification Format: structured comments for functions, contracts, events, and errors. Use `///` or `/** ... */`. Annotate all public/external interfaces for tooling and end-user messages.

## Tags

| Tag | Context | Purpose |
|-----|---------|---------|
| `@title` | contract, interface, library, struct, enum | Short title |
| `@author` | contract, interface, library, struct, enum | Author name |
| `@notice` | function, state var, event, struct, enum, error | End-user explanation (shown at interaction time) |
| `@dev` | function, state var, event, struct, enum, error | Developer details |
| `@param` | function, event, error | Parameter description (name must follow) |
| `@return` | function, public state var | Return value(s); use multiple for multiple returns |
| `@inheritdoc` | function, enum | Copy missing tags from base (e.g. `@inheritdoc BaseContract`) |
| `@custom:<name>` | anywhere | Application-defined (e.g. analysis tools, SMTChecker) |

If no tags are used, the compiler treats the comment as `@notice`. Custom tags: `@custom:` followed by lowercase letters or hyphens (cannot start with hyphen).

## Example

```solidity
/// @title A simulator for trees
/// @author Larry A. Gardner
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.
contract Tree {
    /// @notice Calculate tree age in years, rounded up, for live trees
    /// @param rings The number of rings from dendrochronological sample
    /// @return Age in years, rounded up for partial years
    /// @return Name of the tree
    function age(uint256 rings) external virtual pure returns (uint256, string memory) {
        return (rings + 1, "tree");
    }
}
```

## Output

Generate machine-readable docs:

```bash
solc --userdoc --devdoc ex1.sol
```

- **User doc** (kind `"user"`): `notice` for contract and methods; for end-user clients.
- **Dev doc** (kind `"dev"`): `title`, `author`, `details`, `params`, `returns`, custom tags; for developers.

Method keys are canonical function/event signatures (as in ABI), not just names.

## Inheritance

Functions without NatSpec inherit base documentation unless: parameter names differ, there are multiple bases, or `@inheritdoc ContractName` specifies the source.

## Dynamic expressions

Client software may substitute parameter values in `@notice` text, e.g. `` `a` `` replaced with the actual argument when presenting to the user.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/natspec-format.html
-->
