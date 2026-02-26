---
name: foundry-coverage-verify
description: Forge coverage and contract verification — forge coverage, forge verify-contract.
---

# Coverage and Verification

Forge can report test coverage and verify contract source on block explorers (Etherscan and compatibles).

## Coverage

```bash
forge coverage
forge coverage --report lcov
```

Runs the test suite and reports which lines/branches are covered. Use `--report lcov` to emit lcov output for external tools or CI. Coverage is based on execution during `forge test`; invariant and fuzz runs contribute.

## Verify contract

After deployment, verify the contract so the explorer shows source and ABI:

```bash
forge verify-contract <ADDRESS> <CONTRACT> --chain <CHAIN> --etherscan-api-key $KEY
# Example
forge verify-contract 0x... src/Token.sol:Token --chain mainnet
```

Contract is specified as `path:ContractName`. For constructor args:

- `--constructor-args $(cast abi-encode "constructor(uint256)" 42)`
- `--constructor-args-path args.txt`
- `--guess-constructor-args` (extract from creation code)

Use `--compiler-version` and `--num-of-optimizations` if they differ from default. `--watch` waits for verification result; `--retries` and `--delay` help with rate limits.

## Verify from script

When deploying with `forge script`, add `--verify` to verify in the same run:

```bash
forge script script/Deploy.s.sol --broadcast --verify --rpc-url $RPC
```

## Key points

- Coverage is best interpreted with lcov or a coverage dashboard; aim to cover critical paths and edge cases.
- Verification requires an API key for the explorer (e.g. Etherscan); chain must be supported.
- Constructor args must match deployment exactly; use same compiler version and optimizer runs as deploy.

<!--
Source references:
- https://getfoundry.sh/forge/reference/forge-coverage.html
- https://book.getfoundry.sh/reference/cli/forge/verify-contract
- https://getfoundry.sh/guides/deploying-contracts
-->
