---
name: solana-kit-compatible-clients
description: Program clients compatible with Kit — official list and Codama-generated clients.
---

# Compatible program clients (Kit)

Program clients that work with Kit are JavaScript libraries that expose instructions, account fetch/decode, and codecs aligned with Kit’s types and RPC. The official set is generated with [Codama](https://github.com/codama-idl/codama); you can generate clients for your own programs the same way.

## Official program clients

Install the library for each program your app uses. All are under the `@solana-program/` scope and work with Kit’s RPC, signers, and transaction APIs.

| Program | Package |
|--------|---------|
| Address Lookup Table | `@solana-program/address-lookup-table` |
| Compute Budget | `@solana-program/compute-budget` |
| Memo | `@solana-program/memo` |
| Token (SPL) | `@solana-program/token` |
| Token-2022 (extensions) | `@solana-program/token-2022` |
| Stake | `@solana-program/stake` |
| System | `@solana-program/system` |

Repositories live under [solana-program](https://github.com/solana-program) on GitHub; Anza maintains these packages.

## Usage with Kit

Use these clients to build instructions, fetch/decode accounts, and get codecs. Example with System and Token:

```ts
import { createSolanaRpc } from '@solana/kit';
import { getTransferSolInstruction } from '@solana-program/system';
import { getCreateAccountInstruction, getTransferCheckedInstruction } from '@solana-program/token';

const rpc = createSolanaRpc('https://api.mainnet-beta.solana.com');
// Build instructions with get*Instruction(), use with pipe(), add to transaction, sign, send.
```

Program clients follow the same patterns as Kit’s built-in instruction helpers: return instruction objects that you compose into transaction messages with Kit’s transaction and signer APIs.

## Generating your own clients

Use [Codama](https://github.com/codama-idl/codama) to generate TypeScript program clients from your program IDL. The output is designed to work with Kit’s addresses, codecs, and RPC. Install and run Codama in your repo, then use the generated package like the official `@solana-program/*` clients.

## Key points

- Prefer these clients over hand-rolled instruction builders for maintained programs to stay aligned with Kit and avoid encoding bugs.
- For Token-2022 extensions use `@solana-program/token-2022`; for classic SPL Token use `@solana-program/token`.
- Compatible clients expose get*Instruction, fetch*Account / decode*, and get*Codec-style APIs that match Kit’s conventions.

<!--
Source references:
- sources/solana-kit/docs/content/docs/compatible-clients.mdx
-->
