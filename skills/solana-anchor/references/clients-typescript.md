---
name: TypeScript Client
description: Using @anchor-lang/core Program, methods, accounts, signers, and account fetching.
---

# TypeScript Client

Use `@anchor-lang/core` with the program’s IDL to build and send transactions and fetch accounts. Compatible with legacy `@solana/web3.js` v1, not v2.

## Setup

Create a `Program` from the IDL and a provider (connection + optional wallet):

```ts
import { Program, AnchorProvider, setProvider } from "@anchor-lang/core";
import idl from "./idl.json";
import type { MyProgram } from "./idlType";

const provider = new AnchorProvider(connection, wallet, {});
setProvider(provider);

const program = new Program(idl as MyProgram, { connection });
```

In Anchor tests: `anchor.setProvider(anchor.AnchorProvider.env());` then `const program = anchor.workspace.MyProgram as Program<MyProgram>;`.

## Invoking instructions

Use the methods builder: instruction name (camelCase), then accounts, then signers, then send/build:

- **`.rpc()`** – Build, sign (with provider wallet + any `.signers([])`), and send. Returns transaction signature.
- **`.transaction()`** – Build `Transaction`; you sign and send it yourself.
- **`.instruction()`** – Build `TransactionInstruction`; you add to a transaction and send.

```ts
await program.methods
  .initialize(new BN(42))
  .accounts({ newAccount: keypair.publicKey, signer: wallet.publicKey })
  .signers([keypair])
  .rpc();
```

Accounts that are PDAs or have fixed addresses (e.g. system program) can be omitted if the IDL allows resolution. Pass only additional signers in `.signers()` when using `.rpc()`.

## Fetching accounts

- **`program.account.<accountName>.fetch(address)`** – Single account.
- **`program.account.<accountName>.fetchMultiple([addresses])`** – Multiple.
- **`program.account.<accountName>.all([filters])`** – All accounts; optional `memcmp` filter (offset + bytes; first 8 bytes are discriminator).

## Events

Use `program.addEventListener("eventName", callback)` and `program.removeEventListener(listenerId)` for events emitted with `emit!`. For `emit_cpi!`, fetch the transaction and decode the event from the inner instruction data.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/clients/typescript.mdx)
-->
