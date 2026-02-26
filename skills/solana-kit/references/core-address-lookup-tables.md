---
name: solana-kit-address-lookup-tables
description: Fetch lookup tables, compress transaction messages with lookup tables, decompile compiled messages that use lookups.
---

# Address lookup tables (Kit)

Address lookup tables (v0 transactions) let you reference many accounts by index in a table, reducing transaction size. Kit provides fetchLookupTables, compressTransactionMessageUsingAddressLookupTables, and decompileTransactionMessageFetchingLookupTables.

## Fetch lookup table contents

fetchLookupTables(lookupTableAddresses, rpc, config) returns a map of lookup table address to ordered array of addresses. Use when you need addresses for decompiling or compressing.

## Compress a message

Given a transaction message and a map of lookup table address to addresses (AddressesByLookupTableAddress), compressTransactionMessageUsingAddressLookupTables(message, addressesByLookupTableAddress) returns a new message with non-signer accounts that appear in the tables represented as AccountLookupMeta instead of AccountMeta, reducing compiled size. Use fetchAddressLookupTable from @solana-program/address-lookup-table to build the map.

## Decompile with lookups

decompileTransactionMessageFetchingLookupTables(compiledTransactionMessage, rpc, config) returns a TransactionMessage from a CompiledTransactionMessage; if the message uses address lookups, it fetches lookup table contents via RPC. Use when you have a compiled message (e.g. from getTransaction) and need to inspect or modify it.

## Key points

- Only v0 transaction messages support lookup tables. Build the AddressesByLookupTableAddress map from fetchAddressLookupTable or fetchLookupTables. Package: @solana/transaction-messages, @solana-program/address-lookup-table.

<!-- Source: sources/solana-kit/packages/kit/README.md fetchLookupTables decompileTransactionMessageFetchingLookupTables; packages/transaction-messages/README.md compressTransactionMessageUsingAddressLookupTables -->
