---
name: tron-features-wallet-cli
description: TRON wallet-cli usage for signing, broadcasting, and querying.
---

# TRON wallet-cli

**wallet-cli** is an interactive CLI that talks to a java-tron node via gRPC. It signs and broadcasts transactions locally and queries on-chain data.

## Flow

1. Start: `java -jar wallet-cli.jar` (or `./gradlew run` from repo).
2. Register/import: `RegisterWallet <password>` or `ImportWallet`; then `Login <password>`.
3. Network: `switchnetwork` (1=MAIN, 2=NILE, 3=SHASTA); `currentnetwork` to confirm.
4. Build and sign locally; call node’s BroadcastTransaction gRPC to send.

Key management: keys in local Keystore (encrypted); no keys sent to node.

## Command groups

- **Key management**: Logout, LoginAll, BackupWallet, getAddress.
- **Accounts**: getaccount, getbalance, createaccount (via commands that create txs).
- **Resources**: freezeBalanceV2, unfreezeBalanceV2, delegateResource.
- **Transactions**: SendCoin (TRX), TransferAsset (TRC-10); then broadcast.
- **Contracts**: deploy and trigger via CLI commands that map to gRPC.
- **Governance**: vote, listwitnesses, etc.
- **DEX**: ExchangeCreate, ExchangeTransaction, etc.

## Usage for agents

- Use wallet-cli when the agent drives a local node and must sign with a local keystore (e.g. testing, scripts). For dApps or backend services, use HTTP/JSON-RPC + external signer (TronWeb, Trident, etc.).
- getaccount &lt;address&gt;, getbalance for balances; createaccount and transfer flows require building tx, signing, then broadcasting.
- Build and run from [wallet-cli repo](https://github.com/tronprotocol/wallet-cli); detailed command list in its docs.

<!--
Source references:
- sources/tron/docs/clients/wallet-cli.md
- sources/tron/docs/getting_started/getting_started_with_javatron.md
-->
