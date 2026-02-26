---
name: Program Upgrade and Migrate
description: Upgrading on-chain programs with anchor upgrade, upgrade authority, and running migration scripts.
---

# Program Upgrade and Migrate

## Upgrade

Use **anchor upgrade <path/to/program.so> --program-id <program-id>** to replace on-chain program code. The configured wallet must be the **upgrade authority** for the program.

- Build first: anchor build produces target/deploy/<program>.so.
- Same program ID: Upgrading keeps the program address; only the executable code changes.

## Migrate

**anchor migrate** runs the script at migrations/deploy.js, with a provider built from Anchor.toml. Use it for one-off deployment or migration logic.

## Key points

- Upgrade replaces code only; account data layout must remain compatible.
- Use anchor keys sync after deploy/upgrade if program IDs change.
