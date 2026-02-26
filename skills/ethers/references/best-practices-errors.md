---
name: ethers-errors
description: Ethers.js error handling — reverted transactions, receipt.status, provider and contract errors.
---

# Error Handling

Transactions can revert; RPC and contract calls can fail. Check receipt status and catch structured errors for robust handling.

## Reverted transactions

A reverted transaction is still included and pays gas. Check the receipt:

```ts
const tx = await signer.sendTransaction({ ... });
const receipt = await tx.wait();
if (receipt.status === 0) {
  // Transaction reverted
}
// receipt.status === 1 means success
```

## Contract and call failures

When a state-changing method is executed via a Signer, a revert on-chain results in the promise rejecting. Simulated calls (staticCall) also reject on revert:

```ts
try {
  await contract.transfer.staticCall(to, amount);
} catch (err) {
  // err.code, err.data (revert data), err.shortMessage
  if (err.code === "CALL_EXCEPTION") {
    // Decode revert reason if ABI includes custom errors
  }
}
```

## Provider errors

Network and RPC errors (e.g. timeout, invalid response) surface as thrown errors. Use try/catch around sendTransaction, wait(), and provider calls; handle rate limits and chain switches (e.g. re-connect after user switches network).

## Key Points

- receipt.status: 1 = success, 0 = reverted.
- Catch errors from sendTransaction, wait(), and contract methods; inspect code and data for CALL_EXCEPTION.
- v6 replaced the Logger class with error utility functions; see API docs for error types and helpers.

<!--
Source references:
- sources/ethers/docs.wrm/migrating.wrm (about-errors)
- sources/ethers/docs.wrm/getting-started.wrm
- https://docs.ethers.org/v6/
-->
