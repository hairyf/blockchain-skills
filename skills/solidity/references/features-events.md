---
name: solidity-events
description: Events — indexed, anonymous, topics, selector, emit, ABI encoding.
---

# Events

Events abstract the EVM logging facility. Arguments are stored in the transaction log associated with the contract address. Logs are not readable from contracts; off-chain clients subscribe via RPC (e.g. `subscribe("logs")`).

## Declaration and emit

Define events at file level or inside contracts (including interfaces and libraries). Emit with `emit EventName(args)`.

```solidity
event Deposit(address indexed from, bytes32 indexed id, uint value);

function deposit(bytes32 id) public payable {
    emit Deposit(msg.sender, id, msg.value);
}
```

## Indexed and topics

- Up to **three** parameters can be `indexed`. They go into the log **topics** (32-byte each). Non-indexed parameters are ABI-encoded in the **data** part.
- Topics are used for filtering (e.g. filter by address or indexed value). Reference types as indexed store the **keccak256 hash** of the value, not the value itself.
- **Anonymous** events: no signature topic, so you cannot filter by event name—only by contract address. Benefit: cheaper, and you can have **four** indexed parameters.

## Selector

- **`event.selector`**: For non-anonymous events, `bytes32` equal to `keccak256` of the event signature (used as first topic).

## Interpretation

Log type is not stored; to decode you must know the event type, which parameters are indexed, and whether it is anonymous. Anonymous events can be used to mimic other event signatures (documentation warns about "faking").

## ABI / client usage

Event signature and indexed args appear in the `topics` array; non-indexed args are in `data`. Clients use the ABI to decode; method key is the canonical event signature.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/contracts.html#events
- https://docs.soliditylang.org/en/latest/abi-spec.html#events
-->
