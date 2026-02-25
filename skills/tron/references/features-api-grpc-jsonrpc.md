---
name: tron-features-api-grpc-jsonrpc
description: TRON node APIs — gRPC (protocol buffers) vs HTTP wallet vs JSON-RPC (Ethereum-compatible); when to use each.
---

# TRON API Interfaces

TRON nodes expose three main API surfaces: **HTTP wallet API**, **gRPC**, and **JSON-RPC**. Choose by client stack and use case.

## HTTP Wallet API

- **Base**: `http://host:port/wallet/<method>` (e.g. `wallet/getaccount`, `wallet/triggersmartcontract`).
- **Format**: JSON request/response; addresses as HexString by default (`visible: false`), or Base58Check with `visible: true`.
- **Use when**: Building and broadcasting transactions from scripts or backends; same semantics as gRPC.
- **Reference**: [features-http-wallet](features-http-wallet.md).

## gRPC API

- **Definition**: [api.proto](https://github.com/tronprotocol/protocol/blob/master/api/api.proto). FullNode and (legacy) SolidityNode RPCs; SolidityNode is deprecated — use FullNode for all RPCs.
- **Typical calls**: `GetAccount`, `CreateTransaction`, `BroadcastTransaction`, `DeployContract`, `TriggerContract`, `FreezeBalanceV2`, `UnfreezeBalanceV2`, `DelegateResource`, `GetNowBlock`, `GetBlockByNum`, `GetTransactionInfoById`, `GetBandwidthPrices`, `GetEnergyPrices`, `GetTransactionFromPending`, etc.
- **Use when**: High-throughput or binary clients; wallet-cli and Java backends (e.g. Trident) use gRPC.
- **Flow**: Build request (protobuf) → get unsigned `Transaction` or `TransactionExtention` → sign locally → `BroadcastTransaction`.

## JSON-RPC API

- **Compatibility**: Ethereum-style JSON-RPC; many `eth_*` and `net_*`, `web3_*` methods. Chain-specific differences (e.g. no gas; energy used instead; address encoding).
- **Enable**: In node config, e.g. `node.jsonrpc { httpFullNodeEnable = true; httpFullNodePort = 50545 }`.
- **Encoding**: QUANTITIES — hex with `0x`, compact (no leading zeros). UNFORMATTED DATA (addresses, hashes, bytecode) — hex with `0x`, two hex digits per byte.
- **Key methods**: `eth_blockNumber`, `eth_getBalance`, `eth_call`, `eth_estimateGas` (energy), `eth_gasPrice` (energy price in sun), `eth_getBlockByNumber`/`ByHash`, `eth_getTransactionByHash`, `eth_getTransactionReceipt`, `eth_getCode`, `eth_getStorageAt`, `eth_getLogs` / `eth_newFilter` + `eth_getFilterChanges`, `eth_chainId`, `net_version`, `web3_sha3`.
- **TRON-specific**: `buildTransaction` with params for `TransferContract`, `TransferAssetContract`, `CreateSmartContract`, `TriggerSmartContract` — returns unsigned transaction for signing and broadcast elsewhere.
- **Use when**: Reusing Ethereum tooling (e.g. ethers.js, web3.js) or existing JSON-RPC pipelines; event logs via `eth_getLogs` / filters.

## Usage for agents

- **Send TRX / call contract / deploy**: Prefer HTTP `wallet/*` or gRPC for clear TRON types; use JSON-RPC `buildTransaction` + external sign + broadcast if the stack is already JSON-RPC.
- **Read-only (balance, block, receipt, logs)**: Any of the three; JSON-RPC suits eth-compatible clients.
- **Address format**: HTTP/gRPC use HexString (e.g. `41...`) or Base58Check per `visible`; JSON-RPC often uses 20-byte or 21-byte hex; confirm per method.
- **Energy/fee**: Use `eth_estimateGas` for contract energy; set `fee_limit` (or equivalent) when building contract txs to cap TRX burn.

<!--
Source references:
- sources/tron/docs/api/rpc.md
- sources/tron/docs/api/json-rpc.md
-->
