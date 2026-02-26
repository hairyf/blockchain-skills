---
name: openzeppelin-governance
description: Governor setup—ERC20Votes, timelock, proposal lifecycle, timestamp-based voting.
---

# Governance (Governor)

On-chain governance: token-weighted proposals, voting, optional timelock, and execution. Built from composable modules so you can match Compound-style behavior or use a minimal OpenZeppelin stack.

## Token (Voting Power)

- Use **ERC20Votes** so voting power is based on historical balance (snapshot), not current balance, to prevent double voting.
- Optional: **ERC20Wrapper** to wrap an existing non-votes token 1:1 for governance.
- Clock: by default block-number based; override `clock()` and `CLOCK_MODE()` (IERC6372) for timestamp-based voting (v4.9+).

```solidity
import { ERC20Votes } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract MyToken is ERC20, ERC20Permit, ERC20Votes {
    constructor() ERC20("MyToken", "MTK") {}
    // required overrides for ERC20Votes
    function _afterTokenTransfer(address from, address to, uint256 amount) internal override(ERC20, ERC20Votes) { ... }
    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) { ... }
    function _burn(address from, uint256 amount) internal override(ERC20, ERC20Votes) { ... }
}
```

## Governor Modules

- **Governor**: base; define `votingDelay()`, `votingPeriod()`, `proposalThreshold()`.
- **GovernorVotes**: use an `IVotes` token for voting power.
- **GovernorVotesQuorumFraction**: quorum as a percentage of past total supply (e.g. 4).
- **GovernorCountingSimple**: For / Against / Abstain; For and Abstain count toward quorum.
- **GovernorTimelockControl**: use OpenZeppelin’s `TimelockController`; proposals are queued then executed after delay.

When using a timelock, the **timelock** (not the Governor) should hold funds and roles; the Governor gets the Proposer role. Executor can be zero address (anyone executes) or the Governor for time-sensitive execution.

## Proposal Lifecycle

1. **Propose**: `propose(targets[], values[], calldatas[], description)`. Proposal id = hash of (targets, values, calldatas, descriptionHash). No single array of actions; pass three arrays.
2. **Vote**: once active, delegates call `castVote(proposalId, support)` (or weighted variants). Only delegates have voting power; token holders delegate to themselves or others.
3. **Queue** (if timelock): after success, `queue(targets, values, calldatas, descriptionHash)`.
4. **Execute**: after timelock delay, `execute(...)` (or without timelock, execute immediately after success).

Proposal data is not stored on-chain (gas saving); get it from events when calling queue/execute.

## Compatibility

- **GovernorStorage**: optional; adds proposal enumeration and overloads that take only `proposalId` (more calldata for queue/execute, useful on L2).
- **GovernorTimelockCompound**: use with Compound’s Timelock instead of TimelockController.
- **ERC20VotesComp**: for GovernorBravo/Alpha compatibility (supply cap 2^96).

## Key Points

- Always use a voting token with historical snapshots (ERC20Votes or equivalent); never raw balance for voting.
- Timelock roles: Proposer = Governor; Executor = zero or Governor; Canceller = Governor; avoid extra proposers/cancellers.
- For timestamp-based governance, set it on the token first (clock override); Governor picks it up automatically.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/governance.adoc
- OpenZeppelin Governance API
-->
