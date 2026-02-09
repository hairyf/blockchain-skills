---
name: solana-clients-rust
description: Rust SDK for Solana — solana-sdk, solana-client, keypair, transactions, and RPC usage.
---

# Solana — Rust Client

## Crates

- **solana_sdk**: Keypair, Pubkey, Transaction, Instruction, signature::Signer.
- **solana_client**: RpcClient (sync), nonblocking::rpc_client::RpcClient (async). Connection to RPC.
- **solana_system_interface**, **solana_program**: Instruction builders and program IDs for system/SPL.

## Keypair and PDA

```rust
use solana_sdk::signer::{keypair::Keypair, Signer};
let keypair = Keypair::new();
let pubkey = keypair.pubkey();

use solana_sdk::pubkey::Pubkey;
let (pda, bump) = Pubkey::find_program_address(&[b"seed"], &program_id);
```

## Building and sending a transaction

```rust
use solana_client::nonblocking::rpc_client::RpcClient;
use solana_sdk::transaction::Transaction;
let rpc = RpcClient::new(url);
let blockhash = rpc.get_latest_blockhash().await?;
let mut tx = Transaction::new_with_payer(&[instruction], Some(&payer.pubkey()));
tx.sign(&[&payer], blockhash);
let sig = rpc.send_and_confirm_transaction(&tx).await?;
```

## RPC

- `get_latest_blockhash`, `get_account_info`, `get_balance`, `get_multiple_accounts`, `send_transaction`, `send_and_confirm_transaction`.
- For subscriptions use solana_client with WebSocket (e.g. `RpcClient` with ws support or a dedicated subscription API).

## Key points

- Implement `Signer` for custom signers (e.g. hardware). Keypair implements it.
- Use `send_and_confirm_transaction` with retries/commitment for production; handle blockhash expiry.

<!--
Source references:
- https://solana.com/docs/clients/official/rust
- https://github.com/solana-foundation/solana-com
-->
