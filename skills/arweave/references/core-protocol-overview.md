---
name: core-protocol-overview
description: Arweave protocol and Blockweave — permanent storage, AR/winston units, node vs gateway.
---

# Arweave Protocol Overview

Arweave is a distributed, cryptographically verified permanent archive backed by a cryptocurrency. Data is stored in a decentralised, peer-to-peer manner with miners incentivised to store rare data.

## Key Concepts

- **Blockweave**: Datastructure linking blocks; miners store and replicate data.
- **AR**: Native token; smallest unit is **winston** (1 AR = 1,000,000,000,000 winston). All API amounts (balance, reward, quantity, price) are in winston; use string type for interoperability (e.g. JavaScript cannot safely represent full winston range as number).
- **Node**: Participates in the network (sync, mine, serve HTTP API). Default HTTP port often 1984.
- **Gateway**: Node configured to serve content by domain (e.g. permaweb apps, custom domains).

## Usage

When implementing clients or agents:

- Treat monetary and size-related values as **strings** in winston.
- Use **base64url** for transaction IDs, block hashes, wallet addresses, and binary fields (owner, signature, data) in the HTTP API.
- Distinguish **indep_hash** (block identifier for requests) from **hash** (internal); use `indep_hash` for `/block/hash/{block_id}`.

## Key Points

- Permanent storage: data in transactions is stored on the weave and can be retrieved by transaction ID.
- Financial transactions: set `target` and `quantity` (winston string), leave `data` empty.
- Data transactions: set `data` (base64url), leave `target` and `quantity` empty or zero.
- Price endpoint is pessimistic (reports as if difficulty were one step lower) to account for possible retarget.

<!--
Source references:
- https://github.com/ArweaveTeam/arweave (README.md)
- https://yellow-paper.arweave.dev
-->
