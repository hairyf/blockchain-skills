---
name: reth-database
description: Reth storage abstractions, tables, transactions, codecs
---

# Database

Trait-based DB over MDBX. Database: tx(), tx_mut(), view(f), update(f). DbTx: get, cursor_read, commit. DbTxMut: put, delete, clear, cursor_write. Tables: CanonicalHeaders, Headers, BlockBodyIndices, Transactions, Receipts, PlainAccountState, etc. reth_codec derive for Compact/Scale/Postcard. Provider layer: HeaderProvider, BlockReader via DatabaseProvider and static-file provider.
Source: docs/design/database.md, docs/crates/db.md
