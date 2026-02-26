---
name: reth-staged-sync
description: Reth pipeline stages and sync flow
---

# Staged Sync

Stage order: EraStage (optional), HeaderStage, BodyStage, SenderRecoveryStage, ExecutionStage, PruneSenderRecovery, MerkleStage unwind, AccountHashingStage, StorageHashingStage, MerkleStage execute, TransactionLookupStage, IndexStorageHistoryStage, IndexAccountHistoryStage, PruneStage, FinishStage. FetchClient for headers/bodies. Unwind on error.
Source: docs/crates/stages.md
