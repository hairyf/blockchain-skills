---
name: ethers-utils
description: Ethers.js utilities — hex/bytes, ZeroAddress, ZeroHash, bytes32, dataSlice, solidityPacked.
---

# Data and Hex Utilities

Ethers provides helpers for hex strings, bytes, constants, and Solidity-packed encoding. Use them when building calldata, comparing addresses, or encoding fixed-size values.

## Hex and bytes

```ts
import { getBytes, toBeHex, dataSlice, zeroPadValue, toQuantity } from "ethers";

const bytes = getBytes("0x1234");           // Uint8Array from hex string
const hex = toBeHex(35);                    // "0x23" (quantity format)
const slice = dataSlice(hexValue, 0, 4);   // first 4 bytes
const padded = zeroPadValue(value, 32);     // left-pad to 32 bytes
```

## Constants

```ts
import { ZeroAddress, ZeroHash } from "ethers";

// EIP-55 checksummed "0x0000...0000" and "0x0000...0000" hash
if (addr === ethers.ZeroAddress) { }
if (txHash === ethers.ZeroHash) { }
```

## Bytes32 string encoding

Used by some contracts for fixed-length string slots:

```ts
import { encodeBytes32String, decodeBytes32String } from "ethers";

const bytes32 = encodeBytes32String("hello");
const text = decodeBytes32String(bytes32);
```

## Solidity packed encoding

Non-ABI packed encoding and hashing (e.g. for signatures or custom structs):

```ts
import { solidityPacked, solidityPackedKeccak256, solidityPackedSha256 } from "ethers";

const packed = solidityPacked(["address", "uint256"], [addr, amount]);
const hash = solidityPackedKeccak256(["string", "uint8"], ["foo", 1]);
```

## Key Points

- getBytes / toBeHex / dataSlice / zeroPadValue replace v5 arrayify, hexlify, hexDataSlice, hexZeroPad.
- ZeroAddress and ZeroHash replace ethers.constants.AddressZero and HashZero.
- Use encodeBytes32String / decodeBytes32String for 32-byte string slots; solidityPacked* for custom packed hashes.

<!--
Source references:
- sources/ethers/docs.wrm/migrating.wrm
- https://docs.ethers.org/v6/
-->
