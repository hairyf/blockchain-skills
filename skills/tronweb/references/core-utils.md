---
name: tronweb-utils
description: TronWeb utils — ABI, transaction, deserializeTx, accounts, address, validations, message, typedData.
---

# Utils

`tronWeb.utils` (and static `import { utils } from 'tronweb'`) exposes helpers for ABI, transactions, accounts, address/code, validations, and signing utilities.

## ABI and transaction

```typescript
utils.abi.encodeParams(types, values);   // ABI-encode params
utils.abi.decodeParams(types, data);     // Decode hex data
utils.transaction.*                       // Transaction building/checks
utils.deserializeTx(hexOrBuffer);         // Deserialize serialized tx
```

Use `txCheck(transaction)` from `utils.transaction` to validate before sign/broadcast.

## Accounts

```typescript
const account = await TronWeb.createAccount();
// { privateKey, publicKey, address: { base58, hex } }

const random = TronWeb.createRandom(password?, path?, wordlist?);
// { mnemonic, privateKey, publicKey, address, path }

const fromMnemonic = TronWeb.fromMnemonic(mnemonic, path?, password?, wordlist?);
// path must match ^m/44'/195'/... (TRON BIP44)
```

Also available as `utils.accounts.generateAccount()`, `generateRandom()`, `generateAccountWithMnemonic()`.

## Address and validations

```typescript
utils.address.*     // toHex, fromHex, isAddress, etc. (see core-address-units)
utils.validations.* // isString, isInteger, isHex, isAddress, isBigNumber, etc.
```

Use validations when validating user or API inputs before calling Trx/Contract/TransactionBuilder.

## Message and typed data

```typescript
utils.message.signMessage(message, privateKey);
utils.message.verifyMessage(message, signature);
utils.message.hashMessage(message);

utils.typedData.signTypedData(domain, types, value, privateKey);
utils.typedData.verifyTypedData(domain, types, value, signature);
// TypedDataEncoder, hashStruct, hashDomain, getPayload — EIP-712
```

## Key points

- Prefer `TronWeb.createAccount` / `createRandom` / `fromMnemonic` for wallet creation; utils.accounts mirrors them.
- Use ABI encode/decode for contract call data when not using contract(abi, address).methods.
- deserializeTx useful for inspecting or re-signing serialized transactions.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/utils/index.ts, accounts.ts, abi, transaction, message, typedData)
- https://tronweb.network/docu/docs/intro/
-->