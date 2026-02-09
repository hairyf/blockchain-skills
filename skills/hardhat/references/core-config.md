---
name: hardhat-config
description: hardhat.config.js/ts, networks, solidity, paths, mocha.
---

# Hardhat Configuration

Config is the closest `hardhat.config.js` (or `.ts`) from CWD. Export an object with `defaultNetwork`, `networks`, `solidity`, `paths`, `mocha`, and plugin usage.

## Basic shape

```javascript
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: { /* optional overrides for in-process network */ },
    localhost: { url: "http://127.0.0.1:8545" },
    sepolia: {
      url: "https://sepolia.infura.io/v3/<key>",
      accounts: [privateKey1, privateKey2],
    },
  },
  solidity: {
    version: "0.8.28",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  paths: { sources: "./contracts", tests: "./test", cache: "./cache", artifacts: "./artifacts" },
  mocha: { timeout: 40000 },
};
```

## Networks

- **hardhat**: Built-in in-process network; optional config (chainId, forking, etc.).
- **JSON-RPC networks**: `url` (required), optional `chainId`, `accounts` (array of hex private keys or `"remote"`), `gas`, `gasPrice`, `gasMultiplier`, `httpHeaders`, `timeout`.
- **HD wallet:** set `accounts: { mnemonic: "...", path: "m/44'/60'/0'/0", initialIndex: 0, count: 20, passphrase: "" }`.
- **defaultNetwork**: If omitted, default is `"hardhat"`.

## Solidity

- **Single compiler:** `solidity: "0.8.28"` or `solidity: { version: "0.8.28", settings: { ... } }`. `settings` follows [solc Input JSON](https://docs.soliditylang.org/en/latest/using-the-compiler.html#input-description).
- **Multiple compilers:** `solidity: { compilers: [ {...}, {...} ], overrides: { "contracts/Foo.sol": { version: "0.7.6" } } }`.
- **EVM version:** e.g. `settings: { evmVersion: "shanghai" }`. Hardhat defaults to `paris` for 0.8.20+ (avoids PUSH0 on chains that don’t support it).

## Paths

All relative to project root (directory of config file): `sources`, `tests`, `cache`, `artifacts`. Override only what you need.

## Mocha

`mocha` accepts standard Mocha options (e.g. `timeout`) for `hardhat test`.

## Key points

- Config runs before every task; safe to require plugins or other tooling here.
- TypeScript: use `defineConfig` and `import` in `hardhat.config.ts`; ensure ts-node or equivalent is available.

<!--
Source references:
- https://hardhat.org/hardhat-runner/docs/config
- https://hardhat.org/hardhat-network/docs/reference#config
-->
