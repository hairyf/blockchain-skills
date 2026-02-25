---
name: Remaining Accounts
description: Using remaining_accounts in Context for variadic instructions and CPI.
---

# Remaining Accounts

ctx.remaining_accounts is a slice of AccountInfo for accounts not listed in the Accounts struct. Use for variadic instructions (e.g. multiple mints or token accounts) or when passing extra accounts into a CPI.

## Usage

- Iterate and validate: Check owner, key, or data for each account before use.
- Pass to CPI: CpiContext can include remaining_accounts (ToAccountMetas); build the account metas and invoke.
- Security: Do not trust remaining_accounts without validation; treat like user input.

## Key points

- Validation runs only on the Accounts struct; remaining_accounts are unchecked.
- Use for optional or variable-length account sets; keep fixed accounts in the struct.
