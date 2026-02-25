---
name: WalletConnect Signer Connection
description: SignerConnection—IJsonRpcConnection wrapper over Sign Client for open/close/send and signer events.
metadata:
  author: hairy
---

# Signer Connection

`@walletconnect/signer-connection` provides a connection-style API on top of the Sign Client: `SignerConnection` implements `IJsonRpcConnection` with `open()`, `close()`, `send(payload, context?)`, and events. Use it when integrating with libraries that expect a single connection object rather than a session + request API.

## Setup

```typescript
import SignerConnection from "@walletconnect/signer-connection";
import { SignClient } from "@walletconnect/sign-client";

const connection = new SignerConnection({
  requiredNamespaces: {
    eip155: {
      chains: ["eip155:1"],
      methods: ["eth_sendTransaction", "personal_sign"],
      events: ["chainChanged", "accountsChanged"],
    },
  },
  client: undefined, // optional: SignClient instance or SignClient.init options
});
```

If `client` is omitted, the first call to `open()` or `send()` will call `SignClient.init(client)` with the options you passed (or create a client internally). Pass an existing `SignClient` to share it.

## Open and close

```typescript
await connection.open();
// Emits signer_uri with { uri } for QR/deep link; then signer_created with session when approved
// If an existing compatible session exists, opens without showing URI

connection.close();
// Disconnects session with reason USER_DISCONNECTED and emits close
```

## Send request

```typescript
connection.send(
  { id: 1, jsonrpc: "2.0", method: "personal_sign", params: [message, account] },
  { chainId: "eip155:1" }
);
// Listens for "payload" event for the JSON-RPC response (result or error)
connection.on("payload", (response) => { ... });
```

## Events

- `signer_init` – Sign Client initialized
- `signer_uri` – `{ uri }` for pairing (show QR or deep link)
- `signer_created` – Session created after approval
- `signer_updated` – Session namespaces updated
- `signer_deleted` – Session deleted
- `signer_event` – Session event received
- `open` – Connection opened
- `close` – Connection closed
- `open_error` – Open failed
- `payload` – JSON-RPC response (result or error)

## Key points

- `connection.connected` and `connection.connecting` reflect state; `connection.chains` and `connection.accounts` come from the session or required namespaces.
- Use when you need a single connection object (e.g. for a library that takes an IJsonRpcConnection). For direct control, use Sign Client and providers instead.

<!--
Source references:
- sources/walletconnect/providers/signer-connection/README.md
- sources/walletconnect/providers/signer-connection/src/index.ts
-->
