---
name: Echidna invariants
description: How to define and run property invariants with Echidna for smart contract fuzzing.
---

# Property invariants

Echidna falsifies user-defined predicates (invariants) by generating random sequences of contract calls. Use this to check that certain conditions always hold.

## Defining invariants

Invariants are Solidity functions that:

- Are named with the configured **prefix** (default `echidna_`)
- Take **no arguments**
- Return **bool** (true = invariant holds)

Example: a balance that must never go below 20:

```solidity
function echidna_check_balance() public returns (bool) {
    return balance >= 20;
}
```

Change the prefix via config (e.g. `prefix: "invariant_"`) if you need a different naming convention.

## Running Echidna

```sh
echidna contract.sol
echidna contract.sol --contract MyTestContract --config config.yaml
```

Echidna generates call sequences, runs them, and checks each invariant. If it finds a sequence that makes an invariant return false, it reports the failing call sequence and shrinks it for triage.

## Example contract

```solidity
contract Test {
  bool private flag0 = true;
  bool private flag1 = true;

  function set0(int val) public {
    if (val % 100 == 0) flag0 = false;
  }
  function set1(int val) public {
    if (val % 10 == 0 && !flag0) flag1 = false;
  }

  function echidna_alwaystrue() public returns (bool) { return true; }
  function echidna_sometimesfalse() public returns (bool) { return flag1; }
}
```

Running `echidna tests/solidity/basic/flags.sol`: Echidna will find a sequence that falsifies `echidna_sometimesfalse` and will not falsify `echidna_alwaystrue`.

## Key points

- One invariant per function; add multiple `echidna_*` functions to check several properties.
- Invariants are checked after each generated transaction sequence (or at sequence end depending on config).
- Use `stopOnFail: true` in config to stop the campaign as soon as one invariant is falsified and shrunk.
- Property tests use `psender` (default same as deployer) for who sends property-check transactions; `sender` list controls who can send the fuzzed transactions.

<!--
Source references:
- https://github.com/crytic/echidna (README.md)
- sources/echidna/README.md
- sources/echidna/tests/solidity/basic/flags.sol
-->
