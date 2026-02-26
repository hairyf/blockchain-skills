---
name: openzeppelin-extending-contracts
description: Inheriting from OpenZeppelin, overrides, calling super, and security when customizing.
---

# Extending Contracts

OpenZeppelin contracts are used via **inheritance** (`contract MyToken is ERC20`). Libraries (e.g. ECDSA, Math) use `using Lib for Type;`, not inheritance. Use overrides to change or extend behavior; be aware of security when customizing.

## Overriding

Replace a parent function by defining one with the same signature. To completely disable a function, override it to revert:

```solidity
function revokeRole(bytes32 role, address account) public override {
    revert("Revocation disabled");
}
```

You cannot remove the function from the ABI; reverting on all calls is the usual approach.

## Extending with super

Call `super.functionName(...)` to invoke the parent’s implementation and then add your logic (extra checks, events, state). Use this when you want to preserve original behavior and add to it:

```solidity
function revokeRole(bytes32 role, address account) public override {
    require(role != DEFAULT_ADMIN_ROLE, "Cannot revoke default admin");
    super.revokeRole(role, account);
}
```

`super` runs the immediate parent’s version; with multiple inheritance, Solidity’s C3 linearization determines the order.

## Security

- **Custom overrides**, especially of hooks or internal functions, can break assumptions and introduce vulnerabilities. Review the base contract source when overriding.
- **Internal usage** of functions may change between library versions; do not rely on undocumented internal call patterns. Re-validate overrides when upgrading OpenZeppelin.
- Prefer official extensions (e.g. `AccessControlDefaultAdminRules`) over ad-hoc overrides when they match your needs; they are designed and tested with the base contracts.

## Key points

- Use inheritance for contracts; use `using for` for libraries.
- Override to restrict or extend; use `super` to keep and extend behavior.
- Document and audit overrides; upgrade carefully and re-check against new base behavior.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/extending-contracts.adoc
-->
