---
name: Closing Accounts
description: Closing program accounts with the close constraint and sending lamports to a target.
---

# Closing Accounts

Use #[account(close = target)] to close an account: lamports go to target, account is removed.

## Syntax

close = target - Account that receives the closed account lamports (often signer/payer).

## Key points

- Only close to an account you intend (e.g. signer). Avoid arbitrary user-passed targets.
- Combine with has_one = authority so only authorized users can close.
