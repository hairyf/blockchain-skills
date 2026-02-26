---
name: solana-features-retry
description: Retrying and rebroadcasting dropped transactions.
---

# Solana Features — Retrying Transactions

Use sendTransaction maxRetries for custom rebroadcast. Track lastValidBlockHeight; only re-sign after blockhash expired. Keep skipPreflight false.
