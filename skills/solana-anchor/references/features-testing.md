---
name: Testing
description: Testing Anchor programs with Mollusk (Rust SVM harness) and LiteSVM (Rust/TS/Python).
---

# Testing

Anchor docs describe two testing approaches for Solana programs: **Mollusk** (Rust-only, lightweight instruction-level harness) and **LiteSVM** (in-process VM, multi-language). Use them to test instructions or full transactions without a full validator.

## Mollusk

[Mollusk](https://github.com/anza-xyz/mollusk) is a minimal test harness that runs program instructions in a minified SVM. It does not use AccountsDB or a full validator: you supply the instruction and account set. Good for fast, deterministic instruction tests.

**API:**

- `process_instruction(&instruction, &accounts)` – Execute one instruction, return result.
- `process_and_validate_instruction(&instruction, &accounts, &checks)` – Execute and run checks; panic on failure.
- `process_instruction_chain` / `process_and_validate_instruction_chain` – Run a sequence of instructions.

**Example:**

```rust
use mollusk_svm::Mollusk;
use solana_account::Account;
use solana_sdk::{instruction::{AccountMeta, Instruction}, pubkey::Pubkey};

let program_id = Pubkey::new_unique();
let instruction = Instruction::new_with_bytes(program_id, &[], vec![
    AccountMeta::new(key1, false),
    AccountMeta::new_readonly(key2, false),
]);

let accounts = vec![(key1, Account::default()), (key2, Account::default())];
let mollusk = Mollusk::new(&program_id, "path/to/program.so");

let result = mollusk.process_instruction(&instruction, &accounts);
// or: mollusk.process_and_validate_instruction(&instruction, &accounts, &checks);
```

You can configure compute budget, feature set, and sysvars on the harness. No accounts are loaded from a chain; all account data is provided explicitly.

## LiteSVM

[LiteSVM](https://github.com/LiteSVM/litesvm) is an in-process Solana VM for tests. Faster than `solana-test-validator`. Available in Rust, TypeScript/JavaScript, and Python (via `solders`).

**Rust:** `cargo add litesvm --dev`. Create `LiteSVM::new()`, airdrop with `svm.airdrop(&pubkey, lamports)`, build and send transactions with `svm.send_transaction(tx)`, inspect state with `svm.get_account(&pubkey)`.

**TypeScript:** `npm i litesvm -D`. `new LiteSVM()`, `svm.airdrop(publicKey, lamports)`, then send transactions and query accounts similarly.

**Python:** `uv add solders`; use `litesvm` from the solders package.

Use LiteSVM when you need validator-like behavior (multiple instructions, persistence between transactions, or tests in TS/Python). Use Mollusk when you only need to run a single instruction with explicit accounts and want minimal setup.

## Key points

- Mollusk: instruction + account list only; no chain state; Rust; good for unit-style instruction tests.
- LiteSVM: in-process VM; multi-language; airdrop, send_transaction, get_account; good for integration-style tests.
- For Anchor tests, TypeScript tests with `anchor test` typically use the Node validator or a configurable test validator; Mollusk/LiteSVM are alternatives for Rust or lighter-weight runs.

<!--
Source references:
- https://github.com/solana-foundation/anchor/tree/master/docs/content/docs/testing/index.mdx
- https://github.com/solana-foundation/anchor/tree/master/docs/content/docs/testing/mollusk.mdx
- https://github.com/solana-foundation/anchor/tree/master/docs/content/docs/testing/litesvm.mdx
-->
