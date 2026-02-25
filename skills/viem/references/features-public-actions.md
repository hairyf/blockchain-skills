---
name: viem-public-actions
description: Public Client actions in viem — getBalance, getBlock, getLogs, watchEvent, estimateGas, transaction receipt and status.
---

# Public Actions

Actions that map one-to-one to public Ethereum RPC methods. Used with a **Public Client**; no signing, no special permissions. Use for reading chain state, logs, blocks, and transaction status.

## Account & balance

- **getBalance({ address, blockNumber?, blockTag? })**: Balance in wei. Use **formatEther** for display.
- **getTransactionCount({ address, blockNumber?, blockTag? })**: Nonce for the address.

## Block

- **getBlockNumber()**: Current block number.
- **getBlock({ blockNumber?, blockTag?, includeTransactions? })**: Block header and optional transactions.
- **getBlockTransactionCount({ blockNumber?, blockTag? })**: Number of transactions in a block.
- **watchBlockNumber**, **watchBlocks**: Subscribe to new blocks (requires WebSocket transport).

## Transaction status

- **getTransaction({ hash })**: Transaction by hash.
- **getTransactionReceipt({ hash })**: Receipt (status, logs, gasUsed).
- **getTransactionConfirmations({ hash })**: Number of confirmations.
- **waitForTransactionReceipt({ hash, confirmations?, timeout? })**: Wait until receipt (and optional confirmations).
- **watchPendingTransactions**: Subscribe to pending tx hashes (WebSocket).

## Logs and events

- **getLogs({ address?, event?, events?, args?, fromBlock?, toBlock?, blockHash?, strict? })**: Event logs. Scope by contract **address**, **event** (or **events**), indexed **args**, and block range. Use **parseAbiItem** for human-readable event.
- **createEventFilter**, **getFilterChanges**, **getFilterLogs**, **uninstallFilter**: Polling-based log filters.
- **watchEvent({ address?, event?, events?, args?, onLogs })**: Subscribe to logs (WebSocket).

```ts
import { parseAbiItem } from 'viem'

const logs = await publicClient.getLogs({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  args: { from: '0x...' },
  fromBlock: 16330000n,
  toBlock: 16330050n,
})
```

## Fee and gas

- **getGasPrice()**: Current gas price.
- **estimateFeesPerGas()**: EIP-1559 maxFeePerGas / maxPriorityFeePerGas.
- **estimateGas({ account?, data?, to?, value?, ... })**: Estimate gas for a call or transaction.
- **getFeeHistory({ blockCount, newestBlock, rewardPercentiles? })**: Historical fee data.
- **getBlobBaseFee()**: Blob base fee (EIP-4844).

## Call and proof

- **call({ account?, data?, to?, value?, blockNumber?, blockTag? })**: Raw eth_call.
- **createAccessList({ account?, data?, to?, ... })**: Build access list for a call.
- **getProof({ address, storageKeys, blockNumber?, blockTag? })**: Merkle proof for account/storage.

## Chain and EIP-712

- **getChainId()**: Current chain ID.
- **getEip712Domain({ contractAddress })**: EIP-712 domain for a contract.

## Key points

- Public actions are read-only and do not require an account; pass **account** only where needed (e.g. **estimateGas** for a state-changing call).
- For subscriptions (**watchBlockNumber**, **watchEvent**, **watchPendingTransactions**) use a transport that supports subscriptions (e.g. **webSocket**).
- **getLogs** with **event** + **args** + block range is the standard way to query historical events; use **watchEvent** for real-time logs.

<!--
Source references:
- https://viem.sh/docs/actions/public/introduction
- https://viem.sh/docs/actions/public/getBalance
- https://viem.sh/docs/actions/public/getLogs
- https://viem.sh/docs/actions/public/getTransactionReceipt
- https://viem.sh/docs/actions/public/waitForTransactionReceipt
-->
