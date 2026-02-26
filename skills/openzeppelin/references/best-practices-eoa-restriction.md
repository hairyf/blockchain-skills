---
name: openzeppelin-eoa-restriction
description: Why not to restrict functions to EOAs only; composability and security.
---

# Restricting to EOAs Only

Do **not** restrict functions to “EOAs only” (e.g. by requiring `msg.sender` to have no code). This pattern is unsafe and breaks composability.

## Why it’s discouraged

- **Composability**: Smart wallets (e.g. Gnosis Safe), multisigs, and other contracts cannot call the function.
- **No real security**: The check can be bypassed by calling from a contract’s constructor (no code at the address yet) or from an address that will have a contract deployed later.
- **Ambiguity of “has code”**: `address.code.length > 0` only means the address currently has code. The opposite does **not** mean the address is an EOA. Counterexamples:
  - Contract currently being constructed (no code yet at that address).
  - Address where a contract will be deployed later.
  - Address where a contract used to be (destroyed by `SELFDESTRUCT`; code is cleared at end of transaction).
  - Same transaction: address is still considered to have code until the transaction ends, even if `SELFDESTRUCT` is in the same tx.

## What to do instead

- Allow any caller and enforce authorization with access control (roles, ownership, or capability checks).
- If you need “only a human” or “only one key,” use account abstraction (e.g. ERC-4337) or signature checks bound to a specific account, not “is EOA.”

## Key points

- Restricting to EOAs is brittle and bypassable; prefer role-based or signature-based checks.
- Use OpenZeppelin’s access control and signature utilities instead of `extcodesize`/code-length checks.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/faq.adoc
-->
