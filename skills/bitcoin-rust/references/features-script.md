---
name: bitcoin-rust-script
description: ScriptBuf, Script, script builder, opcodes, and script pubkey types.
---

# Script

Script types live in `bitcoin::script` and `bitcoin::blockdata::script`; primitives in `primitives::script`. Use `ScriptBuf` for owned scripts and `Script` for borrowed; `ScriptPubKey`, `ScriptSig`, `RedeemScript`, `WitnessScript`, `TapScript` for specific roles.

## Builder

```rust
use bitcoin::script::Builder;
use bitcoin::opcodes::all::*;
use bitcoin::script::PushBytesBuf;

let script = Builder::new()
    .push_int(0)
    .push_slice(pubkey.serialize())
    .push_opcode(OP_CHECKSIG)
    .into_script();
```

- `push_int(n)`, `push_int_unchecked(n)` for numbers.
- `push_slice(bytes)`, `push_key(pubkey)` for keys.
- `push_opcode(OP_*)` for opcodes; use `opcodes::all::*` or specific `Opcode` values.
- `into_script()` yields `ScriptBuf`.

## Parsing and inspection

- Iterate instructions: use script’s iteration API (e.g. `instructions()` where available) to get opcodes and push data.
- Script hash: `ScriptHash`, `WScriptHash` for P2SH/P2WSH from script contents.
- Extension traits: `ScriptExt`, `ScriptPubKeyExt`, `ScriptBufExt`, `TapScriptExt`, etc. (re-exported under `bitcoin::ext`) for script-type checks and helpers.

## Script pubkey and address

- Construct `ScriptPubKey` from address: `address.script_pubkey()`.
- P2PKH, P2SH, P2WPKH, P2WSH, P2TR: use `Address` constructors then `script_pubkey()` when you need the script form.

## Locktime and sequence

- `absolute::LockTime`, `relative::LockTime` for nLockTime and nSequence semantics.
- `Sequence` (from `units`) for encode/decode and disable flags (RBF, locktime).

## Key points

- Use `Builder` for constructing scripts; avoid hand-encoding unless necessary.
- For script verification in a consensus-like context, the library is not suitable; use `bitcoinconsensus` feature only for non-consensus checks or tooling.
- Taproot scripts use `TapScript` and taproot-specific extension methods.

<!--
Source references:
- sources/bitcoin-rust/bitcoin/src/blockdata/script/builder.rs
- sources/bitcoin-rust/bitcoin/src/blockdata/script/mod.rs
- sources/bitcoin-rust/bitcoin/src/lib.rs (ext re-exports)
-->
