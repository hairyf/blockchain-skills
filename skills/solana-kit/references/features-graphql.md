---
name: solana-kit-graphql
description: GraphQL client for Solana RPC — createSolanaRpcGraphQL, nested account/transaction/block queries, caching and batching.
---

# GraphQL RPC (Kit)

`@solana/rpc-graphql` provides a GraphQL layer on top of the Solana JSON-RPC. Use when you want nested queries, field selection, and automatic caching/batching.

## Setup

```ts
import { createSolanaRpc } from '@solana/rpc';
import { createSolanaRpcGraphQL } from '@solana/rpc-graphql';
const rpc = createSolanaRpc('https://api.devnet.solana.com');
const rpcGraphQL = createSolanaRpcGraphQL(rpc);
```

RPC must satisfy GetAccountInfoApi, GetBlockApi, GetMultipleAccountsApi, GetProgramAccountsApi, GetTransactionApi.

## Query accounts

rpcGraphQL.query(source, variableValues). Query account(address: $address) { lamports data(encoding: BASE_64) }. Nested: owner { address lamports }. Parsed types: ... on MintAccount { data { decimals supply } }, ... on TokenAccount { data { mint owner } }.

## Transactions and blocks

transaction(signature: $signature, commitment: $commitment) { slot meta { computeUnitsConsumed } message { instructions { ... on CreateAccountInstruction { lamports programId } } } }. block(slot: $slot) for blockhash, blockTime, rewards, transactions.

## RPC optimizations

Caching (same resource fetched once), request coalescing, batch loading (getMultipleAccounts), minimized payloads (dataSlice from query).

## Key points

Use rpcGraphQL.query(source, variableValues). Prefer GraphQL for nested account/transaction data and batch/cache; use raw RPC for one-off methods or custom transports.

<!-- Source: sources/solana-kit/packages/rpc-graphql/README.md, README.md GraphQL -->
