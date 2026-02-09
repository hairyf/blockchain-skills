---
name: wagmi connect wallet
description: Connect wallet with useConnect, useAccount, useDisconnect, useConnectors, useConnection.
---

# Connect Wallet (React)

Hooks for connection state and connecting/disconnecting wallets.

## Hooks

- **useConnectors()** — List of available connectors from config.
- **useConnect()** — `connect({ connector })`, `pendingConnector`, `error`, `status`. Call `connect({ connector })` to connect.
- **useAccount()** — `address`, `addresses`, `chain`, `chainId`, `connector`, `status`, `isConnected`, `isConnecting`, `isDisconnected`, `isReconnecting`.
- **useConnection()** — Current connection (same as active account); `connection` (address, chainId, connector).
- **useDisconnect()** — `disconnect()` to disconnect.
- **useChainId()** — Current chain ID from config/connection.

## Pattern

```tsx
function ConnectButton() {
  const { connectors, connect, status, error } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <>
        <span>{address}</span>
        <button onClick={() => disconnect()}>Disconnect</button>
      </>
    )
  }

  return (
    <>
      {connectors.map((c) => (
        <button key={c.uid} onClick={() => connect({ connector: c })}>
          {c.name}
        </button>
      ))}
      {status === 'pending' && <span>Connecting...</span>}
      {error && <span>{error.message}</span>}
    </>
  )
}
```

## Multiple Connections

Wagmi supports multiple connections (e.g. EIP-6963). Use **useConnections()** for list and **useSwitchConnection()** to switch active connection.

<!--
Source references:
- https://wagmi.sh/react/guides/connect-wallet
- sources/wagmi/site/react/guides/connect-wallet.md
-->
