---
name: viem-ens
description: Resolve ENS names to addresses and avatars, and use ENS utilities in viem.
---

# ENS

Resolve ENS names on mainnet (or L1 with Universal Resolver). Use **normalize** before resolving to comply with UTS-46.

## Actions (Public Client)

- **getEnsAddress**: name → address. Use `normalize(name)` first.
- **getEnsName**: address → primary name.
- **getEnsAvatar**: name → avatar URL.
- **getEnsResolver** / **getEnsText**: resolver and text records.

```ts
import { normalize } from 'viem/ens'

const address = await publicClient.getEnsAddress({ name: normalize('wevm.eth') })
const name = await publicClient.getEnsName({ address: '0xd2135...' })
const avatar = await publicClient.getEnsAvatar({ name: normalize('wevm.eth') })
```

Chain-specific resolution (ENSIP-19): pass `coinType` to `getEnsAddress` when the client is on mainnet.

## Utilities

- **normalize** (`viem/ens`): UTS-46 normalize ENS names before passing to actions.
- **namehash** / **labelhash**: hash name/label for contract calls.

## Key points

- Client should be on mainnet (or L1 with ENS) for resolution.
- Always normalize names with `normalize()` from `viem/ens` to avoid invalid characters and casing issues.
- Use `getEnsAddress` for name→address; `getEnsName` for address→name; `getEnsAvatar` for avatar URL.

<!--
Source references:
- https://viem.sh/docs/ens/actions/getEnsAddress
- https://viem.sh/docs/ens/utilities/normalize
-->
