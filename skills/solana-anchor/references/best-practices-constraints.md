---
name: Constraints and Validation
description: When to use which constraints and how to avoid common pitfalls.
---

# Constraints and Validation

Prefer account types (Account, Signer, Program) and constraints over manual checks so Anchor enforces invariants before the handler runs.

## Practices

- Use init for new accounts; init_if_needed only when needed (feature-gated) and with the same care as init.
- Use seeds and bump for PDAs so derivation is consistent and bump is validated.
- Use has_one and address to tie accounts to expected keys; avoid accepting arbitrary account keys without constraint.
- Use UncheckedAccount only when necessary; add a CHECK comment and validate owner, key, and data in code or via constraint.
- Close only to an intended target (e.g. signer); do not close to user-supplied accounts without validation.

## Key points

- Constraints run before the handler; fail fast with clear errors. Custom errors: use constraint = expr @ MyError.
- Order constraints so dependencies (e.g. payer, space) are available where needed.
