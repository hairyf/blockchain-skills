---
name: ton-blueprint-network-provider
description: NetworkProvider API for scripts and deploy flows — sender, open contract, waitForDeploy, API client.
---

# NetworkProvider

Scripts and deploy flows receive a `NetworkProvider` from `@ton/blueprint`. Use it to send transactions, open contracts, and wait for deployment or transaction confirmation.

## Getting a provider in scripts

Scripts export `run(provider: NetworkProvider, args?: string[])`. The CLI passes the provider when you run `blueprint run <SCRIPT>`.

```ts
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const sender = provider.sender();
    const address = /* ... */;
    await provider.open(MyContract.createFromAddress(address)).send(sender, { value: toNano('0.05') });
    await provider.waitForLastTransaction();
}
```

## Key methods

| Method | Use |
|--------|-----|
| `provider.network()` | `'mainnet' \| 'testnet' \| 'tetra' \| 'custom'` |
| `provider.sender()` | `SenderWithSendResult` for sending messages (deploy, internal messages) |
| `provider.open(contract)` | `OpenedContract<T>` for getters and `send()` |
| `provider.provider(address, init?)` | Low-level `ContractProvider` for an address |
| `provider.api()` | Underlying client (`TonClient`, `TonClient4`, `ContractAdapter`, or `LiteClient`) |
| `provider.isContractDeployed(address)` | Whether contract is active |
| `provider.waitForDeploy(address, attempts?, sleepMs?)` | Poll until contract is deployed |
| `provider.waitForLastTransaction(attempts?, sleepMs?)` | Wait for last sent message to be applied (uses `sender().lastSendResult`) |
| `provider.getContractState(address)` | Contract state (balance, etc.) |
| `provider.getConfig(address?)` | Blockchain config from config contract |
| `provider.ui()` | UI for prompts/logging |
| `provider.explorer()` | Explorer type for links |

## Deploy pattern

```ts
import { toNano } from '@ton/core';
import { compile, NetworkProvider } from '@ton/blueprint';
import { MyContract } from '../wrappers/MyContract';

export async function run(provider: NetworkProvider) {
    const code = await compile('MyContract');
    const contract = provider.open(MyContract.createFromConfig({ /* config */ }, code));
    await contract.sendDeploy(provider.sender(), toNano('0.05'));
    await provider.waitForDeploy(contract.address);
    // use contract...
}
```

- Prefer the contract’s `sendDeploy` (or equivalent) plus `waitForDeploy`; avoid the deprecated `provider.deploy()`.

<!--
Source references:
- https://github.com/ton-org/blueprint (README, NetworkProvider interface in src/network/NetworkProvider.ts)
-->
