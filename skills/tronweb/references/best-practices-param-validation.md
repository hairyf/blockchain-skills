---
name: tronweb-param-validation
description: Validate inputs with Validator and notValid(); param types address, integer, resource, url, hex, etc.
---

# Param validation

TronWeb uses an internal **Validator** to validate arguments in Trx and TransactionBuilder. When building wrappers or agents that accept user/API input, apply the same patterns so invalid params throw clear errors before calling RPC. The Validator class is not part of the public package API.

## Usage pattern

`notValid(params)` takes an array of `{ name, type, value, msg?, optional?, gt?, lt?, gte?, lte?, names? }`. If any param fails, it throws. Use `optional: true` to skip validation when value is undefined/null or (for non-boolean) false. Custom message: set `msg` on the param.

## Param types

| type | meaning |
|------|--------|
| `address` | Valid TRON address (base58 or hex); throws "Invalid … address provided" if invalid. |
| `integer` | Integer; optional `gt`, `lt`, `gte`, `lte` for range. |
| `positive-integer` | Integer > 0; throws "… must be a positive integer". |
| `tokenId` | Non-empty string. |
| `resource` | Must be `'BANDWIDTH'` or `'ENERGY'`. |
| `url` | Valid URL (isValidURL). |
| `hex` | Hex string. |
| `array` | Array.isArray. |
| `string` | String; optional `gt`/`lt`/`gte`/`lte` for length. |
| `not-empty-string` | Non-empty string. |
| `boolean` | Boolean. |
| `notEmptyObject` | Object with at least one key. |
| `notEqual` | Uses `names`: two param names must not be equal (throws with notEqual message). |

- **notEqual** — Uses `names`: two param names must not be equal (throws with notEqual message).

## Key points

- Use `optional: true` for params that may be omitted.
- For `notEqual`, pass `names: ['from', 'to']` and ensure both appear earlier in the params array.
- When building agents, validate inputs against these types before calling TronWeb APIs.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/paramValidator/index.ts)
-->