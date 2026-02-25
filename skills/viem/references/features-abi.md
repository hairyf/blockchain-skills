---
name: viem-abi
description: ABI parsing, encoding, and decoding in viem — parseAbi, encodeAbiParameters, decodeAbiParameters, getAbiItem.
---

# ABI

Parse human-readable ABI, encode/decode parameters, and look up ABI items. Used by contract helpers and for low-level call/event data.

## Parsing

- **parseAbi(signatures[])**: Human-readable ABI → JSON `Abi`. Use for full contract ABI.

```ts
import { parseAbi } from 'viem'

const abi = parseAbi([
  'function balanceOf(address owner) view returns (uint256)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
])
```

- **parseAbiItem(signature)**: Single function/event/error signature → one ABI item.
- **parseAbiParameters(signature)**: Human-readable params string (e.g. `'string x, uint y'`) → `AbiParameter[]`.
- **parseAbiParameter(signature)**: Single parameter string → one `AbiParameter`.

## Encode / decode

- **encodeAbiParameters(params, values)**: Encode values to hex per ABI spec. `params` are `AbiParameter[]` (e.g. from `inputs`/`outputs`); use **parseAbiParameters** for human-readable.
- **decodeAbiParameters(params, data)**: Decode hex `data` into decoded values; types inferred from `params`.
- **encodePacked**: Tight packing (no padding) for non-ABI use (e.g. hashing).

```ts
import { encodeAbiParameters, decodeAbiParameters, parseAbiParameters } from 'viem'

const encoded = encodeAbiParameters(
  parseAbiParameters('string x, uint y, bool z'),
  ['wagmi', 420n, true]
)
const decoded = decodeAbiParameters(
  parseAbiParameters('string x, uint y, bool z'),
  encoded
)
// ['wagmi', 420n, true]
```

## Lookup

- **getAbiItem({ abi, name, args? })**: Get one item from an ABI by name (or 4-byte selector). Use `args` to disambiguate overloads.

```ts
import { getAbiItem } from 'viem'

const item = getAbiItem({ abi, name: 'balanceOf', args: ['0x...'] })
```

## Relation to contract APIs

- **encodeFunctionData** / **decodeFunctionResult** use these under the hood for call data.
- **encodeEventTopics** / **decodeEventLog** use them for event filters and log decoding.
- Prefer **readContract** / **writeContract** when you have a full ABI; use raw encode/decode when building custom payloads or decoding arbitrary calldata.

## Key points

- Use **parseAbi** or **parseAbiItem** for type-safe, human-readable ABI in code.
- **encodeAbiParameters** / **decodeAbiParameters** match the Solidity ABI spec; use for cross-contract or off-chain encoding.
- **getAbiItem** is useful when you have a large ABI and need one function or event by name or selector.

<!--
Source references:
- https://viem.sh/docs/abi/parseAbi
- https://viem.sh/docs/abi/encodeAbiParameters
- https://viem.sh/docs/abi/decodeAbiParameters
- https://viem.sh/docs/abi/getAbiItem
-->
