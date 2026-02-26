---
name: Rust Client
description: Using anchor-client with declare_program! to build instructions, send transactions, and fetch accounts.
---

# Rust Client

The `anchor-client` crate is the Rust client for Anchor programs. Use `declare_program!` with the program's IDL to generate typed modules for instructions and accounts; then use `Client` and the generated program to build and send transactions and fetch accounts.

## Setup

- Place the program IDL in an `idls/` folder (e.g. `idls/example.json`). `declare_program!(program_name)` looks up the IDL there.
- Dependencies: `anchor-client` (with `async` feature for async APIs), `anchor-lang` (for `declare_program!`).

```toml
[dependencies]
anchor-client = { version = "0.32.1", features = ["async"] }
anchor-lang = "0.32.1"
```

## Creating the client

```rust
use anchor_client::{
    solana_client::rpc_client::RpcClient,
    solana_sdk::commitment_config::CommitmentConfig,
    Client, Cluster,
};
use std::rc::Rc;

let connection = RpcClient::new_with_commitment(
    "http://127.0.0.1:8899",
    CommitmentConfig::confirmed(),
);

let payer = Keypair::new();
let provider = Client::new_with_options(
    Cluster::Localnet,
    Rc::new(payer),
    CommitmentConfig::confirmed(),
);

declare_program!(example);
let program = provider.program(example::ID)?;
```

`Cluster` can be `Localnet`, `Devnet`, `Mainnet`, or a custom URL.

## Building and sending instructions

Use `program.request()` to build a request, then set accounts and args from the generated `accounts::*` and `args::*` types. Call `.instructions()?` to get instruction(s), or chain `.instruction(ix)` and then `.signer(&keypair).send().await?` to send.

```rust
use example::{accounts, args};

let init_ix = program
    .request()
    .accounts(accounts::Initialize {
        counter: counter.pubkey(),
        payer: program.payer(),
        system_program: system_program::ID,
    })
    .args(args::Initialize)
    .instructions()?
    .remove(0);

let inc_ix = program
    .request()
    .accounts(accounts::Increment { counter: counter.pubkey() })
    .args(args::Increment)
    .instructions()?
    .remove(0);

let sig = program
    .request()
    .instruction(init_ix)
    .instruction(inc_ix)
    .signer(&counter)
    .send()
    .await?;
```

Add multiple signers with `.signer(&kp)` per signer. The provider's payer is used for fee and as signer unless overridden.

## Fetching accounts

Use `program.account::<AccountType>(address).await?` to deserialize an account by type (discriminator and layout must match the IDL).

```rust
let counter_account: Counter = program.account::<Counter>(counter.pubkey()).await?;
```

Account types (e.g. `Counter`) come from the `declare_program!`-generated module.

## Key points

- IDL must live under `idls/<name>.json` for `declare_program!(name)`.
- `program.request()` is the builder; `.accounts()`, `.args()`, then `.instructions()` or `.instruction(ix)` and `.signer()`/`.send()`.
- Use generated `accounts::*` and `args::*` for type-safe account and argument wiring.
- For async: use `Client::new_with_options` and `.send().await`; ensure `tokio` runtime (e.g. `#[tokio::main]`).

<!--
Source references:
- https://github.com/solana-foundation/anchor/tree/master/docs/content/docs/clients/rust.mdx
-->
