---
name: ton-blueprint-scripts
description: Script contract — run(provider, args), deploy scripts, and blueprint run CLI.
---

# Scripts

Scripts live in `scripts/` and are executed with `npx blueprint run <SCRIPT> [args...]`. Each script must export a `run` function.

## Signature

```ts
export async function run(provider: NetworkProvider, args: string[]): Promise<void>
```

- `provider`: same `NetworkProvider` used for deploy (sender, open, waitForDeploy, etc.).
- `args`: CLI arguments after the script name (e.g. `blueprint run myScript a b` → `args = ['a', 'b']`).

Shorter form when you don’t need args:

```ts
export async function run(provider: NetworkProvider): Promise<void>
```

## Deploy script pattern

Typical deploy script: compile contract, open with config, send deploy, wait for deploy.

```ts
import { toNano } from '@ton/core';
import { compile, NetworkProvider } from '@ton/blueprint';
import { Counter } from '../wrappers/Counter';

export async function run(provider: NetworkProvider) {
    const counter = provider.open(
        Counter.createFromConfig(
            { id: Math.floor(Math.random() * 10000), counter: 0 },
            await compile('Counter')
        )
    );
    await counter.sendDeploy(provider.sender(), toNano('0.05'));
    await provider.waitForDeploy(counter.address);
    console.log('ID', await counter.getID());
}
```

## Script with arguments

```ts
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const contractAddress = args[0];
    if (!contractAddress) {
        provider.ui().write('Usage: blueprint run increment <address>');
        return;
    }
    // ... open contract, send message, optionally waitForLastTransaction()
    await provider.waitForLastTransaction();
}
```

Run: `yarn blueprint run increment EQ... --testnet --tonconnect`.

<!--
Source references:
- https://github.com/ton-org/blueprint/blob/main/README.md (Running scripts, Deploying contracts)
- sources/ton-blueprint/src/templates (deploy and increment script templates)
-->
