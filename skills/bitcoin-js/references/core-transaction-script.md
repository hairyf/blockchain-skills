---
name: core-transaction-script
description: Transaction and Script APIs — parse/build transactions, script compile/decompile and opcodes.
---

# Transaction and Script

Low-level building blocks: `Transaction` class for parsing and building txs, and `script` module for scriptPubKey/redeemScript handling and opcodes.

## Transaction

- **Transaction.fromBuffer(buf)** — deserialize; returns `Transaction` with `ins`, `out`, `version`, `locktime`.
- **new Transaction()** — build manually: set `version`, `locktime`, push to `ins`/`out`.
- **tx.toBuffer()** / **tx.toHex()** — serialize.
- **tx.ins**: `Input[]` ({ hash, index, script, sequence, witness }); **tx.outs**: `Output[]` ({ script, value: bigint }).
- Static: `Transaction.SIGHASH_*`, `Transaction.DEFAULT_SEQUENCE`, `Transaction.ADVANCED_TRANSACTION_*` for segwit marker/flag.

In practice, most code uses **Psbt** to build and sign; use `Transaction` when you need to parse or modify raw txs.

## Script

- **script.compile(stack)** — stack (array of Buffers or opcode numbers) → script Buffer.
- **script.decompile(buffer)** — script Buffer → stack or null.
- **script.toASM(buffer)** — script to ASM string; **script.fromASM(asm)** — ASM to Buffer.
- **script.isPushOnly(stack)** — whether stack is push-only.
- **opcodes** — `bitcoin.opcodes` or `script.OPS` (OP_DUP, OP_HASH160, OP_CHECKSIG, etc.).

Use **payments** for high-level scriptPubKey construction (p2pkh, p2sh, etc.); use **script** when you need to compile custom redeem/witness scripts or inspect scripts.

## Networks

- **bitcoin.networks.bitcoin** (mainnet), **bitcoin.networks.testnet**, **bitcoin.networks.regtest** — used by payments and address encoding.
- Custom network: `{ messagePrefix, bech32, bip32: { public, private }, pubKeyHash, scriptHash, wif }`.

## Key points

- Output **value** is bigint (sats); input `hash` is 32-byte Uint8Array (reversed from txid string).
- For signing flow, prefer Psbt; use Transaction when parsing blocks/RPC or implementing custom serialization.

<!--
Source references:
- https://github.com/bitcoinjs/bitcoinjs-lib
- ts_src/transaction.ts, ts_src/script.ts, ts_src/networks.ts
-->
