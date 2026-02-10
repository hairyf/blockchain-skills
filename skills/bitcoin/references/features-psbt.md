---
name: bitcoin-features-psbt
description: Partially Signed Bitcoin Transactions (PSBT) workflow and RPCs.
---

# PSBT in Bitcoin Core

PSBT (BIP 174) is an interchange format for unsigned or partially signed transactions plus metadata. Used for hardware wallets, multisig, and CoinJoin-style flows.

## Roles (BIP 174)

- **Creator** — Builds initial PSBT (inputs/outputs, no or minimal metadata).
- **Updater** — Adds UTXO and script/key info.
- **Signer** — Adds partial signatures.
- **Finalizer** — Converts partial sigs into final scriptSig/scriptWitness.
- **Extractor** — Outputs valid raw transaction when all inputs finalized.
- **Combiner** — Merges metadata from multiple PSBTs for the same tx.

## RPCs

| RPC | Role | Purpose |
|-----|------|---------|
| **createpsbt** | Creator | Inputs + outputs → PSBT (like createrawtransaction + converttopsbt). |
| **converttopsbt** | Creator | Raw tx → PSBT (strips existing sigs). |
| **walletcreatefundedpsbt** | Creator, Updater | Wallet creates + funds PSBT, adds metadata for known inputs/outputs. |
| **utxoupdatepsbt** | Updater | Add UTXO/script info from node (SegWit inputs). |
| **walletprocesspsbt** | Updater, Signer, Finalizer | Wallet updates and optionally signs/finalizes. |
| **descriptorprocesspsbt** | Updater, Signer, Finalizer | Node: update and sign using provided descriptors. |
| **finalizepsbt** | Finalizer, Extractor | Finalize partial sigs; if all done, return hex tx for broadcast. |
| **combinepsbt** | Combiner | Merge multiple PSBTs (e.g. from several signers). |
| **joinpsbts** | Creator | Concatenate inputs/outputs of multiple PSBTs (e.g. CoinJoin). |
| **decodepsbt** | — | Human-readable PSBT contents and fee if known. |
| **analyzepsbt** | — | Status of inputs, next step, fee/weight estimate. |

## Typical Flow

1. Creator: `walletcreatefundedpsbt` or `createpsbt` + updater.
2. Updater: add UTXOs/scripts (`utxoupdatepsbt` or wallet/descriptor RPCs).
3. Signers: sign (e.g. `walletprocesspsbt` or external signer); combine with `combinepsbt` if multiple.
4. Finalizer: `finalizepsbt`.
5. Extractor: same call returns raw tx; broadcast with `sendrawtransaction`.

Multisig example: create descriptor wallet with multisig descriptor, then use `walletcreatefundedpsbt` → pass PSBT to each signer → `combinepsbt` → `finalizepsbt` → `sendrawtransaction`.

<!--
Source references:
- https://github.com/bitcoin/bitcoin doc/psbt.md
- https://github.com/bitcoin/bitcoin doc/multisig-tutorial.md
-->
