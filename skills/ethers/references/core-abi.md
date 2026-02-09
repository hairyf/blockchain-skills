---
name: ethers-abi
description: Ethers.js ABI — human-readable ABI, Fragment, encoding (selector, params), event topics and data.
---

# Application Binary Interface (ABI)

ABI describes how to encode/decode calls and events. Include only the methods/events you need as Fragments.

## Human-readable ABI

```ts
const abi = [
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function balanceOf(address a) view returns (uint)",
  "function transfer(address to, uint amount)",
  "event Transfer(address indexed from, address indexed to, uint amount)"
];
const contract = new ethers.Contract(address, abi, provider);
```

## Call data

- First 4 bytes: method selector (keccak256 of normalized signature).
- Params encoded and concatenated; each component padded to 32 bytes. Length ≡ 4 (mod 32).
- Revert: first 4 bytes = error selector; length ≡ 4 (mod 32).

## Events

- First topic: topic hash (keccak256 of event signature). Indexed params go in topics; non-indexed in data.
- Use indexed params for filtering; data is cheaper but not filterable.

## Key Points

- Use human-readable ABI (Solidity-style signatures) when typing by hand.
- Omit unneeded methods/events from the ABI.
- Contract is a meta-class: methods are derived at runtime from the ABI.

<!--
Source references:
- sources/ethers/docs.wrm/basics/abi.wrm
- sources/ethers/docs.wrm/getting-started.wrm
- https://docs.ethers.org/v6/
-->
