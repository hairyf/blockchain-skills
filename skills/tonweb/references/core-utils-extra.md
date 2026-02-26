---
name: tonweb-utils-extra
description: AdnlAddress, StorageBagId (32-byte IDs); keyPairFromSeed, newKeyPair, newSeed for key management.
---

# Extra Utils: Address-like Types and Key Helpers

TonWeb exposes additional utils for ADNL/storage identifiers and key generation.

## AdnlAddress

32-byte ADNL address (hex or Uint8Array). Used in TON for overlay/node addressing.

```js
const AdnlAddress = TonWeb.utils.AdnlAddress;
const addr = new AdnlAddress(hexString); // 64 hex chars
// or: new AdnlAddress(uint8Array32)
addr.toHex();           // 64-char hex
AdnlAddress.isValid(x); // static
```

## StorageBagId

32-byte storage bag identifier (hex or Uint8Array).

```js
const StorageBagId = TonWeb.utils.StorageBagId;
const id = new StorageBagId(hexString); // 64 hex chars
id.toHex();
StorageBagId.isValid(x);
```

## Key generation helpers

- **newKeyPair()** — new random nacl signing key pair: `{ publicKey, secretKey }` (Uint8Array).
- **newSeed()** — new 32-byte seed (first 32 bytes of a new key pair’s secretKey).
- **keyPairFromSeed(seed)** — deterministic key pair from 32-byte `Uint8Array` seed.

```js
const { newKeyPair, newSeed, keyPairFromSeed } = TonWeb.utils;
const keyPair = newKeyPair();
const seed = newSeed();
const sameKeyPair = keyPairFromSeed(seed);
```

Use `keyPairFromSeed` when you need a deterministic key from a seed (e.g. from mnemonic-derived bytes).

## Key points

- AdnlAddress and StorageBagId are not TON payment addresses; use `Address` for accounts and contracts.
- For wallet creation use `nacl.sign.keyPair()` or `TonWeb.utils.newKeyPair()`; use `keyPairFromSeed` when you have a seed.

<!--
Source references:
- sources/tonweb/src/utils/AdnlAddress.js
- sources/tonweb/src/utils/StorageBagId.js
- sources/tonweb/src/utils/Utils.js (keyPairFromSeed, newKeyPair, newSeed)
- sources/tonweb/src/utils/index.js
-->
