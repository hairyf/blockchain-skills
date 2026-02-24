---
name: starknet-wallet-api
description: Starknet Wallet RPC—supported versions, permissions, accounts, signing.
---

# Wallet API

The Starknet Wallet API (schema: `wallet-api/wallet_rpc.json`) is used by dApps to interact with Starknet wallets (browser extensions, mobile apps). It is separate from the node JSON-RPC; wallets implement this API for the dApp to call.

## Capability Discovery

- **wallet_supportedWalletApi** — Returns wallet API versions supported by the wallet (semver list). No params. Result: array of API_VERSION.
- **wallet_supportedSpecs** — Returns Starknet JSON-RPC spec versions supported by the wallet. No params. Result: array of SPEC_VERSION.

Use these to detect compatibility before calling account or signing methods.

## Permissions and Accounts

- **wallet_getPermissions** — Returns existing permissions for the dApp. Params: optional `api_version`. Result: array of PERMISSION or empty. Errors: API_VERSION_NOT_SUPPORTED, UNKNOWN_ERROR.
- **wallet_requestAccounts** — Requests account addresses (e.g. opens unlock/approve UI). Params: optional `silent_mode` (if true, no UI; returns empty array when locked or not approved). Result: array of account addresses. When wallet locked: unlock UI; when dApp not approved: approve UI; when connected and unlocked: return addresses.

Use `wallet_requestAccounts` to connect the dApp to the wallet and obtain addresses for display or for building transactions.

## Signing and Transactions

The schema defines further methods for signing messages and transactions (e.g. request signature for a transaction or typed data). Exact method names and params are in `wallet_rpc.json` (e.g. sign message, send transaction).

- When implementing dApp flows: (1) call `wallet_supportedSpecs` / `wallet_supportedWalletApi`, (2) call `wallet_requestAccounts`, (3) use returned addresses with the node’s Write API to build and then sign/send via wallet methods.
- Respect `silent_mode`: when true, do not expect UI; handle empty or denied responses.

## Usage for Agents

- Wallet RPC is invoked by the dApp on the wallet provider (e.g. injected `window.starknet`), not on the Starknet node.
- For agents that generate dApp code, ensure compatibility checks use `wallet_supportedSpecs` and handle version mismatches.
- Reference `wallet-api/wallet_rpc.json` for the full list of methods, params, and error codes.

<!--
Source references:
- https://github.com/starkware-libs/starknet-specs wallet-api/wallet_rpc.json
-->
