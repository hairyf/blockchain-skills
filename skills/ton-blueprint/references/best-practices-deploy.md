---
name: ton-blueprint-deploy-practices
description: Deploy flow, wallet options (TonConnect, deeplink, mnemonic), and env vars for mnemonic.
---

# Deploy Practices

## Recommended deploy flow

1. Compile: `code = await compile('ContractName')`.
2. Build contract instance: `Contract.createFromConfig(config, code)` (or Tact equivalent).
3. Open with provider: `provider.open(contract)`.
4. Send deploy: `contract.sendDeploy(provider.sender(), toNano('0.05'))` (or contract-specific method).
5. Wait: `await provider.waitForDeploy(contract.address)`.
6. Use opened contract for getters or further messages.

Avoid the deprecated `provider.deploy(contract, value, body, waitAttempts)`.

## Wallet / send options

When running scripts, choose how to sign and send:

- **TonConnect** (`--tonconnect`): TON Connect–compatible wallet (e.g. Tonkeeper). Not for custom network.
- **Deeplink** (`--deeplink`): Generate `ton://` link or QR for signing.
- **Mnemonic** (`--mnemonic`): Use env vars so no interactive wallet.

## Mnemonic env vars

For `--mnemonic` (or choosing “Mnemonic” interactively), set in `.env`:

- **Required:** `WALLET_MNEMONIC` (space-separated words), `WALLET_VERSION` (e.g. `v4r1`, `v5r1`).
- **Optional:** `WALLET_ID`, `SUBWALLET_NUMBER` (for v5r1), `WALLET_VERSION` one of: `v1r1`, `v1r2`, `v1r3`, `v2r1`, `v2r2`, `v3r1`, `v3r2`, `v4r1`, `v4r2`, `v5r1`.

Example non-interactive: `yarn blueprint run deployCounter --testnet --mnemonic`.

## Custom network and verify

Use `blueprint.config.ts` `network` or CLI `--custom`, `--custom-type`, `--custom-version`, `--custom-key` for custom RPC. For contract verification, custom type must be `mainnet` or `testnet`. Example: `blueprint verify ... --custom <endpoint> --custom-type mainnet --custom-key <key> --compiler-version 0.4.4-newops.1`.

<!--
Source references:
- https://github.com/ton-org/blueprint/blob/main/README.md (Deploying contracts, Using Mnemonic Provider, Custom network, Contract Verification)
-->
