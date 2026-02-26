---
name: declare_program! (Dependency-Free Composability)
description: Generate CPI and client modules from an IDL with declare_program! for on-chain and off-chain use.
---

# declare_program!

The `declare_program!(name)` macro generates Rust modules from an IDL file so you can call another Anchor program without depending on its crate. The IDL must live at `idls/<name>.json` (e.g. `idls/example.json` for `declare_program!(example)`).

## Generated modules

- **program** – Program ID and program type (e.g. `Example`).
- **cpi** – Helper functions to perform CPIs (e.g. `cpi::initialize(cpi_ctx)`, `cpi::increment(cpi_ctx)`).
- **accounts** – Account structs for CPI (e.g. `Initialize`, `Increment`) and state types (e.g. `Counter`).
- **client** – For off-chain: `accounts::Initialize`, `args::Initialize`, etc., to build instructions.
- **account** – Account data types.
- **constants**, **events**, **types**, **errors** – As in the IDL.

## On-chain CPI

Place the target program’s IDL in `idls/<name>.json`. Then:

```rust
declare_program!(example);
use example::{
    accounts::Counter,
    cpi::{ self, accounts::{Increment, Initialize} },
    program::Example,
};

// In instruction: build CpiContext with accounts from the generated structs, then:
cpi::initialize(cpi_ctx)?;
cpi::increment(cpi_ctx)?;
```

Use `Account<'info, Counter>` and `Program<'info, Example>` in your Accounts structs so types match the callee.

## Off-chain client (Rust)

Use the same `idls/<name>.json` and:

```rust
declare_program!(example);
use example::{ accounts::Counter, client::accounts, client::args };

// program = provider.program(example::ID)?;
let init_ix = program.request()
    .accounts(accounts::Initialize { counter, payer, system_program })
    .args(args::Initialize)
    .instructions()?.remove(0);
// Add to transaction and send; then fetch with program.account::<Counter>(pubkey).await?;
```

Build instructions with `program.request().accounts(...).args(...).instructions()?`, then send with your client/signer.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/features/declare-program.mdx)
-->
