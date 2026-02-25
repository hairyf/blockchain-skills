---
name: geth-ethkey
description: ethkey - keyfile generation, inspection, sign message, verify message, change password.
---

# ethkey

ethkey is a CLI for working with Ethereum keyfiles (Web3 Secret Storage format).

## Commands

ethkey generate [--privatekey path]
ethkey inspect <keyfile> [--private]
ethkey signmessage <keyfile> <message|file> [--msgfile]
ethkey verifymessage <address> <signature> <message|file> [--msgfile]
ethkey changepassword <keyfile> [--newpasswordfile path]

--passwordfile for non-interactive password. --json for JSON output.

## Key Points

- Keyfiles compatible with geth keystore and Clef. Prefer Clef/geth account management for DApp signing; ethkey for keyfile ops and message signing in toolchains.

<!-- Source: https://github.com/ethereum/go-ethereum/tree/master/cmd/ethkey (README.md) -->
