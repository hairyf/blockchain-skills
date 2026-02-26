---
name: Security and Common Exploits
description: Sealevel attack patterns and Anchor’s safety mechanisms—when to use constraints and unchecked accounts.
---

# Security

Anchor’s account types and constraints reduce common Solana/Sealevel mistakes, but mainnet code should explicitly understand each constraint and the risks of bypassing them.

## Reference: Sealevel attacks

The [coral-xyz/sealevel-attacks](https://github.com/coral-xyz/sealevel-attacks) repo documents common attack patterns with three variants each:

- **insecure** – Flawed code that may be exploitable.
- **secure** – Fixed version.
- **recommended** – Idiomatic Anchor fix.

Use these to validate that your program does not rely on insecure patterns (e.g. missing ownership checks, signer checks, or PDA validation).

## Practices

- Prefer **account types** (`Account<T>`, `Signer`, `Program`) and **constraints** (`init`, `mut`, `seeds`/`bump`, `has_one`, `address`, `owner`) over manual checks so the framework enforces invariants.
- Use **`UncheckedAccount`** only when necessary; add a `// CHECK:` comment and validate owner, key, and data in code or with `constraint`.
- Ensure **PDA derivation** (seeds + program) is strict and that no user input can change the program ID or seed set used for sensitive PDAs.
- For **CPI**: validate all accounts and data passed to other programs; use `with_signer` correctly for PDA signers.
- Run and extend **tests** and consider fuzzing or audit for high-value programs.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/references/security-exploits.mdx)
- https://github.com/coral-xyz/sealevel-attacks
-->
