---
name: tronweb-trx
description: Trx API — blocks, transactions, accounts, bandwidth, sign, broadcast, getCurrentRefBlockParams, signTypedData, ecRecover.
---

# Trx API

`tronWeb.trx` provides block/transaction/account RPC, signing, and broadcast. Use for reading chain state and sending signed transactions.

## Blocks and transactions

```typescript
const block = await tronWeb.trx.getCurrentBlock();
const blockByNum = await tronWeb.trx.getBlock(12345);
const blockByHash = await tronWeb.trx.getBlockByHash(blockId);
const tx = await tronWeb.trx.getTransaction(txId);
const txInfo = await tronWeb.trx.getTransactionInfo(txId);
```

`getBlock(block)` accepts `'latest'`, `'earliest'`, block number, or block hash. Uses `tronWeb.defaultBlock` when no argument.

## Accounts and resources

```typescript
const account = await tronWeb.trx.getAccount(address);
const net = await tronWeb.trx.getAccountNet(address);
const bandwidth = await tronWeb.trx.getBandwidth(address);
```

## Signing and broadcast

- **sign(transaction, privateKey?)** — Sign a transaction; uses `tronWeb.defaultPrivateKey` if omitted. Returns signed transaction (signature array).
- **signMessageV2(message, privateKey?)** — Personal sign (TRON message prefix); returns hex signature.
- **signTypedData(domain, types, value, privateKey?)** — EIP-712 typed data sign; returns hex signature.
- **multiSign(transaction, privateKey?, permissionId?)** — Multi-sig sign; use after getSignWeight/getApprovedList when needed.

Broadcast:

- **sendRawTransaction(signedTx)** — Broadcast signed transaction object.
- **sendHexTransaction(hex)** — Broadcast hex-encoded signed transaction.

Aliases: `broadcast` = sendRawTransaction, `broadcastHex` = sendHexTransaction, `signTransaction` = sign.

## Ref block params

When building transactions manually you need current ref block params:

```typescript
const ref = await tronWeb.trx.getCurrentRefBlockParams();
// { ref_block_bytes, ref_block_hash, expiration, timestamp }
```

Use these in `raw_data` so the node accepts the transaction.

## ecRecover

Recover signer address from signed digest and signature (hex):

```typescript
import { utils } from 'tronweb';
const addressHex = utils.crypto.ecRecover(signedDataHex, signatureHex);
// Returns 41-prefix hex address
```

## Key points

- Use fullNode for latest state, solidityNode for confirmed state (e.g. getConfirmedCurrentBlock).
- Signing methods accept optional privateKey; otherwise use setPrivateKey/default.
- getSignWeight / getApprovedList support multi-sig flows before multiSign.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/lib/trx.ts, src/utils/crypto.ts)
- https://tronweb.network/docu/docs/intro/
-->