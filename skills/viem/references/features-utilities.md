---
name: viem-utilities
description: Address, encoding, hashing, and unit helpers in viem.
---

# Utilities

Common helpers: address checksum, hex/bytes conversion, hashing, and unit formatting.

## Address

- **getAddress(address)**: EIP-55 checksum; use for consistent `Address` type.
- **isAddress(value)**: type guard for valid address string.
- **isAddressEqual(a, b)**: constant-time equality.

## Units (wei ↔ display)

- **parseEther("1.5")** → wei `bigint` (18 decimals).
- **formatEther(wei)** → string.
- **parseUnits(value, decimals)** / **formatUnits(value, decimals)** for arbitrary decimals (e.g. 6 for USDC).
- **parseGwei** / **formatGwei** for gas price.

```ts
import { parseEther, formatEther, parseUnits, formatUnits } from 'viem'
parseEther('1')      // 1000000000000000000n
formatEther(1000n)  // '0.000000000000001'
parseUnits('100', 6)  // 100000000n (e.g. USDC)
```

## Data & encoding

- **toHex** / **fromHex**: bytes ↔ hex string.
- **toBytes** / **fromBytes**: bytes ↔ Uint8Array.
- **concat(hex[])**: concatenate hex.
- **slice(hex, start?, end?)**, **pad(hex, size)**, **trim(hex)**.

## Hash

- **keccak256(data)**, **sha256(data)** (bytes or hex).
- **hashMessage(message)** for EIP-191 personal sign.
- **toFunctionSelector(signature)**, **toEventSignature(event)** for ABI selectors.

## ABI encoding (low-level)

- **encodeFunctionData**, **decodeFunctionResult**: call data.
- **encodeEventTopics**, **decodeEventLog**: event filters and log decoding.
- **parseAbi**, **parseAbiItem**, **getAbiItem**: parse ABI strings.

## Key points

- Use **getAddress** when storing or comparing addresses to get checksummed `Address`.
- Use **parseEther** / **formatEther** for ETH; **parseUnits** / **formatUnits** for tokens with custom decimals.
- Use **keccak256** / **hashMessage** for hashes; **toFunctionSelector** for contract call encoding.

<!--
Source references:
- https://viem.sh/docs/utilities/getAddress
- https://viem.sh/docs/utilities/parseEther
- https://viem.sh/docs/utilities/keccak256
- https://viem.sh/docs/abi/encodeFunctionData
-->
