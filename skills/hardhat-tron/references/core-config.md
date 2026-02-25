---
name: Hardhat TRON config
description: Configure Hardhat for TRON—plugin, solidity/tronSolc version alignment, networks (Nile), and env vars.
---

# Config

Use `@layerzerolabs/hardhat-tron` with **Hardhat v2** (must be 2.x; Hardhat 3 is not compatible). Every `tronSolc.compilers` version must also appear in `solidity.compilers` (plugin requirement). Use a TRON-supported Solidity version (e.g. `0.8.23`).

## Dependency versions

| Package | Version | Notes |
|---------|---------|-------|
| hardhat | ^2.26.3 | **Must be v2**; v3 not supported |
| @layerzerolabs/hardhat-tron | ^3.0.124 | TRON compile & network plugin |
| @layerzerolabs/hardhat-deploy | ^0.11.45-lz.4 | Deploy scripts |
| @nomicfoundation/hardhat-toolbox | ^6.1.0 | Toolbox |
| dotenv | ^17.2.1 | Env vars |

## Example config

```javascript
require('dotenv').config();
require('@layerzerolabs/hardhat-deploy');
require('@layerzerolabs/hardhat-tron');
require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: {
    compilers: [{ version: '0.8.23' }],
  },
  tronSolc: {
    enable: true,
    filter: [],
    compilers: [{ version: '0.8.23' }],
  },
  namedAccounts: { deployer: 0 },
  networks: {
    nile: {
      url: "https://nile.trongrid.io/jsonrpc",
      accounts: [process.env.TRON_PRIVATE_KEY],
      httpHeaders: { "TRON-PRO-API-KEY": process.env.TRON_PRO_API_KEY },
      tron: true,
    },
  },
};
```

## Key points

- **solidity + tronSolc**: List the same compiler version in both; mismatch causes plugin errors.
- **networks**: TRON RPC uses `/jsonrpc` path; set `tron: true` and `httpHeaders["TRON-PRO-API-KEY"]` for TronGrid.
- **accounts**: Use `TRON_PRIVATE_KEY` from env (no 0x prefix for TRON).
- **namedAccounts**: Used by `hardhat-deploy` (e.g. `deployer: 0`).

<!--
Source references:
- https://github.com/aziz1975/layerzero-hardhat-tron (README, hardhat.config.cjs)
- https://www.npmjs.com/package/@layerzerolabs/hardhat-tron
-->
