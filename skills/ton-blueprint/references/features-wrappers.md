---
name: ton-blueprint-wrappers
description: Contract wrappers — Contract interface, createFromConfig, createFromAddress, sendDeploy.
---

# Wrappers

Wrappers are TypeScript classes that implement `Contract` from `@ton/core`. They provide address/init, message encoding, getters, and a standard deploy helper. Tact generates its own wrappers under `build/<CONTRACT>/`.

## Contract interface (from @ton/core)

- `address: Address`
- `init?: { code: Cell; data: Cell }`
- Used with `provider.open(contract)` and `contract.sendDeploy(via, value)` (or custom send methods).

## Manual wrapper pattern (FunC/Tolk)

```ts
import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type CounterConfig = { id: number; counter: number };

export function counterConfigToCell(config: CounterConfig): Cell {
    return beginCell().storeUint(config.id, 32).storeUint(config.counter, 32).endCell();
}

export class Counter implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Counter(address);
    }

    static createFromConfig(config: CounterConfig, code: Cell, workchain = 0) {
        const data = counterConfigToCell(config);
        const init = { code, data };
        return new Counter(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async getID(provider: ContractProvider) {
        const { stack } = await provider.get('get_id', []);
        return stack.readBigNumber();
    }
}
```

## Usage in tests and scripts

- **Tests:** `blockchain.openContract(Contract.createFromConfig(config, code))` then `sendDeploy(deployer.getSender(), toNano('0.05'))`.
- **Scripts:** `provider.open(Contract.createFromConfig(config, await compile('Contract')))` then `contract.sendDeploy(provider.sender(), toNano('0.05'))` and `provider.waitForDeploy(contract.address)`.

Tact-generated wrappers follow the same `Contract` pattern; import from `build/<CONTRACT>/tact_<Contract>.ts` (or path set in tact.config.json).

<!--
Source references:
- https://github.com/ton-org/blueprint/blob/main/README.md (Directory structure, wrappers)
- sources/ton-blueprint/src/templates (wrapper and deploy templates)
-->
