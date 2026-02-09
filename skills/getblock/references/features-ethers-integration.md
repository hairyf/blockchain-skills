---
name: getblock-ethers-integration
description: Use GetBlock as an Ethers.js JsonRpcProvider — single line provider setup for Ethereum and EVM chains.
---

# GetBlock with Ethers.js

Use GetBlock as the RPC provider for Ethers.js (Ethereum and EVM-compatible chains).

## Setup

```javascript
const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider('https://go.getblock.io/<ACCESS_TOKEN>');

const blockNumber = await provider.getBlockNumber();
console.log('Latest Block Number:', blockNumber);
```

Replace `<ACCESS_TOKEN>` with the token from your GetBlock endpoint URL. Use the same endpoint for all `provider` calls (read, send, contract interaction). For viem or other libraries, pass the same GetBlock URL as the transport RPC URL.

<!--
Source references:
- https://github.com/GetBlock-io/getblock-docs
- guides/using-web3-libraries/ethers.js-integration.md
-->
