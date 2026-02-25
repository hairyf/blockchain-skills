---
name: wagmi createStorage
description: Custom storage for config state — key, storage interface, serialize/deserialize.
---

# createStorage

Creates a **Storage** object used by `createConfig({ storage })` to persist Wagmi state (connections, chainId, etc.). Default is `localStorage`; use **createStorage** for cookies, IndexedDB, or a custom backend.

## Usage

```ts
import { createStorage } from 'wagmi'

const storage = createStorage({ storage: localStorage })
const config = createConfig({
  chains: [mainnet, sepolia],
  storage,
  transports: { ... },
})
```

## Parameters

- **storage** — Object with `getItem(key)`, `setItem(key, value)`, `removeItem(key)` (sync or async). Default: `localStorage`.
- **key** — Prefix for stored keys. Default: `'wagmi'`.
- **serialize** / **deserialize** — Custom serializers. Defaults use Wagmi’s **serialize** and **deserialize** (support `bigint`, `Map`). If custom, must handle those types.

## Cookie storage

Use **cookieStorage** from `wagmi` with **createStorage** for SSR/cookie persistence:

```ts
import { createStorage, cookieStorage } from 'wagmi'
const storage = createStorage({ storage: cookieStorage })
```

## Custom async storage (e.g. IndexedDB)

```ts
import { createStorage } from 'wagmi'
import { get, set, del } from 'idb-keyval'

const storage = createStorage({
  storage: {
    getItem: (name) => get(name),
    setItem: (name, value) => set(name, value),
    removeItem: (name) => del(name),
  },
})
```

## Storage interface

Returned storage has **getItem(key, defaultValue?)**, **setItem(key, value)**, **removeItem(key)**. Used internally by config; you can also read/write for debugging (e.g. `storage.getItem('recentConnectorId')`).

## Key points

- Use **createStorage** when you need cookies (SSR), IndexedDB, or a custom backend.
- Custom serialize/deserialize must support **bigint** and **Map** for Wagmi state.

<!--
Source references:
- https://wagmi.sh/react/api/createStorage
- sources/wagmi/site/shared/createStorage.md
-->
