---
name: solidity-source-layout
description: Solidity source file layout — SPDX, pragma, import, comments.
---

# Layout of a Solidity Source File

Source files contain contract definitions, imports, pragma/using-for directives, and top-level struct/enum/function/error/constant definitions.

## SPDX License Identifier

Use machine-readable SPDX identifier at top of file:

```solidity
// SPDX-License-Identifier: MIT
```

Use `UNLICENSED` for proprietary code (no usage allowed). Compiler includes the string in bytecode metadata; it does not validate against SPDX list.

## Pragmas

**Version:** Reject incompatible compiler versions.

```solidity
pragma solidity ^0.5.2;   // >=0.5.2 and <0.6.0
pragma solidity >=0.8.0 <0.9.0;
```

Same syntax as npm semver. Pragma does not change compiler version; it only checks compatibility.

**ABI coder:** Prefer v2 (default since 0.8.0). v1 is deprecated.

```solidity
pragma abicoder v2;
```

**Experimental:** e.g. `pragma experimental SMTChecker;` — SMTChecker is now enabled via compiler options, not pragma.

Pragmas are file-local; importing a file does not apply its pragmas to the importer.

## Import

```solidity
import "filename";                          // pollutes namespace, not recommended
import * as symbolName from "filename";     // symbolName.symbol
import "filename" as symbolName;            // same as above
import {symbol1 as alias, symbol2} from "filename";
```

Import paths are resolved via compiler VFS (Standard JSON or import callback). Command-line compiler maps paths to filesystem; Remix can use HTTP/IPFS/NPM.

## Comments

- Single-line: `//`
- Multi-line: `/* ... */`
- NatSpec: `///` or `/** ... */` above functions/statements (see style guide)

<!--
Source references:
- https://docs.soliditylang.org/en/latest/layout-of-source-files.html
-->
