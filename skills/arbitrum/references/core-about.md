---
name: arbitrum-nitro-about
description: Arbitrum Nitro L2 stack—Geth, ArbOS, WASM fraud proofs, and where docs live.
metadata:
  author: hairy
---

# Arbitrum Nitro Overview

Nitro is the current Arbitrum L2 stack: a full optimistic rollup with sequencer, fraud proofs, token bridges, and calldata compression. In-repo docs are minimal; the main documentation lives in [nitro-docs](https://github.com/OffchainLabs/nitro-docs) and the [developer portal](https://developer.arbitrum.io/).

## Stack components

- **Execution**: Geth (EVM) compiled into the L2 engine; no custom EVM emulator.
- **Fraud proofs**: Interactive fraud proofs over **WASM**. The Nitro engine is built with standard languages/tooling and compiles to native for normal execution; validators switch to WASM when a fraud proof is needed.
- **ArbOS**: Go component for L2 chain operations—cross-chain communication, batching, and compression to reduce L1 costs.

So: Nitro runs Geth at L2 on top of Ethereum and can prove fraud over Geth’s core compiled to WASM.

## Practical use

- **Building/running**: Follow [docs.arbitrum.io](https://docs.arbitrum.io/) (e.g. [run Nitro node](https://docs.arbitrum.io/run-arbitrum-node/run-nitro-dev-node), [build Nitro](https://docs.arbitrum.io/run-arbitrum-node/nitro/build-nitro-locally)). The Nitro repo README and CONTRIBUTING point to these.
- **Audits**: [Audit reports](https://docs.arbitrum.io/audit-reports).
- **Migration**: Arbitrum One moved from Classic to Nitro (see [state migration](https://developer.arbitrum.io/migration/state-migration), [dapp migration](https://developer.arbitrum.io/migration/dapp_migration)).

## Key points

- Nitro = Geth + ArbOS + WASM-based fraud proofs; main docs are in nitro-docs and developer.arbitrum.io.
- For run/build/contributing, use the external docs; the Nitro repo holds code, ADRs, and BOLD-related docs.

<!--
Source references:
- https://github.com/OffchainLabs/nitro (README.md)
- https://github.com/OffchainLabs/nitro/blob/main/docs/notice.md
-->
