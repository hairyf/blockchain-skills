---
name: wagmi error handling
description: Typed errors, BaseError, discriminating by error.name, and common error types.
---

# Error Handling

Wagmi hook `error` is strongly typed. Discriminate by **`error.name`** for granular handling. Use **BaseError** for a shared `shortMessage` when displaying to users.

## Discriminating by error name

```tsx
const { data, error } = useBlockNumber()

if (error?.name === 'HttpRequestError') {
  const { status } = error
  return <div>HTTP error. Status: {status}</div>
}
if (error?.name === 'LimitExceededRpcError') {
  const { code } = error
  return <div>Rate limit exceeded. Code: {code}</div>
}
```

## BaseError

All Wagmi errors extend **BaseError**. For UI, use `(error as BaseError).shortMessage` or `error.message` for a readable string.

```tsx
import type { BaseError } from 'wagmi'

{error && (
  <div>Error: {(error as BaseError).shortMessage || error.message}</div>
)}
```

## Config / connector errors

- **ChainNotConfiguredError** — Chain not in `createConfig` chains.
- **ConnectorNotFoundError** / **ConnectorNotConnectedError** — Connector missing or not connected.
- **ConnectorAlreadyConnectedError** — Connect called when already connected.
- **ConnectorAccountNotFoundError** — Account not available on connector.
- **ConnectorChainMismatchError** — Config chain out of sync with connector (rare).
- **ConnectorUnavailableReconnectingError** — Connector not fully available during reconnect.
- **ProviderNotFoundError** — Connector provider (e.g. `window.ethereum`) not found.
- **SwitchChainNotSupportedError** — Connector doesn’t support chain switching.

## WagmiProviderNotFoundError

Thrown when a Wagmi hook is used outside **WagmiProvider**. Ensure the component tree is wrapped in `WagmiProvider`.

## Key points

- Prefer `error?.name === '...'` for branching; use `BaseError` for display.
- Handle user rejection and RPC/rate-limit errors in connect, send, and sign flows.

<!--
Source references:
- https://wagmi.sh/react/guides/error-handling
- https://wagmi.sh/react/api/errors
- sources/wagmi/site/shared/errors.md
-->
