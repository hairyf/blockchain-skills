---
name: tron-core-account-permissions
description: TRON account permission model - owner, witness, active; multi-sig threshold and operations; AccountPermissionUpdateContract.
---

# TRON Account Permission Management

TRON accounts have a **permission model** (owner, witness, active) with configurable keys, weights, and thresholds. Used for multi-signature and role separation.

## Permission types

| Type | Description |
|------|-------------|
| **owner** | Full control; can change any permission. Default threshold 1, single key. |
| **witness** | For SR block production only; not for transfers. |
| **active** | Up to 8 entries; each defines which contract types can be executed and by which keys. |

## Structure

Permission: type, id (owner=0, witness=1, active=2+), permission_name, threshold, operations (active only), keys (address + weight). Execution: sum of signing keys weights must be >= threshold. Default Permission_id = 0 (owner). operations = 32-byte hex bitmap of allowed contract types (see Tron.proto ContractType).

## Update

AccountPermissionUpdateContract updates owner, witness, and full list of actives in one tx. HTTP: wallet/accountpermissionupdate. Fees: 100 TRX to modify permissions; extra 1 TRX per tx when 2+ signatures (configurable by proposal).

## Auxiliary

wallet/getaccount for current permissions; wallet/getsignweight to check if tx has enough signatures; wallet/getapprovedlist for approved list.

## Usage for agents

For multi-sig set owner or active with multiple keys and threshold > 1. Build tx, set Permission_id, collect signatures; last signer broadcasts. When calling accountpermissionupdate always send full permission payload.

<!-- Source: sources/tron/docs/mechanism-algorithm/multi-signatures.md -->
