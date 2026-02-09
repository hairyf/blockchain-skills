---
name: solana-frontend-react-nextjs
description: React and Next.js integration for Solana — @solana/react-hooks, wallet connection, and app patterns.
---

# Solana — Frontend (React / Next.js)

## @solana/react-hooks

- Built on **@solana/client**: React provider and hooks (same runtime and cache).
- Use for wallet state, RPC, and transaction sending from React components.
- Package: `@solana/react-hooks`. Wrap the app with the provider; use hooks for accounts, balance, and sending txs.

## @solana/client (headless)

- **@solana/client**: Single store for RPC, wallets, transactions, subscriptions. Use when you do not need React or want a shared store outside React.

## Next.js

- Official docs: [Next.js + Solana](https://solana.com/docs/frontend/nextjs-solana). Use App Router or Pages with the Solana provider and wallet adapters as needed.
- Wallet connection: Use wallet-adapter (e.g. @solana/wallet-adapter-react) with Phantom, Solflare, etc.; connect to the same RPC/context as @solana/client or @solana/react-hooks.

## Web3 compatibility

- **web3-compat** layer exists for migrating from Ethereum-style APIs; prefer native Solana client/hooks for new code.

## Key points

- Provider must wrap the tree that needs RPC/wallet; use hooks to read state and submit transactions.
- For production, configure RPC endpoint (and optional commitment) in the provider.

<!--
Source references:
- https://solana.com/docs/frontend/react-hooks
- https://solana.com/docs/frontend/nextjs-solana
- https://solana.com/docs/frontend/web3-compat
- https://github.com/solana-foundation/solana-com
-->
