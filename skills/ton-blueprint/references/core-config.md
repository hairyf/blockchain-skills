---
name: ton-blueprint-config
description: blueprint.config.ts and Config options — plugins, network, requestTimeout, recursiveWrappers, manifestUrl.
---

# Configuration

Create `blueprint.config.ts` in the project root. Export a named `config` (not default) of type `Config` from `@ton/blueprint`.

```ts
import { Config } from '@ton/blueprint';

export const config: Config = {
    // optional fields
};
```

## Options

| Field | Type | Description |
|-------|------|-------------|
| `plugins` | `Plugin[]` | Plugins that add runners (e.g. scaffold, misti). |
| `network` | `'mainnet' \| 'testnet' \| 'tetra' \| CustomNetwork` | Default network for run/verify; avoids passing `--custom` every time. |
| `domain` | `number` | Used with mnemonic/custom network. |
| `networkId` | `number` | Used with mnemonic/custom network. |
| `separateCompilables` | `boolean` | If true, compilables live in `compilables/` instead of `wrappers/`. Default false. |
| `requestTimeout` | `number` | HTTP timeout in ms (e.g. 10000). |
| `recursiveWrappers` | `boolean` | Search `wrappers`/`compilables` recursively. Default false. |
| `manifestUrl` | `string` | Override TonConnect manifest URL. |

## Custom network

```ts
export const config: Config = {
    network: {
        endpoint: 'https://toncenter.com/api/v2/jsonRPC',
        type: 'mainnet',
        version: 'v2',
        key: 'YOUR_API_KEY',
    },
};
```

Same effect as: `blueprint run --custom <endpoint> --custom-type mainnet --custom-version v2 --custom-key <key>`.

## Liteclient

```ts
export const config: Config = {
    network: {
        endpoint: 'https://ton.org/testnet-global.config.json', // mainnet: global.config.json
        version: 'liteclient',
        type: 'testnet',
    },
};
```

## Plugins

```ts
import { Config } from '@ton/blueprint';
import { ScaffoldPlugin } from 'blueprint-scaffold';

export const config: Config = {
    plugins: [new ScaffoldPlugin()],
};
```

Plugins implement `Plugin`: `runners(): PluginRunner[]` (name, runner, help).

<!--
Source references:
- https://github.com/ton-org/blueprint/blob/main/README.md (Configuration, Plugins, Custom network, Liteclient)
- sources/ton-blueprint/src/config/Config.ts
-->
