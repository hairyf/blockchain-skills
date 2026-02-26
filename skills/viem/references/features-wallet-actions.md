---
name: viem-wallet-actions
description: Wallet Client actions in viem — sendTransaction, signMessage, signTypedData, prepareTransactionRequest, chain switching, EIP-5792 sendCalls.
---

# Wallet Actions

Actions that require wallet/signer and map to wallet RPC methods. Used with a **Wallet Client**; need an **account** (local or JSON-RPC). Use for sending transactions, signing, and chain switching.

## Account

- **getAddresses()**: Connected addresses (from EIP-1193 provider).
- **requestAddresses()**: Request account access (e.g. MetaMask connect).

## Transaction

- **sendTransaction({ account, to, value?, data?, gas?, maxFeePerGas?, maxPriorityFeePerGas?, nonce?, chain?, blobs?, kzg?, ... })**: Create, sign, and send; returns tx hash. With **blobs** + **kzg** sends a blob transaction (EIP-4844).
- **sendTransactionSync**: Same, returns hash synchronously where the transport supports it.
- **signTransaction({ account, to, ... })**: Sign without sending; returns serialized signed tx.
- **prepareTransactionRequest({ account, to?, data?, value?, ... })**: Build transaction request (e.g. fill gas) without sending. Use with **sendRawTransaction** or **signTransaction**.
- **sendRawTransaction({ serializedTransaction })**: Broadcast a signed serialized tx.

## Signing

- **signMessage({ account, message })**: EIP-191 personal sign; returns hex signature.
- **signTypedData({ account, domain, types, primaryType, message })**: EIP-712 typed data sign.

## Chain

- **switchChain({ id })**: Ask wallet to switch to chain ID.
- **addChain({ chain })**: Add and optionally switch to a chain.

## EIP-5792 (wallet call bundles)

- **sendCalls({ account, calls })**: Send a bundle of calls (batch) via supporting wallets.
- **getCallsStatus({ id })**, **waitForCallsStatus**, **showCallsStatus**: Status of a call bundle.
- **getCapabilities({ account })**: Check wallet capabilities (e.g. supports `wallet_sendCalls`).

## Key points

- Pass **account** per action or set **account** on the Wallet Client (account hoisting) so you don’t pass it every time.
- Use **prepareTransactionRequest** when you need to inspect or modify the request (e.g. gas) before signing/sending.
- For blob transactions, pass **blobs** (from **toBlobs**) and **kzg** (from **setupKzg**) to **sendTransaction**; chain must support EIP-4844.

<!--
Source references:
- https://viem.sh/docs/actions/wallet/introduction
- https://viem.sh/docs/actions/wallet/sendTransaction
- https://viem.sh/docs/actions/wallet/signMessage
- https://viem.sh/docs/actions/wallet/prepareTransactionRequest
-->
