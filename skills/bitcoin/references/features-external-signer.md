---
name: bitcoin-features-external-signer
description: Hardware wallets and external signers via -signer and Signer API.
---

# External Signer (Hardware Wallet)

Bitcoin Core can use an external signer (e.g. hardware wallet) via `-signer=<cmd>`. The signer process runs alongside the node and handles signing and optional address display.

## Setup

Start node with signer, e.g. [HWI](https://github.com/bitcoin-core/HWI) (experimental, use with caution):

```sh
bitcoind -signer=/path/to/hwi.py
# or: bitcoin node -signer=...
```

List devices:

```sh
bitcoin-cli enumeratesigners
```

Create wallet (imports pubkeys from device):

```sh
bitcoin-cli createwallet "hww" true true "" true true true
```

## Usage

- **Address**: `getnewaddress` then `walletdisplayaddress <address>` to show on device.
- **Spend**: `sendtoaddress` etc. use PSBT under the hood; device is prompted to sign. Requires device connected.

## Signer API

External signer must conform to Bitcoin Core’s Signer API (stdin/stdout JSON). Prerequisites: [Output Descriptors](features-descriptors.md) and [PSBT](features-psbt.md). Commands include:

- Device/signer enumeration
- Getting descriptors and signing PSBTs
- Displaying addresses (optional)

Details and current spec are in the repo doc; a future BIP may standardize for other wallets. When using third-party signers, prefer manufacturer-recommended software that implements the same contract.

<!--
Source references:
- https://github.com/bitcoin/bitcoin doc/external-signer.md
-->
