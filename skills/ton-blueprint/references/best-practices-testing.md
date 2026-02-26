---
name: ton-blueprint-testing
description: Tests with Sandbox, wrappers, compile(), and coverage/gas report.
---

# Testing

Tests are in `tests/*.spec.ts`, use `@ton/sandbox` (in-process blockchain) and contract wrappers. Run with `yarn test` or `yarn blueprint test`; optionally `yarn test <CONTRACT>`.

## Test layout

```ts
import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { MyContract } from '../wrappers/MyContract';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('MyContract', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('MyContract');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let contract: SandboxContract<MyContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        contract = blockchain.openContract(MyContract.createFromConfig({}, code));
        deployer = await blockchain.treasury('deployer');

        const result = await contract.sendDeploy(deployer.getSender(), toNano('0.05'));
        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            to: contract.address,
            deploy: true,
            success: true,
        });
    });

    it('should do something', async () => {
        // use contract.get*(), contract.send*(), expect(...)
    });
});
```

## Patterns

- Use `compile('ContractName')` once in `beforeAll`.
- Create `Blockchain` and `blockchain.treasury('deployer')` in `beforeEach`.
- Open contract with `blockchain.openContract(Contract.createFromConfig(config, code))`.
- Assert deploy with `toHaveTransaction({ deploy: true, success: true })` from `@ton/test-utils`.
- Use wrapper getters and send methods for behavior tests.

## Coverage and gas

- **Coverage:** `blueprint test --coverage`; output in `coverage/`.
- **Gas report:** `blueprint test --gas-report` (or `-g`) compares to last snapshot.
- **Snapshot:** `blueprint snapshot [--label=<comment>]` saves current gas metrics for later comparison.

<!--
Source references:
- https://github.com/ton-org/blueprint/blob/main/README.md (Testing contracts, Benchmark contracts)
- https://github.com/ton-org/sandbox (writing tests, benchmark)
- sources/ton-blueprint/src/templates (spec.ts.template)
-->
