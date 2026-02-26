---
name: ton-http-api-overview
description: TON HTTP API and TON Index v3 — API groups, base URL, and Swagger for looking up request/response parameters and return values.
---

# TON HTTP API overview

The TON HTTP API is an intermediary: it receives HTTP requests and talks to TON lite servers via tonlib. You can use the public [toncenter.com](https://toncenter.com) or run your own instance from [ton-http-api](https://github.com/toncenter/ton-http-api). TON Index v3 (hosted at toncenter.com) adds indexed REST APIs over stored chain data (accounts, actions, jettons, NFTs, traces, etc.).

## Looking up request parameters and return values (for agents)

Before calling or wrapping any TON Center / TON Index endpoint, use one of these to confirm **request parameters** and **response shape**:

| Resource | URL | Use |
|----------|-----|-----|
| **Swagger UI** | [https://toncenter.com/api/v3/index.html#/](https://toncenter.com/api/v3/index.html#/) | Browse by group; see query/body and response schemas and models |
| **OpenAPI JSON** | [https://toncenter.com/api/v3/doc.json](https://toncenter.com/api/v3/doc.json) | Full OAS 2.0 spec for programmatic use |

Base URL example: `https://toncenter.com`. For self-hosted ton-http-api, use your server and port (and optional root path, e.g. `/api/v2`).

## API groups and example endpoints

### ton-http-api (sources/ton-http)

Defined in `sources/ton-http/ton-http-api/pyTON/main.py`. Responses use `{ "ok": true, "result": ... }` or `{ "ok": false, "error": "..." }`. All methods are also exposed via `POST /jsonRPC` with `method` and `params`.

| Tag | Endpoints |
|-----|-----------|
| **accounts** | `GET /getAddressInformation`, `GET /getExtendedAddressInformation`, `GET /getWalletInformation`, `GET /getTransactions`, `GET /getAddressBalance`, `GET /getAddressState`, `GET /packAddress`, `GET /unpackAddress`, `GET /getTokenData`, `GET /detectAddress` |
| **blocks** | `GET /getMasterchainInfo`, `GET /getMasterchainBlockSignatures`, `GET /getShardBlockProof`, `GET /getConsensusBlock`, `GET /lookupBlock`, `GET /shards`, `GET /getBlockTransactions`, `GET /getBlockTransactionsExt`, `GET /getBlockHeader` |
| **transactions** | `GET /tryLocateTx`, `GET /tryLocateResultTx`, `GET /tryLocateSourceTx` |
| **get config** | `GET /getConfigParam`, `GET /getLibraries` |
| **run method** | `POST /runGetMethod` (address, method, stack; optional seqno) |
| **send** | `POST /sendBoc`, `POST /sendBocReturnHash`, `POST /sendQuery`, `POST /estimateFee` |
| **json rpc** | `POST /jsonRPC` |

Address parameters accept any form (raw or user-friendly); use `seqno` for historical state when supported.

### TON Index v3 (toncenter.com)

| Group | Example endpoints |
|-------|-------------------|
| **accounts** | `GET /api/v3/accountStates`, `GET /api/v3/addressBook`, `GET /api/v3/metadata`, `GET /api/v3/walletStates` |
| **actions** | `GET /api/v3/actions`, `GET /api/v3/pendingActions`, `GET /api/v3/traces`, `GET /api/v3/pendingTraces` |
| **api/v2** | `GET /api/v3/addressInformation`, `POST /api/v3/estimateFee`, `POST /api/v3/message`, `POST /api/v3/runGetMethod`, `GET /api/v3/walletInformation` |
| **blockchain** | `GET /api/v3/blocks`, `GET /api/v3/transactions`, `GET /api/v3/messages`, `GET /api/v3/masterchainInfo`, `GET /api/v3/adjacentTransactions`, `GET /api/v3/transactionsByMessage`, etc. |
| **utils** | `GET/POST /api/v3/decode` |
| **dns** | `GET /api/v3/dns/records` |
| **jettons** | `GET /api/v3/jetton/masters`, `GET /api/v3/jetton/wallets`, `GET /api/v3/jetton/transfers`, `GET /api/v3/jetton/burns` |
| **multisig** | `GET /api/v3/multisig/wallets`, `GET /api/v3/multisig/orders` |
| **nfts** | `GET /api/v3/nft/collections`, `GET /api/v3/nft/items`, `GET /api/v3/nft/transfers` |
| **stats** | `GET /api/v3/topAccountsByBalance` |
| **vesting** | `GET /api/v3/vesting` |

Exact query/body fields and response models (e.g. `Transaction`, `Message`, `JettonTransfer`, `NFTItem`) are in [Swagger UI](https://toncenter.com/api/v3/index.html#/) or [doc.json](https://toncenter.com/api/v3/doc.json).

## Usage notes

- Most read endpoints are **GET**; send, estimateFee, runGetMethod, decode use **POST**.
- Address format follows TON conventions (raw or friendly); see each endpoint in Swagger for parameter details.
- For authoritative, up-to-date request/response fields, always use the Swagger or doc.json links above.

<!--
Source references:
- sources/ton-http/README.md
- sources/ton-http/ton-http-api/pyTON/main.py
- https://toncenter.com/api/v3/index.html
- https://toncenter.com/api/v3/doc.json
-->
