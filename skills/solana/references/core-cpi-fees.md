---
name: solana-core-cpi-fees
description: Cross-program invocation (CPI) and transaction fees (base, priority, compute units) on Solana.
---

# Solana Core — CPI and Fees

## Cross-program invocation (CPI)

- **CPI**: One program calls an instruction of another program. Enables composability.
- Account permissions (signer, writable) flow from caller to callee; max call depth is 4 (stack height 5).
- For **PDA signers**: use `invoke_signed(instruction, account_infos, signers_seeds)` (Rust). Pass the seeds and bump used to derive the PDA so the runtime can verify and add the PDA as signer.

## Transaction fees

- **Base fee**: 5000 lamports per signature. Paid by first signer (must be System Program–owned). 50% burned, 50% to validator.
- **Prioritization fee**: Optional. `priority_fee = CU_limit * CU_price`; 100% to validator. Use Compute Budget instructions to set `SetComputeUnitLimit` and `SetComputeUnitPrice`.

## Compute units

- Default: 200,000 CU per instruction, 1.4M per transaction. Override with Compute Budget program instructions.
- Set CU limit to estimated usage + ~10% margin to avoid overpaying for unused CUs.
- Simulate the transaction to estimate CUs before sending.

## Key points

- CPI with PDA: always pass the same seeds (including bump) in `signers_seeds` that were used to derive the PDA.
- Priority fee is charged on the requested CU limit, not actual usage—tune limit to avoid waste.

<!--
Source references:
- https://solana.com/docs/core/cpi
- https://solana.com/docs/core/fees
- https://github.com/solana-foundation/solana-com
-->
