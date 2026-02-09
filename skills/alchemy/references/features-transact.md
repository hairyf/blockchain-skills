---
name: alchemy-transact
description: Alchemy Transact — simulate asset changes/execution, send transaction, private tx (Flashbots).
---

# Transact Namespace

`alchemy.transact` provides transaction simulation (asset changes or full execution), sending transactions, and private transaction submission (e.g. Flashbots). It also aliases common core methods for convenience.

## Simulation

- **simulateAssetChanges(transaction)** — simulate and return list of asset changes (native/ERC-20/NFT).
- **simulateExecution(transaction)** — full simulation: internal calls, logs, ABI-decoded results.
- **simulateAssetChangesBundle(transactions)** — simulate a list of txs in sequence; returns asset changes.
- **simulateExecutionBundle(transactions)** — same but full execution trace per tx.

## Sending and Waiting

- **sendTransaction(signedTxHex)** — send standard transaction.
- **getTransaction(txHash)** — get transaction by hash.
- **waitForTransaction(txHash, confirmations?, timeout?)** — wait until mined and return receipt.
- **estimateGas(transaction)** — gas estimate (alias of core).

## Private Transactions (Flashbots)

- **sendPrivateTransaction(signedTxHex, options?)** — send private tx (e.g. Flashbots); options can specify inclusion/maxBlock, etc.
- **cancelPrivateTransaction(transactionHash)** — cancel a private tx (must be signed by same key as submitter). Fast-mode txs cannot be cancelled.
- **getMaxPriorityFeePerGas(blockTag?)** — get suggested max priority fee.

## Usage

```ts
const alchemy = new Alchemy();

// Simulate before sending
const changes = await alchemy.transact.simulateAssetChanges({
  to: '0x…',
  data: '0x…',
  from: '0x…',
});
const trace = await alchemy.transact.simulateExecution({ to: '0x…', data: '0x…' });

// Send and wait
const hash = await alchemy.transact.sendTransaction(signedHex);
const receipt = await alchemy.transact.waitForTransaction(hash);

// Private tx
await alchemy.transact.sendPrivateTransaction(signedHex);
await alchemy.transact.cancelPrivateTransaction(hash);
```

## Key Points

- Use simulation to validate state changes or debug before sending.
- Bundle methods run transactions in sequence; useful for multi-step flow checks.
- Private tx cancellation only works for the same signing key and non–fast-mode txs.

<!--
Source references:
- sources/alchemy/docs-md/classes/TransactNamespace.md
- sources/alchemy/docs-md/README.md
-->
