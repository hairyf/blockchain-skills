---
name: tronweb-message-typed-data
description: Personal message signing (signMessage, verifyMessage) and EIP-712 typed data (signTypedData, verifyTypedData).
---

# Message and typed data signing

TronWeb supports two signing flows: **personal message** (TRON prefix) and **EIP-712 typed data**. Use for login, attestations, or contract-compatible structured signing.

## Personal message (signMessage / verifyMessage)

TRON uses the prefix `\x19TRON Signed Message:\n` + message length before hashing (EIP-191 style).

```typescript
// Sign (prefer signMessageV2 on Trx for correct header)
const sig = tronWeb.trx.signMessageV2('Hello', privateKey);
// or: utils.message.signMessage('Hello', privateKey)

// Verify — recovers base58 address
const base58 = utils.message.verifyMessage('Hello', sig);
```

Hash only: `utils.message.hashMessage(message)` (message can be string, Uint8Array, or number array).

## EIP-712 typed data

For structured data (domain + types + message) use the same API as Ethereum EIP-712.

```typescript
import { utils } from 'tronweb';

const domain = {
  name: 'MyDApp',
  version: '1',
  chainId: 1,
  verifyingContract: contractAddressHex  // 41... or 0x...
};
const types = {
  Permit: [
    { name: 'owner', type: 'address' },
    { name: 'value', type: 'uint256' }
  ]
};
const value = { owner: 'T...', value: 100 };

const sig = utils.typedData.signTypedData(domain, types, value, privateKey);
const recoveredHex = utils.typedData.verifyTypedData(domain, types, value, sig);
```

Instance API: `tronWeb.trx.signTypedData(domain, types, value, privateKey?)`.

**TypedDataEncoder** (EIP-712 encoding):

- `TypedDataEncoder.from(types)` — build encoder.
- `TypedDataEncoder.hashDomain(domain)` — domain hash.
- `TypedDataEncoder.hashStruct(name, types, value)` — struct hash.
- `TypedDataEncoder.hash(domain, types, value)` — full EIP-712 hash.
- `TypedDataEncoder.getPayload(domain, types, value)` — JSON payload for `eth_signTypedData_v4`.

TRON supports type `trcToken` (encoded as uint256).

## Key points

- Personal sign: use `signMessageV2` / `utils.message.signMessage` so header length is correct; verify with `utils.message.verifyMessage`.
- Typed data: use TRON address (41... or 0x41...) in `verifyingContract` and in structs; sign/verify via utils.typedData or tronWeb.trx.signTypedData.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/utils/message.ts, src/utils/typedData.ts, src/lib/trx.ts)
- https://tronweb.network/docu/docs/intro/
-->