---
name: arbitrum-bold-protocol
description: BOLD dispute protocol—components, L2 state provider, edge trackers, and challenge flow.
metadata:
  author: hairy
---

# BOLD Protocol (Dispute System)

BOLD (Bounded Liquidity Delay) is the permissionless dispute system for Arbitrum chains. It provides a fixed upper bound on challenge confirmations so that, under deterministic state transitions, an honest participant always wins against invalid assertions.

## Components (high level)

- **Assertion Poster** – Posts validated messages from the L2 validator onchain.
- **Assertion Scanner** – Watches L1 for new assertions and compares them to the local Nitro node via a **L2 State Provider** abstraction (`assertions/sync.go`).
- **Challenge Manager** – Opens onchain challenges (creates level-zero edges) when the node disagrees with an assertion; tracks edges as goroutines.
- **Chain Watcher** – Scans for other edges onchain and starts **edge tracker** goroutines for honest edges not yet tracked.

## Edge tracker (per edge)

Each challenge edge is a goroutine (**Edge Tracker**) that:

- Wakes at a tick interval.
- Uses a finite state machine to choose the next move: bisect, one-step proof, or subchallenge.
- Reaches a **Confirmed** state when the level-zero edge is confirmed; then the assertion can be confirmed and the honest party wins.

## Directory layout (BOLD repo)

- `api/` – Monitoring and visualization.
- `assertions/` – Scanning and posting assertions.
- `protocol/` – Rollup contract bindings.
- `challenge/` – Challenge management and logic.
- `containers/` – Data structures, including FSMs.
- `contracts/` – Rollup/challenge contracts.
- `state/` – L2 backend state and proofs interface.
- `commitment/` – Proofs, history commitments, Merkleization.
- `retry/`, `clock/`, `log/` – Utilities.

## Usage

- **Integrating BOLD**: Depend on the BOLD component; it needs an L2 State Provider (Nitro node) to get state and proofs.
- **Understanding disputes**: Assertions are posted to L1; if the local node disagrees, it challenges and edge trackers drive the protocol to confirmation.
- **Research**: See `docs/research-specs/` (BOLDChallengeProtocol.pdf, TechnicalDeepDive.pdf, Economics.pdf) and [ARCHITECTURE.md](https://github.com/OffchainLabs/bold/blob/master/docs/ARCHITECTURE.md) for diagrams and FSM.

## Key points

- BOLD is a separate repo that plugs into Nitro; it handles assertion posting and permissionless challenges.
- L2 State Provider abstracts the Nitro node; edge trackers implement the challenge FSM per edge.

<!--
Source references:
- https://github.com/OffchainLabs/nitro (bold/README.md, bold/docs/ARCHITECTURE.md)
- https://github.com/OffchainLabs/bold
-->
