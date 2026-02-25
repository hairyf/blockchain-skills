---
name: ethers-hashing
description: Ethers.js hashing — keccak256, id (string hash), sha256, and use in selectors and testing.
---

# Hashing

Ethers exposes common hashes used in Ethereum: keccak256 for selectors and data, and a convenience for hashing strings (e.g. for testing).

## keccak256

Standard 32-byte keccak256 hash; input can be hex string or bytes:

```ts
import { keccak256 } from "ethers";

const hash = keccak256("0x1234");
const selector = keccak256(ethers.toUtf8Bytes("transfer(address,uint256)")).slice(0, 10);  // first 4 bytes
```

## id (string to hash)

Hashes a UTF-8 string with keccak256. Useful for deterministic test keys or labels:

```ts
import { id } from "ethers";

const hash = id("hello");           // keccak256 of UTF-8 "hello"
const testKey = id("test");         // common in docs for Wallet(ethers.id("test"), provider)
```

## Other hashes

sha256, sha512, ripemd160, computeHmac, pbkdf2 are available from the crypto layer; used internally and for React Native overrides. For most agent use cases, keccak256 and id() are the main ones.

## Key Points

- keccak256(data) — data as BytesLike; returns 0x-prefixed 32-byte hex.
- id(text) — keccak256(UTF-8 string); handy for testing and stable identifiers.
- Method/error selectors are the first 4 bytes of keccak256(normalizedSignature).

<!--
Source references:
- sources/ethers/lib.commonjs/crypto/keccak.d.ts
- sources/ethers/lib.commonjs/hash/id.d.ts
- https://docs.ethers.org/v6/
-->
