---
name: core-exit-codes
description: TVM and Tact exit codes — compute/action phases, reserved ranges, common codes (0–50, 128–138), developer range 256–65535.
---

# Exit codes

32-bit signed integer indicating success or failure of compute/action phase. 0 and 1 = success (compute); 0 = success (action). Other values = exception.

## Ranges

- **0–127:** TVM reserved (compute/action).
- **128–255:** Tact compiler (compute phase).
- **256–65535:** Developer-defined (use constants; keep 256–2048 for throwUnless).
- Throwing outside 0–65535 causes exit code 5. Out-of-gas is reported as -14 (bitwise NOT of 13).

## Key compute-phase codes

| Code | Description |
|------|-------------|
| 0, 1 | Success |
| 2 | Stack underflow |
| 3 | Stack overflow |
| 4 | Integer overflow / div by zero |
| 5 | Integer out of expected range |
| 8 | Cell overflow |
| 9 | Cell underflow |
| 13 / -14 | Out of gas |
| 128 | Null reference (!! on null) |
| 129 | Invalid serialization prefix (opcode mismatch) |
| 130 | Invalid incoming message (no receiver for opcode) |
| 132 | Access denied (e.g. Ownable) |
| 133 | Contract stopped (Stoppable) |
| 134 | Invalid argument |
| 136 | Invalid standard address |
| 138 | Not a basechain address |

## Action-phase codes (examples)

32 invalid action list, 33 too many actions (max 255), 34 invalid/unsupported action, 35/36 invalid source/dest address, 37 not enough Toncoin, 50 account state limits exceeded.

## Usage

```tact
try {
    risky();
} catch (exitCode) {
    // exitCode in 0..65535
}
throwUnless(MY_CODE, condition);  // use constants for MY_CODE in 256..2048
```

`require(cond, "msg")` generates exit codes > 2048 from message hash; see compile report. In Blueprint tests use `exitCode` and `actionResultCode` in `toHaveTransaction()`.

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/book/exit-codes.mdx
-->
