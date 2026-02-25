---
name: core-context-state
description: Context and state — sender, context, myAddress, myBalance, now, inMsg, setData, commit, getConfigParam, gasConsumed, myStorageDue, nativeReserve.
---

# Context and state

Incoming message context, contract identity, balance, time, and transaction/blockchain state.

## Usage

**Incoming message:**

```tact
let who: Address = sender();           // prefer over context().sender (cheaper)
let ctx: Context = context();          // bounceable, sender, value, raw (Slice)
let body: Slice = inMsg();             // raw body (Tact 1.6.7+); prefer over msg.toSlice()
```

**Time:**

```tact
let unix: Int = now();
let lt: Int = curLt();                 // logical time of current tx (Tact 1.6+)
let blockLt: Int = blockLt();         // block start logical time (Tact 1.6+)
```

**Contract state:**

```tact
let me: Address = myAddress();
let code: Cell = myCode();             // from c7 (Tact 1.6+)
let balance: Int = myBalance();        // at start of compute phase (unchanged by sends)
let debt: Int = myStorageDue();
let gas: Int = gasConsumed();
```

**Reserve (RAWRESERVE):**

```tact
nativeReserve(amount, mode);          // mode: ReserveExact | ReserveAllExcept | ReserveAtMost
// optional flags: ReserveAddOriginalBalance, ReserveInvertSign, ReserveBounceIfActionFail
```

**Replace state / commit (advanced):**

```tact
setData(data: Cell);   // DANGEROUS: replaces c4; use with throw(0) to avoid auto-save (Tact 1.7+)
commit();              // commit c4/c5 so later throw doesn't revert
```

**Config:**

```tact
let cell: Cell? = getConfigParam(id);  // e.g. 0 = config address, 18 = storage fee config
```

**Context extension:** `context().readForwardFee()` — original forward fee of incoming message.

## Key points

- Use `sender()` instead of `context().sender` when only the sender is needed (saves gas).
- `myBalance()` does not reflect sends made in the same execution.
- getters have no sender; behavior of `sender()`/context there is undefined.
- Reserve modes: 0 = Exact, 1 = AllExcept, 2 = AtMost; combine with optional flags via bitwise OR.

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/ref/core-contextstate.mdx
-->
