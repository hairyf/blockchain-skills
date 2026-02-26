---
name: tonweb-contract
description: Abstract Contract class: getAddress, deploy, methods, getQuery/send/estimateFee, and message builders (createStateInit, createInternalMessageHeader, createCommonMsgInfo).
---

# Contract Base Class

`TonWeb.Contract` is the base for all contract wrappers. It handles address derivation, deploy, and method invocation (get-methods and external messages).

## Constructor and address

```js
const { Contract } = TonWeb;
const contract = new Contract(provider, {
  code: codeCell,           // Cell or Uint8Array
  address?: Address|string, // if known
  wc?: number              // workchain, default 0 or from address
});

const address = await contract.getAddress();  // computed from stateInit if no address set
```

## Deploy

```js
const deployMethod = contract.deploy(secretKey);
const queryCell = await deployMethod.getQuery();
const fee = await deployMethod.estimateFee();
await deployMethod.send();
```

## Methods (external messages)

```js
contract.methods.myMethod(params);  // you define on subclass

const method = contract.methods.transfer({ ... });
const query = await method.getQuery();   // Cell
const fee = await method.estimateFee();
await method.send();
```

## Get-methods

```js
const getMethod = contract.methods.seqno();
const result = await getMethod.call();  // raw API result
```

Use `provider.call2(address, method, params)` for parsed stack (see HttpProvider).

## Static helpers for building messages

Use these when implementing custom contracts:

- **Contract.createStateInit(code, data, library?, splitDepth?, ticktock?)** — returns StateInit Cell. Library/splitDepth/ticktock not implemented.
- **Contract.createInternalMessageHeader(dest, gramValue, ihrDisabled?, bounce?, bounced?, src?, currencyCollection?, ...)** — internal message header Cell.
- **Contract.createExternalMessageHeader(dest, src?, importFee?)** — external message header Cell.
- **Contract.createCommonMsgInfo(header, stateInit?, body?)** — full message: header + optional stateInit + optional body.
- **Contract.createOutMsg(address, amount, payload, stateInit?)** — convenience: internal message with optional stateInit. `payload` can be string (prefixed with 32-bit 0), Uint8Array, or Cell.

## Key points

- Override **createDataCell()** to set contract data for address/deploy; override **createSigningMessage** in deploy flow if needed.
- No ABI in TON; you compose message bodies manually (op + params in Cell/BitString).
- **estimateFee** and **send** use the provider (e.g. TonCenter); deploy uses init_code/init_data in estimate.

<!--
Source references:
- https://github.com/toncenter/tonweb/blob/master/src/contract/README.md
- sources/tonweb/src/contract/README.md
- sources/tonweb/src/contract/index.js
-->
