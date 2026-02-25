---
name: solana-kit-unstable-subscriptions
description: Unstable RPC subscriptions — createSolanaRpcSubscriptions_UNSTABLE for BlockNotificationsApi, SlotsUpdatesNotificationsApi.
---

# Unstable RPC subscriptions (Kit)

Stable RPC subscriptions (accountNotifications, slotNotifications, etc.) are available from createSolanaRpcSubscriptions. Unstable subscriptions (e.g. blockSubscribe, slotsUpdatesSubscribe) are not in the default API. If your RPC server supports them, use createSolanaRpcSubscriptions_UNSTABLE or createSolanaRpcSubscriptionsFromTransport_UNSTABLE to get a client that includes SolanaRpcSubscriptionsApiUnstable (e.g. BlockNotificationsApi, SlotsUpdatesNotificationsApi). Same .subscribe({ abortSignal }) pattern; only use when your endpoint documents support for these methods.

## Key points

- Use createSolanaRpcSubscriptions_UNSTABLE('ws://...') or createSolanaRpcSubscriptionsFromTransport_UNSTABLE(transport). Check Solana docs for unstable subscription method names and support.

<!-- Source: sources/solana-kit/README.md Including Unstable Subscriptions -->
