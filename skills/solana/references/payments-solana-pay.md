---
name: solana-payments-solana-pay
description: Solana Pay — payment requests, transfer links, verification, and payment flows.
---

# Solana — Payments and Solana Pay

## Solana Pay

- **Payment request URL**: `solana:<recipient>?amount=<lamports>&reference=<base58>&label=...`. Used in QR / deep links.
- **Transfer**: Sender creates a transfer of SOL or SPL token to recipient; optional memo and reference (e.g. for idempotency).
- **Verification**: Merchant verifies on-chain that a transfer with the expected amount, recipient, and reference (and optional memo) was confirmed.

## Send payments

- **Basic**: Build transfer instruction (SystemProgram.transfer or SPL transfer), send transaction; optionally include memo/reference in memo instruction or metadata.
- **Batch**: Multiple transfers in one or more transactions; respect size and compute limits.
- **Fee abstraction**: Use Compute Budget and/or fee payer services so user pays with token or third party pays fees.

## Accept payments

- **Indexing**: Poll or subscribe to account/transaction history to detect incoming transfers matching recipient + reference.
- **Verification tools**: Compare expected amount, mint, reference, and confirmation status against on-chain data.

## Key points

- Use **reference** (and memo if needed) to tie a payment to an order or session; verify on-chain before fulfilling.
- For production: use confirmed/finalized commitment and handle reorgs and duplicate references.

<!--
Source references:
- https://solana.com/docs/payments
- https://solana.com/docs/payments/send-payments
- https://solana.com/docs/payments/accept-payments
- https://github.com/solana-foundation/solana-com
-->
