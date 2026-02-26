---
name: solana-address-lookup-tables
description: Address Lookup Tables (ALTs) to reference up to 64 addresses per transaction on Solana.
---

# Address Lookup Tables (ALTs)

Address Lookup Tables store a list of addresses on-chain. A transaction references them by 1-byte index instead of 32-byte address, so you can use **up to 64 addresses** per transaction (vs 32 without ALTs). Use ALTs when a tx would exceed the legacy account limit (e.g. large swaps, many token accounts).

## Requirements

- **Versioned transactions (v0)** only. Legacy transactions cannot use lookup table addresses. See [advanced-versioned-transactions](advanced-versioned-transactions.md).
- Create and extend the table in separate txs; then use the table in v0 txs.

## Create lookup table (web3.js)

```js
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const slot = await connection.getSlot();

const [lookupTableInst, lookupTableAddress] =
  web3.AddressLookupTableProgram.createLookupTable({
    authority: payer.publicKey,
    payer: payer.publicKey,
    recentSlot: slot,
  });
// Send lookupTableInst in a transaction to create the table on-chain
```

## Extend (add addresses)

```js
const extendInstruction = web3.AddressLookupTableProgram.extendLookupTable({
  payer: payer.publicKey,
  authority: payer.publicKey,
  lookupTable: lookupTableAddress,
  addresses: [
    payer.publicKey,
    web3.SystemProgram.programId,
    // add more; ~20 per tx due to legacy tx size if using legacy for extend
  ],
});
// Send extendInstruction in a transaction
```

Extending is limited by tx size; use multiple extend txs to add many addresses.

## Fetch table

```js
const lookupTableAccount = (
  await connection.getAddressLookupTable(lookupTableAddress)
).value;
// lookupTableAccount.state.addresses — array of PublicKey
```

## Use in a v0 transaction

```js
const messageV0 = new web3.TransactionMessage({
  payerKey: payer.publicKey,
  recentBlockhash: blockhash,
  instructions: arrayOfInstructions,
}).compileToV0Message([lookupTableAccount]);

const transactionV0 = new web3.VersionedTransaction(messageV0);
transactionV0.sign([payer]);
// Must sign before send; do not pass signers to sendAndConfirmTransaction
const txid = await connection.sendRawTransaction(transactionV0.serialize(), { ... });
```

Instructions are built the same way; the message compiles to v0 and includes the lookup table so addresses resolve from the table.

## Key points

- Create with `createLookupTable` (slot + authority + payer); extend with `extendLookupTable`.
- Use `getAddressLookupTable` to load table, then `compileToV0Message([lookupTableAccount])` so the v0 message can reference table indices.
- VersionedTransaction must be signed before calling `sendRawTransaction` (no signer array in send).

<!--
Source references:
- https://github.com/solana-foundation/solana-com (apps/docs/content/guides/advanced/lookup-tables.mdx)
- https://docs.anza.xyz/proposals/versioned-transactions
-->
