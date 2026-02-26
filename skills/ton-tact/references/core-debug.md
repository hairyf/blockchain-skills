---
name: core-debug
description: Debug and control flow — require, dump, dumpStack, throw, throwIf, throwUnless.
---

# Debug and control flow

Assertions and unconditional throw for control flow and debugging.

## Usage

**Require (generates exit code from message hash; > 2048):**

```tact
require(condition, "Error message");
```

**Throw (exit code 0–65535):**

```tact
throw(code);
throwIf(code, condition);    // throw if condition is true (Tact 1.6+)
throwUnless(code, condition); // throw if condition is false (Tact 1.6+)
```

**Debug (only when config debug = true; 500+ gas):**

```tact
dump(expr);      // prints location and value to debug console
dumpStack();     // prints stack depth and up to 255 values
```

For production checks with fixed exit codes (e.g. 256–2048), prefer `throwUnless(code, condition)` over `require(condition, "msg")` to save gas and use stable codes. Declare codes as constants.

## Key points

- `throw` stops execution; control goes to enclosing try/catch or terminates transaction.
- Code outside 0–65535 causes exit code 5.
- `nativeThrow` / `nativeThrowIf` / `nativeThrowUnless` are deprecated aliases (Tact 1.6).
- Use `throw(0)` after `setData()` to avoid Tact's implicit state save overwriting manual data.

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/ref/core-debug.mdx
-->
