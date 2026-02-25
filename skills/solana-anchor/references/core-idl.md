---
name: IDL (Interface Description Language)
description: Anchor IDL format, discriminators, and how the client uses it for instructions and accounts.
---

# Program IDL

The IDL is a JSON description of the program (instructions, accounts, types). Generated at `target/idl/<program-name>.json` by `anchor build`. Used to generate clients and to resolve accounts (e.g. PDAs) on the client.

## Structure

- **address** – Program ID.
- **metadata** – name, version, spec, description.
- **instructions** – For each instruction: `name`, `discriminator` (8 bytes), `accounts` (name, writable, signer, optional address), `args` (name, type).
- **accounts** – Account type names and their `discriminator`.
- **types** – Struct/enum definitions for account and instruction data.

## Discriminators

- **Instruction**: first 8 bytes of `sha256("global:<instruction_name>")`. Sent as first 8 bytes of instruction data; the client adds this automatically.
- **Account**: first 8 bytes of `sha256("account:<AccountName>")`. Stored as first 8 bytes of account data; used when (de)serializing and validating.

Same account name in different programs yields the same discriminator; ownership is still checked by the program.

## Client usage

- **Instructions**: client builds instruction data as discriminator + serialized args; account list and order come from the IDL.
- **Accounts**: `program.account.<accountName>.fetch(address)` and similar use the IDL types and discriminators to deserialize.
- **PDA resolution**: If the IDL has `pda.seeds` (const + account refs), the client can resolve the PDA address without manually deriving it.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/basics/idl.mdx)
-->
