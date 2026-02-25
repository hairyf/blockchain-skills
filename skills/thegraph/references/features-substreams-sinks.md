---
name: thegraph-features-substreams-sinks
description: Substreams sinks — SQL, PubSub, direct stream, KV; official vs community; choosing a sink.
---

# The Graph — Substreams Sinks

Sinks consume Substreams output and send it to a destination (database, file, PubSub, etc.). Choose a sink that fits your stack and hosting needs.

## Overview

After building a Substreams package, you run a **sink** that subscribes to the Substreams output and writes data. Sinks are either officially supported (StreamingFast, Pinax) or community-maintained.

## Official sinks

| Sink | Maintainer | Purpose |
|------|------------|---------|
| SQL | StreamingFast | Persist to SQL database |
| Go SDK | StreamingFast | Build custom sinks in Go |
| Rust SDK | StreamingFast | Build custom sinks in Rust |
| JS SDK | StreamingFast | Consume from JavaScript/Node |
| KV Store | StreamingFast | Key-value store |
| PubSub | StreamingFast | Publish to a PubSub topic |
| Prometheus | Pinax | Metrics |
| Webhook | Pinax | HTTP webhooks |
| CSV | Pinax | File output |

Repos: [substreams-sink-sql](https://github.com/streamingfast/substreams-sink-sql), [substreams-sink](https://github.com/streamingfast/substreams-sink) (Go), [substreams-sink-rust](https://github.com/streamingfast/substreams-sink-rust), [substreams-js](https://github.com/substreams-js/substreams-js), [substreams-sink-kv](https://github.com/streamingfast/substreams-sink-kv), [substreams-sink-pubsub](https://github.com/streamingfast/substreams-sink-pubsub), [substreams-sink-prometheus](https://github.com/pinax-network/substreams-sink-prometheus), [substreams-sink-webhook](https://github.com/pinax-network/substreams-sink-webhook), [substreams-sink-csv](https://github.com/pinax-network/substreams-sink-csv).

## Community sinks

Examples: MongoDB, Files, KV Store, Prometheus (community forks). Support is community-driven. See [Substreams docs – Community Sinks](https://docs.substreams.dev/how-to-guides/sinks/community-sinks).

## Choosing a sink

- **SQL**: When you need queryable persistence in a relational DB.
- **Direct streaming / JS SDK**: When your app consumes data in real time (e.g. Node/TypeScript).
- **PubSub**: When you want to fan out to other services (event-driven pipelines).
- **KV**: When you need a simple key-value view of the output.

Hosted sink options (e.g. SQL or PubSub managed by StreamingFast) may be available; contact the team for offerings.

## Key points

- Use official sinks when you need active support; community sinks for flexibility.
- Sink repos live in different orgs (streamingfast, pinax-network, community); check docs.substreams.dev for the current list and how-to guides.

<!--
Source references:
- https://thegraph.com/docs/en/substreams/developing/sinks/
- https://docs.substreams.dev/how-to-guides/sinks/
-->
