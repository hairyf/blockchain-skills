---
name: wagmi ENS
description: ENS resolution hooks — useEnsName, useEnsAddress, useEnsAvatar (and resolver/text).
---

# ENS

Wagmi provides React hooks for ENS lookups. Primary ones: **useEnsName** (address → name), **useEnsAddress** (name → address), **useEnsAvatar** (address → avatar URL). Optional: **useEnsResolver**, **useEnsText** for custom resolver/text records.

## useEnsName

Resolve primary ENS name for an address.

```tsx
import { useEnsName } from 'wagmi'

const { data: name } = useEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
})
// name: string | null
```

Parameters: `address` (required), `chainId`, `blockNumber`, `blockTag`, `universalResolverAddress`, `scopeKey`, query options (`enabled`, etc.).

## useEnsAddress

Resolve address for an ENS name.

```tsx
import { useEnsAddress } from 'wagmi'

const { data: address } = useEnsAddress({
  name: 'vitalik.eth',
})
// address: Address | null
```

## useEnsAvatar

Get avatar URL for an address (ENS avatar or default).

```tsx
import { useEnsAvatar } from 'wagmi'

const { data: avatarUrl } = useEnsAvatar({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
})
// avatarUrl: string | null
```

## useEnsResolver / useEnsText

- **useEnsResolver:** Get resolver address for a name.
- **useEnsText:** Read a text record (e.g. `description`, `url`) from ENS.

## Core actions

Same capabilities exist in Core (vanilla): `getEnsName`, `getEnsAddress`, `getEnsAvatar`, `getEnsResolver`, `getEnsText`.

## Key points

- ENS resolution is typically on mainnet; pass `chainId: mainnet.id` if your config has multiple chains.
- Use `enabled: !!address` (or similar) to avoid running when input is missing.

<!--
Source references:
- https://wagmi.sh/react/api/hooks/useEnsName
- https://wagmi.sh/react/api/hooks/useEnsAddress
- https://wagmi.sh/react/api/hooks/useEnsAvatar
- sources/wagmi/site/react/api/hooks/useEnsName.md
-->
