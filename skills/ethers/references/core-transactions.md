---
name: ethers-transactions
description: Ethers.js transactions — sendTransaction, wait for receipt, getBlockNumber, getFeeData, getTransactionCount.
---

# Transactions and Receipts

State changes require a transaction. Send via a Signer; wait for inclusion to get a receipt. Use Provider to read block and fee data.

## Sending and waiting

```ts
const tx = await signer.sendTransaction({
  to: "ethers.eth",
  value: parseEther("1.0")
});
// Transaction is in mempool; not yet included
const receipt = await tx.wait();
// receipt.blockNumber, receipt.gasUsed, receipt.status (1 success, 0 reverted), receipt.logs
```

## Querying state (Provider)

```ts
const blockNumber = await provider.getBlockNumber();
const balance = await provider.getBalance(addressOrEns);
const nonce = await provider.getTransactionCount(addressOrEns);
const feeData = await provider.getFeeData();
// feeData.gasPrice (legacy), feeData.maxFeePerGas, feeData.maxPriorityFeePerGas
```

## Block and fee data

For EIP-1559, use `getFeeData()`; `maxFeePerGas` is computed from base fee + priority. For legacy chains use `feeData.gasPrice`. Base fee can be read from the latest block if needed: `(await provider.getBlock("latest")).baseFeePerGas`.

## Key Points

- signer.sendTransaction(txRequest) returns a TransactionResponse; tx.wait() returns TransactionReceipt.
- Receipt.status === 1 means success; 0 means reverted (fee still paid).
- getTransactionCount returns the next nonce for an address; use when sending multiple txs.

<!--
Source references:
- sources/ethers/docs.wrm/getting-started.wrm
- sources/ethers/docs.wrm/migrating.wrm
- https://docs.ethers.org/v6/
-->
