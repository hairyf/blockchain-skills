---
name: solana-kit-instruction-plans
description: Instruction plans — compose multi-step operations (sequential/parallel), transaction planner, and transaction plan executor.
---

# Instruction plans (Kit)

Instruction plans describe multi-step operations (possibly multiple transactions) as a tree of instructions: sequential, parallel, or message-packers. A **transaction planner** turns an instruction plan into a **transaction plan** (built transaction messages). A **transaction plan executor** signs and sends those messages and returns a **transaction plan result**.

## Creating plans

```ts
import {
  singleInstructionPlan,
  sequentialInstructionPlan,
  parallelInstructionPlan,
  nonDivisibleSequentialInstructionPlan,
} from '@solana/kit';

const plan = sequentialInstructionPlan([
  parallelInstructionPlan([depositAlice, depositBob]),
  activateVault,
  parallelInstructionPlan([withdrawAlice, withdrawBob]),
]);

const atomicPlan = nonDivisibleSequentialInstructionPlan([createAccount, initializeMint]);
```

- **sequentialInstructionPlan** — children run in order.
- **parallelInstructionPlan** — children can run in parallel (separate transactions).
- **nonDivisibleSequentialInstructionPlan** — must run atomically (single tx or bundle).

## Transaction planner

```ts
import {
  createTransactionPlanner,
  pipe,
  createTransactionMessage,
  setTransactionMessageFeePayerSigner,
} from '@solana/kit';

const transactionPlanner = createTransactionPlanner({
  createTransactionMessage: () =>
    pipe(
      createTransactionMessage({ version: 0 }),
      (m) => setTransactionMessageFeePayerSigner(payer, m),
    ),
});

const transactionPlan = await transactionPlanner(instructionPlan, { abortSignal });
```

Optional: `onTransactionMessageUpdated(message)` to add instructions (e.g. compute limit, guards) during planning.

## Transaction plan executor

```ts
import {
  createTransactionPlanExecutor,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
  assertIsSendableTransaction,
  assertIsTransactionWithBlockhashLifetime,
  sendAndConfirmTransactionFactory,
} from '@solana/kit';

const sendAndConfirmTransaction = sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions });

const transactionPlanExecutor = createTransactionPlanExecutor({
  executeTransactionMessage: async (context, message) => {
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
    const withLifetime = setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, message);
    context.message = withLifetime;
    const transaction = await signTransactionMessageWithSigners(withLifetime);
    context.transaction = transaction;
    assertIsSendableTransaction(transaction);
    assertIsTransactionWithBlockhashLifetime(transaction);
    await sendAndConfirmTransaction(transaction, { commitment: 'confirmed' });
    return transaction;
  },
});

const result = await transactionPlanExecutor(transactionPlan, { abortSignal });
```

Context (`context`) is preserved on each result (success/fail/cancel) for debugging; standard fields: `message`, `transaction`, `signature`.

## Result handling

- **Successful**: `isSuccessfulSingleTransactionPlanResult(result)`; `result.context.signature`, `result.context.transaction`.
- **Failed**: `isFailedSingleTransactionPlanResult(result)`; `result.error`, `result.context`.
- On failure the executor throws `SOLANA_ERROR__INSTRUCTION_PLANS__FAILED_TO_EXECUTE_TRANSACTION_PLAN`; the full `TransactionPlanResult` is on the error context.

## Key points

- Use instruction plans when an operation spans multiple instructions or transactions and you want planning (how many txs, ordering) and execution (sign + send) separated.
- Use `fillProvisorySetComputeUnitLimitInstruction` in the planner and `estimateAndUpdateProvisoryComputeUnitLimitFactory` in the executor for dynamic CU limits. Use `setTransactionMessageLifetimeUsingDurableNonce` + `sendAndConfirmDurableNonceTransactionFactory` for durable nonce flows.

<!--
Source references:
- sources/solana-kit/docs/content/docs/concepts/instruction-plans.mdx
-->
