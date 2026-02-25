---
name: ton-tact
description: Tact language for TON blockchain smart contracts — types, contracts, messages, send/receive, stdlib, and security.
metadata:
  author: Hairy
  version: "2026.2.25"
  source: Generated from sources/ton-tact/docs, scripts located at https://github.com/antfu/skills
---

> Skill is based on Tact (TON) v1.6.13, generated 2026-02-25.

Tact is a statically typed smart contract language for the TON blockchain. Contracts use message-based communication (receive/send), structs and messages for data, and traits for reuse. This skill focuses on agent-oriented usage: type system, contracts and receivers, sending/receiving messages, cells and serialization, standard libraries, and security practices.

## Core references

| Topic | Description | Reference |
|-------|-------------|-----------|
| Type system | Primitives, optionals, maps, structs, messages, contracts, traits | [core-types](references/core-types.md) |
| Contracts and traits | init, parameters, receivers, getters, interfaces, BaseTrait | [core-contracts](references/core-contracts.md) |
| Structs and messages | Definition, instantiation, toCell/fromCell, TL-B layout | [core-structs-messages](references/core-structs-messages.md) |
| Receiving messages | receive(), text/binary/slice receivers, order, external/bounced | [core-receive](references/core-receive.md) |
| Sending messages | send(), SendParameters, reply, forward, notify, cashback, deploy, emit | [core-send](references/core-send.md) |
| Cells, Builders, Slices | Cell/Builder/Slice, beginCell, store/load, Struct/Message helpers | [core-cells](references/core-cells.md) |
| Message mode | Base modes and optional flags (SendRemainingValue, SendIgnoreErrors, etc.) | [core-message-mode](references/core-message-mode.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Optionals | T?, null, !!, constraints (no optional keys, no nested optionals) | [features-optionals](references/features-optionals.md) |
| Maps | map<K,V>, emptyMap(), get/set, allowed types, serialization | [features-maps](references/features-maps.md) |
| initOf and deploy | initOf, contractAddress, StateInit, send/deploy deployment | [features-initof-deploy](references/features-initof-deploy.md) |
| Standard libraries | @stdlib/config, content, deploy, dns, ownable, stoppable | [features-stdlib](references/features-stdlib.md) |

## Best practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Security | Sensitive data, signed ints, exit codes, random, auth, replay, bounce, excess gas | [best-practices-security](references/best-practices-security.md) |

## Advanced

| Topic | Description | Reference |
|-------|-------------|-----------|
| Bounced messages | bounced<T>, 224-bit limit, fallback Slice receiver, unrecognized bounces | [advanced-bounced](references/advanced-bounced.md) |
