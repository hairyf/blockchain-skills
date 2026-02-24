---
name: bitcoin-rust-consensus-encoding
description: Consensus encoding and decoding of Bitcoin types with Encodable/Decodable and helpers.
---

# Consensus Encoding

Bitcoin data that goes on disk or the network must use the library’s **consensus** encoding (little-endian, compact size, etc.). Types implement `Encodable` and `Decodable` from the `bitcoin::consensus` module (or `io`/`consensus_encoding` in newer stacks).

## Serialize / deserialize

```rust
use bitcoin::consensus::{deserialize, deserialize_partial, serialize, serialize_hex, Encodable, Decodable};
use bitcoin::Transaction;

// Full buffer consumption required
let tx: Transaction = deserialize(&bytes)?;
let hex_tx: Transaction = bitcoin::consensus::deserialize_hex(hex_str)?;

// Partial: get decoded value and number of bytes consumed
let (tx, consumed) = deserialize_partial(&bytes)?;

// Encode to Vec or hex
let bytes: Vec<u8> = serialize(&tx);
let hex: String = serialize_hex(&tx);
```

## Traits

- **Encodable**: `consensus_encode<W: Write>(&self, w: &mut W) -> Result<usize, io::Error>`.
- **Decodable**: `consensus_decode<R: BufRead>(r: &mut R) -> Result<Self, consensus::encode::Error>`.

Use these for any type that must match network/disk format (e.g. `Block`, `Transaction`, `TxIn`, `TxOut`, `Script`, `Amount`). For user-facing or RPC data (e.g. big-endian hashes, decoded scripts), use other serialization as appropriate—consensus encoding is specifically for wire/block storage.

## Low-level primitives

`consensus::encode` provides `ReadExt`/`WriteExt` style helpers (e.g. `emit_u32`, `read_u32`, `emit_compact_size`) for building custom encoders/decoders. New code in the ecosystem may use the **sans-I/O** `consensus_encoding` crate (Encoder/Decoder traits, no direct `std::io`); see ADR 0001 for the design.

## Key points

- Prefer `serialize`/`deserialize` (and `_partial`/`_hex`) for standard types.
- Consensus encoding is little-endian; variable-length integers use CompactSize.
- Do not use consensus encoding for user-facing hashes (e.g. display); use hex/display traits that match user expectations.

<!--
Source references:
- sources/bitcoin-rust/bitcoin/src/consensus/encode.rs
- sources/bitcoin-rust/docs/adr/0001_consensus_encoding.md
-->
