---
name: TronBox environment and network selection
description: Environment.detect, default network, from/network_id requirements, and common errors.
---

# TronBox Environment and Network Selection

Before migrate, test, or console, TronBox runs **Environment.detect(config, callback)** to set the resolver, artifactor, network, and deployer “from” address. Understanding this avoids “No network specified” and “Unknown network” errors when scripting or debugging.

## Default network

- If **config.network** is not set and **config.networks.development** exists, **config.network** is set to `'development'`.
- For **test**, the command also falls back to **config.networks.test** if development is missing.
- If neither is set, commands that need a network call the callback with an error.

## Requirements

- **config.networks** must exist.
- **config.network** must be set (by CLI `--network` or the default above).
- **config.networks[config.network]** must exist, otherwise: *Unknown network "X". See your tronbox configuration file for available networks.*
- **config.networks[config.network].network_id** must be set, otherwise: *You must specify a network_id in your 'X' configuration in order to use this network.*

## From address

If **config.from** is not set, Environment.detect calls **tronWrap._getAccounts()** and sets **config.networks[config.network].from** to the first account and **config.networks[config.network].privateKey** from TronWrap’s mapping. So the deployer/signer is the first account of the connected network when `from` is omitted.

## Resolver and artifactor

If **config.resolver** is missing, it is set to **new Resolver(config)**. If **config.artifactor** is missing, it is set to **new Artifactor(config.contracts_build_directory)**. Migrate and test depend on these.

## Usage for agents

- When generating or validating tronbox config, ensure the target network has **network_id** and either **privateKey** or **fullHost** (and let TronWrap supply **from** if needed).
- If a user sees “No network specified”, add or select a network (e.g. `development` or `test`) and ensure it has **network_id**.
- If they see “Unknown network”, the name in `--network` or the default must exist under **networks** in the correct config file (tronbox.js vs tronbox-evm-config.js for EVM).

<!--
Source references:
- sources/tronbox/src/lib/environment.js
- sources/tronbox/src/lib/commands/migrate.js
- sources/tronbox/src/lib/commands/test.js
-->
