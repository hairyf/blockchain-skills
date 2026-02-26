---
name: ethers-address
description: Ethers.js address — getAddress (checksum), isAddress, isAddressable.
---

# Address Utilities

Normalize and validate Ethereum addresses. Use getAddress for checksummed form; isAddress to validate before sending or storing.

## Normalize and validate

```ts
import { getAddress, isAddress, isAddressable } from "ethers";

// Normalize to EIP-55 checksum; throws if invalid
const checksummed = getAddress("0x8ba1f109551bd432803012645ac136ddd64dba72");

// Validate without resolving ENS (ENS names return false)
if (isAddress(input)) {
  const addr = getAddress(input);
}

// Check if value has .address (Wallet, Contract, etc.)
if (isAddressable(signer)) {
  const addr = await signer.address;  // or getAddress(await signer.getAddress())
}
```

## Checksum rules

- getAddress returns EIP-55 checksummed form; accepts lowercase or mixed case.
- If input has mixed case, checksum is validated and an error is thrown on mismatch.
- To bypass checksum validation (rare), pass `.toLowerCase()` first.

## Key Points

- Always use getAddress() when storing or comparing addresses to get consistent checksum.
- isAddress() returns false for ENS names; resolve names with provider.resolveName() first.
- isAddressable(value) is true for Wallet, Contract, and any object with an address-like property.

<!--
Source references:
- sources/ethers/lib.commonjs/address (getAddress, isAddress, isAddressable)
- https://docs.ethers.org/v6/
-->
