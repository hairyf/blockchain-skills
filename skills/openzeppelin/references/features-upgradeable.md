---
name: openzeppelin-upgradeable
description: Upgradeable variant, initializers, and namespaced storage.
---

# Using with Upgrades

For upgradeable deployments (e.g. OpenZeppelin Upgrades Plugins), use `@openzeppelin/contracts-upgradeable` (peer: `@openzeppelin/contracts`). Same structure as main package with `Upgradeable` suffix and initializers instead of constructors.

## Usage

```solidity
import { ERC721Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract MyCollectible is ERC721Upgradeable {
    function initialize() initializer public {
        __ERC721_init("MyCollectible", "MCO");
    }
}
```

- No constructors; use internal `__{ContractName}_init` and expose a public `initialize()` with `initializer` modifier so it runs once.
- With multiple inheritance, avoid double-init: use `__{ContractName}_init_unchained` only when you have already run the full init for that contract elsewhere (manual and error-prone; prefer single linear init where possible).

## Namespaced Storage (ERC-7201)

- Upgradeable contracts use namespaced storage (`@custom:storage-location erc7201:<NAMESPACE_ID>`) so adding state or reordering inheritance does not shift storage and break upgrades.
- Do not add non-namespaced state in the middle of inheritance; use the same pattern when extending.

## Key Points

- Always call parent initializers in your public initializer; order matters for linearization.
- Storage layout must remain compatible across upgrades; use Upgrades Plugins/CLI to check.
- Interfaces and libraries are imported from main `@openzeppelin/contracts`, not the upgradeable package.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/upgradeable.adoc
-->
