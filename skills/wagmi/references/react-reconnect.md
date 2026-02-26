---
name: wagmi reconnect
description: useReconnect for reconnecting connectors on mount; reconnectOnMount on WagmiProvider.
---

# Reconnect

Wagmi can restore the last used connector(s) when the app loads. **useReconnect** triggers reconnection manually; **WagmiProvider**’s **reconnectOnMount** enables automatic reconnect on mount.

## useReconnect

Mutation-style hook: call **reconnect.mutate()** to attempt to reconnect previously used connectors.

```tsx
import { useReconnect } from 'wagmi'
import { useEffect } from 'react'

const reconnect = useReconnect()
useEffect(() => {
  reconnect.mutate()
}, [])
```

Return: `{ mutate, mutateAsync, data, isPending, error }`. Optional **mutate({ connectors })** to limit which connectors to try (deprecated to pass connectors; prefer global config).

## Automatic reconnect (reconnectOnMount)

**WagmiProvider** accepts **reconnectOnMount** (default `true`). When `true`, Wagmi calls reconnect automatically on mount so you usually don’t need to call **useReconnect** yourself.

```tsx
<WagmiProvider config={config} reconnectOnMount={true}>
  {children}
</WagmiProvider>
```

## When to use

- Rely on **reconnectOnMount** for typical “remember last wallet” behavior.
- Use **useReconnect** only when you need to trigger reconnect at a custom time (e.g. after login) or when **reconnectOnMount** is disabled.

## Core action

**reconnect** — same in Core.

## Key points

- Reconnection runs on mount by default; disable with **reconnectOnMount={false}** if you want full control.
- During reconnect, some connector methods may be unavailable until reconnection completes (**ConnectorUnavailableReconnectingError**).

<!--
Source references:
- https://wagmi.sh/react/api/hooks/useReconnect
- https://wagmi.sh/react/api/WagmiProvider
-->
