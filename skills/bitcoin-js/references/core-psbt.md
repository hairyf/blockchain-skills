---
name: core-psbt
description: Partially Signed Bitcoin Transactions (BIP174) — create, add I/O, sign, finalize, extract.
---

# PSBT (Partially Signed Bitcoin Transactions)

`bitcoin.Psbt` implements BIP174: create a PSBT, add inputs/outputs, sign (single or all), validate signatures, finalize, then extract the final `Transaction`. Supports non-segwit and segwit (P2WPKH, P2WSH, P2TR).

## Roles (BIP174)

- **Creator**: `new bitcoin.Psbt(opts?)` — optional `{ network, maximumFeeRate }`.
- **Updater**: `addInput`, `addOutput`, `updateInput`, `updateOutput`, `updateGlobal`.
- **Signer**: `signInput(index, signer)` or `signAllInputs(signer)`; async variants `signInputAsync`, `signAllInputsAsync` for HDSignerAsync.
- **Finalizer**: `finalizeAllInputs()` or `finalizeInput(index)`.
- **Extractor**: `extractTransaction()` — returns a `Transaction` (then `.toHex()` or broadcast).

## Adding inputs

Each input needs:

- **hash** (txid of the prior tx; string or 32-byte Buffer; if Buffer it is internal byte order) and **index** (vout).
- **nonWitnessUtxo**: full previous transaction as Buffer (required for non-segwit).
- **witnessUtxo**: `{ script, value }` (scriptPubKey and value in satoshis) for segwit; can replace nonWitnessUtxo for segwit.
- **redeemScript** for P2SH; **witnessScript** for P2WSH; Taproot uses library’s internal handling.

## Adding outputs

- **addOutput({ address, value })** — value in satoshis (bigint or number); `network` in Psbt opts used to encode address to script.
- **addOutput({ script, value })** — skip address encoding; no network needed.

## Signing

- **signInput(i, signer)** — signer must implement `sign(hash, lowR?)` (and for Taproot, optional script path). ECPair from `ecpair` works.
- **validateSignaturesOfInput(i, validator)** — validator(pubkey, msghash, signature) returns boolean (e.g. use ECPair.fromPublicKey(pubkey).verify(msghash, signature)).

## Usage

```ts
import * as bitcoin from 'bitcoinjs-lib';
import ECPairFactory from 'ecpair';
import * as ecc from 'tiny-secp256k1';

const ECPair = ECPairFactory(ecc);
const alice = ECPair.fromWIF('L2uPYXe17xSTqbCjZvL2DsyXPCbXspvcu5mHLDYUgzdUbZGSKrSr');

const psbt = new bitcoin.Psbt()
  .addInput({
    hash: '7d067b4a697a09d2c3cff7d4d9506c9955e93bff41bf82d439da7d030382bc3e',
    index: 0,
    nonWitnessUtxo: Buffer.from('0200000001...', 'hex'), // full prev tx
  })
  .addOutput({ address: '1KRMKfeZcmosxALVYESdPNez1AP1mEtywp', value: 80000n });

psbt.signInput(0, alice);
psbt.validateSignaturesOfInput(0, (pubkey, msghash, sig) =>
  ECPair.fromPublicKey(pubkey).verify(msghash, sig)
);
psbt.finalizeAllInputs();
const tx = psbt.extractTransaction();
const hex = tx.toHex();
```

## Key points

- **nonWitnessUtxo** is required for non-segwit inputs; for segwit, **witnessUtxo** (and redeem/witness script if P2SH/P2WSH) is enough.
- **hash**: if string, treat as txid (reversed from on-chain); if Buffer, use 32-byte tx hash (internal order).
- **combine(psbt2, ...)** merges multiple PSBTs; the caller’s data wins on conflict. Base transaction (version, locktime, inputs/outputs layout) must match.
- For HD signing use `signAllInputsAsync(hdSigner)` with an object that implements `signSchnorr`/`sign` and derivation (e.g. bip32 instance).

<!--
Source references:
- https://github.com/bitcoinjs/bitcoinjs-lib
- ts_src/psbt.ts, test/integration/transactions.spec.ts
-->
