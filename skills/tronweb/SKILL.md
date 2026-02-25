---
name: tronweb
description: TronWeb — JavaScript/TypeScript SDK for TRON (HTTP API, contracts, transactions, events).
metadata:
  author: Hairy
  version: "2026.1.1"
  source: Generated from https://github.com/tronprotocol/tronweb, scripts located at https://github.com/antfu/skills
---

> Skill is based on TronWeb v6.2.0, generated at 2026-02-25.

TronWeb is the official JavaScript/TypeScript SDK for the TRON network. It wraps the TRON HTTP API and provides a consistent API for accounts, blocks, transactions, smart contracts, and events. Use it in Node.js or the browser to build DApps, sign and broadcast transactions, and call contracts.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Instance setup | fullHost, nodes, headers, privateKey, setPrivateKey/setAddress | [core-instance-setup](references/core-instance-setup.md) |
| Address, units, encoding | hex/base58/checksum, toSun/fromSun, fromUtf8/toUtf8, sha3 | [core-address-units](references/core-address-units.md) |
| Trx | Blocks, transactions, accounts, bandwidth, sign, broadcast, getCurrentRefBlockParams, signTypedData, ecRecover | [core-trx](references/core-trx.md) |
| Utils | ABI, transaction, deserializeTx, accounts, address, validations | [core-utils](references/core-utils.md) |

## Features

### Transactions and contracts

| Topic | Description | Reference |
|-------|-------------|-----------|
| TransactionBuilder | sendTrx, sendToken, freeze/unfreeze, triggerSmartContract, createSmartContract, deployConstantContract | [features-transaction-builder](references/features-transaction-builder.md) |
| Contract | contract(abi, address), methods.call/send, decodeInput, new(), at() | [features-contract](references/features-contract.md) |
| Events | getEventsByContractAddress, getEventsByTransactionID, getEventsByBlockNumber, setServer | [features-events](references/features-events.md) |

### Best practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Errors and typing | Error instances (e.message), ABI as const for contract inference | [best-practices-errors-typing](references/best-practices-errors-typing.md) |
