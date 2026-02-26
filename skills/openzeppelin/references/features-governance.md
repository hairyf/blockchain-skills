---
name: openzeppelin-governance
description: Governor contract—ERC20Votes, quorum, timelock, proposal lifecycle, timestamp-based voting.
---

# Governance (Governor)

On-chain governance: token holders propose and vote on actions; approved proposals are executed (optionally via a timelock). Build a Governor by composing base `Governor` with extensions for votes, quorum, counting, and optional timelock.

## Token (Voting Power)

- Use **ERC20Votes** so voting power is based on historical balance (snapshot at proposal activation), not current balance, to prevent double voting. Use `GovernorVotes` to hook to an `IVotes` token. For existing tokens without votes use **ERC20Wrapper** to wrap 1:1 into a governance token.
- Clock: by default block-number based; from v4.9 override `clock()` and `CLOCK_MODE()` (IERC6372) in the token for timestamp-based voting (e.g. some L2s). Set `votingDelay`/`votingPeriod` in the same unit; the Governor picks up the token's clock.

```solidity
import { ERC20Votes } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract MyToken is ERC20, ERC20Permit, ERC20Votes {
    constructor() ERC20("MyToken", "MTK") {}
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
- **GovernorTimelockControl**: use OpenZeppelin's `TimelockController`; proposals are queued then executed after delay. The timelock (not the Governor) should hold funds and roles; grant the Governor the Proposer role. Executor can be zero address (anyone executes) or the Governor.

## Proposal lifecycle

1. **Propose**: `propose(targets[], values[], calldatas[], description)`. Proposal id = hash of (targets, values, calldatas, descriptionHash). Data is not stored on-chain (gas saving); use events when calling queue/execute.
2. **Vote**: When active, delegates call `castVote(proposalId, support)` (0 Against, 1 For, 2 Abstain with `GovernorCountingSimple`). Only delegates have voting power; token holders must delegate (e.g. to self).
3. **Queue** (if timelock): After success, `queue(targets, values, calldatas, descriptionHash)`.
4. **Execute**: After timelock delay (or immediately if no timelock), `execute(...)` runs the actions. With timelock, execution is via the timelock contract.

## Compatibility

- **GovernorStorage**: adds enumerable proposals and overloads that take only `proposalId` for queue/execute/cancel (more calldata-efficient, useful on L2).
- **GovernorTimelockCompound**: use when the timelock is Compound's Timelock instead of OpenZeppelin's `TimelockController`.
- **ERC20VotesComp**: for GovernorBravo/Alpha compatibility (supply cap 2^96).

## Key Points

- Always use a voting token with historical snapshots (ERC20Votes or equivalent); never raw balance for voting.
- Governor is modular; combine only the extensions you need. Timelock roles: Proposer = Governor; keep Executor/Canceller minimal.
- Proposal parameters must be passed again for queue/execute (not stored); get them from proposal creation events. Ensure token and Governor use the same clock (block vs timestamp) and same unit for delays/periods.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/governance.adoc
-->
