---
name: TRON compilation
description: Compile Solidity for TRON with tronSolc—enable, filter, compilers, and optional remapping.
---

# Compilation

The TRON plugin uses `tronSolc` to produce TRON-compatible bytecode. Compiler versions in `tronSolc.compilers` must match entries in `solidity.compilers`.

## Config shape

```javascript
tronSolc: {
  enable: true,
  filter: [],           // compile all; or list contract names to limit
  compilers: [{ version: '0.8.23' }],
  // Optional: remap solc version, e.g. [['0.8.22', '0.8.23']]
},
```

## Commands

- `npx hardhat compile` — compile contracts for TRON using the above config.

## Key points

- Use a TRON-supported Solidity version (e.g. `0.8.23`).
- Use `filter: []` to compile all contracts, or an array of contract names to restrict.
- Optional remapping lets you map a requested version to another (e.g. use 0.8.23 when 0.8.22 is requested).

<!--
Source references:
- https://github.com/aziz1975/layerzero-hardhat-tron (README, hardhat.config.cjs)
- https://www.npmjs.com/package/@layerzerolabs/hardhat-tron
-->
