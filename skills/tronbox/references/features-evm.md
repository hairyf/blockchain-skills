---
name: TronBox EVM mode
description: Using TronBox with EVM-compatible chains (e.g. BTTC), ethers, and tronbox-evm-config.js.
---

# TronBox EVM Mode

TronBox can target EVM-compatible chains (e.g. BTTC) instead of the native TRON Virtual Machine (TVM). In EVM mode, the stack uses ethers v6 and a separate config file.

## Enabling EVM mode

- **Config file:** Use `tronbox-evm-config.js` in the project root. When any command is run with **--evm**, only this file is loaded (not `tronbox.js`).
- **CLI flag:** Pass `--evm` on compile, migrate, test, and console.

Example:

```bash
tronbox migrate --network bttc --evm
tronbox test --evm
tronbox console --evm
```

## EVM config shape

- **networks** – Same key, but per-network options use EVM semantics: `fullHost` as RPC URL (e.g. `https://rpc.bt.io`), `gas`, `gasPrice`, `network_id`, `privateKey`.
- **compilers.solc** – `version` and optional `settings` (e.g. `optimizer`, `evmVersion`).

Example `tronbox-evm-config.js`:

```javascript
module.exports = {
  networks: {
    bttc: {
      privateKey: process.env.PRIVATE_KEY_BTTC,
      fullHost: 'https://rpc.bt.io',
      gas: 8500000,
      gasPrice: '500000000000000',
      network_id: '1'
    },
    development: {
      privateKey: process.env.PRIVATE_KEY_DEV,
      fullHost: 'http://127.0.0.1:8545',
      network_id: '9'
    }
  },
  compilers: {
    solc: {
      version: '0.8.6',
      settings: { /* optimizer, evmVersion */ }
    }
  }
};
```

## Migrations and tests in EVM mode

- **deployer.deploy(Contract, ...args, options)** – Last argument can include `value` (and other ethers tx overrides) for EVM.
- **Contract abstractions** – Use ethers under the hood; same `artifacts.require`, `.deployed()`, `.at()`, `.new()`.
- **Context:** Migration and test context expose **ethers** when in EVM mode; use it for custom provider/signer logic if needed.

## Version note

From TronBox 4.5.0, EVM mode uses **ethers v6** (replacing web3 v4). Migration scripts, tests, and console use ethers in EVM mode.

## Usage for agents

- For EVM chains, create `tronbox-evm-config.js` and always pass `--evm` for compile/migrate/test/console.
- Do not mix TVM and EVM config: use one config file per mode and the appropriate flag.
- When generating migration or test code for EVM, use ethers-compatible patterns (e.g. `value` in wei, gas options).

<!--
Source references:
- sources/tronbox/src/components/Config.js (EVM_CONFIG_FILENAME, options.evm)
- sources/tronbox/test/evm/tronbox-evm-config.js
- sources/tronbox/CHANGELOG.md (4.5.0, 4.0.0)
-->
