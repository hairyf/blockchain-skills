---
name: tronweb-address-units
description: Address conversion (hex/base58/checksum), TRX/SUN, and encoding helpers in TronWeb.
---

# Address, Units, and Encoding

TronWeb static helpers for addresses, TRX/SUN conversion, and hex/UTF-8.

## Address (static)

```typescript
import { TronWeb } from 'tronweb';

TronWeb.address.fromHex(address);      // hex → base58
TronWeb.address.toHex(address);        // base58 → hex (41...)
TronWeb.address.toChecksumAddress(address);
TronWeb.address.isChecksumAddress(address);
TronWeb.address.fromPrivateKey(privateKey, strict?);
TronWeb.isAddress(address);            // base58 or 42-char hex
```

Instance mirrors: `tronWeb.address.*`, `tronWeb.isAddress(...)`.

## TRX / SUN

```typescript
TronWeb.toSun(trx);   // TRX → SUN (string or BigNumber)
TronWeb.fromSun(sun); // SUN → TRX
```

## Encoding / hashing

```typescript
TronWeb.fromUtf8(str);   // UTF-8 string → '0x...' hex
TronWeb.toUtf8(hex);     // hex → UTF-8 string
TronWeb.toHex(val);      // number|boolean|object|string → hex (throws if invalid)
TronWeb.toBigNumber(amount);
TronWeb.toDecimal(value);
TronWeb.fromDecimal(value);
TronWeb.sha3(string, prefix?);  // keccak256, prefix default true ('0x')
```

## Key Points

- TRON hex addresses use 41-prefix (not 0x); `toHex` returns 42-char with `41...`.
- Use `toSun`/`fromSun` for TRX amounts in contract/transfer APIs (amounts in SUN).
- Checksum is EIP-55 style over hex; use for display/storage when you need canonical form.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/tronweb.ts, src/utils/address.ts)
- https://tronweb.network/docu/docs/intro/
-->
