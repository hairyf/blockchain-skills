---
name: axelar-core-nexus
description: Nexus module — chains, assets, cross-chain transfers, deposit addresses, rate limits
metadata:
  author: hairy
---

# Nexus Module

The **nexus** module is the central registry for chains and assets and tracks cross-chain transfers and general messages. Use it to query chains, assets, deposit addresses, transfer fees, and rate limits.

## Chains and assets

- **Chains**: Registered chain names and status (activated/deactivated). Filter by status when listing.
- **Assets**: Per-chain registered assets (denom, native flag). One asset can be registered on multiple chains.

```bash
# List all registered chains (optional: --status activated)
axelard query nexus chains --node $NODE -o json

# Assets for a chain
axelard query nexus assets [chain] --node $NODE -o json

# Chains that have a given asset
axelard query nexus chain-by-asset [asset] --node $NODE -o json
```

## Cross-chain transfers

- **CrossChainTransfer**: Recipient (chain + address), asset (denom + amount), transfer ID, state (Pending, Archived, InsufficientAmount, TransferFailed).
- **Transfer direction**: From a chain (outbound) or to a chain (inbound).

```bash
# Transfers for a chain; state = pending | archived | insufficient_amount
axelard query nexus transfers-for-chain [chain] [state] --node $NODE -o json

# Transfer fee for a path
axelard query nexus transfer-fee [source-chain] [destination-chain] [amount] --node $NODE -o json
```

## Deposit address

For a given recipient (chain + address), the nexus can derive a **deposit address** on another chain. Sending assets to that deposit address triggers a cross-chain transfer to the recipient.

```bash
# Latest deposit address: [deposit chain] [recipient chain] [recipient address]
axelard query nexus latest-deposit-address [deposit-chain] [recipient-chain] [recipient-address] --node $NODE -o json

# Reverse: which recipient corresponds to a deposit address
axelard query nexus recipient-address [chain] [address] --node $NODE -o json
```

## Rate limits and fees

- **Transfer rate limit**: Per (chain, asset), a limit and a time window. Queried and set by chain maintainers or governance.

```bash
# Query rate limit
axelard query nexus transfer-rate-limit [chain] [asset] --node $NODE -o json

# Set rate limit (tx: chain maintainer or authorized); [chain] [limit] [window]
axelard tx nexus set-transfer-rate-limit [chain] [limit] [window] --from $KEY --node $NODE -y
```

- **Fee info**: Per-chain, per-asset fee rate and min/max fee.

```bash
axelard query nexus fee-info [chain] [asset] --node $NODE -o json
```

- **Register asset fee** (governance/maintainer): `axelard tx nexus register-asset-fee [chain] [asset] [fee-rate] [min-fee] [max-fee] --from $KEY -y`

## Chain maintainers

Validators can register as chain maintainers for specific chains (e.g. to set rate limits or handle routing).

```bash
axelard query nexus chain-maintainers [chain] --node $NODE -o json
axelard tx nexus register-chain-maintainer [chain]... --from $KEY -y
axelard tx nexus deregister-chain-maintainer [chain]... --from $KEY -y
```

## General messages

- **GeneralMessage**: Cross-chain message with sender, recipient (CrossChainAddress), payload hash, status (Approved, Processing, Executed, Failed), optional asset, source tx id/index.
- Query by message ID: `axelard query nexus message [id] --node $NODE -o json`

## Params

```bash
axelard query nexus params --node $NODE -o json
```

<!--
Source references:
- https://github.com/axelarnetwork/axelar-core (docs/cli, proto/axelar/nexus)
- proto/axelar/nexus/exported/v1beta1/types.proto
-->
