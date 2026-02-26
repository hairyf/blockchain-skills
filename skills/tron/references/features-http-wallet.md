---
name: tron-features-http-wallet
description: Key TRON HTTP wallet APIs for accounts, transactions, and broadcasting.
---

# TRON HTTP Wallet APIs

High-value HTTP endpoints for building and sending transactions and querying accounts.

## Account

- **wallet/validateaddress**: Validate address (HexString, Base58Check, or base64). Use before sending.
- **wallet/createaccount**: Create (activate) account; returns unsigned tx. Params: owner_address, account_address; optional permission_id, visible.
- **wallet/getaccount**: Full account (balance, resources, permissions, assets). Params: address, optional visible.
- **wallet/updateaccount**: Set account name; returns unsigned tx.
- **wallet/accountpermissionupdate**: Change permission structure; returns unsigned tx.

## Transfer and broadcast

- **wallet/createtransaction**: TRX transfer. Params: owner_address, to_address, amount (sun); optional visible. Returns unsigned Transaction.
- **wallet/broadcasttransaction**: Submit signed transaction (hex or JSON). Returns result and txid.

## Contract

- **wallet/deploycontract**: Deploy contract. Params: owner_address, abi, bytecode, name, fee_limit, origin_energy_limit, etc.
- **wallet/triggersmartcontract**: Call contract. Params: owner_address, contract_address, function_selector (4-byte), parameter (hex), call_value, fee_limit.
- **wallet/triggerconstantcontract**: Call view/pure without broadcasting; returns return value.

## Resources and voting

- **wallet/getaccountresource**: Bandwidth, Energy, TP usage/limits.
- **wallet/freezebalancev2**, **wallet/unfreezebalancev2**: Stake/unstake for Bandwidth or Energy.
- **wallet/votewitnessaccount**: Vote for SRs; params: owner_address, votes [{vote_address, vote_count}].

## Usage for agents

- Always set `visible` consistently (false = HexString, true = Base58Check). Use HexString for server/server flows.
- Flow: create (e.g. createtransaction/createaccount/triggersmartcontract) → sign locally → broadcasttransaction. Never send private keys to the node.
- For contract reads use triggerconstantcontract; for writes use triggersmartcontract + broadcast.

<!--
Source references:
- sources/tron/docs/api/http.md
-->
