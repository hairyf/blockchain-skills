---
name: tonweb-error-handling
description: Handling get-method exit_code, parseResponse throws, and provider/call errors.
---

# Error Handling

Reliable agents check get-method results and provider responses before using data.

## get-method exit code

When calling `provider.call()` or `provider.call2()` (runSmcMethod), the result includes `exit_code`. Non-zero means the TVM run failed (e.g. assertion, out of gas).

```js
const result = await tonweb.provider.call(address, 'get_some_data');
if (result.exit_code !== 0) {
  throw new Error('Get method failed: ' + result.exit_code);
}
const data = result.stack; // then parse stack
```

## HttpProviderUtils.parseResponse

`HttpProviderUtils.parseResponse(result)` throws if `exit_code !== 0` and attaches the raw result to the error:

```js
try {
  const parsed = HttpProviderUtils.parseResponse(result);
  // use parsed (BN, Cell, or array)
} catch (err) {
  if (err.result) {
    console.error('exit_code', err.result.exit_code, err.result);
  }
  throw err;
}
```

Use this when you want a single place to enforce success and parse the stack.

## sendBoc / send failures

`sendBoc(bytes)` and contract method `.send()` return whatever the HTTP API returns. Check for HTTP errors and message them; the node may return 200 with a JSON error for invalid BOC or send failure. Handle network errors and timeouts (retry or surface to user).

## Key points

- Always check `exit_code` when reading get-method results, or use `parseResponse` which throws on non-zero.
- When parsing stack manually, handle missing or unexpected types to avoid runtime errors from malformed data.

<!--
Source references:
- sources/tonweb/src/providers/HttpProviderUtils.js (parseResponse exit_code check)
-->
