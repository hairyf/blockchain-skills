---
name: tron-features-events
description: TRON event subscription - plugin (Kafka/MongoDB) vs ZeroMQ; event types, filtering, and historical sync.
---

# TRON Event Subscription

TRON supports real-time and historical event streaming from nodes via **event plugins** (Kafka, MongoDB) or the **built-in ZeroMQ** queue.

## Two subscription methods

| Method | Use case | Persistence | Historical |
|--------|----------|------------|------------|
| **Event plugin (Kafka/MongoDB)** | Production; durable storage, analytics | Yes | Yes (V2.0 from block height) |
| **Built-in ZeroMQ** | Dev/test; low latency, no setup | No | No |

## Event plugin (recommended for production)

- **Framework**: V1.0 = real-time only; **V2.0** = historical replay from a given block (event.subscribe.startSyncBlockNum). Set event.subscribe.version = 1 for V2.0.
- **Flow**: Node extracts events, buffer queue, plugin consumes, pushes to Kafka or MongoDB. Enable with java -jar FullNode.jar -c config.conf --es.
- **Config**: event.subscribe.path = path to plugin zip; event.subscribe.server = Kafka or MongoDB host:port; for MongoDB, dbconfig = database|user|password. Set native.useNativeQueue = false when using plugins.
- **Event types** (subscribe only 1-2 to avoid overload): block, transaction, contractevent, contractlog, solidity, solidityevent, soliditylog. solidity = solidified block notification.
- **Filtering**: filter.fromblock, filter.toblock, filter.contractAddress[], filter.contractTopic[] for contract events/logs.
- **Topics**: Each trigger has triggerName, enable, topic (Kafka topic or MongoDB collection). Create Kafka topic to match.

## Built-in ZeroMQ

- **Config**: event.subscribe.native.useNativeQueue = true, native.bindport (e.g. 5555), native.sendqueuelength. Subscriber connects to tcp://127.0.0.1:5555.
- **Start**: java -jar FullNode.jar -c config.conf --es. No plugin path required.
- **Subscribe**: ZeroMQ SUB socket; subscribe by topic name (e.g. block). Messages are JSON.
- **Limitation**: No persistence; no historical replay; messages can be dropped if consumer is slow.

## Usage for agents

- **dApps / indexers**: Prefer event plugin (Kafka or MongoDB) with V2.0 and startSyncBlockNum for backfill; use contractevent/contractlog or solidityevent/soliditylog with filter.contractAddress for specific contracts.
- **Quick testing**: ZeroMQ with --es; subscribe to block or transaction.
- **Querying stored events**: With MongoDB plugin, use TronGrid or Event Query Service HTTP API to query by block, contract, or transaction.

<!-- Source: sources/tron/docs/architecture/event.md -->
