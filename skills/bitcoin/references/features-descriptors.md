---
name: bitcoin-features-descriptors
description: Output descriptors language and RPCs in Bitcoin Core.
---

# Output Descriptors

Output descriptors are a small language for describing sets of output scripts. Used by wallet import, scanning, and PSBT workflows.

## Supporting RPCs

- **scantxoutset** — Scan UTXO set with descriptors; returns descriptors for matches.
- **getdescriptorinfo** — Parse and canonicalize descriptor, add checksum.
- **deriveaddresses** — Derive addresses from descriptor.
- **listunspent** — Can output descriptor for unspent (descriptor wallets).
- **getaddressinfo** — Output descriptor for solvable addresses.
- **generatetodescriptor** — Mine to descriptor (regtest only).
- **utxoupdatepsbt** — Add info to PSBT from descriptors.
- **importdescriptors** — Import into descriptor wallet.
- **listdescriptors** — List imported descriptors.
- **scanblocks** / **getdescriptoractivity** — Scan blocks by descriptor and get receive/spend events.

## Script Types

- **pk(KEY)** — P2PK. **pkh(KEY)** — P2PKH. **wpkh(KEY)** — P2WPKH.
- **sh(SCRIPT)**, **wsh(SCRIPT)** — P2SH, P2WSH.
- **tr(KEY)** or **tr(KEY,TREE)** — Taproot (P2TR).
- **multi(k,KEY,...)**, **sortedmulti(k,KEY,...)** — k-of-n multisig (BIP67 for sorted).
- **multi_a** / **sortedmulti_a** — Multisig inside Taproot script tree.
- **combo(KEY)** — P2PK + P2PKH (+ wpkh/shwph if compressed).
- **addr(ADDR)** — From address. **raw(HEX)** — Raw hex script.

## Keys

- Hex pubkey (66 or 130 chars), or x-only (64) for Taproot.
- BIP32: `xpub`/`xprv` with path, e.g. `/0/*` for all unhardened children. Optional key origin `[fingerprint/path]` before key.
- Hardened: use `'` or `h` (e.g. `44'/0'/0'`).

## Examples

- Single key: `wpkh(xpub.../0/*)#checksum`
- 2-of-3 multisig: `wsh(sortedmulti(2,xpub1,xpub2,xpub3))`
- Taproot with script tree: `tr(internal_key,{pk(key1),pk(key2)})`

Miniscript is supported inside `wsh()` and `tr()` (watch-only and signing in recent versions). Use `getdescriptorinfo` to validate and get checksum before `importdescriptors`.

<!--
Source references:
- https://github.com/bitcoin/bitcoin doc/descriptors.md
-->
