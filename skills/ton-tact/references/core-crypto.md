---
name: core-crypto
description: Cryptography — checkSignature, checkDataSignature, sha256, keccak256, SignedBundle.
---

# Cryptography

Ed25519 signature verification, SHA-256 and Keccak-256 hashes, and SignedBundle for signed message data.

## Usage

**Ed25519 signature check (hash + signature + publicKey):**

```tact
let valid: Bool = checkSignature(hash, signature, publicKey);
```

**Ed25519 over data slice (hashes data internally):**

```tact
let valid: Bool = checkDataSignature(data, signature, publicKey);
```

**Hashes (data bits must be divisible by 8):**

```tact
let h: Int = sha256(sliceOrString);   // 256-bit unsigned Int
let k: Int = keccak256(slice);        // Ethereum-compatible Keccak-256 (Tact 1.6.6+)
```

**SignedBundle** (Tact 1.6.6+): struct with `signature: Slice as bytes64` and `signedData: Slice as remaining`. Use in message as first field, then verify:

```tact
message MessageWithSignedData {
    bundle: SignedBundle;
    walletId: Int as int32;
    seqno: Int as uint32;
}
// In receiver:
throwUnless(35, msg.bundle.verifySignature(self.publicKey));
```

## Key points

- First 10 calls to `checkSignature` / `checkDataSignature` are cheap; 11th and onward cost 4000+ gas.
- `sha256` and `keccak256` are 500+ gas; prefer compile-time resolution for constant strings when possible.
- Cell/Builder/Slice crypto extension methods (e.g. hash) are documented in core-cells.
- `checkDataSignature` throws exit code 9 if data bit length not divisible by 8.

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/ref/core-crypto.mdx
-->
