---
name: tonweb-address-utils
description: TON Address class and utility functions (toNano, fromNano, bytes/hex/base64, BN, nacl).
---

# Address and Utils

Utilities for addresses, amounts, and byte/hex/base64 handling. Access via `TonWeb.utils` or `TonWeb.Address`.

## Address class

```js
const Address = TonWeb.utils.Address;

const addr = new Address('EQDjVXa_oltdBP64Nc__p397xLCvGm2IcZ1ba7anSW0NAkeP');
// or raw: new Address('0:abc...')  workchain:hash

addr.wc;           // workchain (0 or -1)
addr.hashPart;     // Uint8Array (32 bytes)
addr.isUserFriendly;
addr.isUrlSafe;
addr.isBounceable;
addr.isTestOnly;

// Format for display / links
addr.toString(true, true, false);  // non-bounceable, url-safe (e.g. for receiving)
addr.toString(true, true, true);   // bounceable (e.g. for contract dest)

Address.isValid(anyForm);  // static: true if string/Address is valid
```

Constructor accepts: user-friendly base64 string, raw string `"wc:hex"`, or another `Address` instance.

## Amount helpers

```js
TonWeb.utils.toNano('0.01');   // BN in nanograms (0.01 TON)
TonWeb.utils.toNano(0.01);
TonWeb.utils.fromNano(amount); // BN or string -> string TON
```

## Bytes and encoding

```js
TonWeb.utils.bytesToHex(bytes);
TonWeb.utils.hexToBytes(hexString);
TonWeb.utils.bytesToBase64(bytes);
TonWeb.utils.base64ToBytes(base64);
TonWeb.utils.stringToBytes(s, size?);
TonWeb.utils.concatBytes(a, b);
TonWeb.utils.crc32c(bytes);
TonWeb.utils.crc16(data);  // ArrayLike<number> -> Uint8Array (2 bytes)
```

## Crypto / bignum

- **TonWeb.utils.BN** — `bn.js` for big integers.
- **TonWeb.utils.nacl** — `tweetnacl` for key pairs: `nacl.sign.keyPair()`, `nacl.sign.keyPair.fromSecretKey(secretKey)`.

## Key points

- Use non-bounceable addresses for user wallets (receiving); bounceable for contracts to allow bounce on error.
- All on-chain and API amounts are in **nanograms**; convert with `toNano`/`fromNano`.
- Address validation: `Address.isValid(str)` before constructing.

<!--
Source references:
- https://github.com/toncenter/tonweb/blob/master/src/utils/README.md
- sources/tonweb/src/utils/README.md
- sources/tonweb/src/utils/Address.js
- sources/tonweb/src/utils/Utils.js
-->
