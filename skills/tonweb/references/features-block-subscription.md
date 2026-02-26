---
name: tonweb-features-block-subscription
description: TonWeb block subscription — BlockSubscription, InMemoryBlockStorage, process new blocks.
---

# Block Subscription

Process new masterchain and shardchain blocks in order (or shards out of order). Useful for indexers and watchers.

## Setup

```js
const { BlockSubscription, InMemoryBlockStorage } = TonWeb;

const storage = new InMemoryBlockStorage();
const subscription = new BlockSubscription(
  tonweb.provider,
  storage,
  async (blockHeader, blockShards) => {
    // blockHeader: workchain, shardId, seqno, end_lt, ...
    // blockShards: for mc blocks, list of shard blocks
    await processBlock(blockHeader, blockShards);
  },
  {
    startMcBlockNumber: undefined,  // from latest if omitted
    mcInterval: 10 * 1000,
    shardsInterval: 1000,
  }
);
await subscription.start();
```

## Storage

`InMemoryBlockStorage` keeps processed block numbers in memory. For persistence, implement the same interface: `getLastMasterchainBlockNumber()`, `insertBlocks(mcSeqno, shardBlocks)` (and any other methods the subscription calls).

## Behavior

- **Masterchain**: blocks processed in chronological order; `workchain === -1`, `shardId === '-9223372036854775808'`.
- **Shardchain**: blocks can be processed out of order.
- If `onBlock` throws, the block is not marked processed and subscription continues.
- `subscription.stop()` stops polling.

## Key points

- Use custom provider (e.g. with API key) to avoid rate limits when polling.
- Start from `startMcBlockNumber` for replay; omit to start from current.
- Storage must be consistent with the callback: only mark blocks processed after successful handling if you implement custom storage.

<!--
Source references:
- https://github.com/toncenter/tonweb/blob/master/src/providers/blockSubscription/BlockSubscription.js
- https://github.com/toncenter/tonweb/blob/master/src/providers/blockSubscription/InMemoryBlockStorage.js
- https://github.com/toncenter/tonweb/blob/master/src/index.js
-->
