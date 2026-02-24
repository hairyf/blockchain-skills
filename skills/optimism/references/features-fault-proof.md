---
name: optimism-fault-proof
description: Fault proof components—program, VM, interactive dispute game, and pre-image oracle.
---

# Fault Proof

Fault proofs (fraud proofs / interactive games) allow L1 to verify L2 state. Use when reasoning about withdrawal finalization, challenger flows, or dispute game contracts.

## Three components

1. **Program**: Stateless verification of the dispute given a commitment to rollup inputs (L1 data). Authenticates inputs via pre-image oracle.
2. **VM**: Executes the program step-by-step; can trace any instruction and prove it on L1.
3. **Interactive dispute game**: Bisects the dispute to a single instruction; resolves base case using the VM.

Different implementations of each can be combined for proof diversity.

## Pre-image oracle

Communication between the program (client) and VM (server). Program requests input data by **pre-image key** (type-prefixed `bytes32`):

- **Type 0**: Illegal (non-zero keys only).
- **Type 1**: Local key (dispute-specific; bootstrapping, indices).
- **Type 2**: Global keccak256.
- **Type 3**: Global generic.
- **Type 4**: Global SHA2-256.
- **Type 5**: EIP-4844 point-evaluation.
- **Type 6**: Global precompile.
- **Types 7–128**: Reserved.
- **129–255**: Application.

Bootstrapping and hinting routes supply L1/L2 block headers, transactions, receipts, state nodes, code, outputs, etc. See fault-proof spec for exact hint routes (`l1-block-header`, `l2-output`, etc.).

## L1 contracts (stage one)

- **DisputeGameFactory**: Creates FaultDisputeGame instances; output proposals submitted here.
- **FaultDisputeGame**: Interactive game; bonds in DelayedWETH; anchor state in AnchorStateRegistry.
- **OptimismPortal**: Withdrawal finalization depends on output roots and challenge period; integrates with dispute game state.

## Usage

- Withdrawals are proven against an L2 output root; that root can be challenged via a dispute game. After the challenge period, withdrawals that were proven against an unchallenged root can be finalized.
- When building challenger or verifier tooling: use pre-image oracle key types and hint routes from the spec; implement or integrate with the fault-proof program and VM for the correct protocol version.

<!--
Source references:
- https://github.com/ethereum-optimism/specs/blob/main/specs/fault-proof/index.md
- https://github.com/ethereum-optimism/specs/blob/main/specs/fault-proof/cannon-fault-proof-vm.md
- https://github.com/ethereum-optimism/specs/blob/main/specs/fault-proof/stage-one/
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/overview.md
-->
