---
name: solidity-transient-storage
description: Transient storage (EIP-1153) — transaction-scoped state, reentrancy locks, composability.
---

# Transient Storage

EIP-1153 adds a transaction-scoped data location: `transient`. Values are cleared at the end of the transaction. Gas cost is lower than persistent storage. Requires EVM version `cancun` or newer.

## Declaration

Use `transient` for state variables (value types only in current Solidity). Cannot initialize in place (value would be cleared at end of creation transaction). No `constant` or `immutable` with transient. Transient and persistent storage use separate address space; layout of one does not affect the other.

```solidity
bool transient locked;

modifier nonReentrant {
    require(!locked, "Reentrancy attempt");
    locked = true;
    _;
    locked = false;
}
```

## Reentrancy locks

Transient storage is well-suited to reentrancy guards: set at entry, clear at exit. Composable within the same transaction (unlike a guard that stays set). Clear the guard at end of call to allow composed transactions.

## Composability caveats

Within one transaction, multiple calls to the same contract share the same transient store. If you use transient storage to carry context between calls in the same transaction, later calls in the same tx see that context; calls in a different transaction do not. This can break composability (e.g. batching) if callers assume persistent semantics. Prefer clearing transient state at the end of each call when possible. See EIP-1153 security considerations.

## DELEGATECALL and STATICCALL

- With DELEGATECALL/CALLCODE, the *caller* owns transient storage. Libraries cannot take transient refs in parameters; use inline assembly in libraries to access transient storage.
- With CALL/STATICCALL, the *callee* owns it. TSTORE in STATICCALL reverts; TLOAD is allowed in STATICCALL.

## Reverts

Reverting a frame reverts all transient writes from that frame and inner calls. try/catch can prevent revert from bubbling and preserve caller’s transient state.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/contracts.html#transient-storage
- https://docs.soliditylang.org/en/latest/contracts/transient-storage.html
- https://eips.ethereum.org/EIPS/eip-1153
-->
