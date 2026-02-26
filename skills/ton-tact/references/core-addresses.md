---
name: core-addresses
description: Address helpers — newAddress, contractAddress, contractAddressExt, contractHash, forceBasechain, parseStdAddress, BasechainAddress.
---

# Addresses

Creating and validating contract addresses, parsing address slices, and basechain-specific helpers.

## Usage

**Build address from chain + hash (account ID):**

```tact
let addr: Address = newAddress(chain, hash);  // chain: 0 basechain, -1 masterchain
```

**Address from StateInit (basechain):**

```tact
let s: StateInit = initOf SomeContract();
let addr: Address = contractAddress(s);       // workchain 0
let addr2: Address = contractAddressExt(chain, s.code, s.data);
```

**Account ID (SHA-256 of code+data in standard cell representation):**

```tact
let accountId: Int = contractHash(code, data);
```

**Enforce basechain / workchain:**

```tact
forceBasechain(addr);                          // throws 138 if not basechain (Tact 1.6.3+)
forceWorkchain(addr, workchain, errorCode);    // Tact 1.6.4+
```

**Parse slice to StdAddress (workchain + address Int):**

```tact
let parsed: StdAddress = parseStdAddress(slice);
// parsed.workchain, parsed.address
let addr2: Address = newAddress(parsed.workchain, parsed.address);
```

**BasechainAddress** (Tact 1.6): `emptyBasechainAddress()`, `newBasechainAddress(hash)`, `contractBasechainAddress(StateInit)`. Use for basechain-only checks; `StateInit.hasSameBasechainAddress(addr)` is cheaper than `contractAddress(init) == addr`.

**Extension:** `address.asSlice()`, `address.toString()` (500+ gas).

## Key points

- `newAddress` only allows chain 0 or -1 at compile-time for uncommon chains.
- `parseVarAddress` is deprecated (Tact 1.6.8); use `parseStdAddress` for standard addresses.
- Use BasechainAddress and `hasSameBasechainAddress` for gas-efficient sender checks on basechain.

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/ref/core-addresses.mdx
-->
