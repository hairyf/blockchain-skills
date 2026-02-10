---
name: features-networks-ecc
description: Networks, ECC init, and external key libraries (ecpair, bip32).
---

# Networks, ECC, and Key Libraries

bitcoinjs-lib does not ship key generation or storage; it relies on **ecpair** (single keys) and **bip32** (HD keys). Networks define address prefixes and BIP32 version bytes.

## Networks

- **bitcoin.networks.bitcoin** — mainnet (P2PKH `1`, P2SH `3`, bech32 `bc`).
- **bitcoin.networks.testnet** — testnet (P2PKH `m/n`, bech32 `tb`).
- **bitcoin.networks.regtest** — regtest (same prefixes as testnet, bech32 `bcrt`).

Pass `network` into `payments.*` and `new Psbt({ network })` when using non-mainnet or when encoding/decoding addresses.

## ECC library (required for signing / Taproot)

- **bitcoin.initEccLib(eccLib)** — call once before using signing or Taproot. Typical choice: `tiny-secp256k1` (Node/bundled).
- Node: `import * as ecc from 'tiny-secp256k1'; bitcoin.initEccLib(ecc);`
- Browser Taproot: `tiny-secp256k1` uses WASM; if needed use `@bitcoin-js/tiny-secp256k1-asmjs` or `@bitcoinerlab/secp256k1` (needs global `BigInt`).

## Key libraries (external)

- **ecpair**: `ECPairFactory(ecc)` then `fromWIF(wif)`, `makeRandom({ rng, network })`, `fromPublicKey(pubkey)`. Implements `sign(hash)`, `publicKey`, `verify(hash, signature)`.
- **bip32**: `BIP32Factory(ecc)` then `fromSeed(seed)`, `derivePath(path)`. Implements HDSigner: `derive(path)`, `publicKey`, `sign(hash)`, `signSchnorr(hash)` for Taproot. Use with `signAllInputsAsync` for HD flows.
- **bip39**: mnemonic → seed; use with bip32 `fromSeed`.

```ts
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import ECPairFactory from 'ecpair';
import BIP32Factory from 'bip32';

bitcoin.initEccLib(ecc);
const ECPair = ECPairFactory(ecc);
const bip32 = BIP32Factory(ecc);

const key = ECPair.fromWIF('...');
const node = bip32.fromSeed(seed);
const child = node.derivePath("m/84'/0'/0'/0/0");
// use child as signer with Psbt
```

## Key points

- Always call **initEccLib** before signing or Taproot; one call per process.
- Use **Node** LTS or supported env; Buffer/crypto behavior differs in browsers (RNG, Buffer polyfill).
- For Taproot in browser, prefer documented ECC alternatives and run tests in target environment.

<!--
Source references:
- https://github.com/bitcoinjs/bitcoinjs-lib (README Installation, Usage, Browser)
- ts_src/ecc_lib.ts, ts_src/networks.ts
-->
