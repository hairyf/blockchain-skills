---
name: foundry-testing-best-practices
description: Test layout, naming, isolation, and CI patterns for Forge tests.
---

# Testing Best Practices

Structure and run Forge tests so they stay fast, deterministic, and easy to maintain.

## Naming and layout

- Prefix test functions with `test` (e.g. `testTransferRevertsWhenBalanceLow`); prefix fuzz with `testFuzz_` or use parameters; prefix invariants with `invariant_`.
- One test file per contract under test (e.g. `Token.t.sol` for `Token.sol`) or group by feature.
- Put tests in `test/`; Forge discovers any `*.t.sol` there. Use `setUp()` for shared state so each test gets a fresh EVM.

## Isolation

- Use `setUp()` to deploy contracts and set initial state; avoid relying on test order.
- For fork tests, create the fork in `setUp()` or at the start of the test and pin block for reproducibility.
- Clear mocks (`vm.clearMockedCalls()`) or use new fork when tests depend on clean state.
- Prefer `vm.prank` and `deal` over transferring from a shared account so tests don’t interfere.

## CI and performance

- Run `forge test` with a fixed fuzz run count (e.g. in `foundry.toml`) so CI is predictable.
- Use `--gas-report` in CI to track regressions; use `forge snapshot --check` to fail on gas changes.
- Fork tests: use a cached RPC or limited block range to avoid flakiness and rate limits.
- Disable FFI in CI unless required; enable only for the job that needs it.

## Key points

- Determinism: pin forks, avoid `block.timestamp`/block-dependent data unless fuzzed, use fixed seeds if needed.
- Keep tests focused: one behavior per test; use descriptive names and `assert` messages.
- Balance speed and coverage: more fuzz runs and invariant depth improve coverage but slow CI; tune per repo.

<!--
Source references:
- https://book.getfoundry.sh/forge/tests
- https://getfoundry.sh/forge/
-->
