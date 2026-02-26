---
name: tron-core-system-contracts
description: TRON system contract types and corresponding HTTP/gRPC APIs for building transactions.
---

# TRON System Contracts

Different transaction types are implemented as **system contracts**. Each type has a specific HTTP/gRPC API to create the unsigned transaction.

## Common system contracts and APIs

| Purpose | Contract type | HTTP API (typical) |
|--------|----------------|---------------------|
| TRX transfer | TransferContract | wallet/createtransaction |
| Create account | AccountCreateContract | wallet/createaccount |
| Update account name | AccountUpdateContract | wallet/updateaccount |
| Vote for SR | VoteWitnessContract | wallet/votewitnessaccount |
| Stake TRX | FreezeBalanceV2Contract | wallet/freezebalancev2 |
| Unstake | UnfreezeBalanceV2Contract | wallet/unfreezebalancev2 |
| Deploy contract | CreateSmartContract | wallet/deploycontract |
| Trigger contract | TriggerSmartContract | wallet/triggersmartcontract |
| TRC-10 transfer | TransferAssetContract | wallet/transferasset |
| TRC-10 issue | AssetIssueContract | wallet/createassetissue |
| DEX create pair | ExchangeCreateContract | wallet/exchangecreate |
| DEX trade | ExchangeTransactionContract | wallet/exchangetransaction |
| Account permission | AccountPermissionUpdateContract | wallet/accountpermissionupdate |

## Workflow

1. Call the appropriate API with required parameters (addresses in HexString unless `visible: true`).
2. Node returns an **unsigned transaction** (Transaction protobuf / JSON).
3. Client signs with owner’s private key (permission may require multi-sig).
4. Broadcast via `wallet/broadcasttransaction` (or gRPC `BroadcastTransaction`).

## Usage for agents

- Choose API by operation: transfer → createtransaction; account create → createaccount; contract → deploycontract / triggersmartcontract; vote → votewitnessaccount; resources → freezebalancev2 / delegateresource.
- All addresses in request/response follow `visible` (HexString vs Base58Check). Include `Permission_id` when using non-owner permissions.

<!--
Source references:
- sources/tron/docs/mechanism-algorithm/system-contracts.md
- sources/tron/docs/api/http.md
-->
