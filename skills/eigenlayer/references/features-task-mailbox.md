---
name: TaskMailbox
description: Task creation, executor operator sets, result submission, and certificate verification.
metadata:
  author: hairy
---

# TaskMailbox

**TaskMailbox** is a core contract for task-based AVSs: tasks are created with a fee and executor operator set; operators execute off-chain and submit results; the contract verifies consensus (certificates) and updates task state.

## Immutable config

- **BN254_CERTIFICATE_VERIFIER**, **ECDSA_CERTIFICATE_VERIFIER**: used to verify submitted results.
- **MAX_TASK_SLA**: max task duration (e.g. DEALLOCATION_DELAY/2) so operators cannot deallocate before task resolution and avoid slashing.

## Task lifecycle

1. **CREATED**: **createTask(taskParams)** returns taskHash. Params: refund collector, executor operator set, payload, SLA. Certificate staleness check: `block.timestamp + taskSLA <= operatorTableReferenceTimestamp + maxStaleness` (if maxStaleness set).
2. **VERIFIED**: Operators submit result; contract verifies against operator set and certificate; task marked verified and fees distributed.
3. **EXPIRED**: If SLA passes without verified result, task can be marked expired (refund logic as per contract).

## Executor operator sets

- Each task specifies an **executor operator set** (key). Consensus thresholds and task SLA are configured per operator set.
- Fee split (protocol vs AVS) is configurable (basis points).

## Result submission and verification

- Submitter provides result payload and certificate (BN254 or ECDSA). Contract uses **OperatorTableUpdater** / certificate verifiers to validate that the signers match the operator set and meet stake threshold.
- **getTaskInfo(taskHash)**, **getTaskStatus(taskHash)** for current state.

## Task hooks and AVS integration

- AVSs can plug in hooks (if supported) for task creation or result handling; see contract and AVS docs for hook signatures.

## Usage for agents

- Create task with correct operator set key and SLA ≤ MAX_TASK_SLA; ensure operator table is fresh (staleness check).
- Submit results with valid certificate for the task’s operator set and chain (multichain: use correct destination and verifier).
- Query task status before refund or completion logic.

<!--
Source references:
- https://github.com/Layr-Labs/eigenlayer-contracts
- sources/eigenlayer/docs/avs/task/TaskMailbox.md
- Hourglass framework, AllocationManager, KeyRegistrar, CertificateVerifier
-->
