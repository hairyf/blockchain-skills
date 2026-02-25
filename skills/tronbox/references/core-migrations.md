---
name: TronBox migrations and deployer
description: Migration scripts, deployer API (deploy, link, then), and migration context (artifacts, tronWeb, ethers).
---

# TronBox Migrations and Deployer

Migrations are numbered scripts in the `migrations/` directory that run in order to deploy and link contracts.

## Migration files

- **Location:** `migrations_directory` (default `migrations/`).
- **Naming:** Prefix with a number; extension `.js` or `.es`/`.es6`. Example: `1_initial_migration.js`, `2_deploy_contracts.js`.
- **Sorting:** Sorted by the numeric prefix; only migrations after the last completed one are run (unless `--reset`).

## Migration function signature

Each migration file is executed in a VM context and must export a function that receives the deployer (and optionally other args). The function can be sync or async (return a Promise).

```javascript
module.exports = async function (deployer) {
  await deployer.deploy(MyContract, ...constructorArgs);
  await deployer.deploy(Lib);
  deployer.link(Lib, Consumer);
  await deployer.deploy(Consumer, ...args);
};
```

The migration is invoked as `fn(deployer, options.network, options.networks[options.network].from)`.

## Context in migration files

The following are injected into the migration script context (so you can use them without requiring):

- **deployer** – Deployer instance (passed as the first argument).
- **artifacts** – Resolver: use `artifacts.require('ContractName')` to get contract abstractions (same as in tests).
- **tronWrap** / **tronWeb** – TronWrap (TronWeb) instance for the current network.
- **waitForTransactionReceipt** – Helper bound to tronWrap for waiting for a tx receipt.
- **ethers** – (EVM only) The `ethers` object from the TronWrap/ethers integration.

## Deployer API

- **deploy(contract, ...args)** – Deploy a single contract. `contract` is from `artifacts.require('Name')`. Optional last argument can be an options object (e.g. `feeLimit`, `userFeePercentage`, or EVM `value`).
- **deploy([contract, ...args], [contract2, ...])** – Deploy multiple contracts (deployMany).
- **link(library, destinations)** – Link a deployed library to one or more contract names/abstractions. `destinations` can be a single contract or array.
- **then(fn)** – Queue a custom step; `fn` receives the deployer. Use for one-off deployment logic or ordering.

All of these return a thenable and can be awaited. Steps are run in sequence.

Example (EVM-style with constructor args and value):

```javascript
const MyContract1 = artifacts.require('./MyContract1.sol');
const MyContract2 = artifacts.require('./MyContract2.sol');
const ConvertLib = artifacts.require('./ConvertLib.sol');
const MetaCoin = artifacts.require('./MetaCoin.sol');

module.exports = async function (deployer) {
  await deployer.deploy(MyContract1, 1);
  await deployer.deploy(MyContract2, 2, { value: 1 });
  await deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  await deployer.deploy(MetaCoin, 10000);
};
```

## Migrations contract (optional)

TronBox can optionally use a `Migrations` contract to record the last completed migration number. If `artifacts.require('Migrations')` exists and is deployed, after each migration it will call `setCompleted(number)`. Projects can run without a Migrations contract; the runner will skip the “Saving successful migration to network” step if Migrations is not required or not deployed.

## Running migrations

- **tronbox migrate** – Run pending migrations on the selected network (default: development if present).
- **tronbox migrate --network &lt;name&gt;** – Use the given network from config.
- **tronbox migrate --reset** – Re-run all migrations from the start.
- **tronbox migrate --from N** – Run from migration number N.
- **tronbox migrate --to N** – Run only up to migration number N.
- **tronbox migrate --evm** – Use EVM config and ethers.

Before running, the migrate command compiles contracts and runs `Environment.detect`; ensure the chosen network has a valid `network_id` and credentials.

## Usage for agents

- Use `artifacts.require('ContractName')` or `artifacts.require('./Path.sol')` in migrations; do not require from disk paths for contract abstractions.
- For libraries, deploy the library first, then `deployer.link(Library, Consumer)` before deploying the consumer.
- Prefer async migration functions and `await deployer.deploy(...)` for clarity and correct ordering.
- When generating migrations for EVM, pass EVM options (e.g. `value`) in the last argument object; for TVM use `feeLimit`, `userFeePercentage`, etc.

<!--
Source references:
- sources/tronbox/src/components/Migrate/index.js
- sources/tronbox/src/components/Deployer/index.js
- sources/tronbox/src/components/Require.js
- sources/tronbox/test/evm/migrations/2_deploy_contracts.js
-->
