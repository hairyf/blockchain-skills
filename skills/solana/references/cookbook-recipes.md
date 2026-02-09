---
name: solana-cookbook-recipes
description: Solana cookbook — code snippets for send SOL, keypair, balance, memo, priority fees, and common tasks.
---

# Solana — Cookbook Recipes

## Send SOL (Kit)

```ts
import { getTransferSolInstruction } from "@solana-program/system";
const ix = getTransferSolInstruction({
  source: sender,
  destination: recipientAddress,
  amount: lamports(amountLamports)
});
// Add to transaction, set fee payer and blockhash, sign, sendAndConfirm.
```

## Keypair: create, load, restore

- **Create**: `generateKeyPairSigner()` (Kit) or `Keypair.generate()` (web3.js).
- **Load from file**: Use keypair bytes or JSON; Kit/web3.js have helpers (e.g. from secret key).
- **Restore from mnemonic**: Use a BIP39/HD wallet library (e.g. @solana/web3.js with bip39) to derive keypair; not in core SDK.

## Get balance

- **SOL**: `rpc.getBalance(address).send()` (Kit) or `connection.getBalance(publicKey)` (web3.js).
- **Token**: Get token account(s) for owner (e.g. ATA), parse token account data for amount (Kit: token program helpers; web3.js: getAccount with @solana/spl-token parsing).

## Add memo to transaction

- Append Memo program instruction with memo string. **@solana-program/memo** (Kit) or **@solana/spl-memo** (legacy): build instruction with memo bytes, add to transaction.

## Priority fees (Compute Budget)

- Add **SetComputeUnitLimit** and **SetComputeUnitPrice** instructions (Compute Budget program). Kit: **@solana-program/compute-budget**; web3.js: build from compute budget IDs. Simulate first to choose CU limit; set price per CU for priority.

## Connect to environment

- **Mainnet**: `https://api.mainnet-beta.solana.com` (or preferred RPC). **Devnet**: `https://api.devnet.solana.com`. **Test validator**: `http://localhost:8899` (RPC), `ws://localhost:8900` (WebSocket).

## Key points

- Always set transaction lifetime (blockhash) and fee payer before signing.
- For production: use commitment (e.g. confirmed), retries, and (if needed) priority fees.

<!--
Source references:
- https://solana.com/developers/cookbook
- https://github.com/solana-foundation/solana-com
-->
