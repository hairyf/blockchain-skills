---
name: openzeppelin-extending-contracts
description: Extending OpenZeppelin via inheritance, overrides, super, and security considerations.
---

# Extending Contracts

OpenZeppelin contracts are used by **inheritance** (`contract MyToken is ERC20`). Libraries (e.g. in Utils) are used with **`using for`**, not inheritance.

## Overriding

Override parent functions to change behavior. Example: disable `revokeRole` by overriding and reverting:

```solidity
function revokeRole(bytes32 role, address account) public override {
    revert("Revocation disabled");
}
```

You cannot remove a function from the ABI; reverting is the way to effectively disable it.

## Extending with super

Call the parent implementation to add behavior instead of replacing it:

```solidity
function revokeRole(bytes32 role, address account) public override {
    require(role != DEFAULT_ADMIN_ROLE, "Cannot revoke admin");
    super.revokeRole(role, account);
}
```

Use `super` when you need the original logic plus extra checks, events, or state changes. Follow Solidity’s override rules (virtual/override).

## Security

- Overrides, especially of **hooks** (e.g. `_beforeTokenTransfer`, `_authorizeUpgrade`), can break invariants and introduce bugs. Review against the parent source.
- Internal usage and call graphs are not stable across versions; re-check overrides when upgrading OpenZeppelin.
- Document assumptions when customizing; avoid relying on undocumented internal behavior.

## Key Points

- Prefer composition and small overrides; avoid deep or broad changes to security-critical paths.
- Use `super` for additive behavior; test overrides and re-validate on library upgrades.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/extending-contracts.adoc
- Solidity inheritance and overriding
-->
