---
name: moralis-streams-api
description: Moralis Streams API — realtime blockchain events via webhooks.
---

# Moralis Streams API

Streams API delivers real-time blockchain events to your backend via webhooks. Listen to wallet activity, contract events, NFT transfers, ERC20 transfers, and more.

## Concepts

- **Stream**: Configuration defining what events to listen for and where to send webhooks.
- **Triggers**: Wallet addresses, contract addresses, topic filters, or "all addresses".
- **Webhook URL**: Your server endpoint receiving POST with event payload.

## Node.js SDK

```ts
import Moralis from "moralis";

await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

// Create stream listening to NFT transfers for a wallet
const stream = await Moralis.Streams.add({
  webhookUrl: "https://your-server.com/webhook",
  description: "NFT transfers for 0x...",
  tag: "nft-transfers",
  chains: ["0x1", "0x89"], // Ethereum, Polygon
  includeContractLogs: false,
  includeNativeTxs: false,
  includeInternalTxs: false,
  abi: [],
  topic0: [],
  filter: {
    or: [
      { eq: ["fromAddress", "0x..."] },
      { eq: ["toAddress", "0x..."] },
    ],
  },
});

// Add address to stream
await Moralis.Streams.addAddress({
  streamId: stream.id,
  address: ["0x..."],
});
```

## Use Cases

- Wallet notifications: Send/receive/stake/swap/burn alerts.
- Asset monitoring: Track specific NFT or token transfers.
- Token sales: Notify on participation.
- Contract events: Use custom ABI and topic filters.
- Factory patterns: Listen to all events from contracts created by a factory.

## Key Points

- **100% delivery**: Moralis retries webhooks if your server fails.
- **Replay**: Manually replay history if missed.
- **Filters**: Limit by amount, address, topic, etc.
- **Extended RPC**: Streams can include `eth_getNativeBalances` for addresses in payload.
- **Records/pricing**: Streams are billed by records; see docs for limits.

<!--
Source references:
- https://docs.moralis.io/streams-api/evm
- https://docs.moralis.io/streams-api/evm/using-node-js-sdk
-->
