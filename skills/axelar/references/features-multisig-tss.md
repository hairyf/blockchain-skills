---
name: axelar-features-multisig-tss
description: Multisig and TSS — keygen, key ID per chain, rotation, vald signing
metadata:
  author: hairy
---

# Multisig and TSS

Axelar uses **TSS (Threshold Signature Scheme)** so that validators jointly control gateway keys per chain. The **multisig** module tracks key IDs and keygen sessions; the **tss** module holds TSS params and heartbeats. **vald** is the validator process that participates in keygen and signs commands.

## Key ID and keygen

- Each chain has an assigned **key ID** (and optionally a next key for rotation). Keygen produces a new multisig key; validators opt in/out of keygen.

```bash
# Key ID for a chain
axelard query multisig key-id [chain] --node $NODE -o json

# Next key ID for rotation (chain + key role)
axelard query multisig next-key-id [chain] --node $NODE -o json

# Keygen session for a key ID
axelard query multisig keygen-session [key-id] --node $NODE -o json

# Key details (public key etc.)
axelard query multisig key [key-id] --node $NODE -o json
```

## Keygen transactions

- **Start keygen**: Initiate key generation for a key role (e.g. for a new chain or rotation).
- **Opt-in / opt-out**: Validators (via proxy address) opt in or out of future keygens.

```bash
axelard tx multisig keygen start ... --from $KEY -y
axelard tx multisig keygen opt-in --from $KEY -y
axelard tx multisig keygen opt-out --from $KEY -y
```

## Rotation

- Rotate a chain to a new key ID. After rotation, new gateway commands use the new key; confirm operatorship on EVM via `confirm-transfer-operatorship`.

```bash
axelard query multisig next-key-id [chain] --node $NODE -o json
axelard tx multisig rotate [chain] [keyID] --from $KEY -y
```

## TSS params and heartbeat

- TSS module params (e.g. thresholds, key requirements) and validator heartbeats.

```bash
axelard query tss params --node $NODE -o json
axelard tx tss heart-beat --from $KEY -y
axelard tx tss update-params ... --from $KEY -y
```

## Vald (validator daemon)

- **vald-start**: Run the vald process (participates in keygen and signing).
- **vald-sign**: Sign a hash with the key for a given key ID and validator (for testing or scripting).

```bash
axelard vald-start   # long-running
axelard vald-sign [key-id] [validator-addr] [hash]
```

## Snapshot and proxy

- Validators use a **proxy** address for multisig/TSS operations; snapshot module maps operator ↔ proxy.

```bash
axelard query snapshot proxy [operator-address] --node $NODE -o json
axelard query snapshot operator [proxy-address] --node $NODE -o json
axelard tx snapshot register-proxy [proxy-address] --from $KEY -y
axelard tx snapshot deactivate-proxy --from $KEY -y
```

<!--
Source references:
- https://github.com/axelarnetwork/axelar-core (docs/cli, x/multisig, x/tss, vald)
- proto/axelar/tss/exported/v1beta1/types.proto
-->
