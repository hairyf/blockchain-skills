---
name: WalletConnect Universal Provider
description: Multi-chain provider—init, connect with namespaces/rpcMap, request, setDefaultChain, events, optional Sign Client.
metadata:
  author: hairy
---

# Universal Provider

`@walletconnect/universal-provider` is a chain-agnostic JSON-RPC provider for WalletConnect. It supports EVM, Solana, Cosmos, and other namespaces via `connect({ namespaces })`, routes requests by chain, and can be used with ethers/Web3.

## Initialization

```typescript
import UniversalProvider from "@walletconnect/universal-provider";

const provider = await UniversalProvider.init({
  projectId: "YOUR_PROJECT_ID",
  relayUrl: "wss://relay.walletconnect.com",
  logger: "info",
  metadata: {
    name: "My App",
    description: "...",
    url: "https://myapp.com",
    icons: ["https://myapp.com/icon.png"],
  },
  client: undefined, // optional: pass existing SignClient instance
});
```

## Connect

```typescript
await provider.connect({
  namespaces: {
    eip155: {
      chains: ["eip155:80001", "eip155:1"],
      methods: [
        "eth_sendTransaction",
        "eth_sign",
        "personal_sign",
        "eth_signTypedData",
      ],
      events: ["chainChanged", "accountsChanged"],
      rpcMap: {
        80001: "https://rpc.walletconnect.org?chainId=eip155:80001&projectId=...",
        1: "https://eth.llamarpc.com",
      },
    },
  },
  pairingTopic: "<existing-topic>", // optional: reuse pairing
  skipPairing: false,               // optional: skip pairing (resume later with .pair())
});
```

Use `namespaces` with CAIP-2 chains, wallet methods, events, and optional `rpcMap` for chain RPCs. Optional `optionalNamespaces` follow the same shape.

## Request

```typescript
// payload: EIP-1193 RequestArguments; chain: optional "<namespace>:<chainId>"
const result = await provider.request(
  { method: "eth_getBalance", params: [address, "latest"] },
  "eip155:1"
);
```

If `chain` is omitted, the provider uses its default chain (first chain from connect). Use `setDefaultChain` to change it.

## setDefaultChain (multi-chain)

```typescript
provider.setDefaultChain("eip155:56", "https://bsc-dataseed.binance.org");
```

## Events

- `display_uri` – Pairing URI (for QR or deep link)
- `session_ping` – `{ id, topic }`
- `session_event` – `{ event, chainId }`
- `session_update` – `{ topic, params }`
- `session_delete` – `{ id, topic }`

## enable() and sendAsync

```typescript
const accounts = await provider.enable();
provider.sendAsync(args, (err, response) => { ... }, chain?);
```

## Key points

- Namespace keys are chain namespaces (eip155, solana, etc.); each value has `chains`, `methods`, `events`, and optional `rpcMap`.
- Pass an existing `SignClient` in `client` to share one client across providers.
- Use `request(payload, chain)` to target a specific chain; omit `chain` for default.
- For custom namespace support, implement `IProvider` under the provider's `providers/` and register it.

<!--
Source references:
- sources/walletconnect/providers/universal-provider/README.md
- sources/walletconnect/providers/universal-provider/src/UniversalProvider.ts
- sources/walletconnect/AGENTS.md
-->
