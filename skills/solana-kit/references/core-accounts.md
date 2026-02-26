---
name: solana-kit-accounts
description: Fetch and decode on-chain accounts — fetchEncodedAccount, codecs, program clients (fetchMint, decodeMint).
---

# Fetching and decoding accounts (Kit)

Fetch account data via RPC, then decode with codecs or program-client helpers. Prefer program clients when available (e.g. `fetchMint`, `decodeMint`) for type-safe decoded data.

## Raw RPC

```ts
import { address } from '@solana/kit';

const { value: account } = await rpc.getAccountInfo(address('1234..5678')).send();
const { value: accounts } = await rpc.getMultipleAccounts([address('1234..5678')]).send();
```

## Unified fetch (Kit helpers)

```ts
import { fetchEncodedAccount, fetchEncodedAccounts, assertAccountExists } from '@solana/kit';

const account = await fetchEncodedAccount(rpc, address('1234..5678'));
const accounts = await fetchEncodedAccounts(rpc, [address('1234..5678')]);

if (account.exists) {
  // account.data is Uint8Array
} else {
  // account.address, exists: false
}
assertAccountExists(account); // throws if missing; narrows type for TS
```

## Decode with program client (recommended)

Program clients expose `fetchX`, `decodeX`, and `getXCodec`:

```ts
import { fetchEncodedAccount } from '@solana/kit';
import { fetchMint, decodeMint, getMintCodec, Mint } from '@solana-program/token';

// One-shot fetch + decode (asserts account exists)
const mintAccount = await fetchMint(rpc, address('...'));
// mintAccount satisfies Account<Mint>

// Or decode an already-fetched encoded account
const encoded = await fetchEncodedAccount(rpc, address('...'));
assertAccountExists(encoded);
const mintAccount = decodeMint(encoded);

// Manual codec
const codec = getMintCodec();
const data = codec.decode(encoded.data);
```

## Manual codec (no program client)

Use codecs from `@solana/kit` (or `@solana/codecs`) to define layout:

```ts
import { getStructCodec, getU64Codec, getU8Codec, getBooleanCodec, getOptionCodec, getAddressCodec } from '@solana/kit';

const mintCodec = getStructCodec([
  ['mintAuthority', getOptionCodec(getAddressCodec())],
  ['supply', getU64Codec()],
  ['decimals', getU8Codec()],
  ['isInitialized', getBooleanCodec()],
  ['freezeAuthority', getOptionCodec(getAddressCodec())],
]);
const decoded = mintCodec.decode(account.data);
```

## Key points

- Use `fetchEncodedAccount` / `fetchEncodedAccounts` for a consistent `MaybeEncodedAccount` shape and encoding.
- Prefer program client `fetchX(rpc, address)` when the account type has a client (Token Mint, etc.); use `decodeX(encoded)` or `getXCodec().decode(data)` when you already have bytes.
- Use `unwrapOption` for Rust-style `Option<T>` fields when displaying or passing to APIs expecting `T | null`.

<!--
Source references:
- sources/solana-kit/docs/content/docs/getting-started/fetch-account.mdx
-->
