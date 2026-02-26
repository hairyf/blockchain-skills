---
name: WalletConnect Error Handling
description: SDK error codes, getSdkError, reject reasons, and handling rejections in proposals and requests.
metadata:
  author: hairy
---

# Error Handling

WalletConnect uses structured errors from `@walletconnect/utils`: `SDK_ERRORS`, `INTERNAL_ERRORS`, `getSdkError(key, context?)`, and `getInternalError(key, context?)`. Use them when rejecting session proposals or returning error responses.

## SDK errors (user-facing)

Use `getSdkError(key)` for rejections and JSON-RPC error responses. Returns `{ message, code }`. Categories: Invalid (1xxx), Unauthorized (3xxx), Rejected (5xxx), Unsupported (51xx), USER_DISCONNECTED (6xxx), SESSION_SETTLEMENT_FAILED (7xxx), WC_METHOD_UNSUPPORTED (10xxx).

## Rejecting and disconnecting

```typescript
import { getSdkError } from "@walletconnect/utils";
await client.reject({ id: proposalId, reason: getSdkError("USER_REJECTED") });
await client.disconnect({ topic: sessionTopic, reason: getSdkError("USER_DISCONNECTED") });
```

## Key points

- Always use getSdkError when calling reject(), disconnect(), or returning JSON-RPC errors. Pass optional context as second argument.

<!--
Source references:
- sources/walletconnect/packages/utils/src/errors.ts
-->

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
