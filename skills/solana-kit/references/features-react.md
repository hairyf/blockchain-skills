---
name: solana-kit-react
description: React hooks for wallet sign-in, message/transaction signing, and send — useSignIn, useWalletAccountTransactionSigner, useSignAndSendTransaction, SelectedWalletAccountContextProvider.
---

# React (Kit)

`@solana/react` provides React hooks that bridge Wallet Standard (e.g. Phantom) and Kit: sign-in, sign message, sign/send transactions, selected account state.

## Provider and selected account

Wrap with SelectedWalletAccountContextProvider (filterWallet, stateSync: getSelectedWallet, storeSelectedWallet, deleteSelectedWallet). useSelectedWalletAccount() returns [account, setAccount, filteredWallets].

## Hooks

- useSignIn(wallet) — Sign In With Solana; returns account, signedMessage, signature.
- useSignMessage(account) — sign bytes; returns { signature, signedMessage }.
- useWalletAccountMessageSigner(account) — MessageModifyingSigner for createSignableMessage.
- useSignTransaction(account, chain) — returns function({ transaction, options? }) => { signedTransaction }. Chain: solana:mainnet, solana:devnet.
- useWalletAccountTransactionSigner(account, chain) — TransactionModifyingSigner.
- useSignAndSendTransaction(account, chain) — returns function({ transaction, options? }) => { signature } (Uint8Array).
- useWalletAccountTransactionSendingSigner(account, chain) — use with signAndSendTransactionMessageWithSigners.
- useSignTransactions / useSignAndSendTransactions — batch multiple transactions.

## Key points

Hooks expect Wallet Standard UiWalletAccount (or UiWallet for useSignIn). Signer hooks return ModifyingSigner types because the wallet may change message/transaction. Use stateSync to persist selected wallet (e.g. localStorage).

<!-- Source: sources/solana-kit/packages/react/README.md -->
