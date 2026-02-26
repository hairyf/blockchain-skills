---
name: ton-security-best-practices
description: Security best practices for TON smart contracts — integers, replay, accept_message, gas, random, front-running.
---

# Security Best Practices (TON Contracts)

Anti-patterns and mitigations for TON smart contracts.

## Signed/unsigned integers

Validate before arithmetic to avoid overflow/underflow. Use `throw_unless` (or equivalent) to ensure sufficient balance or range before subtracting.

## External message handling

- **Guard before ACCEPT**: External messages do not carry value; the contract pays gas. If you call `ACCEPT` (or `SETGASLIMIT`) unconditionally, an attacker can drain the contract by sending many externals. Always validate sender (e.g. signature, seqno, subwallet_id) before `accept_message()`.
- **Replay protection**: Use a stored seqno (or similar) and require incoming external message to match it, then increment. Without this, the same signed message can be replayed.

## Account destruction

Using send mode `128 + 32` destroys the account. Only do this after checks: authorized sender, no pending operations, and intentional flow. Otherwise race conditions can cause fund loss.

## Exit codes 0 and 1

Do not throw 0 or 1 from contract code; they indicate successful compute/action. Use other codes (e.g. 256–65535) for errors so failures are distinguishable.

## Gas

Out-of-gas (exit code 13 / -14) cannot be caught. Pre-calculate gas where possible and require minimum value in messages (e.g. `require(context().value > getComputeFee(voteGasUsage, false))`). Return excess gas to sender (e.g. Excesses message `0xd53276db`) to avoid accumulation.

## Random numbers

On-chain “random” is predictable (e.g. logical time). For critical use: avoid sole reliance on-chain; use commit–disclose off-chain, or built-in random with randomized logical time and not in external message receivers.

## Front-running and signatures

Pending messages are visible. Include critical parameters (e.g. recipient `to`) in the signed payload so a copied signature cannot be reused for another recipient. Combine with replay protection (seqno).

## Pulling data from other contracts

Contracts cannot call getters of other contracts (cross-shard). All cross-contract communication is asynchronous via messages. To get another contract’s data: send a message, receive a reply with the data.

## Address formats and validation

Handle raw, bounceable, and non-bounceable formats; validate workchain when needed (e.g. `force_chain(to_address)`).

## Type and return-value checks

Use consistent load/store types (e.g. don’t store uint and load int). Check return values (e.g. `udict_delete?` success) and throw on failure.

## Code updates

Restrict upgrade entrypoints to an authorized admin and validate new code before calling `set_code` (or `setCodePostponed`).

<!--
Source references:
- https://github.com/ton-org/docs (contract-dev/security.mdx)
-->
