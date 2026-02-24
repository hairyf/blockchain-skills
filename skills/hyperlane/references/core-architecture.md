---
name: hyperlane-core-architecture
description: Hyperlane message flow, domains, Message format, and recipient interface.
metadata:
  author: hairy
---

# Hyperlane Core Architecture

Hyperlane is an interchain messaging protocol. Applications dispatch messages from an origin chain; off-chain relayers index and deliver them to the destination chain. Use this when implementing or debugging cross-chain flows.

## Message flow

1. **Dispatch** – App calls `Mailbox.dispatch(destinationDomain, recipientAddress, messageBody)` on the origin chain (optionally with hook metadata and custom hook).
2. **Index** – Relayer agents index `Dispatch` / `DispatchId` events.
3. **Security** – Relayer fetches verification metadata from validators / ISMs.
4. **Delivery** – Relayer calls `Mailbox.process(metadata, message)` on the destination chain.
5. **Handle** – Recipient contract's `handle(origin, sender, message)` is invoked by the Mailbox.

## Domains

- **Domain** is the unique identifier for a chain (not EVM chain ID). Used in `dispatch`, `process`, and message fields.
- **localDomain** – The domain of the chain where the Mailbox is deployed (`mailbox.localDomain()`).

## Message format

Messages are packed bytes used by the Mailbox and `Message` library:

- **version** (1 byte), **nonce** (4), **origin** (4), **sender** (32), **destination** (4), **recipient** (32), **body** (variable).
- `Message.id(message)` = `keccak256(message)`.
- Use `Message.sender()`, `Message.recipient()`, `Message.body()`, etc. to parse. Use `TypeCasts` for bytes32 ↔ address.

## Recipient interface

Contracts that receive interchain messages must implement:

```solidity
interface IMessageRecipient {
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _message
    ) external payable;
}
```

Only the Mailbox can call `handle`; enforce `onlyMailbox` (e.g. `msg.sender == address(mailbox)`) in your recipient.

## Key types

| Term         | Meaning |
|-------------|---------|
| **Domain**  | Chain identifier (uint32). |
| **Message** | Packed struct: version, nonce, origin, sender, destination, recipient, body. |
| **ISM**     | Interchain Security Module – pluggable verification for incoming messages. |
| **Hook**    | Post-dispatch processing (e.g. gas payment, merkle tree). |
| **Checkpoint** | Validator-signed commitment to merkle root at an index. |

<!--
Source references:
- sources/hyperlane/AGENTS.md (Architecture, Message Flow, Key Concepts)
- sources/hyperlane/solidity/contracts/interfaces/IMailbox.sol, IMessageRecipient.sol
- sources/hyperlane/solidity/contracts/libs/Message.sol
-->
