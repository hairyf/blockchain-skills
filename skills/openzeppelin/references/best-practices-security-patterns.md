---
name: openzeppelin-security-patterns
description: ReentrancyGuard, Pausable—when and how to use; transient storage variant.
---

# Security Patterns (ReentrancyGuard, Pausable)

Common guards for state-changing and emergency controls. Use via inheritance and modifiers.

## ReentrancyGuard

Prevents reentrant calls into a function. Apply the `nonReentrant` modifier to external entry points that perform state updates then external calls (e.g. transfer after updating balance).

```solidity
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract MyVault is ReentrancyGuard {
    function withdraw(uint256 amount) external nonReentrant {
        // state updates first, then external call
        _balances[msg.sender] -= amount;
        (bool ok,) = msg.sender.call{ value: amount }("");
        require(ok);
    }
}
```

- **Single guard**: only one `nonReentrant` can be active; nested calls to other `nonReentrant` functions from the same contract will revert. Work around by making the inner logic `private` and exposing a single `nonReentrant` entry that calls it.
- **ReentrancyGuardTransient**: on chains with EIP-1153 (transient storage), use `ReentrancyGuardTransient` instead for lower gas; the guard is cleared at end of transaction and will replace the storage-based guard in v6.

## Pausable

Emergency stop: restrict sensitive functions when the contract is paused. Authorized accounts call `pause()` / `unpause()`.

```solidity
import { Pausable } from "@openzeppelin/contracts/utils/Pausable.sol";

contract MyToken is ERC20, Pausable, AccessControl {
    function transfer(address to, uint256 amount) public override whenNotPaused returns (bool) {
        return super.transfer(to, amount);
    }
}
```

- **whenNotPaused**: function runs only if not paused.
- **whenPaused**: function runs only when paused (e.g. for emergency withdraw or admin).
- **pause() / unpause()**: restrict to owner or role (e.g. PAUSER_ROLE) so only trusted addresses can toggle.
- Use for upgrades, incident response, or compliance; avoid overuse—pausing is a last resort and can lock user funds if not designed carefully.

## Key Points

- Use ReentrancyGuard on functions that do external calls after state changes; prefer checks-effects-interactions and guard together.
- Prefer ReentrancyGuardTransient when deploying on chains with transient storage (EIP-1153).
- Pausable: gate only the functions that must be disabled; ensure unpause and access control are correct.

<!--
Source references:
- sources/openzeppelin/contracts/utils/ReentrancyGuard.sol
- sources/openzeppelin/contracts/utils/ReentrancyGuardTransient.sol
- sources/openzeppelin/contracts/utils/Pausable.sol
-->
