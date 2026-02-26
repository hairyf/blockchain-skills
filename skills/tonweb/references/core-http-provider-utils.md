---
name: tonweb-http-provider-utils
description: HttpProviderUtils — parse runSmcMethod/call stack results into BN and Cell (parseResponse, parseObject).
---

# HttpProviderUtils: Parsing get-method Results

When you call `provider.call()` or `provider.call2()` (runSmcMethod), the node returns a stack of typed values. `HttpProviderUtils` converts these into JS types (BN, Cell, nested tuples).

## parseResponse(result)

Takes the raw runSmcMethod result. If `exit_code !== 0`, throws an error with `err.result`. Otherwise maps the `result.stack` array through `parseResponseStack` and returns a single value if stack length is 1, else the array.

```js
const HttpProviderUtils = require('tonweb').providers?.HttpProviderUtils || require('tonweb/src/providers/HttpProviderUtils').default;
const result = await provider.call(address, 'get_balance');
const parsed = HttpProviderUtils.parseResponse(result); // BN or array of parsed stack entries
```

## parseResponseStack(pair) / parseObject(x)

- Stack entry shape: `[type, value]` (e.g. `['num', '0x1234']`, `['cell', { bytes: base64 }]`, `['tuple', { elements: [...] }]`).
- **num** → BN (hex).
- **cell** → Cell via `Cell.oneFromBoc(base64ToBytes(value.bytes))`.
- **list** / **tuple** → recursively parsed array via `parseObject`.

Use when you need Cell or BN from get-method results instead of raw stack.

## makeArg / makeArgs

Convert JS args to the format expected by runSmcMethod stack: `makeArg(BN|Number)` → `['num', value]`. `makeArgs([...])` maps over an array. For cell/slice params the provider typically accepts `['cell', cell]` or `['slice', slice]`; build those separately.

## Key points

- Always check `exit_code` or use `parseResponse` which throws on non-zero exit.
- For `call2` (runSmcMethod with typed parsing), the HTTP provider may already return parsed tuples; HttpProviderUtils is for low-level or custom parsing of `call` results.

<!--
Source references:
- sources/tonweb/src/providers/HttpProviderUtils.js
- sources/tonweb/src/providers/index.js
-->
