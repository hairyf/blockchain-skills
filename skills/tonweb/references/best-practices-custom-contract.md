---
name: tonweb-best-practices-custom-contract
description: Extending TonWeb Contract for custom TON contracts — createDataCell, createSigningMessage, message helpers.
---

# Custom Contract Best Practices

TON has no ABI; custom contracts are implemented by extending `TonWeb.Contract` and composing cells with the provided static helpers.

## Override createDataCell

Contract state is stored in the data cell. Override `createDataCell()` to return a Cell that matches your contract’s data layout.

```js
class MyContract extends Contract {
  createDataCell() {
    const cell = new Cell();
    cell.bits.writeAddress(this.options.ownerAddress);
    cell.bits.writeUint(this.options.counter, 64);
    return cell;
  }
}
```

Address is derived from `code + data` via `createStateInit()`; keep options and data layout in sync for deploy and restore.

## Deploy flow

Base class handles stateInit and deploy. You only need:

- `options.code` — Cell (or Uint8Array from hex).
- `options.wc` — workchain (default 0).
- `createDataCell()` — initial state.

Optional: override `createSigningMessage()` for external messages if your contract expects a specific signing layout.

```js
const deploy = contract.deploy(secretKey);
await deploy.estimateFee();
await deploy.send();
```

## Composing messages

Use Contract static methods so layout matches TVM:

- **StateInit**: `Contract.createStateInit(code, data, library, splitDepth, ticktock)`.
- **Internal message**: `Contract.createInternalMessageHeader(dest, gramValue, ihrDisabled, bounce, ...)` then `Contract.createCommonMsgInfo(header, stateInit, body)`.
- **External message**: `Contract.createExternalMessageHeader(dest, src, importFee)` then commonMsgInfo with body/signature.

Put method op + params in a Cell as `body`; attach stateInit only for deploy or init.

## Methods object

Attach callable methods to `this.methods` so they return objects with `getQuery()`, `send()`, `estimateFee()`, and for get-methods `call()`. Use `Contract.createMethod(provider, queryPromise)` for the standard shape, or build the promise from your message cell and sign/send logic.

## Key points

- Keep code and data layout in sync with FunC/spec; wrong layout = wrong address or broken contract.
- Use `createInternalMessageHeader` / `createExternalMessageHeader` + `createCommonMsgInfo` so serialization matches TON message format.
- For get-methods use `provider.call(address, methodName, stackParams)`; stack format is array of `['num', n]`, `['cell', cell]`, `['slice', slice]`.

<!--
Source references:
- https://github.com/toncenter/tonweb/blob/master/src/contract/README.md
- https://github.com/toncenter/tonweb/blob/master/src/contract/index.js
-->
