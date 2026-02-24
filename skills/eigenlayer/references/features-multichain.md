---
name: Multichain
description: CrossChainRegistry, OperatorTableUpdater, certificate verifiers, and stake consumption on destination chains.
metadata:
  author: hairy
---

# Multichain

The EigenLayer multichain design lets **destination chains** (e.g. Base) **consume** L1 stake: operator tables are derived from AllocationManager/KeyRegistrar on the **source chain** (e.g. Ethereum mainnet), signed by a **generator**, and transported to destination chains. **CertificateVerifiers** on destination chains verify task/result certificates against these tables.

## Source chain (e.g. mainnet)

- **CrossChainRegistry**: AVSs **makeGenerationReservation** (or equivalent) for operator sets they want transported. They deploy an **OperatorTableCalculator** per set (and key type) that reads EigenLayer core (DelegationManager, AllocationManager, KeyRegistrar) and computes operator table bytes.
- **Generator** (off-chain): At a cadence, reads active reservations and calculator outputs, builds **globalTableRoot**, signs it.
- **Transporter** (permissionless): Carries signed root and table updates to destination chains.

## Destination chain

- **OperatorTableUpdater**:  
  - **confirmGlobalTableRoot**: Accepts signed root from generator (certificate).  
  - **updateOperatorTable**: Updates an operator table via merkle proof against the confirmed root.
- **CertificateVerifier** (BN254 and ECDSA): Store/update operator table; verify signatures for task results. TaskMailbox (and AVSs) use these to verify operator set consensus on destination chain.

## KeyRegistrar

- AVS must set **KeyType** in KeyRegistrar on source chain even if keys are stored elsewhere, so operator table generation knows which key type to use for that AVS/set.

## Usage for agents

- AVS on destination: register for generation/transport on source (CrossChainRegistry + OperatorTableCalculator); ensure KeyRegistrar and operator set are correct.
- Submitting task results on destination: use TaskMailbox (or AVS contract) with the appropriate CertificateVerifier; operator table must be up to date (transporter updates via OperatorTableUpdater).
- Read ELIP-008 for full protocol and roles (Generator, Transporter).

<!--
Source references:
- https://github.com/Layr-Labs/eigenlayer-contracts
- sources/eigenlayer/docs/multichain/README.md
- sources/eigenlayer/docs/multichain/source/CrossChainRegistry.md
- sources/eigenlayer/docs/multichain/destination/OperatorTableUpdater.md
- sources/eigenlayer/docs/multichain/destination/CertificateVerifier.md
- ELIP-008
-->
