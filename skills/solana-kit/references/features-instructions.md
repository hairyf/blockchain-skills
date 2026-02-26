---
name: solana-kit-instructions
description: Build instructions with program clients (System, Token, Compute Budget) — getCreateAccountInstruction, getInitializeMintInstruction, compute unit limit/price.
---

# Instructions (Kit)

Instructions are built with program clients (e.g. `@solana-program/system`, `@solana-program/token`, `@solana-program/compute-budget`). Each client exposes `getXxxInstruction(...)` with typed inputs.

## System: CreateAccount

```ts
import { getCreateAccountInstruction } from '@solana-program/system';
import { getMintSize, TOKEN_PROGRAM_ADDRESS } from '@solana-program/token';

const mintRent = await rpc.getMinimumBalanceForRentExemption(BigInt(getMintSize())).send();
const createAccountIx = getCreateAccountInstruction({
  payer: wallet,
  newAccount: mintSigner,
  space: getMintSize(),
  lamports: mintRent,
  programAddress: TOKEN_PROGRAM_ADDRESS,
});
```

## Token: InitializeMint

```ts
import { getInitializeMintInstruction } from '@solana-program/token';

const initializeMintIx = getInitializeMintInstruction({
  mint: mintSigner.address,
  decimals: 0,
  mintAuthority: wallet.address,
  freezeAuthority: wallet.address,
});
```

## Compute Budget

```ts
import {
  getSetComputeUnitLimitInstruction,
  getSetComputeUnitPriceInstruction,
  estimateComputeUnitLimitFactory,
} from '@solana-program/compute-budget';

const setLimitIx = getSetComputeUnitLimitInstruction({ units: 50_000 });
const setPriceIx = getSetComputeUnitPriceInstruction({ microLamports: 10_000n });

const estimateCULimit = estimateComputeUnitLimitFactory({ rpc });
const units = await estimateCULimit(transactionMessage);
const limitIx = getSetComputeUnitLimitInstruction({ units });
```

## Compatible program clients

Install only the programs you use. Common packages:

- `@solana-program/system` — CreateAccount, TransferSol, etc.
- `@solana-program/token` — Mint, Token Account, SPL Token instructions/codecs.
- `@solana-program/token-2022` — Token Extensions.
- `@solana-program/compute-budget` — SetComputeUnitLimit, SetComputeUnitPrice.
- `@solana-program/memo` — Memo.
- `@solana-program/address-lookup-table` — Address lookup table fetch.
- `@solana-program/stake` — Stake.

All are Codama-generated and follow `getXxxInstruction`, `getXxxCodec`, `fetchXxx`, `decodeXxx` patterns.

## Key points

- Pass **signers** where the program expects a signer (e.g. `payer`, `newAccount`); pass `address` for read-only or when you only have the public key.
- Use `estimateComputeUnitLimitFactory` + `getSetComputeUnitLimitInstruction` to set CU limit from simulation; add limit/price instructions to the transaction message before signing.

<!--
Source references:
- sources/solana-kit/docs/content/docs/getting-started/instructions.mdx
- sources/solana-kit/docs/content/docs/compatible-clients.mdx
-->
