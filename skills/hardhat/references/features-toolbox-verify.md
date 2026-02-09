---
name: hardhat-toolbox-verify
description: Hardhat Toolbox (ethers vs viem), contract verification plugin.
---

# Hardhat Toolbox and Verification

## Toolbox

Two main stacks:

- **@nomicfoundation/hardhat-toolbox** – Ethers.js v6, Mocha, Chai matchers, network-helpers, Ignition (ethers), TypeChain, Solidity stack traces.
- **@nomicfoundation/hardhat-toolbox-viem** – Same but with Viem instead of Ethers; use `hre.viem` and Viem-based Ignition.

Install one per project. In config: `require("@nomicfoundation/hardhat-toolbox")` or use the viem toolbox. Use `hre.ethers.getSigners()`, `getContractFactory`, etc., or the Viem equivalents when using viem toolbox.

## Contract verification (@nomicfoundation/hardhat-verify)

Verify contracts on Etherscan (or compatible explorers):

1. Add plugin and set network URLs + explorer API key in config.
2. After deploy, run:

```bash
npx hardhat verify --network <network> <contractAddress> <constructorArg1> <constructorArg2> ...
```

Or use the programmatic API in a script/task. Config example:

```javascript
networks: {
  sepolia: { url: "...", accounts: [...] },
},
etherscan: {
  apiKey: { sepolia: "<ETHERSCAN_API_KEY>" },
},
```

For custom chains, set `etherscan.customChains` with `network`, `chainId`, and `urls.apiURL` / `urls.browserURL`.

## Key points

- Toolbox pulls in Ethers (or Viem), Ignition, Chai matchers, network-helpers; no need to wire them manually.
- Verification requires correct constructor args and network; use same compiler settings as deploy.

<!--
Source references:
- https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-toolbox
- https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-toolbox-viem
- https://hardhat.org/hardhat-runner/docs/guides/verifying
- https://hardhat.org/hardhat-verify/docs
-->
