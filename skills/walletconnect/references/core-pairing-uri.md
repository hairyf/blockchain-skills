---
name: WalletConnect Pairing and URI
description: Pairing lifecycle, wc: URI format, QR/deep link, and reusing pairings.
metadata:
  author: hairy
---

# Pairing and URI

Pairings are the initial handshake between dApp and wallet. A pairing is created when the user scans a QR code or opens a deep link; the resulting `pairingTopic` can be reused so the dApp does not show a new QR on subsequent connections.

## URI format (wc:)

WalletConnect URIs use the form:

```
wc:<topic>@2?relay-protocol=irn&symKey=<symKey>
```

- **topic** – Pairing topic (used in `pairingTopic` and in `client.pair({ uri })`).
- **relay-protocol** – Relay protocol (e.g. `irn`).
- **symKey** – Symmetric key material for the relay.

Do not construct URIs manually; use the URI returned from `client.connect()` (dApp) or from the relay when pairing. Validate that the URI starts with `wc:` and matches the expected version before calling `pair({ uri })`.

## dApp: obtaining the URI

```typescript
const { uri, approval } = await client.connect({
  requiredNamespaces: { eip155: { ... } },
});
// Show uri to user (QR or deep link)
if (uri) displayQrOrDeepLink(uri);
const session = await approval();
```

The same `connect()` call can pass an existing `pairingTopic` to reuse a pairing and avoid showing a new QR.

## Wallet: pairing by URI

```typescript
const { topic } = await client.pair({ uri: "wc:..." });
// Store topic to reuse later or use in session_proposal handling
```

## Reusing a pairing

- **dApp**: Pass `pairingTopic` into `connect({ pairingTopic: existingTopic, requiredNamespaces, ... })` so the existing pairing is used and a new URI may not be emitted.
- **Universal Provider**: Pass `pairingTopic` in `connect({ namespaces, pairingTopic })`.
- **Ethereum Provider**: Pass `pairingTopic` in `connect({ pairingTopic, ... })`.

When reusing, ensure the pairing is still valid (not expired and not deleted). Use `client.core.pairing.getPairings()` to list pairings and their topics.

## Key points

- One pairing can back multiple sessions over time; one session is typically one dApp–wallet pair.
- URIs are single-use; after a successful pair/session, do not reuse the same URI.
- For security, validate URIs (protocol, format) and only pass them from trusted flows (e.g. your own QR/deep-link UI).

<!--
Source references:
- sources/walletconnect/AGENTS.md
- sources/walletconnect/packages/core (pairing, URI)
- sources/walletconnect/packages/types (pairing types)
-->
