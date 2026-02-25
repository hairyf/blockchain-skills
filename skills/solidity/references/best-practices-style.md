---
name: solidity-style
description: Style and layout — file order, contract element order, modifier order, naming.
---

# Style Guide (Concise)

Consistency matters more than any single rule. Prefer project conventions when they conflict with this guide.

## File layout order

1. Pragma
2. Imports
3. Events
4. Errors
5. Interfaces
6. Libraries
7. Contracts

## Contract element order

Inside contract/library/interface:

1. Type declarations (structs, enums)
2. State variables
3. Events
4. Errors
5. Modifiers
6. Functions

Function order by visibility: constructor, receive, fallback, external, public, internal, private. Within each group, put view/pure last.

## Modifier order on functions

1. Visibility (`public`, `external`, etc.)
2. Mutability (`view`, `pure`)
3. `virtual`
4. `override` / `override(Base1, Base2)`
5. Custom modifiers

## Naming

- **Contracts, libraries, interfaces:** CapWords (e.g. `SimpleToken`, `Owned`). Filename should match the main contract.
- **Structs, enums, events:** CapWords.
- **Functions, parameters, local/state variables:** mixedCase (e.g. `getBalance`, `initialSupply`).
- **Constants:** UPPER_CASE_WITH_UNDERSCORES.
- **Modifiers:** mixedCase.
- Avoid single letters `l`, `O`, `I` (confusable with 1/0).
- Leading underscore for internal/private (e.g. `_internalHelper`) to distinguish from public API.

## Other

- 4 spaces indent; spaces over tabs. Two blank lines between top-level declarations; one between functions.
- Max line length ~120; wrap with one argument per line, closing `);` on its own line.
- Imports at top of file. Braces: opening on same line as declaration, closing on own line at same indent.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/style-guide.html
-->
