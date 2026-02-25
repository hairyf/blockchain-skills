---
name: solana-kit-codecs
description: Codecs — encode/decode structs, primitives, options; compose with getStructCodec, getOptionCodec; use with account data and instruction args.
---

# Codecs (Kit)

Codecs encode values to `Uint8Array` and decode back. They are composable and used for account data and instruction data. Program clients expose `getXCodec()` (e.g. `getMintCodec()`); you can build custom codecs from primitives.

## Compose a struct codec

```ts
import {
  getStructCodec,
  getU32Codec,
  getU8Codec,
  getBooleanCodec,
  addCodecSizePrefix,
  getUtf8Codec,
} from '@solana/kit';

type Person = { name: string; age: number; verified: boolean };
const getPersonCodec = (): Codec<Person> =>
  getStructCodec([
    ['name', addCodecSizePrefix(getUtf8Codec(), getU32Codec())],
    ['age', getU32Codec()],
    ['verified', getBooleanCodec()],
  ]);

const codec = getPersonCodec();
const bytes = codec.encode({ name: 'John', age: 42, verified: true });
const decoded = codec.decode(bytes);
```

## Encoder-only / Decoder-only

Use `getXxxEncoder` / `getXxxDecoder` when only encoding or decoding so the other half can be tree-shaken.

## Common codecs

- Numbers: `getU8Codec`, `getU32Codec`, `getU64Codec`, etc.
- Strings: `getUtf8Codec`, `addCodecSizePrefix(getUtf8Codec(), getU32Codec())`.
- Structs: `getStructCodec([['field', codec], ...])`.
- Option: `getOptionCodec(codec)` (Rust-like Option).
- Address: `getAddressCodec()`.

## Program client codecs

```ts
import { getMintCodec } from '@solana-program/token';
const codec = getMintCodec();
const data = codec.decode(account.data);
```

## Key points

- Prefer program client `getXCodec()` and `decodeX(encodedAccount)` when available.
- For custom layouts (e.g. program-specific account), compose from `getStructCodec`, `getOptionCodec`, number/string/address codecs. Match the on-chain layout order and sizes.

<!--
Source references:
- sources/solana-kit/docs/content/docs/concepts/codecs.mdx
-->
