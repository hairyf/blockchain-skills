---
name: foundry-forge-build-test
description: Forge build, test, snapshot, fuzz — compile, run tests, gas reports.
---

# Forge Build and Test

Forge is the build and test CLI. Agents use it to compile contracts, run tests, and inspect gas.

## Build

```bash
forge build
```

Compiles `src/` (or configured `src`), writes artifacts to `out/`. Use `--force` to recompile. Libraries and remappings from `foundry.toml` apply.

## Test

```bash
forge test
forge test --match-test testFork
forge test --match-contract MyContract
forge test --gas-report
forge test --fork-url $RPC_URL
```

- `--match-test`, `--match-contract`: filter tests by name or contract.
- `--gas-report`: print gas per test.
- `--fork-url`: run tests against a fork (e.g. mainnet); use with `--fork-block-number` for determinism.
- `-vvv` / `-vvvv`: extra traces for debugging.

## Fuzz testing

Tests that take parameters are fuzzed by default; Foundry generates random inputs. Use `vm.assume` in tests to constrain inputs. Configure runs in `foundry.toml` (e.g. `fuzz.runs`).

## Snapshot (gas)

```bash
forge snapshot
forge snapshot --diff
forge snapshot --check
```

Creates a gas snapshot from the test run. `--diff` compares to existing snapshot; `--check` fails if gas changed beyond tolerance.

## Key points

- `forge build` must succeed before `forge test` or `forge script`.
- Use `--gas-report` in CI or before optimizations.
- Fork tests with `--fork-url` for integration-style tests; pin block for reproducibility.
- Snapshots help avoid accidental gas regressions.

<!--
Source references:
- https://book.getfoundry.sh/reference/forge/forge-test
- https://book.getfoundry.sh/reference/forge/forge-snapshot
- https://book.getfoundry.sh/introduction/getting-started
-->
