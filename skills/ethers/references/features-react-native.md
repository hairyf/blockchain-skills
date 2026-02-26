---
name: ethers-react-native
description: Ethers.js React Native — replace crypto with react-native-quick-crypto for performance.
---

# React Native Performance

React Native’s built-in crypto can be slow. Register native implementations with ethers so key derivation, hashing, and random bytes use `react-native-quick-crypto`.

## Setup

Install the package and register implementations before using ethers:

```ts
import { ethers } from "ethers";
import crypto from "react-native-quick-crypto";

ethers.randomBytes.register((length) => {
  return new Uint8Array(crypto.randomBytes(length));
});

ethers.computeHmac.register((algo, key, data) => {
  return crypto.createHmac(algo, key).update(data).digest();
});

ethers.pbkdf2.register((passwd, salt, iter, keylen, algo) => {
  return crypto.pbkdf2Sync(passwd, salt, iter, keylen, algo);
});

ethers.sha256.register((data) => {
  return crypto.createHash("sha256").update(data).digest();
});

ethers.sha512.register((data) => {
  return crypto.createHash("sha512").update(data).digest();
});
```

## When to use

Use this when building React Native apps that create wallets, sign messages, or use ethers crypto (e.g. HDNodeWallet.fromPhrase, signMessage). Registration is global; do it once at app startup.

## Key Points

- Register randomBytes, computeHmac, pbkdf2, sha256, sha512 with native implementations from react-native-quick-crypto.
- Recommended for production React Native apps; may be available as a dedicated package later.

<!--
Source references:
- sources/ethers/docs.wrm/cookbook/react-native.wrm
- https://docs.ethers.org/v6/
-->
