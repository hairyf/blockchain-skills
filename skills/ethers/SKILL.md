---
name: ethers
description: Ethers.js v6 — Provider/Signer/Contract, units, ABI, contract calls and events, signing, v5→v6 migration.
metadata:
  author: hairy
  version: "2026.2.9"
  source: Generated from https://github.com/ethers-io/ethers.js (docs.wrm), scripts at https://github.com/antfu/skills
---

> Skill based on ethers.js v6.16.0, generated at 2026-02-09. Official docs: https://docs.ethers.org/v6/

Ethers.js is a complete, compact library for interacting with Ethereum: dapps, wallets, and scripts. This skill covers Provider/Signer/Contract separation, units and formatting, ABI, contract calls and events, message signing, and v5→v6 migration.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Provider, Signer, Contract | Read/write separation, BrowserProvider, JsonRpcProvider, connecting | [core-provider-signer](references/core-provider-signer.md) |
| Units and Formatting | parseEther, parseUnits, formatEther, formatUnits | [core-units-format](references/core-units-format.md) |
| ABI | Human-readable ABI, Fragment, encoding, event topics/data | [core-abi](references/core-abi.md) |
| Wallet | Wallet, HDNodeWallet, mnemonic, id() for testing | [core-wallet](references/core-wallet.md) |
| Transactions and Receipts | sendTransaction, wait, getBlockNumber, getFeeData, getTransactionCount | [core-transactions](references/core-transactions.md) |
| Data and hex utilities | getBytes, toBeHex, ZeroAddress, ZeroHash, encodeBytes32String, solidityPacked | [core-utils](references/core-utils.md) |
| Address | getAddress, isAddress, isAddressable, checksum | [core-address](references/core-address.md) |
| Hashing | keccak256, id(string), use in selectors and testing | [core-hashing](references/core-hashing.md) |

## Features

### Contract and Signing

| Topic | Description | Reference |
|-------|-------------|-----------|
| Contract | Creation, view/pure, state-changing, staticCall, events, queryFilter | [features-contract](references/features-contract.md) |
| Signing | signMessage, verifyMessage, Signature, EIP-191, EIP-712 | [features-signing](references/features-signing.md) |
| ENS | resolveName, getResolver, getAddress, getText, text records | [features-ens](references/features-ens.md) |
| React Native | react-native-quick-crypto registration for performance | [features-react-native](references/features-react-native.md) |
| Provider options | getDefaultProvider, JsonRpcProvider staticNetwork, broadcastTransaction | [features-providers](references/features-providers.md) |
| Contract deployment | ContractFactory, bytecode, deploy(), waitForDeployment, fromSolidity | [features-contract-deploy](references/features-contract-deploy.md) |
| EIP-712 typed data | signTypedData, verifyTypedData, TypedDataEncoder | [features-eip712](references/features-eip712.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Error handling | Reverted tx, receipt.status, CALL_EXCEPTION, provider errors | [best-practices-errors](references/best-practices-errors.md) |

## Advanced

| Topic | Description | Reference |
|-------|-------------|-----------|
| Migrating v5→v6 | BigInt, Provider/Contract/Signature, utils renames | [advanced-migrating-v6](references/advanced-migrating-v6.md) |
