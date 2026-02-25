---
name: openzeppelin-governance
description: Governor contract, voting power (ERC20Votes), quorum, timelock, and proposal lifecycle.
---

# Governance (Governor)

On-chain governance: token holders propose and vote on actions; approved proposals are executed (optionally via a timelock). Build a Governor by composing base `Governor` with extensions for votes, quorum, counting, and optional timelock.

## Components

- **Voting power**: `GovernorVotes` hooks to an `IVotes` token (e.g. `ERC20Votes`). Power is taken at the snapshot when the proposal becomes active (prevents double voting). Use `ERC20Votes` for ERC-20; for existing tokens without votes use `ERC20Wrapper` to wrap 1:1 into a governance token.
- **Quorum**: e.g. `GovernorVotesQuorumFraction(4)` for 4% of supply at snapshot.
- **Counting**: e.g. `GovernorCountingSimple` — For, Against, Abstain; For and Abstain count toward quorum.
- **Timelock** (recommended): `GovernorTimelockControl` + `TimelockController`. The timelock executes proposals; grant the Governor the Proposer role and (usually) give Executor to the zero address so anyone can execute after delay. Timelock should hold funds/ownership, not the Governor.

## Proposal lifecycle

1. **Propose**: `propose(targets[], values[], calldatas[], description)`. Proposal id = hash of (targets, values, calldatas, descriptionHash). Data is not stored on-chain (gas saving); use events to reconstruct.
2. **Vote**: When active, delegates call `castVote(proposalId, support)` (0 Against, 1 For, 2 Abstain with `GovernorCountingSimple`). Only delegates have voting power; token holders must delegate (e.g. to self).
3. **Queue** (if timelock): After success, `queue(targets, values, calldatas, descriptionHash)` queues in the timelock.
4. **Execute**: After timelock delay (or immediately if no timelock), `execute(...)` runs the actions. With timelock, execution is via the timelock contract.

Set `votingDelay`, `votingPeriod`, and optionally `proposalThreshold` (e.g. in blocks or seconds; unit depends on token’s clock — see below).

## Clock (block number vs timestamp)

From v4.9, voting uses IERC6372 clock. Default is block number. For timestamp-based governance (e.g. some L2s), override `clock()` and `CLOCK_MODE()` in the token (e.g. `ERC20Votes`) and set `votingDelay`/`votingPeriod` in time units; the Governor picks up the token’s clock. Old Governors are not compatible with new timestamp-based tokens.

## Compatibility

- **GovernorStorage**: adds enumerable proposals and overloads that take only `proposalId` for queue/execute/cancel (more calldata-efficient, more storage).
- **GovernorTimelockCompound**: use when the timelock is Compound’s Timelock instead of OpenZeppelin’s `TimelockController`.
- **ERC20VotesComp** / Governor Bravo compatibility: use Comp variant for supply cap and Bravo-style interfaces if integrating with existing systems.

## Key points

- Governor is modular; combine only the extensions you need. Use timelock and give it Proposer role; keep Executor/Canceller roles minimal.
- Proposal parameters must be passed again for queue/execute (not stored); get them from proposal creation events.
- Ensure token and Governor use the same clock (block vs timestamp) and same unit for delays/periods.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/governance.adoc
-->
