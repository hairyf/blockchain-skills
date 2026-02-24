---
name: WalletConnect Ethereum Provider
description: EIP-1193 Ethereum provider with connect, request, events, and SSR/Next.js usage.
metadata:
  author: hairy
---

# Ethereum Provider

`@walletconnect/ethereum-provider` is an EIP-1193–compliant provider for EVM dApps. It supports optional QR modal, chain/account events, and works with ethers/web3.

## Initialization

```typescript
import { EthereumProvider } from "@walletconnect/ethereum-provider";

const provider = await EthereumProvider.init({
  projectId: "YOUR_PROJECT_ID",
  optionalChains: [1, 10, 137, 42161],
  showQrModal: true,
  methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData_v4"],
  events: ["chainChanged", "accountsChanged"],
  rpcMap: { 1: "https://eth.llamarpc.com", 137: "https://polygon-rpc.com" },
  metadata: { name: "My App", description: "...", url: "...", icons: ["..."] },
  storage: undefined,
  qrModalOptions: undefined,
});
```

Use `optionalChains` (required); the deprecated `chains` is only for legacy behavior.

## Connect and enable

```typescript
await provider.connect({ chains: [1], rpcMap: { 1: "..." }, pairingTopic: undefined });
// or
await provider.enable();
```

If `showQrModal` is false, handle the URI yourself:

```typescript
provider.on("display_uri", (uri: string) => {
  // show QR or deep link
});
await provider.connect();
```

## Sending requests

```typescript
const accounts = await provider.request({ method: "eth_requestAccounts" });
const balance = await provider.request({
  method: "eth_getBalance",
  params: [accounts[0], "latest"],
});
// or sendAsync(args, callback)
```

## Events

- `connect` – Session established (payload has `chainId`)
- `disconnect` – Session ended
- `chainChanged` – User switched chain
- `accountsChanged` – Accounts changed
- `session_event` – Generic session event
- `display_uri` – Connection URI for custom UI

## Usage with Next.js (SSR)

The provider uses `window`/`document`/`localStorage`. Use it only on the client:

1. Put provider logic in a Client Component (`"use client"`).
2. Dynamically import that component with `ssr: false`:

```typescript
const WalletConnectLogic = dynamic(
  () => import("@/components/WalletConnectLogic"),
  { ssr: false }
);
```

Initialize the provider inside `useEffect` or similar so it runs only in the browser.

## Key points

- Prefer `optionalChains` and optional `rpcMap`/`metadata` for production.
- For modal-less flows, set `showQrModal: false` and subscribe to `display_uri`.
- Check `provider.session` and `provider.accounts` after init to restore existing session state.

<!--
Source references:
- sources/walletconnect/providers/ethereum-provider/README.md
- sources/walletconnect/providers/ethereum-provider/src/EthereumProvider.ts
-->
