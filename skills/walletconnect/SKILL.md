---
name: walletconnect
description: Agent skills for WalletConnect v2—Sign Client, sessions, namespaces, Universal Provider, Ethereum Provider, security and debugging.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/WalletConnect/walletconnect-monorepo
---

> Skills are based on WalletConnect monorepo (sign-client v2.23.x), generated from source AGENTS.md, package READMEs, and types.

WalletConnect is an open protocol for connecting wallets to dApps via end-to-end encrypted relay. The SDK provides Sign Client (sessions, pairings, proposals, requests), Universal Provider (multi-chain), and Ethereum Provider (EIP-1193).

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Sign Client | Init, connect, pair, approve, reject, request, respond, disconnect, events | [core-sign-client](references/core-sign-client.md) |
| Sessions and Namespaces | Session/pairing lifecycle, CAIP-25 namespaces, required/optional | [core-sessions-namespaces](references/core-sessions-namespaces.md) |
| Pairing and URI | wc: URI format, QR/deep link, reusing pairings | [core-pairing-uri](references/core-pairing-uri.md) |

## Features

### Providers

| Topic | Description | Reference |
|-------|-------------|-----------|
| Universal Provider | Multi-chain provider, connect, request, setDefaultChain, events | [features-universal-provider](references/features-universal-provider.md) |
| Ethereum Provider | EIP-1193 provider, connect, request, events, Next.js/SSR | [features-ethereum-provider](references/features-ethereum-provider.md) |
| Signer Connection | IJsonRpcConnection wrapper, open/close/send, signer events | [features-signer-connection](references/features-signer-connection.md) |

### Pay

| Topic | Description | Reference |
|-------|-------------|-----------|
| Pay SDK | getPaymentOptions, getRequiredPaymentActions, confirmPayment, React Native | [features-pay](references/features-pay.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Security and Debugging | Keys, validation, URIs; DEBUG logs, session/pairing inspection | [best-practices-security-debugging](references/best-practices-security-debugging.md) |
| Error Handling | getSdkError, SDK error codes, reject/disconnect reasons | [best-practices-error-handling](references/best-practices-error-handling.md) |
