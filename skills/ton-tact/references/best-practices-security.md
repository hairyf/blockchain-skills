---
name: Tact security best practices
description: Anti-patterns and best practices — sensitive data, signed integers, exit codes, random, auth, replay protection, bounce handling, excess gas.
---

# Security best practices

Summary of anti-patterns and practices for safer Tact contracts.

## Sensitive data

- **Do not** send or store private keys or other secrets on-chain; computation is transparent and can be replayed to extract values.

## Signed integers

- Prefer **unsigned** serialization (`Int as uint32`, etc.). Signed integers can introduce bugs (e.g. negative votes). Use signed only when necessary.

## Exit codes

- Exit codes **0** and **1** mean successful execution. Do **not** use `throw(0)` or `throw(1)`; use **`require(condition, "message")`** for validation so failures are distinguishable.

## Random numbers

- **`random()`** is predictable (depends on logical time); do not use it alone for critical outcomes (e.g. rewards). Prefer commit–reveal schemes or off-chain randomness when security matters. Do not rely on random in `external` receivers.

## Message parsing

- Parse human-friendly formats **off-chain**. Send only compact binary messages (structs/messages) and parse on-chain from Slice/Cell to save gas and avoid abuse.

## Gas

- Gas exhaustion cannot be caught; precompute gas with tests and require minimum value when needed: `require(context().value > getComputeFee(self.voteGasUsage, false), "Not enough gas!")`.

## Authentication

- Always verify sender when logic is trust-based. Use **`@stdlib/ownable`** and `requireOwner()`, or verify state init / Jetton/NFT sender per [cookbook](/cookbook/jettons) and [NFT validation](/cookbook/nfts).

## Replay protection

- For external messages, include and verify a unique identifier (e.g. **seqno**); update it after successful handling. Without it, signed messages can be replayed.

## Bounced messages

- Send with **`bounce: true`** (default) so failed processing returns value. Handle bounces in **`bounced(msg: bounced<M>)`** to revert or adjust state (e.g. restore balance in a Jetton wallet).

## Excess gas

- Return excess value to the sender (e.g. via `cashback(sender())`, or message with opcode `0xd53276db` for Jetton-style excesses, or `self.notify`/`self.forward`). Otherwise funds accumulate in the contract.

## Cross-contract data

- Contracts cannot call getters of other contracts on-chain (different shards). All cross-contract interaction is **asynchronous via messages**; request data by sending a message and handling the reply.

<!--
Source references:
- https://docs.tact-lang.org/book/security-best-practices
- sources/ton-tact/docs/src/content/docs/book/security-best-practices.mdx
- sources/ton-tact/docs/src/content/docs/zh-cn/book/security-best-practices.mdx
-->
