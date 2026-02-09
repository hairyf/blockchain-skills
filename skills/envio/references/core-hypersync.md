---
name: hypersync-usage
description: HyperSync client setup, query structure, streaming, and field selection.
---

# HyperSync Usage

HyperSync is a high-performance blockchain data API. Use it for raw logs, transactions, traces, and blocks with filtering and field selection.

## Client Setup (Node.js)

```javascript
import { HypersyncClient } from "@envio-dev/hypersync-client";

const client = new HypersyncClient({
  url: "https://eth.hypersync.xyz",  // or https://arbitrum.hypersync.xyz, etc.
  apiToken: process.env.ENVIO_API_TOKEN,
});
```

Other clients: Python (`hypersync` on PyPI), Rust (`hypersync-client`), Go (community). All use the same query model.

## Query Shape

- **from_block** / **to_block**: Block range (to_block exclusive).
- **logs** / **transactions** / **traces**: Array of selection criteria (OR between array items).
- **field_selection**: Which fields to return for block, transaction, log, trace (reduces payload).
- **max_num_blocks**, **max_num_logs**, etc.: Approximate limits; server may slightly exceed to finish a block group.
- **join_mode**: `JoinNothing` (only matched rows), default (related tx/block), `JoinAll` (full context).

## Log Selection Example

```javascript
import { keccak256, toHex } from "viem";

const topic0_list = ["PoolCreated(address,address,uint24,int24,address)"].map((sig) =>
  keccak256(toHex(sig))
);

const query = {
  fromBlock: 0,
  logs: [{ address: ["0x..."], topics: [topic0_list] }],
  fieldSelection: {
    log: ["Data", "Address", "Topic0", "Topic1", "Topic2", "Topic3"],
  },
};
```

## Stream and Pagination

- Use **stream** for large ranges: `const stream = await client.stream(query, {});` then `await stream.recv()` in a loop. Each response has `data` and `next_block`; set `query.fromBlock = res.next_block` for the next batch.
- Use **reverse: true** in stream options to start from chain head and go backwards.
- Near chain tip: stream/collect are not designed for rollbacks; use one-off get + custom rollback handling for real-time tip.

## Key Points

- Always request only needed fields in `fieldSelection` for better performance.
- Pagination is time-based (~5s execution window); one response can cover many blocks.
- Topic0 = event signature hash; topics[1–3] = indexed args. Use snake_case for field names in queries.

<!--
Source references:
- https://docs.envio.dev/docs/HyperSync/quickstart
- https://docs.envio.dev/docs/HyperSync/hypersync-query
- https://docs.envio.dev/docs/HyperSync/hypersync-clients
-->
