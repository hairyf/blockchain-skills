---
name: core-gas
description: Gas and fees — storage, compute, forward fees; setGasLimit; acceptMessage.
---

# Gas and fees

Storage, compute, and forward fee helpers, plus gas limit and accept-message for external messages.

## Usage

**Storage fee** (config param 18):

```tact
let fee: Int = getStorageFee(cells, bits, seconds, isMasterchain);
```

**Compute fee** (config params 20/21; flat_gas_limit / flat_gas_price apply):

```tact
let fee: Int = getComputeFee(gasUsed, isMasterchain);
let simpleFee: Int = getSimpleComputeFee(gasUsed, isMasterchain); // no flat minimum
```

**Forward fee** (config params 24/25; lump_price applies):

```tact
let fee: Int = getForwardFee(cells, bits, isMasterchain);
let simpleFee: Int = getSimpleForwardFee(cells, bits, isMasterchain); // no lump
let originalFwd: Int = getOriginalFwdFee(fwdFee, isMasterchain); // approximate original from fwdFee
```

**Gas limit and accept:**

```tact
setGasLimit(42000);       // cap gas and reset gas_credit
acceptMessage();          // set gas_limit to max, reset gas_credit (required for external msgs)
```

`context().readForwardFee()` returns the original forward fee of the incoming message (uses getOriginalFwdFee internally).

## Key points

- `myStorageDue()` and `gasConsumed()` are in context/state; fee *calculation* helpers are here.
- Use `isMasterchain: false` when source and destination are basechain.
- Negative cells/bits/seconds/gasUsed throw exit code 5.
- `acceptMessage()` is required to process external messages (they bring no value/gas).

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/ref/core-gas.mdx
- https://docs.ton.org/develop/smart-contracts/guidelines/accept
-->
