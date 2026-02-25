---
name: Example Programs
description: Curated Anchor example programs—Basics, Tokens, Token 2022—and when to use each for agent-driven development.
---

# Example Programs

Use the [solana-developers/program-examples](https://github.com/solana-developers/program-examples) repository to find reference implementations for common Anchor patterns. Each example includes runnable code; prefer the branch/tag that matches your Anchor version.

## When to use this reference

- Implementing a feature (CPI, PDA, realloc, close, tokens) and need a minimal working example.
- Validating account constraints or instruction flow against a known-good program.
- Onboarding: mapping docs/concepts to concrete code (e.g. "PDA rent payer" → `pda-rent-payer`).

## Basics

| Example | Use case |
|--------|----------|
| [checking-accounts](https://github.com/solana-developers/program-examples/tree/main/basics/checking-accounts) | Account validation with Anchor |
| [close-account](https://github.com/solana-developers/program-examples/tree/main/basics/close-account) | Closing accounts and sending lamports to a target |
| [counter](https://github.com/solana-developers/program-examples/tree/main/basics/counter) | Simple stateful counter program |
| [create-account](https://github.com/solana-developers/program-examples/tree/main/basics/create-account) | Creating accounts with `init` |
| [cross-program-invocation](https://github.com/solana-developers/program-examples/tree/main/basics/cross-program-invocation) | CPI with Anchor (CpiContext, invoke) |
| [favorites](https://github.com/solana-developers/program-examples/tree/main/basics/favorites) | Storing per-user data (e.g. favorites) |
| [hello-solana](https://github.com/solana-developers/program-examples/tree/main/basics/hello-solana) | Minimal "Hello, Solana!" instruction |
| [pda-rent-payer](https://github.com/solana-developers/program-examples/tree/main/basics/pda-rent-payer) | Using a PDA to pay for account creation |
| [processing-instructions](https://github.com/solana-developers/program-examples/tree/main/basics/processing-instructions) | Instruction dispatch and parsing |
| [program-derived-addresses](https://github.com/solana-developers/program-examples/tree/main/basics/program-derived-addresses) | PDA derivation, seeds, bump |
| [realloc](https://github.com/solana-developers/program-examples/tree/main/basics/realloc) | Resizing account data with `realloc` |
| [rent](https://github.com/solana-developers/program-examples/tree/main/basics/rent) | Rent calculation for accounts |
| [transfer-sol](https://github.com/solana-developers/program-examples/tree/main/basics/transfer-sol) | Native SOL transfer |

## Tokens (SPL)

| Example | Use case |
|--------|----------|
| [create-token](https://github.com/solana-developers/program-examples/tree/main/tokens/create-token) | Creating an SPL token (mint + config) |
| [escrow](https://github.com/solana-developers/program-examples/tree/main/tokens/escrow) | Escrow flow with tokens |
| [nft-minter](https://github.com/solana-developers/program-examples/tree/main/tokens/nft-minter) | Minting NFTs |
| [nft-operations](https://github.com/solana-developers/program-examples/tree/main/tokens/nft-operations) | NFT operations |
| [pda-mint-authority](https://github.com/solana-developers/program-examples/tree/main/tokens/pda-mint-authority) | PDA as mint authority |
| [spl-token-minter](https://github.com/solana-developers/program-examples/tree/main/tokens/spl-token-minter) | SPL token minting |
| [token-fundraiser](https://github.com/solana-developers/program-examples/tree/main/tokens/token-fundraiser) | Token fundraiser flow |
| [token-swap](https://github.com/solana-developers/program-examples/tree/main/tokens/token-swap) | Token swap |
| [transfer-tokens](https://github.com/solana-developers/program-examples/tree/main/tokens/transfer-tokens) | Transferring SPL tokens |

## Token 2022 / Extensions

| Example | Use case |
|--------|----------|
| [basics](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/basics) | Token 2022 basics with Anchor |
| [cpi-guard](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/cpi-guard) | CPI guard extension |
| [default-account-state](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/default-account-state) | Default account state |
| [group](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/group) | Token groups |
| [immutable-owner](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/immutable-owner) | Immutable owner |
| [interest-bearing](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/interest-bearing) | Interest-bearing tokens |
| [memo-transfer](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/memo-transfer) | Memo transfer |
| [metadata](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/metadata) | Token metadata |
| [mint-close-authority](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/mint-close-authority) | Mint close authority |
| [multiple-extensions](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/multiple-extensions) | Multiple extensions on one mint/account |
| [nft-meta-data-pointer](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/nft-meta-data-pointer) | NFT metadata pointer |
| [non-transferable](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/non-transferable) | Non-transferable tokens |
| [permanent-delegate](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/permanent-delegate) | Permanent delegate |
| [transfer-fee](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/transfer-fee) | Transfer fees |
| [transfer-hook](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022/transfer-hook) | Transfer hook |

## Key points

- Clone or link to the repo and open the specific example folder; each is self-contained.
- Align Anchor and Solana CLI versions with the example's dependencies where possible.
- For security-sensitive logic, cross-check with [best-practices-security](best-practices-security.md) and the sealevel-attacks repo.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/references/examples.mdx)
- https://github.com/solana-developers/program-examples
-->
