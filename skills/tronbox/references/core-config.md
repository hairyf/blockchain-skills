---
name: TronBox configuration
description: Configuration file (tronbox.js / tronbox-evm-config.js), paths, networks, and compiler options.
---

# TronBox Configuration

TronBox is configured via a JavaScript file in the project root. Config is resolved with `find-up` from the current working directory.

## Config file names

- **TVM (default):** `tronbox.js` or `tronbox-config.js` (Windows/Command Prompt fallback).
- **EVM:** `tronbox-evm-config.js`. Used when running commands with `--evm`.

Config is loaded with `Config.detect(options)`; when `options.evm` is true, only `tronbox-evm-config.js` is searched.

## Export shape

The file must export an object that can be merged into the config (e.g. `config.merge(static_config)`). Important top-level keys:

- **networks** (required): `{ [networkName: string]: NetworkConfig }`
- **solc** or **compilers.solc**: compiler settings (see below)
- **build_directory**, **contracts_directory**, **contracts_build_directory**, **migrations_directory**, **test_directory**: optional path overrides (resolved relative to config `working_directory`)

## Network config (TVM)

Per-network keys (all optional; many are getters from `network_config` and must be set under `networks[name]`, not on the root config):

| Key | Purpose |
|-----|--------|
| `privateKey` | Hex private key (no `0x`) for deployment/signing |
| `mnemonic`, `path` | Alternative to privateKey; TronWeb derives key |
| `fullHost` | TRON API base URL (e.g. `https://api.trongrid.io`, `https://api.shasta.trongrid.io`) |
| `fullNode`, `solidityNode`, `eventServer` | Legacy / override endpoints |
| `network_id` | Network identifier (e.g. `'1'` mainnet, `'2'` shasta, `'9'` development) |
| `userFeePercentage` | Resource fee (0–100) |
| `feeLimit` | Max fee (e.g. `1000 * 1e6`) |
| `originEnergyLimit` | Energy limit for contract execution |
| `callValue` | TRX to send with calls |
| `tokenValue`, `tokenId` | Token payment params |

Example:

```javascript
module.exports = {
  networks: {
    development: {
      privateKey: '0000...0001',
      userFeePercentage: 0,
      feeLimit: 1000 * 1e6,
      fullHost: 'http://127.0.0.1:9090',
      network_id: '9'
    },
    shasta: {
      privateKey: process.env.PRIVATE_KEY,
      userFeePercentage: 50,
      feeLimit: 1000 * 1e6,
      fullHost: 'https://api.shasta.trongrid.io',
      network_id: '2'
    }
  },
  solc: { /* optimizer, evmVersion, etc. */ }
};
```

## Compiler config

- **TVM:** use top-level `solc` (e.g. `optimizer`, `runs`, `evmVersion`). Solidity version can also be set per network under `networks[].compilers.solc.version` in some flows, but the main compile path uses root-level `solc` and `compilers.solc`.
- **EVM:** use `compilers.solc` with `version` and optional `settings`:

```javascript
compilers: {
  solc: {
    version: '0.8.6',
    settings: { optimizer: { enabled: true, runs: 200 }, evmVersion: 'istanbul' }
  }
}
```

## Default paths (relative to working directory)

- `build_directory`: `build`
- `contracts_directory`: `contracts`
- `contracts_build_directory`: `build/contracts`
- `migrations_directory`: `migrations`
- `test_directory`: `test`

## Usage for agents

- When generating or editing a TronBox project, ensure `networks` exists and the target network has `network_id` and either `privateKey`/`mnemonic` and `fullHost` (TVM) or EVM-compatible options.
- Use `tronbox-evm-config.js` and `--evm` for EVM chain (e.g. BTTC); use `tronbox.js` and no `--evm` for TVM.
- Do not set `config.network_id` or `config.privateKey` directly; set them under `config.networks[networkName]`.

<!--
Source references:
- sources/tronbox/src/components/Config.js
- sources/tronbox/README.md
- sources/tronbox/test/evm/tronbox.js, test/evm/tronbox-evm-config.js
-->
