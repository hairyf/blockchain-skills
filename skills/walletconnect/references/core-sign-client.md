---
name: WalletConnect Sign Client
description: SignClient API for dApps and wallets—init, connect, pair, approve, reject, request, respond, disconnect, and event handling.
metadata:
  author: hairy
---

# Sign Client

The main entry point for WalletConnect v2 is `@walletconnect/sign-client`. Use it for both dApp (proposer) and wallet (responder) flows. Requires a `projectId` from [WalletConnect Cloud](https://cloud.walletconnect.com).

## Initialization

```typescript
import { SignClient } from "@walletconnect/sign-client";

const client = await SignClient.init({
  projectId: "YOUR_PROJECT_ID",
  metadata: {
    name: "My dApp",
    description: "Description",
    url: "https://myapp.com",
    icons: ["https://myapp.com/icon.png"],
  },
  // optional: custom logger, storage, relayUrl
});
```

## dApp flow: connect and request

```typescript
// Connect (creates pairing + session proposal)
const { uri, approval } = await client.connect({
  requiredNamespaces: {
    eip155: {
      chains: ["eip155:1", "eip155:137"],
      methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
      events: ["chainChanged", "accountsChanged"],
    },
  },
  optionalNamespaces: { /* ... */ },
  pairingTopic: undefined, // or existing topic to reuse
});

// Show uri to user (QR or deep link)
if (uri) console.log(uri);

const session = await approval();

// Send JSON-RPC request
const result = await client.request({
  topic: session.topic,
  chainId: "eip155:1",
  request: { method: "personal_sign", params: [message, account] },
});
```

## Wallet flow: handle proposal and respond

```typescript
client.on("session_proposal", async ({ id, params, verifyContext }) => {
  // Validate params.requiredNamespaces, then approve or reject
  await client.approve({
    id,
    namespaces: {
      eip155: {
        accounts: ["eip155:1:0x..."],
        methods: ["eth_sendTransaction", "personal_sign"],
        events: ["chainChanged", "accountsChanged"],
      },
    },
  });
});

client.on("session_request", async ({ id, topic, params }) => {
  const { request, chainId } = params;
  const result = await handleRequest(request, chainId);
  await client.respond({
    topic,
    response: { id, result, jsonrpc: "2.0" },
  });
});
```

## Pairing by URI (wallet)

```typescript
const session = await client.pair({ uri: "wc:..." });
```

## Other APIs

- **reject** – Reject a session proposal: `client.reject({ id, reason })`
- **update** – Update session namespaces: `client.update({ topic, namespaces })`
- **extend** – Extend session expiry: `client.extend({ topic })`
- **disconnect** – End session: `client.disconnect({ topic, reason })`
- **ping** – Session/pairing liveness: `client.ping({ topic })`
- **find** – Find sessions by required namespaces: `client.find({ requiredNamespaces })`
- **getPendingSessionRequests** – Pending session_request payloads

## Key points

- `client.session` is the session store; `client.core.pairing.pairings` (or `client.pairing`) for pairings.
- Use `optionalNamespaces` for chains/methods the dApp can use but does not require.
- Event names: `session_proposal`, `session_update`, `session_extend`, `session_ping`, `session_delete`, `session_expire`, `session_request`, `session_request_sent`, `session_event`, `session_authenticate`, `proposal_expire`, `session_request_expire`, `session_connect`.

<!--
Source references:
- sources/walletconnect/AGENTS.md
- sources/walletconnect/packages/sign-client/README.md
- sources/walletconnect/packages/sign-client/src/client.ts
- sources/walletconnect/packages/types/src/sign-client/client.ts
- sources/walletconnect/packages/types/src/sign-client/engine.ts
-->
