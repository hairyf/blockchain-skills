---
name: WalletConnect Security and Debugging
description: Security considerations (keys, validation, URIs) and debugging (logs, session/pairing inspection).
metadata:
  author: hairy
---

# Security and Debugging

## Security

- **Private keys** – Never log or expose; clear from memory when not needed. The SDK uses X25519 + ChaCha20-Poly1305 for encryption; keys stay in the client.
- **Session validation** – Verify `requiredNamespaces` and `optionalNamespaces` in proposals; only approve chains/methods/events the wallet supports.
- **Input validation** – Validate CAIP-2 chain IDs and CAIP-10 accounts before building namespaces or responding.
- **Message integrity** – Reject malformed or unexpected payloads; rely on the SDK’s encryption and avoid tampering with envelopes.
- **URI handling** – Validate `wc:` protocol URIs before passing to `pair({ uri })`; do not trust unverified sources.

## Debugging

- **Logs** – Set `DEBUG=walletconnect:*` (or `walletconnect:sign-client:*`) when running Node to get detailed logs.
- **Relay** – Inspect WebSocket traffic to confirm connect/publish/subscribe if relay issues are suspected.
- **Sessions** – Use `client.session.getAll()` to list active sessions and their topics/namespaces.
- **Pairings** – Use `client.core.pairing.getPairings()` (or `client.pairing`) to list pairings and topics.
- **Pending requests** – Use `client.getPendingSessionRequests()` to see pending session_request payloads.

## Request queue (wallet)

By default, the Sign Client processes session requests sequentially. You can disable the queue with `signConfig: { disableRequestQueue: true }`. If disabled, implement your own deduplication (e.g. by request id) because the relay has at-least-once delivery and duplicates can occur especially shortly after init.

## Key points

- Use a dedicated `projectId` per app from WalletConnect Cloud.
- For production, validate proposer metadata and namespace constraints before calling `approve`.
- When debugging, avoid logging full session or pairing objects in production; use topic/ids only if needed.

<!--
Source references:
- sources/walletconnect/AGENTS.md
- sources/walletconnect/packages/types/src/sign-client/client.ts (SignConfig)
-->
