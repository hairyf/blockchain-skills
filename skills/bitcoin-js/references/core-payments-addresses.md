---
name: core-payments-addresses
description: bitcoinjs-lib payments (p2pkh, p2sh, p2wpkh, p2wsh, p2tr) and address encode/decode.
---

# Payments and Addresses

Create payment outputs and addresses from pubkeys or scripts; decode addresses to output scripts. Keys (ECPair, BIP32) are from separate packages: `ecpair`, `bip32`.

## Payment types

- **p2pkh** — Pay-to-PubKey-Hash (legacy, prefix `1`)
- **p2sh** — Pay-to-Script-Hash (e.g. multisig, P2SH-wrapped; prefix `3`)
- **p2wpkh** — SegWit native (prefix `bc1q`)
- **p2wsh** — SegWit script hash
- **p2tr** — Taproot (BIP341, key-path or script-path)

All live under `bitcoin.payments.*`. Each returns a `Payment` with at least `{ output?, address?, ... }`. Pass `network` for mainnet/testnet/regtest (default mainnet).

## Usage

```ts
import * as bitcoin from 'bitcoinjs-lib';
import ECPairFactory from 'ecpair';
import * as ecc from 'tiny-secp256k1';

const ECPair = ECPairFactory(ecc);

// Single-key P2PKH
const keyPair = ECPair.fromWIF('KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn');
const { address, output } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
// address: '1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH', output: scriptPubKey Buffer

// P2WPKH (SegWit)
const { address } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey });
// 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4'

// P2SH-wrapped P2WPKH
const { address } = bitcoin.payments.p2sh({
  redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey }),
});

// 2-of-3 multisig (P2SH)
const pubkeys = [hex1, hex2, hex3].map(h => Buffer.from(h, 'hex'));
const { address } = bitcoin.payments.p2sh({
  redeem: bitcoin.payments.p2ms({ m: 2, pubkeys }),
});

// Testnet
const { address } = bitcoin.payments.p2pkh({
  pubkey: keyPair.publicKey,
  network: bitcoin.networks.testnet,
});
```

## Address ↔ script

- **toOutputScript(address, network?)** — address string → scriptPubKey (Uint8Array). Network required for bech32 prefix resolution.
- **fromOutputScript(scriptPubKey, network?)** — scriptPubKey → address string.

```ts
const script = bitcoin.address.toOutputScript('1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH');
const addr = bitcoin.address.fromOutputScript(script);
```

## Key points

- Keys are not in bitcoinjs-lib: use `ecpair` (single key) and `bip32` (HD). Pass `network` to ECPair/BIP32 when using testnet/regtest.
- For Taproot (p2tr), ECC must be initialized: `bitcoin.initEccLib(eccLib)` (e.g. `tiny-secp256k1`); browser Taproot may need `@bitcoin-js/tiny-secp256k1-asmjs` or `@bitcoinerlab/secp256k1`.
- Payment `output` is the scriptPubKey; use it when building transactions or PSBTs if you want to avoid passing addresses.

<!--
Source references:
- https://github.com/bitcoinjs/bitcoinjs-lib
- README.md, ts_src/address.ts, ts_src/payments/index.ts, test/integration/addresses.spec.ts
-->
