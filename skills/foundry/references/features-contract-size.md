---
name: foundry-contract-size
description: Contract size — forge build --sizes, 24KB limit, margin.
---

# Contract Size

Ethereum enforces a 24KB (24,576 bytes) limit on deployed contract size. Forge can report sizes and fail the build if the limit is exceeded.

## Usage

```bash
forge build --sizes
```

Builds the project and prints a table of contract sizes (non-test, non-script). Shows size and remaining margin to 24KB. Exits with code 1 if any contract exceeds the limit.

## Exclusions

Test and script contracts are excluded from the size check (they are not deployed). Contracts that are only used by tests or scripts may still appear; mark script helpers with `bool public IS_SCRIPT = true;` if they should be excluded from the limit check.

## Key points

- Run `forge build --sizes` before deployment or in CI to catch size regressions.
- Reduce size by: enabling optimizer, increasing optimizer runs (trade deploy cost for size), splitting logic into libraries or multiple contracts, removing unused code.
- Via-IR and some configs can affect which contracts appear in the report; check the output for the contracts you deploy.

<!--
Source references:
- https://book.getfoundry.sh/reference/forge/forge-build
- https://github.com/foundry-rs/foundry/issues/4615
-->
