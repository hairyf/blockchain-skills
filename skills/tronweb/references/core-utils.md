---
name: tronweb-utils
description: TronWeb utils — ABI, transaction, deserializeTx, accounts, address, validations.
---

# Utils

Standalone utilities exported as `utils` and from `tronweb/utils` for ABI encode/decode, transaction helpers, deserialization, and account generation.

## Import

```typescript
import { utils } from 'tronweb';
// or
import { utils } from 'tronweb/utils';
```

## ABI and transaction

- **utils.abi** — encode/decode by ABI (used internally by Contract and TransactionBuilder).
- **utils.transaction** — `txCheck(transaction)`, building of trigger/create contract payloads.
- **utils.deserializeTx** — deserialize transaction from `raw_data_hex` (TransferContract, TriggerSmartContract, CreateSmartContract, and others as per CHANGELOG). Use for parsing signed/unsigned tx payloads.

## Accounts

```typescript
const account = await TronWeb.createAccount();
const { privateKey, address } = TronWeb.createRandom(password?, path?, wordlist?);
const { privateKey, address } = TronWeb.fromMnemonic(mnemonic, path?, password?, wordlist?);
```

Same APIs exist on instance: `tronWeb.createAccount()`, `tronWeb.createRandom(...)`, `tronWeb.fromMnemonic(...)`.

## Address and validations

- **utils.address** — same as `TronWeb.address` (fromHex, toHex, fromPrivateKey, etc.).
- **utils.isString**, **utils.isInteger**, **utils.isHex**, **utils.isBigNumber**, etc. — used for parameter checks.

## Key Points

- `deserializeTransaction` was moved from `utils.transaction` to `utils.deserializeTx` in v6.
- For webpack: if you see `Transaction` of `globalThis.TronWebProto` undefined, add a rule for `.cjs` with `type: 'javascript/auto'`.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/utils/index.ts, deserializeTx.ts, transaction.ts)
- https://tronweb.network/docu/docs/intro/
-->
