---
name: WalletConnect Sessions and Namespaces
description: Session and pairing lifecycle, CAIP-25 namespaces (required/optional), and chain-agnostic accounts/methods.
metadata:
  author: hairy
---

# Sessions and Namespaces

Sessions are persistent connections between a wallet and a dApp with agreed permissions. Namespaces are chain-agnostic (CAIP-25) and define chains, methods, and events.

## Session structure

A session has: `topic`, `pairingTopic`, `relay`, `expiry`, `namespaces`, `self`/`peer` metadata. Use `client.session.get(topic)` or `client.session.getAll()` to read.

## Namespace shape (CAIP-25)

Each namespace key is a chain namespace (e.g. `eip155`, `solana`). Value:

```typescript
{
  chains?: string[];   // e.g. ["eip155:1", "eip155:137"]
  accounts: string[];   // CAIP-10 e.g. "eip155:1:0x..."
  methods: string[];
  events: string[];
}
```

## Required vs optional namespaces

- **requiredNamespaces** – Chains/methods/events the dApp requires; connection fails if wallet cannot satisfy.
- **optionalNamespaces** – Additional chains/methods the dApp can use; wallet may approve a subset.

Use both in `connect()` and in proposal handling:

```typescript
await client.connect({
  requiredNamespaces: {
    eip155: {
      chains: ["eip155:1"],
      methods: ["eth_sendTransaction", "personal_sign"],
      events: ["chainChanged", "accountsChanged"],
    },
  },
  optionalNamespaces: {
    eip155: {
      chains: ["eip155:137", "eip155:42161"],
      methods: ["eth_signTypedData_v4"],
      events: [],
    },
  },
});
```

## Pairing vs session

- **Pairing** – Initial handshake (QR/deep link); creates a pairing with a `topic` and optional expiry.
- **Session** – Created when the wallet approves the dApp’s proposal; one session per dApp–wallet pair, identified by `session.topic`.

Reusing an existing pairing: pass `pairingTopic` into `connect()` so the dApp doesn’t show a new QR.

## Key points

- Chain IDs are namespace-prefixed (e.g. `eip155:1`). Use them in `request({ chainId })` and when building namespaces.
- Session expiry can be extended with `client.extend({ topic })`.
- On `session_delete` or `session_expire`, clear local UI state and optionally reconnect with `connect()`.

<!--
Source references:
- sources/walletconnect/AGENTS.md
- sources/walletconnect/packages/types/src/sign-client/session.ts
- sources/walletconnect/packages/types/src/sign-client/proposal.ts
-->
