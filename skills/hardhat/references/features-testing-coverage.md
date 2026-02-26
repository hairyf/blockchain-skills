---
name: hardhat-code-coverage
description: Hardhat built-in code coverage (--coverage), LCOV, HTML report.
---

# Code Coverage

Hardhat 3 has built-in code coverage for Solidity contracts. Use it to see which parts of your contracts are exercised by tests.

## Usage

```bash
npx hardhat test --coverage
```

Combined coverage of all tests is shown. Output:

- **Terminal:** Markdown summary
- **coverage/:** LCOV (`coverage/lcov.info`) and HTML report (`coverage/html/index.html`)

Run coverage for a subset of tests:

```bash
npx hardhat test solidity contracts/Counter.t.sol --coverage
```

## How it works

Hardhat instruments Solidity contracts with markers and measures coverage at runtime.

- Works with optimized code; results are stable across solc versions.
- Side effects: `allowUnlimitedContractSize` is forced true on simulated networks; gas costs and bytecode size increase in coverage mode.

## HTML and LCOV

- Open `coverage/html/index.html` in a browser for per-file, per-line coverage.
- Use `coverage/lcov.info` with tools (e.g. CI) or the VS Code [Coverage Gutters](https://marketplace.visualstudio.com/items?itemName=ryanluker.vscode-coverage-gutters) extension (“Coverage Gutters: Watch”) to see coverage in the editor.

## Key points

- Use `--coverage` with the `test` task or subtasks (`test solidity`, `test nodejs`).
- Coverage runs use different bytecode; do not use coverage builds for deployment or verification.

<!--
Source references:
- https://hardhat.org/docs/guides/testing/code-coverage
-->
