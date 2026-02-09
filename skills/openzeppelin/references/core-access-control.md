---
name: openzeppelin-access-control
description: Ownable, AccessControl (RBAC), AccessManager, and TimelockController usage.
---

# Access Control

Control who can perform actions (mint, upgrade, etc.) using Ownable, role-based access, or a central AccessManager.

## Ownable

- Single `owner`; use `onlyOwner` modifier. Set at deployment via `initialOwner`.
- `transferOwnership(newOwner)` and `renounceOwnership()`.
- Prefer `Ownable2Step` when transferring ownership: new owner must call `acceptOwnership()`.
- Owner can be a contract (e.g. Gnosis Safe, DAO).

## AccessControl (RBAC)

- Define roles as `bytes32` (e.g. `keccak256("MINTER_ROLE")`). Use `onlyRole(role)` modifier.
- Grant/revoke via `grantRole` / `revokeRole`; only the role’s **admin** can do this. `DEFAULT_ADMIN_ROLE` is the default admin for all roles.
- Use `_grantRole` in constructor for initial setup; use `grantRole`/`revokeRole` for dynamic assignment.
- For enumerating role members on-chain, use `AccessControlEnumerable` (getRoleMemberCount, getRoleMember, getRoleMembers).

## AccessManager

- Central contract storing permissions for many contracts. Targets are (contract, function selector); access is limited to one role per target.
- Managed contracts inherit `AccessManaged` and use the `restricted` modifier; set `initialAuthority` to the AccessManager address.
- Roles are `uint64` (0 = ADMIN_ROLE). Use `grantRole(role, account, executionDelay)`, `setTargetFunctionRole(target, selectors, role)`.
- Supports grant delay and execution delay; delayed operations must be `schedule`d then executed. Use `setTargetClosed(target, true)` for incident response.

## TimelockController

- Proxy governed by proposers and executors; operations scheduled through it are subject to a minimum delay.
- Use as owner/admin of contracts to enforce a delay on maintenance (e.g. upgrades). Roles: `PROPOSER_ROLE`, `EXECUTOR_ROLE`, `CANCELLER_ROLE`, `DEFAULT_ADMIN_ROLE`.
- `getMinDelay()` / `updateDelay()` (only callable by the timelock itself).

## Key Points

- Prefer RBAC over single owner when you need granular permissions (minter vs burner vs admin).
- Use AccessControlDefaultAdminRules for safer DEFAULT_ADMIN_ROLE (single account, 2-step transfer with delay).
- For multi-contract systems, AccessManager centralizes permissions and supports delays and emergency close.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/access-control.adoc
-->
